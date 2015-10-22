'use strict';

describe('bootstrap\n', () => {
    let di = require('../');
    let Type = di.load('typed-js');
    let fs = {
        readFileSync: () => {
            return new Buffer(`{
  "aliases": {
    "models": "@{appPath}/models",
    "views": "@{appPath}/views",
    "helpers": "@{appPath}/helpers"
  },
  "components": {
    "en/logger": {
      "enabled": false,
      "console": true,
      "level": 10
    },
    "en/router": {
      "useCustomErrorHandler": true
    }
  }
}`);
        }

    };
    let path = {};
    let Bootstrap = di.mock('@{en}/bootstrap', {
        '@{en}/component': Map,
        'fs': fs,
        'path': path,
        '@{en}/error': di.load('@{en}/error'),
        'typed-js': di.load('typed-js')
    });
    let bootstrap;
    it('construct', () => {
        bootstrap = new Bootstrap({
            appPath: __dirname + '/app'
        });
        expect(bootstrap.components).toEqual(new Map);
    });

    it('hasComponent', () => {
        var ctx = {
            components: {
                has:  () => {}
            }
        };
        spyOn(ctx.components, 'has').and.callThrough();
        bootstrap.hasComponent.call(ctx, 'key');
        expect(ctx.components.has).toHaveBeenCalled();
    });

    it('setComponent', () => {
        var ctx = {
            components: {
                set:  () => {}
            },
            hasComponent: () => false
        };
        spyOn(ctx.components, 'set').and.callThrough();
        class A extends Type{};
        bootstrap.setComponent.call(ctx, 'key', A);
        expect(ctx.components.set).toHaveBeenCalled();
    });

    it('getComponent', () => {
        var ctx = {
            components: {
                get: () => {}
            },
            hasComponent: () => true
        };
        spyOn(ctx.components, 'get').and.callThrough();
        bootstrap.getComponent.call(ctx, 'key');
        expect(ctx.components.get).toHaveBeenCalledWith('key');
    });

});