import Book from "../models/book.js";
import emailQueue from "../queues/email.queue.js";

export const getAllBooks = async (req, res) => {
  try {
    const data = await Book.find();
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

    console.log(
      `Job added at ${new Date().toLocaleTimeString()}`,
    );
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
