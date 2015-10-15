'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let Component = di.load('@{en}/component');
let fs = di.load('fs');
let path = di.load('path');
const COMPONENTS = [
    'en/logger',
    'en/router',
    'en/server',
    'en/request'
];
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
            component: Type.OBJECT,
            components: Type.ARRAY
        });
        this.components = [];
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

        let defaults = Object.assign({
            appPath: null,
            envFile: 'env.json',
            envPath: null,
            listenHost: null,
            listenPort: 9000,
            controllersPath: '@{appPath}/controllers/',
            modulesPath: '@{appPath}/modules/'
        }, appConfig);

        if (!Type.isString(defaults.appPath)) {
            throw new TypeError('appPath must be defined in configuration object');
        }

        di.setAlias('appPath', defaults.appPath);

        if (!!defaults.envPath) {
            di.setAlias('envPath', defaults.envPath);
        } else {
            di.setAlias('envPath', defaults.appPath);
        }

        // load file
        let fileBuffer;
        let envFile = di.normalize('@{envPath}/' + defaults.envFile);
        try {
            fileBuffer = fs.readFileSync(envFile);
        } catch (e) {
            let error = new Error('Problem with loading file, do you have your environment file json in path: ' + envFile);
            error.stack = e.stack;
            throw error;
        }
        // parse file
        let config;
        try {
            config = JSON.parse(fileBuffer.toString());
        } catch (e) {
            let error = new Error('Problem with parsing environment json file: ' + fileBuffer.toString());
            error.stack = e.stack;
            throw error;
        }

        if (Type.isArray(config)) {
            throw new TypeError('environment must be object type');
        }
        // set aliases
        if (Type.isArray(config.aliases)) {
            config.aliases.forEach(item => {
                if (Type.isString(item.key) && Type.isString(item.value)) {
                    di.setAlias(item.key, item.value);
                }
            });
        }

        if (!di.hasAlias('controllersPath')) {
            di.setAlias('controllersPath', defaults.controllersPath);
        }

        if (!di.hasAlias('modulesPath')) {
            di.setAlias('modulesPath', defaults.modulesPath);
        }

        if (Type.isArray(config.components)) {
            config.components.forEach(item => {
                if (Type.isString(item.name) && !this.hasComponent(item.name)) {
                    let component;
                    if (Type.isString(item.filePath)) {
                        component = di.load(item.filePath);
                    } else if (COMPONENTS.indexOf(item.name) > -1) {
                        component = di.load('@{en}/' + item.name.slice(3));
                    } else {
                        component = di.load(item.name);
                    }
                    this.components.push(component);
                }
            });
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
     * @name Bootstrap#hasComponent
     *
     * @description
     * Check if has component
     */
    hasComponent(key) {
        return this.component.has(key);
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