'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let fs = di.load('fs');
let path = di.load('path');
const COMPONENTS = [
    'en/logger',
    'en/router',
    'en/server'
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
            components: Type.OBJECT
        });
        this.components = new Map();
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
            throw new error.Exception('Config must be object type', appConfig);
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
            throw new error.Exception('appPath must be defined in configuration object', defaults);
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
            throw new error.Exception('Problem with loading file, do you have your environment file json in path: ', {
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
            let aliases = new Map(config.aliases);
            aliases.forEach((key, value) => di.setAlias(key, value));
        }

        if (!di.hasAlias('controllersPath')) {
            di.setAlias('controllersPath', defaults.controllersPath);
        }

        if (!di.hasAlias('modulesPath')) {
            di.setAlias('modulesPath', defaults.modulesPath);
        }

        if (!Type.isUndefined(config.components)) {
            if (!Type.isObject(config.components)) {
                throw new error.Exception('environment components must be object type', config.components);
            }
            let components = new Map(config.components);

            COMPONENTS.forEach(key => {
                if (components.has(key)) {
                    this.initializeComponent(key, components.get(key));
                    components.delete(key);
                } else {
                    this.initializeComponent(key, {});
                }
            });

            components.forEach((key, item) => this.initializeComponent(key, item));
        }

        let logger = this.getComponent('en/logger');
        let server = this.getComponent('en/server');
        let Request = di.load('@{en}/request');

        server.on('request', (request, response) => {
            di.setAlias('controllersPath', defaults.controllersPath);
            di.setAlias('modulesPath', defaults.modulesPath);
            let nRequest = new Request(this, {
                request,
                response
            }, request.url);
            nRequest.process();
            nRequest.onEnd(nRequest.destroy.bind(nRequest));
        });

        if (Type.isString(defaults.listenHost)) {
            server.listen(defaults.listenPort, defaults.listenHost);
        } else {
            server.listen(defaults.listenPort);
        }

        process.on('uncaughtException', function (error) {
            logger.fatal(error.message, {
                stack: error.stack,
                config: defaults
            });
            setTimeout(() => process.exit(1), 100);
        });

        logger.info('Listen server', defaults);
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
    initializeComponent(name, config) {
        try {
            let Component;
            if (Type.isString(config.filePath)) {
                Component = di.load(config.filePath);
            } else if (COMPONENTS.indexOf(name) > -1) {
                Component = di.load('@{en}/components/' + name.slice(3));
            } else {
                Component = di.load(name);
            }

            if (!Type.isFunction(Component)) {
                new error.Exception('Component must be function type');
            }

            let initialized = new Component(this, config);

            if (!(initialized instanceof Type)) {
                new error.Exception('Component must be inherited from typed-js');
            }

            this.setComponent(name, initialized);
        } catch (e) {
            throw new error.Exception('Component is not initialized', {
                name,
                config,
                stack: e.stack
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
        return this.components.set(key, val);
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
        return this.components.has(key);
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
        if (!this.hasComponent(key)) {
            throw new error.Exception('Component is not initialized', {
                key: key
            });
        }
        return this.components.get(key);
    }
}

module.exports = Bootstrap;