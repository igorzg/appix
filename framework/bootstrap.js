'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let Component = di.load('@{en}/component');
/**
 * @license Mit Licence 2015
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name Bootstrap
 *
 * @constructor
 * @description
 * This class is used for component delivery service and bootstraping application
 */
class Bootstrap extends Type {
    constructor(config) {
        super({
            listenPort: Type.NUMBER,
            listenHost: Type.STRING,
            initialized: Type.BOOLEAN,
            component: Type.OBJECT
        });
        if (!Type.isObject(config)) {
            config = {};
        }
        this.initialized = false;
        this.listenPort = config.listenPort || 9000;
        this.listenHost = config.listenHost;
        this.component = new Component();
    }
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Bootstrap#setComponent
     *
     * @description
     * Set component
     */
    setComponent(key, val) {
        return this.component.set(key, val);
    }
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Bootstrap#getComponent
     *
     * @description
     * Get component
     */
    getComponent(key) {
        return this.component.get(key);
    }
}

module.exports = Bootstrap;