'use strict';

let di = require('appix');
let Filter = di.load('@{appix}/filter');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name HttpFilter
 * @constructor
 * @description
 * Apply filter to some requests
 * @example
 * class HttpFilter extends Filter {
 *    beforeEach() {
 *      let cache = this.controller.getComponent('cache');
 *      let cached = cache.get(this.controller.getRequestCacheKey());
 *      if (!!cached) {
 *          this.controller.stopChain();
 *          return cached;
 *      }
 *      return false;
 *   }
 *
 *   afterEach(data) {
 *       let cache = this.controller.getComponent('cache');
 *       let logger = this.controller.getComponent('appix/logger');
 *       let key = this.controller.getRequestCacheKey();
 *       logger.info('Set.cache', {key: key});
 *       cache.set(key, data);
 *       return data;
 *   }
 * }
 */
class HttpFilter extends Filter {

    beforeEach() {
        let cache = this.controller.getComponent('cache');
        let cached = cache.get(this.controller.getRequestCacheKey());
        if (!!cached) {
            this.controller.stopChain();
            return cached;
        }
        return false;
    }

    afterEach(data) {
        let cache = this.controller.getComponent('cache');
        let logger = this.controller.getComponent('appix/logger');
        let key = this.controller.getRequestCacheKey();
        logger.info('Set.cache', {key: key});
        cache.set(key, data);
        return data;
    }
}

module.exports = HttpFilter;