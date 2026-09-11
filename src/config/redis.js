import { createClient } from "redis";

const redisClient = createClient({
   url: "redis://:Ab1762919@127.0.0.1:6380",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export const subscriber = redisClient.duplicate();

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

export default redisClient;