import redisClient from "../config/redis.js";
import { randomUUID } from "crypto";

const WINDOW = 60;
const LIMIT = 3; // testing ke liye, production mein 100

const luaScript = `
  redis.call("ZREMRANGEBYSCORE", KEYS[1], "-inf", ARGV[1])

  redis.call("ZADD", KEYS[1], ARGV[2], ARGV[3])

  local count = redis.call("ZCARD", KEYS[1])

  redis.call("EXPIRE", KEYS[1], ARGV[4])

  if count > tonumber(ARGV[5]) then
    redis.call("ZREM", KEYS[1], ARGV[3])
    return 0
  end

  return 1
`;

export const rateLimiter = async (req, res, next) => {
  console.log("🔥 RATE LIMITER CALLED");

  try {
    const ip = req.ip;
    const key = `rate:${ip}`;

    const now = Date.now();
    const cutoff = now - WINDOW * 1000;
    const requestId = randomUUID();

    const result = await redisClient.eval(luaScript, {
      keys: [key],
      arguments: [
        cutoff.toString(),
        now.toString(),
        requestId,
        WINDOW.toString(),
        LIMIT.toString(),
      ],
    });

    console.log("Rate limit result:", result);

    if (result === 1) {
      return next();
    }

    return res.status(429).json({
      message: "Too many requests. Rate limit exceeded.",
    });
  } catch (error) {
    console.log("Rate limiter error:", error);

    return next();
  }
};