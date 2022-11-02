const { Like } = require('../db/models');


class LikeRepository {

    findOne = async(storeId, userId) => {
        return await Like.findOne({
            where: {
                storeId, userId
            }
        });
    };

    createLike = async(storeId, userId) => {
        return await Like.create({ storeId, userId });
    };

    deleteLike = async(storeId, userId) => {
        return await Like.destroy({
            where: { storeId, userId }
        });
    };

}

module.exports = new LikeRepository();