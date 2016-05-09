'use strict';

let di = require('appix');
let Controller = di.load('@{appix}/controller');
let HttpFilter = di.load('@{filters}/http');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name CoreController
 * @constructor
 * @description
 * All app controllers are inherited from core controller
 * @example
 * class CoreController extends Controller {
 *   constructor(api) {
 *      super(api);
 *       this.addFilter(HttpFilter, 10, '*');
 *       this.locals = {
 *           template: name => {
 *               return di.normalize('@{views}/' + name + '.twig');
 *           }
 *       };
 *   }
 * }
 */
class CoreController extends Controller {

    constructor(api) {
        super(api);
        this.addFilter(HttpFilter, 10, '*');
        this.locals = {
            template: name => {
                return di.normalize('@{views}/' + name + '.twig');
            }
        };
    }
    /**
     * @since 1.0.0
     * @function
     * @name AppController#getRequestCacheKey
     *
     * @description
     * Get the cache key
     */
    getRequestCacheKey() {
        return this.getPathname() + this.getMethod() + JSON.stringify(this.getParams());
    }
}

module.exports = CoreController;
