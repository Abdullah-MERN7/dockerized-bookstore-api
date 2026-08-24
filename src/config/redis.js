import dotenv from "dotenv";
dotenv.config();

import IORedis from "ioredis";

console.log("REDIS_HOST =", process.env.REDIS_HOST);

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

export default connection;