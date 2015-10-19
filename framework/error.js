'use strict';

let di = require('./di');
let Type = di.load('typed-js');
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
            data: Type.OBJECT,
            message: Type.STRING,
            code: Type.NUMBER,
            stack: Type.STRING
        });
        this.message = message;
        this.data = data || {};

        let error = new Error(this.message);
        if (this.data.error instanceof Error) {
            error.stack = this.data.error.stack + '\n\n' + error.stack;
            let cdata = Object.assign({}, this.data);
            delete cdata.error;
            error.stack += '\n' + JSON.stringify(cdata);
        }
        this.stack = error.stack;
        let str = this.toString();
        error.toString = () => str;
        this.destroy();
        return error;
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
            data: Type.OBJECT,
            message: Type.STRING,
            stack: Type.STRING
        });
        this.message = message;
        this.data = data || {};

        let error = new Error(this.message);
        if (this.data.error instanceof Error) {
            error.stack = this.data.error.stack + '\n\n' + error.stack;
            let cdata = Object.assign({}, this.data);
            cdata.code = code;
            delete cdata.error;
            error.stack += '\n' + JSON.stringify(cdata);
        }
        this.stack = error.stack;
        let str = this.toString();
        error.toString = () => str;
        this.destroy();
        return error;
    }
}
// make it throwable
module.exports = {
    SilentException: HttpException,
    HttpException: function HttpExceptionThrow(code, message, data) {
        throw new HttpException(code, message, data);
    },
    Exception: function ExceptionThrow(message, data) {
        throw new Exception(message, data);
    }
};