const request = require("request");
const env = require("../config.env");
const { UserService } = require("../services");
const jwt = require("../utils/jwt");
const { signupSchema, signinSchema } = require("../utils/validation");
const { saveCoords } = require('../utils/listing/coords');
const { InvalidParamsError } = require("../utils/exception");
const { redisClient } = require("../utils/session");

const redisCli = redisClient.v4;


class UserController {
  signup = async function (req, res, next) {
    try {
      const { email, password, confirm, nickname } =
        await signupSchema.validateAsync(req.body);
      if (password !== confirm)
        throw new InvalidParamsError("비밀번호가 일치하지 않습니다.");

      await UserService.signup({ email, password, nickname });

      res.status(200).json({
        message: "SUCCESS",
      });
    } catch (error) {
      next(error);
    }
  };

  dupCheck = async function (req, res, next) {
    try {
      const { value } = req.body;
      if (!value) throw new InvalidParamsError("입력값이 없습니다.");

      const result = await UserService.dupCheck(value);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  nicknameUpdate = async function (req, res, next) {
    try {
      const { nickname } = req.body;
      const { userId } = req.app.locals.user;

      const updated = await UserService.nicknameUpdate({ userId, nickname });
      if (updated) {
        res.status(200).json({
          result: true,
          nickname: nickname,
          message: "SUCCESS",
        });
      } else {
        res.status(406).json({
          result: false,
          message: "FAIL",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  passwordUpdate = async function (req, res, next) {
    try {
      const { password, newPassword } = req.body;
      const { userId } = req.app.locals.user;

      const updated = await UserService.passwordUpdate({
        userId,
        password,
        newPassword,
      });
      if (updated) {
        res.status(200).json({
          result: true,
          message: "SUCCESS",
        });
      } else {
        res.status(406).json({
          result: false,
          message: "FAIL",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  profileUpdate = async function(req, res, next) {
    try {
        if (!req.files) throw new InvalidParamsError('이미지를 업로드해 주세요.');
        const { profImg } = req.files;
        const { userId } = req.app.locals.user;

        if (profImg.mimetype.split('/')[0] !== 'image')
            throw new InvalidParamsError('이미지를 업로드해 주세요.');

        const imgPath = await ResizeAndSave.profImg(userId, profImg);
        await User.profileUpdate(userId, imgPath);

        res.status(200).json({
            message: 'SUCCESS',
        });
        
    } catch (error) {
        next(error);
    }
}

  deleteUser = async function () {};

  findAll = async function (req, res, next) {
    try {
      const userList = await UserService.findAll();

      res.status(200).json({
        data: userList,
      });
    } catch (error) {
      next(error);
    }
  };

  findOne = async function (req, res, next) {
    console.log("FIND ONE");
    try {
      const { userId } = req.app.locals.user;
      const user = await UserService.findOne(userId);

      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  findOneforMyPage = async function (req, res, next) {
    console.log("MY PAGE");
    try {
      const userInfo = req.app.locals.user;
      if(!userInfo.userId) throw new InvalidParamsError("사용자 정보가 없습니다.");

      const orderList = await UserService.findOneforMyPage(userInfo.userId);

      const user = {
        userId:userInfo.userId,
        email:userInfo.email,
        nickname:userInfo.nickname,
        orderList
      }

      res.status(200).json({
        user
      });
    } catch (error) {
      next(error);
    }
  };

  localSign = async function (req, res, next) {
    try {
      const { email, password, location } = await signinSchema.validateAsync(
        req.body
      );
      const [X, Y] = saveCoords(location);
      const payload = await UserService.signin(email, password);
      if (payload instanceof Error) throw payload;

      const accessToken = jwt.sign(payload);
      const refreshToken = jwt.refresh();

      await Promise.all([
        redisCli.set(refreshToken, payload.userId, { EX: 3600, NX: true }),
        redisCli.set(`user${payload.userId}`, `${X},${Y}`, { EX: 3600 }),
      ]);
      //key refreshToken, value userId, EX설정 ttl 3600초, NX설정시 같은키 덮어쓰기 안됨

      // // res.cookie("accessToken", accessToken, cookieConfig);
      // // res.cookie("resfreshToken", refreshToken, cookieConfig);
      res.status(200).json({
        message: "로그인되었습니다.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  kakaoSign = function (req, res, next) {
    const { code } = req.query;
    const { REST_API_KEY, REDIRECT_URI } = env;
    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&code=${code}`;

    request(url, async (err, response, body) => {
      if (err) {
        next(err);
      }
      const { id_token } = JSON.parse(body);
      const { email, nickname } = jwt.decode(id_token);
      const payload = await UserService.kakaoSign(email, nickname);

      const accessToken = jwt.sign(payload);
      const refreshToken = jwt.refresh();
      // await addUserToken(refreshToken, payload.userId);

      // res.cookie("accessToken", accessToken, cookieConfig);
      // res.cookie("resfreshToken", refreshToken, cookieConfig);
      res.status(200).json({
        accessToken,
        refreshToken,
      });
    });
  };

  signout = async function (req, res, next) {
    const { refreshToken } = req.params;
    const n = await redisCli.exists(refreshToken); // true: 1 , false: 0
    if (n) await Promise.all([redisCli.del(refreshToken), redisCli.quit()]);

    req.session.destroy();
    // await removeUserToken(refreshToken)

    res.status(200).json({
      message: "SUCCESS",
    });
  };
}

module.exports = new UserController();
