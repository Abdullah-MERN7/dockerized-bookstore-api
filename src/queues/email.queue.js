import { Queue } from "bullmq";

import connection from "../config/bullmq.js";

const emailQueue = new Queue("email-queue", {
  connection,
});

export default emailQueue;