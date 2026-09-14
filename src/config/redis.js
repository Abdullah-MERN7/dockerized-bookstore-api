import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6380,
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export const subscriber = redisClient.duplicate();

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

export default redisClient;