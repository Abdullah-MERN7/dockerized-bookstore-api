import { Worker } from "bullmq";
import connection from "../config/redis.js";

new Worker(
  "email-queue",
  async (job) => {
    console.log(
      `Processing: ${job.data.type} | Priority: ${job.opts.priority}`,
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
  {
    connection,
    concurrency: 1,
  },
);