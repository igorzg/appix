'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let core = di.load('@{en}/core');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Exception
 *
 * @constructor
 * @description
 * Exception
 */
class Exception extends Type {
    constructor(message, data) {
        super({
            message: Type.STRING,
            data: Type.OBJECT,
            trace: Type.STRING,
            stack: Type.ARRAY,
            code: Type.NUMBER
        });
        this.message = message;
        this.data = data || {};
        this.trace = core.traceCall();
        this.stack = core.traceStack();
    }
}
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name HttpException
 *
 * @constructor
 * @description
 * HttpException
 */
class HttpException extends Type {
    constructor(code, message, data) {
        super({
            message: Type.STRING,
            data: Type.OBJECT,
            trace: Type.STRING,
            stack: Type.ARRAY,
            code: Type.NUMBER
        });
        this.message = message;
        this.data = data || {};
        this.trace = core.traceCall();
        this.stack = core.traceStack();
        this.code = code;
        console.log('EEE, ', super.toString.toString());
    }
}
// make it throwable
module.exports = {
    SilentException: function SilentException(code, message, data) {
        return new HttpException(code, message, data);
    },
    HttpException: function HttpExceptionThrow(code, message, data) {
        throw new HttpException(code, message, data);
    },
    Exception: function ExceptionThrow(message, data) {
        throw new Exception(message, data);
    }
};