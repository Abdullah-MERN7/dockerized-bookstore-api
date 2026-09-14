import IORedis from "ioredis";

// const bullRedis = new IORedis({
//   host: "redis",
//   port: 6379,
//   maxRetriesPerRequest: null,
// });

const bullRedis = new IORedis({
  host: "127.0.0.1",
  port: 6380,
   password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

export default bullRedis;