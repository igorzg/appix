'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let Component = di.load('@{en}/component');
let fs = di.load('fs');
let path = di.load('path');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Bootstrap
 *
 * @constructor
 * @description
 * This class is used for component delivery service and bootstraping application
 */
class Bootstrap extends Type {
    constructor() {
        super({
            component: Type.OBJECT
        });
        this.component = new Component();
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Bootstrap#bootstrap
     *
     * @description
     * Bootstrap application
     */
    bootstrap(appConfig) {

        if (!Type.isObject(appConfig)) {
            throw new TypeError('Config must be object type');
        }

        let config = Object.assign({
            appPath: null,
            envFile: 'env.json',
            envPath: null,
            listenHost: null,
            listenPort: 9000,
            controllersPath: '@{appPath}/controllers/',
            modulesPath: '@{appPath}/modules/'
        }, appConfig);

        if (!Type.isString(config.appPath)) {
            throw new TypeError('appPath must be defined in configuration object');
        }

        di.setAlias('appPath', config.appPath);

        if (!!config.envPath) {
            di.setAlias('envPath', config.envPath);
        } else {
            di.setAlias('envPath', config.appPath);
        }


    }

    /**
     * @since 1.0.0
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
     * @since 1.0.0
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