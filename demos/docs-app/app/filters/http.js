'use strict';

let di = require('appix');
let Filter = di.load('@{appix}/filter');

class HttpFilter extends Filter {

    beforeEach() {
        let that = this;
        return di.async(function* () {
            let cache = that.controller.getComponent('cache');
            let cached = cache.get(that.controller.getRequestCacheKey());
            if (!!cached) {
                that.controller.stopChain();
                return cached;
            }
            return false;
        });
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