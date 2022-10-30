const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const RedisStore = connectRedis(session);
const env = require("../config.env");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = redis.createClient({
  port: 6379,
  disableTouch: true,
  //url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  logErrors: true,
  legacyMode: true,
}); // legacy 모드 확인 필요
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용



const sessionInfo = {
  resave: true,
  saveUninitialized: false,
  secret: env.SESSION_KEY,
  cookie: {
    httpOnly: true,
    secure: true,
  },
  store: new RedisStore({ client: redisClient }),
};

module.exports = { sessionInfo, redisClient };

// app.use(
//     session({
//       secret: env.SESSION_KEY,
//       resave: false,
//       saveUninitialized: true,
//       store: new MemoryStore({
//         checkPeriod: 86400000,
//       }),
//       cookie: {maxAge: 86400000}
//     })
//   );
