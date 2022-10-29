const { User } = require('../models');
const { Op } = require('sequelize');


class UserRepository extends User {
    constructor() {
        super();
    }

    signup = async function(user) {
        return User.create(user);
    }

    findAll = async function() {
        return User.findAll();
    }

    findOne = async function(value) {
        return await User.findOne({
            where: {
                [Op.or]: [{userId: value}, {email: value}, {nickname: value}]
            }
        });
    }
    
    findKakaoUser = async function(email) {
        return await User.findOne({
            where: { 
                email: email,
                provider: 'kakao'
            },
            attributes: {
                exclude: ['password']
            }
        });
    }

    updateNickname = async function({ userId, nickname }) {
        return await User.update({ nickname }, {
            where: { userId }
        });
    }    

    updateProfImg = async function(userId, [profComment, profMypage]) {
        return await User.update({ profComment, profMypage }, {
            where: { userId }
        });
    }

    deleteOne = async function() {}    
}


module.exports = new UserRepository();