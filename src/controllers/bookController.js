import Book from "../models/book.js";
import emailQueue from "../queues/email.queue.js";
import redisClient from "../config/redis.js";
import { randomUUID } from "crypto";

export const getAllBooks = async (req, res) => {
  try {
    console.log("getAllBooks called", req.query);
    const cachedBooks = await redisClient.get("books");

    if (cachedBooks) {
      console.log("Cache HIT");

      return res.status(200).json({
        data: JSON.parse(cachedBooks),
      });
    }

    console.log("Cache MISS");

    const lockKey = "lock:books";

    const lockToken = randomUUID();

    const lock = await redisClient.set(lockKey, lockToken, {
      NX: true,
      EX: 10,
    });

    console.log("Lock result:", lock);

    if (lock === null) {
      await redisClient.del("books");

      for await (const keys of redisClient.scanIterator({
        MATCH: "books:*",
      })) {
        if (keys.length > 0) {
          await redisClient.del(keys);
        }
      }
    }

    const data = await Book.find();

    await redisClient.set("books", JSON.stringify(data), {
      EX: 60,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    await redisClient.publish(
      "book-events",
      JSON.stringify({
        type: "BOOK_CREATED",
        bookId: book._id,
        title: book.title,
      }),
    );

    for await (const keys of redisClient.scanIterator({
      MATCH: "books:*",
    })) {
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    }

    await emailQueue.add(
      "book-created",
      {
        title: book.title,
        author: book.author,
        price: book.price,
      },
      {
        delay: 10000, // 10 seconds
      },
    );

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
