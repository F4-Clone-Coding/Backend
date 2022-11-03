const jwt = require("../utils/jwt");
const UserRepo = require("../repositories/user");
const env = require("../config.env");
// const { findUserByToken } = require('../db/cache');
const { InvalidAccessError } = require("../utils/exception");
const { redisClient } = require("../utils/session");
const redisCli = redisClient.v4


// temporary authMiddleware
module.exports = async (req, res, next) => {
  console.log("TEMP AUTH MIDDLEWARE");

  const { authorization, refreshtoken } = req.headers;

  console.log("헤더 authorization :", authorization);
  console.log("헤더 refreshtoken :", refreshtoken);

  const [accType, accToken] = (authorization || "").split(" ");
  const [refType, refToken] = (refreshtoken || "").split(" ");

  if (accType !== "Bearer" || refType !== "Bearer") {
    return next(new InvalidAccessError("로그인 후 이용 가능한 기능입니다.", 401));
  }

  try {
    const payload = jwt.verify(accToken);
    console.log("accessToken이 뱉은 payload :", payload);

    if (payload) {
      const location = await redisCli.get(`user${payload.userId}`)
      const [X, Y] = location.split(',').map(Number);
      req.app.locals.user = Object.assign(payload, {X, Y});
      return next();
    }

    /**AccessToken만 만료시 AccessToken재발급 */
    if (!payload) {
      const verifyRefresh = jwt.verify(refToken);
      console.log("refreshToken이 뱉은 verifyRefresh 값 :", verifyRefresh);

      /**refreshToken만료시 재로그인 요청 */
      if (!verifyRefresh) {
        return next(new InvalidAccessError("로그인 후 이용 가능한 기능입니다.", 401));
      }
      if (verifyRefresh) {
        //전달안됨1 //const {userId} = req.app.locals.user;
        //전달안됨2 //const {userId} = res.locals.user;
        //전달안됨3 //const userInfo = tokenObject[refreshToken];
        //전달안됨4 //const test = req.session.userId
        const userId = await redisCli.get(refToken)
        console.log("access만료, refresh생존, userId:", userId);

        /**refreshToken은 정상이지만 한번도 로그인을 한 적이 없는 에외적인 경우 **/
        if (!userId) {
          return next(new InvalidAccessError("로그인 시간이 만료되었습니다.", 401));
        }

        /**유저정보 DB에서 찾아오기*/
        const location = await redisCli.get(`user${userId}`)
        const [X, Y] = location.split(',').map(Number);
        const userInfo = await UserRepo.findOne(userId);
        const user = {
          userId: userInfo.userId,
          email: userInfo.email,
          nickname: userInfo.nickname,
          X, Y
        };

        /**AccessToken 재발급 */
        const newAccessToken = jwt.sign(user);

        /**로그인 유저정보 다시 저장 */
        req.app.locals.user = user;

        /**새로 발급받은 토큰전송 */
        res.cookie("accessToken", newAccessToken, {
          secure: true,
          sameSite: 'None',
          httpOnly: true,
        });
        // res.json({
        //   message: "acessToken 재발급",
        //   accessToken: `Bearer ${newAccessToken}`,
        // });
        console.log("accessToken 재발급");
        next()
      }
    }
  } catch (error) {
    next(error);
  }
};
