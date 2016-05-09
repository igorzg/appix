'use strict';

describe('bootstrap', () => {
    let di = require('../');
    let CP = di.load('@{appix}/component');
    let fs = {
        readFileSync: () => {
            return new Buffer(`{
  "aliases": {
    "models": "@{appPath}/models",
    "views": "@{appPath}/views",
    "helpers": "@{appPath}/helpers"
  },
  "components": {
    "appix/logger": {
      "enabled": false,
      "console": true,
      "level": 10
    },
    "appix/router": {
      "useCustomErrorHandler": true
    }
  }
}`);
        }

    };
    let path = {};
    let Bootstrap = di.mock('@{appix}/bootstrap', {
        '@{appix}/component': CP,
        'fs': fs,
        'path': path,
        '@{appix}/error': di.load('@{appix}/error'),
        '@{appix}/core': di.load('@{appix}/core'),
        'typed-js': di.load('typed-js')
    });
    let bootstrap;
    it('construct', () => {
        bootstrap = new Bootstrap({
            appPath: __dirname + '/app'
        });
        expect(bootstrap.components).toEqual(new Map);
    });

    it('listen', () => {
        bootstrap = new Bootstrap({
            appPath: __dirname + '/app'
        });
        let component = {
            startUp: () => {},
            fatal: () => {},
            info: () => {}
        };
        spyOn(component, 'startUp').and.callThrough();
        spyOn(component, 'fatal').and.callThrough();
        spyOn(component, 'info').and.callThrough();
        let ctx = {
            defaults: {},
            getComponent: ()  => {
                return component;
            }
        };
        bootstrap.listen.call(ctx);
        expect(component.startUp).toHaveBeenCalled();
        expect(component.info).toHaveBeenCalled();

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
        class A extends CP{};
        bootstrap.setComponent.call(ctx, 'key', A);
        expect(ctx.components.set).toHaveBeenCalled();
        bootstrap.setComponent('key', A);
        let m;
        try {
            bootstrap.setComponent('key', A);
        } catch (e) {
            m = e.message;
        }
        expect(m).toBe(`Component is already initialized`);
        try {
            bootstrap.setComponent('appix/loggeras', {});
        } catch (e) {
            m = e.message;
        }
        expect(m).toBe(`DI.load appix/loggeras => Error: Cannot find module 'appix/loggeras'`);

        try {
            bootstrap.setComponent('appix/loggeras', function() {});
        } catch (e) {
            m = e.message;
        }
        expect(m).toBe('Component must be inherited from {appix}/component');

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