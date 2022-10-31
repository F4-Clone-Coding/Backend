const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const RedisStore = connectRedis(session);
const env = require("../config.env");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = redis.createClient({
  //port: 6379,
  //disableTouch: true,
  url: `redis://${env.REDIS_USERNAME}:${env.REDIS_PW}@${env.REDIS_HOST}:${env.REDIS_PORT}/0`,
  logErrors: true,
  legacyMode: true, // legacy 모드: redus v4 이전의 활용법들과 호환되게 해줌. 
}); 
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)(없으면 멋진 에러 구경가능)
const redisCli = redisClient.v4; // v4버젼부터 프로미스 기반. 거의 새로운 패키지가 된 셈이라는 소문을 들음.


const sessionInfo = {
  resave: false,
  saveUninitialized: false,
  secret: env.SESSION_KEY,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 60*60
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
