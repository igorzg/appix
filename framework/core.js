'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let util = di.load('util');
// cleanups on inspect
let replace = [];
// remove colors from inspect
for (var i = 0; i < 100; ++i) {
    replace.push(new RegExp('\\[' + i + 'm', 'ig'));
}
/**
 * @function
 * @name traceCall
 *
 * @description
 * Function trace call
 *
 * @returns {String}
 */
function traceCall() {
    return (new Error()).stack.split('\n').slice(3, 4).shift().trim();
}
/**
 * @function
 * @name traceStack
 *
 * @description
 * Function trace stack
 *
 * @returns {Array}
 */
function traceStack() {
    let error = (new Error()).stack.split('\n');
    error.splice(0, 2);
    return error.map(item => item.trim());
}
/**
 * @since 1.0.0
 * @author Igor Ivanovic
 * @function
 * @name inspect
 *
 * @description
 * Inspect data output
 */
function inspect(data, level) {
    if (!Type.isNumber(level)) {
        level = 5;
    }
    if (Type.isObject(data)) {
        return util.inspect(data, {colors: true, depth: level});
    }
    return data;
}
/**
 * @since 1.0.0
 * @author Igor Ivanovic
 * @function
 * @name clean
 *
 * @description
 * Clean message for write
 * @return {String} message
 */
function clean(message) {
    if (Type.isString(message)) {
        replace.forEach(value => {
            message = message.replace(value, '');
        });
        message = message.replace(/\\'/g, '\'');
        message = message.replace(/\\n/g, '\n');
        return message.replace(/\\u001b/g, '\u001b');
    }
    return message;
}
/**
 * Exports
 * @type {{traceCall: traceCall, traceStack: traceStack}}
 */
module.exports = {
    traceCall,
    traceStack,
    inspect,
    clean
};