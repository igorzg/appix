'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let fs = di.load('fs');
const COMPONENTS = [
    'en/logger',
    'en/router',
    'en/server'
];
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Bootstrap
 * @param {Object} appConfig
 * @param {Function} callback
 *
 * @constructor
 * @description
 * Use Bootstrap class to bootstrap an application.
 * It could be with server listen but it could be server side simulation to.
 * @example
 *    'use strict';
 *    let di = require('easy-node');
 *    let Bootstrap = di.load('@{en}/bootstrap');
 *    // bootstrap application
 *    let easyInit = new Bootstrap({
 *       listenPort: 9500,
 *       appPath:  __dirname + '/app'
 *    }, function dynamicComponentConfig(components) {
 *       components.set('my-component', {});
 *    });
 *
 *    di.setInstance('en-demo', easyInit);
 *
 *    let router = easyInit.getComponent('en/router');
 *
 *    router.add([
 *      {
 *        url: '/',
 *        route: 'app/Index'
 *      },
 *      {
 *        url: '/favicon.ico',
 *        route: 'home/Favicon'
 *      }
 *    ]);
 *
 *    easyInit.listen();
 */
class Bootstrap extends Type {

    constructor(appConfig, callback) {

        super({
            components: Type.OBJECT,
            defaults: Type.OBJECT
        });

        if (!Type.isObject(appConfig)) {
            throw new error.Exception('Config must be object type', appConfig);
        }

        this.components = new Map();
        this.defaults = Object.assign({
            appPath: null,
            envFile: 'env.json',
            envPath: null,
            listenHost: null,
            listenPort: 9000,
            controllersPath: '@{appPath}/controllers/',
            modulesPath: '@{appPath}/modules/'
        }, appConfig);

        if (!Type.isString(this.defaults.appPath)) {
            throw new error.Exception('appPath must be defined in configuration object', this.defaults);
        }

        di.setAlias('appPath', this.defaults.appPath);

        if (!!this.defaults.envPath) {
            di.setAlias('envPath', this.defaults.envPath);
        } else {
            di.setAlias('envPath', this.defaults.appPath);
        }

        // load file
        let fileBuffer;
        let envFile = di.normalize('@{envPath}/' + this.defaults.envFile);
        try {
            fileBuffer = fs.readFileSync(envFile);
        } catch (e) {
            throw new error.Exception(`Problem with loading file, do you have your environment file json in path: ${envFile}`, {
                envFile,
                stack: e.stack
            });
        }
        // parse file
        let config;
        try {
            config = JSON.parse(fileBuffer.toString());
        } catch (e) {
            throw new error.Exception('Problem with parsing environment json file: ', {
                file: fileBuffer.toString()
            });
        }

        if (Type.isArray(config)) {
            throw new error.Exception('environment must be object type', config);
        }
        // set aliases
        if (!Type.isUndefined(config.aliases)) {
            if (!Type.isObject(config.aliases)) {
                throw new error.Exception('environment aliases must be object type', config.aliases);
            }
            let aliases = new Map();
            Object.keys(config.aliases).forEach(key => aliases.set(key, config.aliases[key]));
            aliases.forEach((key, value) => di.setAlias(key, value));
        }

        if (!di.hasAlias('controllersPath')) {
            di.setAlias('controllersPath', this.defaults.controllersPath);
        }

        if (!di.hasAlias('modulesPath')) {
            di.setAlias('modulesPath', this.defaults.modulesPath);
        }

        if (!Type.isUndefined(config.components)) {
            if (!Type.isObject(config.components)) {
                throw new error.Exception('environment components must be object type', config.components);
            }
            let components = new Map();

            if (Type.isFunction(callback)) {
                callback(components);
            }

            Object.keys(config.components).forEach(key => {
                if (components.has(key)) {
                    throw new error.Exception('redeclaring component is not allowed', {
                        key,
                        config: config.components[key]
                    });
                }
                components.set(key, config.components[key]);
            });

            COMPONENTS.forEach(key => {
                if (components.has(key) && !this.hasComponent(key)) {
                    this.setComponent(key, components.get(key));
                    components.delete(key);
                } else if (!this.hasComponent(key)) {
                    this.setComponent(key, {});
                }
            });

            components.forEach((item, key) => this.setComponent(key, item));
        }
    }

    /**
     * @since 1.0.0
     * @function
     * @name Bootstrap#listen
     *
     * @description
     * Listen server
     */
    listen() {
        let logger = this.getComponent('en/logger');
        let server = this.getComponent('en/server');

        let Request = di.load('@{en}/request');

        server.on('request', (request, response) => {
            di.setAlias('controllersPath', this.defaults.controllersPath);
            di.setAlias('modulesPath', this.defaults.modulesPath);
            let nRequest = new Request(this, {
                request,
                response
            }, request.url);
            nRequest.process();
        });

        if (Type.isString(this.defaults.listenHost)) {
            server.listen(this.defaults.listenPort, this.defaults.listenHost);
        } else {
            server.listen(this.defaults.listenPort);
        }

        process.on('uncaughtException', error => {
            logger.fatal(error.message, {
                stack: error.stack,
                config: this.defaults
            });
            setTimeout(() => process.exit(1), 100);
        });

        logger.info('Listen server', this.defaults);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Bootstrap#setComponent
     * @param {String} key
     * @param {Object} config of component
     *
     * @description
     * Set component
     */
    setComponent(key, config) {
        let Component = config;
        if (this.hasComponent(key)) {
            throw new error.Exception('Component is already initialized', {
                name: key,
                config
            });
        }

        if (Type.isString(config.filePath)) {
            Component = di.load(config.filePath);
        } else if (COMPONENTS.indexOf(key) > -1) {
            Component = di.load('@{en}/components/' + key.slice(3));
        } else if (!Type.isFunction(config)) {
            Component = di.load(key);
        }

        if (!Type.isFunction(Component)) {
            throw new error.Exception('Component must be function type');
        }

        let initialized = new Component(config, this);

        if (!(initialized instanceof Type)) {
            throw new error.Exception('Component must be inherited from typed-js');
        }

        this.components.set(key, initialized);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Bootstrap#hasComponent
     * @param {String} key
     *
     * @description
     * Check if has component
     */
    hasComponent(key) {
        return this.components.has(key);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Bootstrap#getComponent
     * @param {String} key
     *
     * @description
     * Get component
     */
    getComponent(key) {
        if (!this.hasComponent(key)) {
            throw new error.Exception('Component is not initialized', {
                key: key
            });
        }
        return this.components.get(key);
    }
}

module.exports = Bootstrap;