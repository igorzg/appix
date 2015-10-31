'use strict';

let di = require('../di');
let Type = di.load('typed-js');
let core = di.load('@{en}/core');
let error = di.load('@{en}/error');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Logger
 *
 * @constructor
 * @description
 * Logger is a component in easy node application.
 * Logger handler for easy node, there a various type of logs
 * [INFO, TRACE, DEBUG, WARN, ERROR, FATAL]
 * By default only ERROR and FATAL are enabled in production mode.
 * Logger in system is delivered as component
 * @example
 * let logger = new Logger();
 * logger.info('My message', dataObject);
 * logger.error('My message', dataObject);
 * logger.warn('My message', dataObject);
 * logger.trace('My message', dataObject);
 * logger.fatal('My message', dataObject);
 * logger.debug('My message', dataObject);
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
                call: console.log
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
            this.levels.forEach(item => this.addHook(log => {
                if (log.level === item.level)  {
                    item.call(log.prettify());
                }
            }));
        }
    }

    /**
     * @since 1.0.0
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
     * @since 1.0.0
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
     * @since 1.0.0
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
     * @since 1.0.0
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
     * @since 1.0.0
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
     * @since 1.0.0
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
     * @since 1.0.0
     * @function
     * @name Logger#getLevelName
     * @private
     * @description
     * Get level name
     * This is used internally by logger class
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
     * @since 1.0.0
     * @function
     * @name Logger#log
     * @private
     * @description
     * Write to file and exec hooks
     */
    log(message, data, level) {
        if (!this.config.enabled || level < this.config.level) {
            return false;
        }
        let configLevel = this.config.inspectLevel;
        let log = {
            level: level,
            type: this.getLevelName(level),
            message: message,
            data: data instanceof Error ? data.stack : data,
            created: new Date().toISOString(),
            prettify(clean) {

                let cLog = Logger.inspect({
                    level: this.level,
                    type: this.type,
                    message: this.message,
                    data: this.data,
                    created: this.created
                }, configLevel);

                if (!!clean) {
                    cLog = Logger.clean(cLog);
                }

                return cLog;
            },
            toString() {
                return JSON.stringify(this.prettify(true));
            }
        };

        for (let hook of this.hooks) {
            hook(log);
        }
    }

    /**
     * @since 1.0.0
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
     * @since 1.0.0
     * @function
     * @name Logger#clean
     * @param {String} message
     * @description
     * Clean inspect message
     * @return {String} message
     */
    static clean(message) {
        return core.clean(message);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Logger#inspect
     * @param {Object} data
     * @param {Number} level
     * @description
     * Inspect log data output
     */
    static inspect(data, level) {
        return core.inspect(data, level);
    }
}

module.exports = Logger;