import emailQueue from "../queues/email.queue.js";

await emailQueue.add(
  "normal-email-1",
  { type: "Normal Email 1" },
  { priority: 10 },
);

await emailQueue.add(
  "normal-email-2",
  { type: "Normal Email 2" },
  { priority: 10 },
);

await emailQueue.add(
  "password-reset",
  { type: "Password Reset" },
  { priority: 1 },
);

console.log("Jobs Added");

await emailQueue.close();
process.exit(0);