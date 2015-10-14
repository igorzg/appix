'use strict';

let di = require('./di');
let Type = di.load('typed-js');
/**
 * @license Mit Licence 2015
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name Component
 *
 * @constructor
 * @description
 * In system all components are singleton objects
 */
class Component extends Type {
    constructor() {
        super({
            components: Type.OBJECT
        });
        this.components = new Map();
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#set
     * @param {String} key
     * @param {Object} val
     *
     * @description
     * Set component
     */
    set(key, val) {
        this.components.set(key, val);
        return this;
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#get
     * @param {String} key
     *
     * @description
     * Get component by key
     */
    get(key) {
        return this.components.get(key);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#delete
     * @param {String} key
     *
     * @description
     * Delete component by key
     */
    delete(key) {
        return this.components.delete(key);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#has
     * @param {String} key
     *
     * @description
     * Has component by key
     */
    has(key) {
        return this.components.has(key);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#forEach
     *
     * @description
     * Loop over components
     */
    forEach() {
        this.components.forEach.apply(this.components, arguments);
        return this;
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#size
     *
     * @description
     * Return component size
     */
    size() {
        return this.components.size;
    }

}

module.exports = Component;