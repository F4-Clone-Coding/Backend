const jwt = require("../utils/jwt");
const UserRepo = require("../repositories/user")
const env = require('../config.env')
// const { findUserByToken } = require('../db/cache');
const { InvaliadAccessError } = require('../utils/exception');
const cookieConfig = require('../utils/cookieConfig');

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
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
      next(InvaliadAccessError("로그인 후 이용 가능한 기능입니다.", 401));
  }

  try {
    const payload = jwt.verify(authToken);

    if (payload) {
      req.app.locals.user = payload;
      next();

    } else {
      throw new InvaliadAccessError("로그인 세션이 만료되었습니다.", 401);
    }
  } catch (error) {
    next(error);
  }
};