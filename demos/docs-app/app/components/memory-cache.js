'use strict';

let di = require('appix');
let Component = di.load('@{appix}/component');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Cache
 * @constructor
 * @description
 * This is an example of cache class
 * @example
 *  "cache": {
 *      "filePath": "@{components}/memory-cache"
 *  }
 */
class Cache extends Component {
    /**
     * @since 1.0.0
     * @function
     * @name Cache#constructor
     *
     * @description
     * This is how you extend your component types
     * @example
     * constructor(config, bootstrap) {
     *   super(config, bootstrap);
     *   this.data = new Map();
     * }
     */
    constructor(config, bootstrap) {
        super(config, bootstrap);
        this.data = new Map();
    }
    /**
     * @since 1.0.0
     * @function
     * @name Cache#set
     *
     * @description
     * Set cache in memory
     */
    set(key, value) {
        this.data.set(key, value);
    }
    /**
     * @since 1.0.0
     * @function
     * @name Cache#get
     *
     * @description
     * Get cache from memory
     */
    get(key) {
        return this.data.get(key);
    }
}

module.exports = Cache;
