const jwt = require("../utils/jwt");
const UserRepo = require("../repositories/user");
const env = require("../config.env");
// const { findUserByToken } = require('../db/cache');
const { InvalidAccessError } = require("../utils/exception");
const cookieConfig = require("../utils/cookieConfig");

// module.exports = async (req, res, next) => {
//   const { authorization, refreshtoken } = req.headers;
//   const [authType, authToken] = (authorization || "").split(" ");

//   if (!authToken || authType !== "Bearer") {
//       next(InvaliadAccessError("로그인 후 이용 가능한 기능입니다.", 401));
//   }

//   try {
//     const payload = jwt.verify(authToken);

//     if (payload) {
//       req.app.locals.user = payload;
//       next();

//     } else {
//       const verifyRefresh = jwt.verify(refreshtoken);

//       if (verifyRefresh) {
//         const userId = await findUserByToken(refreshtoken);
//         const user = await UserRepo.findOne(userId);

//         const newPayload = {
//           userId,
//           username: user.username,
//           nickname: user.nickname
//         }
//         const newAccessToken = jwt.sign(newPayload);

//         res.cookie("accessToken", newAccessToken, cookieConfig);
//         next();
//       } else {
//         throw new InvaliadAccessError("유효하지 않은 refreshToken", 401);
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// temporary authMiddleware
module.exports = async (req, res, next) => {
  console.log("TEMP AUTH MIDDLEWARE");

  const authorization = JSON.parse(req.headers.authorization);
  console.log("헤더 authorization :", authorization);
  const { accessToken, refreshToken } = authorization;
  const [accType, accToken] = (accessToken || "").split(" ");
  const [refType, refToken] = (refreshToken || "").split(" ");

  if (accType !== "Bearer" || refType !== "Bearer") {
    next(new InvalidAccessError("로그인 후 이용 가능한 기능입니다.", 401));
  }

  try {
    const payload = jwt.verify(accToken);
    console.log("accessToken이 뱉은 payload :", payload);

    if (payload) {
      req.app.locals.user = payload;
      const { userId } = payload;
      req.session.num = userId;
      next();
    }

    /**AccessToken만 만료시 AccessToken재발급 */
    if (!payload) {
      const verifyRefresh = jwt.verify(refToken);
      console.log("refreshToken이 뱉은 verifyRefresh 값 :", verifyRefresh);

      /**refreshToken만료시 재로그인 요청 */
      if (!verifyRefresh) {
        next(new InvalidAccessError("로그인 후 이용 가능한 기능입니다.", 401));
      }
      if (verifyRefresh) {
        //전달안됨 //const {userId} = req.app.locals.user;
        //전달 안됨 //const userInfo = tokenObject[refreshToken];
        const userId = req.session.num;
        console.log("access만료, refresh생존, userId:", userId);

        /**refreshToken은 정상이지만 acessToken이 만료되도록 2시간동안 한번도 authMiddleware를 거쳐간 적이 없는 경우 **/
        if (!userId) {
          next(new InvalidAccessError("로그인 시간이 만료되었습니다.", 401));
        }

        /**유저정보 DB에서 찾아오기*/
        const userInfo = await UserRepo.findOne(userId);
        const user = {
          userId: userInfo.userId,
          email: userInfo.email,
          nickname: userInfo.nickname,
        };

        /**AccessToken 재발급 */
        const newAccessToken = jwt.sign(user);

        /**로그인 유저정보 다시 저장 */
        req.app.locals.user = user;

        /**새로 발급받은 토큰전송 */
        res.cookie("accessToken", newAccessToken, cookieConfig);
        res.json({
          message: "acessToken 재발급",
          accessToken: `Bearer ${accessToken}`,
        });
        console.log("accessToken 재발급");
      }
    }
  } catch (error) {
    next(error);
  }
};
