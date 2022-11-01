const { User } = require('../db/models');
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

    updatePassword = async function({ userId, newPassword  }){
        return await User.update({ password:newPassword },{
            where: {userId}
        } )
    }

    deleteOne = async function() {}    
}


module.exports = new UserRepository();