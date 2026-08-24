import emailQueue from "../queues/email.queue.js";

const jobData = {
  orderId: 999,
  email: "user@example.com",
};

await emailQueue.add(
  "order-confirmation",
  jobData,
  { jobId: "order-confirmation-999" },
);

await emailQueue.add(
  "order-confirmation",
  jobData,
  { jobId: "order-confirmation-999" },
);

console.log("Both add() calls executed");

await emailQueue.close();
process.exit(0);