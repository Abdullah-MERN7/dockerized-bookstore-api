import emailQueue from "../queues/email.queue.js";

await emailQueue.add("test-failure", 
  {type: "Test Failure Email"},
  {priority: 5,}
);

console.log("Test job added");

await emailQueue.close();
process.exit(0);