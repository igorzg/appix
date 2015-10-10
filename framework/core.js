'use strict';

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
 * Exports
 * @type {{traceCall: traceCall, traceStack: traceStack}}
 */
module.exports = {
    traceCall,
    traceStack
};