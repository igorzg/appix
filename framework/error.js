'use strict';

let di = require('di-node');
let Type = di.load('typed-js');
let core = di.load('@{en}/core');
/**
 * @license Mit Licence 2015
 * @since 0.1.0
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
        this.data = data;
        this.trace = core.traceCall();
        this.stack = core.traceStack();
        throw this;
    }
}
/**
 * @license Mit Licence 2015
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name HttpException
 *
 * @constructor
 * @description
 * HttpException
 */
class HttpException extends Exception {
    constructor(code, message, data) {
        try {
            super(message, data);
        } catch (e) {
            e.code = code;
            throw e;
        }
    }
}

module.exports = {
    HttpException,
    Exception
};