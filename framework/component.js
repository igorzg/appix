'use strict';

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
class Component {
    constructor(config, bootstrap) {}
}

module.exports = Component;
