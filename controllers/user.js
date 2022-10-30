const request = require('request');
const env = require('../config.env');
const { UserService } = require('../services');
const jwt = require('../utils/jwt');
// const { addUserToken, removeUserToken } = require('../db/cache');
const { signupSchema, signinSchema } = require('../utils/validation');
const { InvalidParamsError } = require('../utils/exception');
const cookieConfig = require('../utils/cookieConfig');


class UserController {
    signup = async function(req, res, next) {
        try {
            const { email, password, confirm, nickname }
                = await signupSchema.validateAsync(req.body);
            if (password !== confirm)
                throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');
    
            await UserService.signup({ email, password, nickname });
    
            res.status(200).json({
                message: 'SUCCESS'
            });
            
        } catch (error) {
            next(error);
        }
    }

    dupCheck = async function(req, res, next) {
        try {
            const { value } = req.body;
            if (!value) throw new InvalidParamsError('입력값이 없습니다.');
    
            const result = await UserService.dupCheck(value);
    
            res.status(200).json({
                result,
            });
            
        } catch (error) {
            next(error)
        }
    }

    nicknameUpdate = async function(req, res, next) {
        try {
            const { nickname } = req.body;
            const { userId } = req.app.locals.user;
            
            await UserService.nicknameUpdate({ userId, nickname });
    
            res.status(200).json({
                message: 'SUCCESS'
            });
            
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async function() {};

    findAll = async function(req, res, next) {
        try {
            const userList = await UserService.findAll();
    
            res.status(200).json({
                data: userList,
            });
            
        } catch (error) {
            next(error);
        }
    };

    findOne = async function(req, res, next) {
        console.log("FIND ONE");
        try {
            const { userId } = req.app.locals.user;
            const user = await UserService.findOne(userId);
    
            res.status(200).json({
                data: user
            })
            
        } catch (error) {
            next(error);
        }
    }

    localSign = async function(req, res, next) {
        try {
            const { email, password, location } 
                = await signinSchema.validateAsync(req.body);
            const payload = await UserService.signin(email, password)
            if (payload instanceof Error) throw payload;

            const accessToken = jwt.sign(payload);
            const refreshToken = jwt.refresh();
            // await addUserToken(refreshToken, payload.userId);

            res.cookie('accessToken', accessToken, cookieConfig);
            res.cookie('resfreshToken', refreshToken, cookieConfig);
            res.status(200).json({
                message: '로그인되었습니다.',
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`
            });

        } catch (error) {
            next(error);
        }
    }

    kakaoSign = function(req, res, next) {

        const { code } = req.query;
        const { REST_API_KEY, REDIRECT_URI } = env;
        const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&code=${code}`

        request(url, async(err, response, body) => {
            if (err) {
                next(err);
            }
            const { id_token } = JSON.parse(body);
            const { email, nickname } = jwt.decode(id_token);
            const payload = await UserService.kakaoSign(email, nickname);            

            const accessToken = jwt.sign(payload);
            const refreshToken = jwt.refresh();
            // await addUserToken(refreshToken, payload.userId);
            
            res.cookie('accessToken', accessToken, cookieConfig);
            res.cookie('resfreshToken', refreshToken, cookieConfig);
            res.status(200).json({
                accessToken, refreshToken
            });
        });
    }

    signout = async function(req, res, next) {
        const { refreshToken } = req.params
        // await removeUserToken(refreshToken)

        res.status(200).json({
            message: 'SUCCESS'
        });
    }
}


module.exports = new UserController();