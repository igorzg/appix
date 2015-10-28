'use strict';

let di = require('./di');
let Type = di.load('typed-js');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Filter
 *
 * @constructor
 * @description
 * This class is responsible for filters in application
 */
class Filter extends Type {

    constructor(config, types) {
        super(Object.assign({
            controller: Type.OBJECT,
            priority: Type.NUMBER,
            route: Type.STRING
        }, types));
        this.controller = config.controller;
        this.priority = config.priority;
        this.route = config.route;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
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
     * @author Igor Ivanovic
     * @function
     * @name Filter#afterEach
     *
     * @description
     * Apply after each function
     */
    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Filter;