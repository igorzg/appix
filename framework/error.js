'use strict';

let di = require('./di');
let core = di.load('@{appix}/core');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name Exception
 *
 * @constructor
 * @param {String} message
 * @param {Object} data
 *
 * @description
 * Exception
 */
class Exception extends Error {
    constructor(message, data) {
        super(message);
        this.stack += '\n\nDATA: ' + core.inspect(data, 5, true);
    }

    toString() {
        return this.stack;
    }
}
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name HttpException
 * @param {Number} code status code
 * @param {String} message
 * @param {Object} data
 * @constructor
 * @description
 * HttpException use it in controller actions
 */
class HttpException extends Exception {
    constructor(code, message, data) {
        super(message, data);
        this.stack += '\n\nCODE: ' + core.inspect(code, 5, true);
        this.code = code;
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