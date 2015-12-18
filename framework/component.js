'use strict';

let di = require('./di');
let Type = di.load('typed-js');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Component
 *
 * @constructor
 * @description
 * Each component must be extended from Component class.
 * This class is mostly used as interface
 * @example
 * // env.json
 * {
 *  "components": {
 *     "appix/logger": {
 *       "enabled": true,
 *       "console": true,
 *       "level": 30
 *     }
 *  }
 * }
 * // logger.js
 * class Logger extends Component {
 *
 * }
 */
class Component extends Type {
    constructor(config, bootstrap, types) {
        super(Object.assign({}, types));
    }
}

module.exports = Component;
