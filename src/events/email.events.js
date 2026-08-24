import { QueueEvents } from "bullmq";
import connection from "../config/redis.js";

const emailQueueEvents = new QueueEvents("email-queue", {
  connection,
});

emailQueueEvents.on("completed", ({ jobId }) => {
  console.log(`✅ Job ${jobId} completed`);
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`❌ Job ${jobId} failed: ${failedReason}`);
});

emailQueueEvents.on("active" , ({jobId})=>{
  console.log(`🔄 Job ${jobId} is active`);
})

console.log("Email queue events listener started");