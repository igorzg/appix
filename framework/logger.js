'use strict';

let di = require('di-node');
let Type = di.load('typed-js');
let core = di.load('@{en}/core');
let util = di.load('util');
let error = di.load('@{en}/error');
// cleanups on inspect
let replace = [];
// remove colors from inspect
for (var i = 0; i < 100; ++i) {
    replace.push(new RegExp('\\[' + i + 'm', 'ig'));
}
/**
 * @license Mit Licence 2015
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name Logger
 *
 * @constructor
 * @description
 * Logger handler for easy node
 */
class Logger extends Type {
    constructor(config) {
        super({
            config: Type.OBJECT,
            hooks: Type.OBJECT,
            levels: Type.ARRAY
        });
        if (!Type.isObject(config)) {
            config = {};
        }
        this.hooks = new Set();
        this.levels = [
            {
                name: 'TRACE',
                level: 10,
                call: console.info
            },
            {
                name: 'INFO',
                level: 20,
                call: console.info
            },
            {
                name: 'DEBUG',
                level: 30,
                call: console.info
            },
            {
                name: 'WARN',
                level: 40,
                call: console.warn
            },
            {
                name: 'ERROR',
                level: 50,
                call: console.error
            },
            {
                name: 'FATAL',
                level: 60,
                call: console.error
            }
        ];

        this.config = Object.assign({
            enabled: false,
            console: false,
            inspectLevel: 5,
            level: 40
        }, config);

        if (this.config.console) {
            this.levels.forEach(item => {
                this.addHook(function write(log) {
                    item.call(item.name, JSON.stringify(log));
                });
            });
        }
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#trace
     *
     * @description
     * Trace
     */
    trace(message, data) {
        return this.log(message, data, 10);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#info
     *
     * @description
     * Log info case
     */
    info(message, data) {
        return this.log(message, data, 20);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#debug
     *
     * @description
     * Debug
     */
    debug(message, data) {
        return this.log(message, data, 30);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#warn
     *
     * @description
     * Log warn case
     */
    warn(message, data) {
        return this.log(message, data, 40);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#error
     *
     * @description
     * Log error case
     */
    error(message, data) {
        return this.log(message, data, 50);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#fatal
     *
     * @description
     * Fatal error
     */
    fatal(message, data) {
        return this.log(message, data, 60);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#getLevelName
     *
     * @description
     * Get level name
     */
    getLevelName(level) {
        let logLevel = this.levels.find(item => {
            return item.level === level;
        });
        if (Type.isObject(logLevel)) {
            return logLevel.name;
        }
        return 'TRACE';
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#log
     *
     * @description
     * Write to file and exec hooks
     */
    log(message, data, level) {
        if (!this.config.enabled) {
            return false;
        }
        process.nextTick(() => {
            let log = {
                level: level,
                type: this.getLevelName(level),
                message: message,
                trace: core.traceCall(),
                stack: core.traceStack(),
                data: Logger.inspect(data, this.config.inspectLevel),
                created: new Date().toISOString(),
                toString() {
                    this.data = Logger.clean(this.data);
                    return JSON.stringify(this);
                }
            };

            for (let hook of this.hooks) {
                process.nextTick(() => {
                    hook(log);
                });
            }
        });

    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Logger#addHook
     * @param {Function} callback
     *
     * @description
     * Add hook to log output so developer can extend where to store log
     */
    addHook(callback) {
        if (!Type.isFunction(callback)) {
            throw new error.Exception('Logger hook must be function');
        }
        this.hooks.add(callback);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#clean
     *
     * @description
     * Clean message for write
     * @return {String} message
     */
    static clean(message) {
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
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Logger#inspect
     *
     * @description
     * Inspect log data output
     */
    static inspect(data, level) {
        if (!Type.isNumber(level)) {
            level = 5;
        }
        if (Type.isObject(data)) {
            return util.inspect(data, {colors: true, depth: level});
        }
        return data;
    }
}

module.exports = Logger;