import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import redisClient, { subscriber } from "./config/redis.js";
import emailQueue from "./queues/email.queue.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");


async function startServer() {
  try {
    await redisClient.connect();

    console.log("Redis connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Book Store v2");
});

await subscriber.connect();

await subscriber.subscribe("book-events", async (message) => {
  const event = JSON.parse(message);

  if (event.type === "BOOK_CREATED") {
    console.log(`📧 Sending email for: ${event.title}`);
  }
});

connectDB();

app.use("/api/v1/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
