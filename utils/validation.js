const Joi = require('joi');


module.exports = {
    signupSchema: Joi.object({
        username: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{2,10}$/).required(),
        nickname: Joi.string().max(8).required(),
        password: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{4,20}$/).required(),
        confirm: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{4,20}$/).required()
    }),
    signinSchema: Joi.object({
        username: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{2,10}$/).required(),
        password: Joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{4,20}$/).required()
    }),

    postSchema: Joi.object({
        title: Joi.string().required()
            .messages({
                "string.empty": "제목을 입력해주세요."
            }),
        content: Joi.string().required()
            .messages({
                "string.empty": "게시글 내용을 입력해주세요."
            }),
    }),
    
    commentSchema: Joi.object({
        comment: Joi.string().required()
            .messages({
                "string.empty": "댓글 내용을 입력해주세요."
            }),
    }),
}