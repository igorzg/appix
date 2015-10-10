'use strict';

let di = require('di-node');
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

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#entries
     *
     * @description
     * Returns a new Iterator object that contains an array of [key, value]
     * for each element in the Map object in insertion order.
     */
    entries() {
        return this.components.entries();
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#clear
     *
     * @description
     * Removes all key/value pairs from the components object.
     */
    clear() {
        this.components.clear();
        return this;
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#clear
     *
     * @description
     * Returns a new Iterator object that contains the keys for each
     * element in the components object in insertion order.
     */
    keys() {
        return this.components.keys();
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Component#values
     *
     * @description
     * Returns a new Iterator object that contains the values for each
     * element in the components object in insertion order.
     */
    values() {
        return this.components.values();
    }
}

module.exports = Component;