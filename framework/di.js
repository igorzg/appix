'use strict';

let diNode = require('di-node');
let Type = diNode.load('typed-js');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name DI
 *
 * @constructor
 * @description
 * Extend di implementation
 */
class DI extends Type {
    constructor() {
        super({
            aliases: Type.OBJECT,
            modules: Type.OBJECT,
            instances: Type.OBJECT
        });
        this.aliases = {};
        this.modules = {};
        this.instances = new Map();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name DI#uuid
     *
     * @description
     * Generate universally unique identifier
     */
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0;
            if (c === 'x') {
                return r.toString(16);
            }
            return (r & 0x3 | 0x8).toString(16);
        });
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name DI#setInstance
     * @param {String} key
     * @param {Object} value
     *
     * @description
     * Add instance of bootstraped version
     */
    setInstance(key, value) {
        if (!Type.isObject(value)) {
            throw new TypeError('value must object type', {key, value});
        }
        this.instances.set(key, value);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name DI#getInstance
     * @param {String} key
     *
     * @description
     * Return bootstraped instance
     */
    getInstance(key) {
        return this.instances.get(key);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name DI#mock
     * @param {String} file
     * @param {Object} mocks
     *
     * @description
     * Return module with mocked objects
     */
    mock(file, mocks) {
        let load = DI.prototype.load;

        DI.prototype.load = name => {
            if (!mocks.hasOwnProperty(name)) {
                throw new Error(`Missing module: ${name} in mocks`, {name, mocks});
            }
            return mocks[name];
        };

        try {
            // load module or exec if its function
            if (Type.isString(file)) {
                // do require
                return require(this.refreshModuleCache(file));
            } else if (Type.isFunction(file)) {
                return file();
            }
        } catch (e) {
            return e;
        } finally {
            DI.prototype.load = load;
        }
    }
}
// mixin extend prototype with actual DI
let diPrototype = Object.getPrototypeOf(diNode);
Object
    .getOwnPropertyNames(diPrototype)
    .forEach(k => {
        let exclude = ['mock', 'constructor'];
        if (exclude.indexOf(k) === -1) {
            DI.prototype[k] = diPrototype[k];
        }
    });
// Instantiate new di
let di = new DI();
// set Alias of easy node
di.setAlias('en', __dirname);
// export new di
module.exports = di;