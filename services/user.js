const User = require('../repositories/user');
const bcrypt = require('bcrypt');
const env = require('../config.env');
const { InvalidParamsError } = require('../utils/exception');


class UserService {

    signup = async function(user) {
        user.password = await bcrypt.hash(user.password, env.SALT_ROUND);

        return await User.signup(user);
    }

    signin = async function(email, password) {
        const user = await User.findOne(email);
        if (user === null || !(await bcrypt.compare(password, user.get().password))) {
            return new InvalidParamsError('아이디, 비밀번호가 일치하지 않습니다.');
        }

        return {
            userId: user.userId,
            email,
            nickname: user.nickname
        };
    }

    kakaoSign = async function(email, nickname) {
        const user = await User.findKakaoUser(email);

        if (user) {
            return {
                userId: user.get().userId,
                email,
                nickname: nickname.slice(0,10),
            }
            
        } else {
            const newUser = await User.signup({
                email,
                password: 'kakao',
                nickname: nickname.slice(0,10),
                provider: 'kakao'
            });
            return {
                userId: newUser.get().userId,
                email,
                nickname: nickname.slice(0,10),
            };
        }
    }

    dupCheck = async function(value) {
        const result = await User.findOne(value);
        return Boolean(result);
    }

    nicknameUpdate = async function({ userId, nickname }) {
        const result = await User.findOne(nickname);
        if (result) throw new InvalidParamsError('이미 사용중인 닉네임입니다.');

        return await User.updateNickname({ userId, nickname });
    }

    deleteUser = async function() {};

    findAll = async function() {
        return await User.findAll();
    };

    findOne = async function(value) {
        const result = await User.findOne(value);
        return {
            userId: result.userId,
            email: result.email,
            nickname: result.nickname
        };
    };

}


module.exports = new UserService();