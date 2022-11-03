const { LikeRepo } = require('../repositories');

class LikeService {

    findOne = async (storeId, userId) => {
        return await LikeRepo.findOne(storeId, userId);
    }

    toggleLike = async (storeId, userId) =>{
        const like = await LikeRepo.findOne(storeId, userId);

        if (like) {
            const result = await LikeRepo.deleteLike(storeId, userId);
            switch (result) {
                case 1:
                    return true;
                default:
                    return false;
            }
        }
        const result = await LikeRepo.createLike(storeId, userId);
        switch (Boolean(result)) {
            case true:
                return true;
            default:
                return false;
        }
    }
}

module.exports = new LikeService();