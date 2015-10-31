'use strict';

let di = require('./di');
let Type = di.load('typed-js');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Filter
 * @param {Bootstrap} bootstrap instance
 * @param {Object} config object
 * @param {Object} types extend current types while inheriting from filter
 * @constructor
 * @description
 * Controller filters. Filters are executed before and after controller process.
 * If you want to do etc. Http caching, Zipping output and similar stuff it's better to use filters.
 * Override beforeEach and afterEach function when needed
 * @example
 * let di = require('easy-node');
 * let Filter = di.load('@{en}/Filter');
 *
 * class Http extends Filter{
 *
 *      beforeEach() {
 *          let that = this;
 *          return di.async(function* gen() {
 *              let cache = yield cacheService.get('mykey');
 *              if (!!cache) {
 *                  that.stopChain();
 *                  return cache;
 *              }
 *              return false;
 *          });
 *      }
 *
 *      afterEach(output) {
 *          cacheService.set('key', output);
 *          return output;
 *      }
 * }
 */
class Filter extends Type {

    constructor(bootstrap, config, types) {
        super(Object.assign({
            controller: Type.OBJECT,
            priority: Type.NUMBER,
            route: Type.STRING
        }, types));
        let logger = bootstrap.getComponent('en/logger');
        logger.info('Add filter', {
            priority: config.priority,
            route: config.route
        });
        this.controller = config.controller;
        this.priority = config.priority;
        this.route = config.route;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Filter#beforeEach
     *
     * @description
     * Apply on each action
     */
    beforeEach() {
        return Promise.resolve(true);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Filter#afterEach
     *
     * @description
     * Apply after each function
     */
    afterEach(output) {
        return Promise.resolve(output);
    }
}

module.exports = Filter;