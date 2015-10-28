'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let Filter = di.load('@{en}/filter');
let logger;
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Controller
 *
 * @constructor
 * @description
 * This class is responsible for processing application actions
 */
class Controller extends Type {
    constructor(api, types) {
        super(Object.assign({
            __request__: Type.OBJECT,
            __chaining__: Type.BOOLEAN,
            __filters__: Type.ARRAY
        }, types));
        this.__chaining__ = true;
        this.__request__ = api;
        this.__filters__ = [];
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getFiltersToApply
     *
     * @description
     * Get filters which should be applyd on current request
     */
    getFiltersToApply() {
        return this.__filters__.filter(item => {
            return item.route === '*' || item.route === that.__request__.route;
        }).sort((a, b) => {
            if (a.priority > b.priority) {
                return -1;
            } else if (a.priority < b.priority) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#applyBeforeEachFilters
     *
     * @description
     * ApplyBeforeEachFilters
     */
    applyBeforeEachFilters() {
        let filters = this.getFiltersToApply();
        return di.async(function* beforeFilter() {
            let action;
            for (let filter of filters) {
                action = yield filter.beforeEach(action);
            }
            return action;
        });
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#applyBeforeEachFilters
     *
     * @description
     * apply filters in order
     */
    applyAfterEachFilters(action) {
        let filters = this.getFiltersToApply();
        return di.async(function* afterFilter() {
            for (let filter of filters) {
                action = yield filter.afterEach(action);
            }
            return action;
        });
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#addFilter
     *
     * @description
     * Add filter
     */
    addFilter(FilterToInitialize, priority, route) {
        if (!Type.isNumber(priority)) {
            throw new error.HttpException(500, `Filter priority must be number type or defined ${priority}`);
        }
        let filter = new FilterToInitialize({
            controller: this,
            priority: priority,
            route: route | '*'
        });
        if (!(filter instanceof Filter)) {
            throw new error.HttpException(500, `Filter must be inherited from @{en}/filter`);
        }
        this.__filters__.push(filter);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#isChaining
     *
     * @description
     * Check if chain is enabled
     */
    isChaining() {
        return this.__chaining__;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#stopChain
     *
     * @description
     * Stop chain of actions
     */
    stopChain() {
        this.__chaining__ = false;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#beforeEach
     *
     * @description
     * before each request do some logic if needed
     */
    beforeEach() {
        return Promise.resolve(true);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#afterEach
     *
     * @description
     * after each request do some logic if needed
     */
    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Controller;