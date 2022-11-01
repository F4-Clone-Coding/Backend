const { OrderRepo, UserRepo } = require("../repositories");
const bcrypt = require("bcrypt");
const env = require("../config.env");
const { InvalidParamsError } = require("../utils/exception");
const { get } = require("request");

class UserService {
  signup = async function (user) {
    user.password = await bcrypt.hash(user.password, env.SALT_ROUND);

    return await UserRepo.signup(user);
  };

  signin = async function (email, password) {
    const user = await UserRepo.findOne(email);
    if (
      user === null ||
      !(await bcrypt.compare(password, user.get().password))
    ) {
      return new InvalidParamsError("아이디, 비밀번호가 일치하지 않습니다.");
    }

    return {
      userId: user.userId,
      email,
      nickname: user.nickname,
    };
  };

  kakaoSign = async function (email, nickname) {
    const user = await UserRepo.findKakaoUser(email);

    if (user) {
      return {
        userId: user.get().userId,
        email,
        nickname: nickname.slice(0, 10),
      };
    } else {
      const newUser = await UserRepo.signup({
        email,
        password: "kakao",
        nickname: nickname.slice(0, 10),
        provider: "kakao",
      });
      return {
        userId: newUser.get().userId,
        email,
        nickname: nickname.slice(0, 10),
      };
    }
  };

  dupCheck = async function (value) {
    const result = await UserRepo.findOne(value);
    return Boolean(result);
  };

  nicknameUpdate = async function ({ userId, nickname }) {
    const result = await UserRepo.findOne(nickname);
    if (result) throw new InvalidParamsError("이미 사용중인 닉네임입니다.");

    return await UserRepo.updateNickname({ userId, nickname });
  };

  passwordUpdate = async function ({ userId, password, newPassword }) {
    const user = await UserRepo.findOne(userId);
    if (!(await bcrypt.compare(password, user.get().password))) {
      return new InvalidParamsError("비밀번호가 일치하지 않습니다.");
    }
    newPassword = await bcrypt.hash(newPassword, env.SALT_ROUND);

    return await UserRepo.updatePassword({ userId, newPassword });
  };

  deleteUser = async function () {};

  findAll = async function () {
    return await UserRepo.findAll();
  };

  findOne = async function (value) {
    const result = await UserRepo.findOne(value);
    return {
      userId: result.userId,
      email: result.email,
      nickname: result.nickname,
    };
  };

  findOneforMyPage = async function (userId) {
    const result = await UserRepo.findOne(userId);
    const orders = await OrderRepo.findOrderByUserId(userId);
    let orderList = [];
    for (const order of orders) {
      const orderInfo = {
        orerId: order.orderId,
        orderDate: order.createdAt,
        storeId: order.Store.storeId,
        storeName: order.Store.name,
        storePhone: order.Store.contact,
      };
      orderList.push(orderInfo);

      const { records } = order;
      const { totalPrice } = records[records.length - 1];

      const promises = records.map(async (record) => {
        const menuId = record.menuId;
        const count = record.count;

        if (menuId && count) {
          const menu = await OrderRepo.findOneMenu(menuId);
          const Menu = {
            menuId: menu.menuId,
            name: menu.name,
            price: menu.price,
            count,
            image: menu.image,
          };
          orderList.push(Menu);
        }
      });
      await Promise.all(promises);
      orderList.push({sum:totalPrice});
    }
    return {
      userId: result.userId,
      email: result.email,
      nickname: result.nickname,
      orderList,
    };
  };
}

module.exports = new UserService();
