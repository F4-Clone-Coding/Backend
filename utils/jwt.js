const jwt = require('jsonwebtoken');
const env = require('../config.env');


class Jwt {
    sign = function(payload) {
        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*60*2
        });
    }
    verify = function(token) {
        try{
            const result = jwt.verify(token, env.JWT_KEY);
            return result;
        }catch(error){
            if(error.name === 'TokenExpiredError'){
                return null;
            }
        }
    }
    refresh = function() {
        return jwt.sign({}, env.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*60*24
        });
    }
    decode = function(token) {
        return jwt.decode(token);
    }
}


module.exports = new Jwt();