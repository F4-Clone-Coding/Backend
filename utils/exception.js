class InvalidParamsError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 400;
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}

class InvalidAccessError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 412;
        if (!message) this.message = '인증 헤더 오류';
    }
}

class InternalError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        if (!message) this.message = '서버 내부 오류';
    }
}


module.exports = { InvalidAccessError, InvalidParamsError, InternalError };