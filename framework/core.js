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
 * @since 1.0.0
 * @author Igor Ivanovic
 * @function
 * @name inspect
 *
 * @description
 * Inspect data output
 */
function inspect(data, level, withoutColors) {
    if (!Type.isNumber(level)) {
        level = 5;
    }
    if (Type.isObject(data)) {
        return util.inspect(data, {colors: !withoutColors, depth: level});
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
    inspect,
    clean
};