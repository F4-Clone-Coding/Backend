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
        const result = jwt.verify(token, env.JWT_KEY);
        
        if (result instanceof Error) {
            throw result;
        }
        return result;
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