'use strict';

describe('bootstrap', () => {
    let di = require('../');
    let fs = {};
    let path = {};
    let Bootstrap = di.mock('@{en}/bootstrap', {
        '@{en}/component': Map,
        'fs': fs,
        'path': path,
        'typed-js': di.load('typed-js')
    });
    let bootstrap;
    beforeEach(() =>  {
        bootstrap = new Bootstrap({});
    });
    it('construct', () => {
        bootstrap = new Bootstrap({});
        expect(bootstrap.components).toEqual([]);
        expect(bootstrap.component).toEqual(new Map());
    });

    it('bootstrap', () => {
        bootstrap = new Bootstrap({});

    });

    it('setComponent', () => {
        var ctx = {
            component: {
                set:  () => {}
            }
        };
        spyOn(ctx.component, 'set').and.callThrough();
        bootstrap.setComponent.call(ctx, 'key', 'val');
        expect(ctx.component.set).toHaveBeenCalledWith('key', 'val');
    });

    it('getComponent', () => {
        var ctx = {
            component: {
                get: () => {}
            }
        };
        spyOn(ctx.component, 'get').and.callThrough();
        bootstrap.getComponent.call(ctx, 'key');
        expect(ctx.component.get).toHaveBeenCalledWith('key');
    });

});