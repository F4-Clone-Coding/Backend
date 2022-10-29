const Joi = require('joi');


module.exports = {
    signupSchema: Joi.object({
        email: Joi.string().pattern(/^[\w][\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/).required()
            .messages({
                "string.pattern.base": "이메일 형식이 맞지 않습니다."
            }),
        nickname: Joi.string().min(4).max(10).required()
        .messages({
            "string.min": "닉네임은 4~10자입니다.",
            "string.max": "닉네임은 4~10자입니다."
        }),
        password: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/).required()
        .messages({
            "string.pattern.base": "비밀번호 형식이 맞지 않습니다."
        }),
        confirm: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/).required()
        .messages({
            "string.pattern.base": "비밀번호 형식이 맞지 않습니다."
        })
    }),
    signinSchema: Joi.object({
        email: Joi.string().pattern(/^[\w][\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/).required()
        .messages({
            "string.pattern.base": "이메일 형식이 맞지 않습니다."
        }),
        password: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/).required()
        .messages({
            "string.pattern.base": "비밀번호 형식이 맞지 않습니다."
        }),
    }),
}