'use strict';

let di = require('./di');
let util = di.load('util');
// cleanups on inspect
let replace = [];
// remove colors from inspect
for (var i = 0; i < 100; ++i) {
    replace.push(new RegExp('\\[' + i + 'm', 'ig'));
}

/**
 * Internal is number
 * @param value
 * @returns {boolean}
 * @private
 */
function _isNumber(value) {
    return typeof value === 'number';
}

/**
 * @since 1.0.0
 * @function
 * @name inspect
 * @param {Object} data
 * @param {Number} level
 * @param {Boolean} withoutColors
 *
 * @description
 * Inspect data output
 */
function inspect(data, level, withoutColors) {
    if (!isNumber(level)) {
        level = 5;
    }
    if (isObject(data)) {
        return util.inspect(data, {colors: !withoutColors, depth: level});
    }
    return data;
}
/**
 * @since 1.0.0
 * @function
 * @name clean
 * @param {String} message
 *
 * @description
 * Clean inspected message
 * @return {String}
 */
function clean(message) {
    if (isString(message)) {
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
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isBoolean
 *
 * @description
 * Check if value is boolean
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isUndefined
 *
 * @description
 * Check if value is un-defined
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isString
 *
 * @description
 * Check if value is string
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isNumber
 *
 * @description
 * Check if value is isNumber
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isArray
 *
 * @description
 * Check if value is array
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isNull
 *
 * @description
 * Check if value is funciton
 */
function isNull(value) {
    return value === null;
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isFunction
 *
 * @description
 * Check if value is funciton
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isArray
 *
 * @description
 * Check if value is array
 */
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isRegExp
 *
 * @description
 * Check if object is an regular expression
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isObject
 *
 * @description
 * Check if value is object
 */
function isObject(value) {
    return !isNull(value) && typeof value === 'object';
}

/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isInitialized
 *
 * @description
 * Check if value is object
 */
function isInitialized(value) {
    return !isNull(value) && !isUndefined(value);
}
/**
 * @since 0.0.1
 * @author Igor Ivanovic
 * @function
 * @name isEqual
 *
 * @description
 * Check if two objects are equal
 */
function isEqual(a, b) {
    if (isString(a)) {
        return a === b;
    } else if (_isNumber(a)) {
        if (isNaN(a) || isNaN(b)) {
            return isNaN(a) === isNaN(b);
        }
        return a === b;
    } else if (isBoolean(a)) {
        return a === b;
    } else if (isDate(a)) {
        return a.getTime() === b.getTime();
    } else if (isRegExp(a)) {
        return a.source === b.source;
    } else if (isArray(a) && isArray(b)) {

        // check references first
        if (a === b) {
            return true;
        }

        try {
            if (a.length !== b.length) {
                return false;
            }
            return a.every((item, index) => isEqual(item, b[index]));
        } catch (e) {
            throw e;
        }
    } else if (isObject(a) && isObject(b)) {
        var equal = [];
        // check references first

        if (a === b) {
            return true;
        }

        try {
            if (Object.keys(a).length === Object.keys(b).length) {
                Object.keys(a).forEach(key => equal.push(isEqual(a[key], b[key])));
            }
        } catch (e) {
            throw e;
        }

        if (equal.length === 0) {
            return false;
        }
        return equal.every((item) => item === true);
        /// compare undefined and nulls
    } else if (a === b) {
        return true;
    }

    return false;
}
/**
 * Exports
 * @type {{traceCall: traceCall, traceStack: traceStack}}
 */
module.exports = {
    inspect,
    clean,
    isBoolean,
    isUndefined,
    isString,
    isNumber,
    isArray,
    isNull,
    isFunction,
    isDate,
    isRegExp,
    isObject,
    isInitialized,
    isEqual
};
