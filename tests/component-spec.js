'use strict';

describe('component', () => {
    let di = require('../');
    let Component = di.load('@{en}/component');
    var componentInstance;
    beforeEach(function () {
        componentInstance = new Component();
    });
    it('construct', () => {

        expect(componentInstance.components).toEqual(new Map);
    });

    it('set', () => {
        var ctx = {
            components: {
                set: function () {}
            }
        };
        spyOn(ctx.components, 'set').and.callThrough();
        componentInstance.set.call(ctx, 'key', 'val');
        expect(ctx.components.set).toHaveBeenCalledWith('key', 'val');
    });

    it('get', () => {
        var ctx = {
            components: {
                get: function () {}
            }
        };
        spyOn(ctx.components, 'get').and.callThrough();
        componentInstance.get.call(ctx, 'key');
        expect(ctx.components.get).toHaveBeenCalledWith('key');
    });

    it('has', () => {
        var ctx = {
            components: {
                has: function () {}
            }
        };
        spyOn(ctx.components, 'has').and.callThrough();
        componentInstance.has.call(ctx, 'key');
        expect(ctx.components.has).toHaveBeenCalledWith('key');
    });

    it('delete', () => {
        var ctx = {
            components: {
                delete: function () {}
            }
        };
        spyOn(ctx.components, 'delete').and.callThrough();
        componentInstance.delete.call(ctx, 'key');
        expect(ctx.components.delete).toHaveBeenCalledWith('key');
    });

    it('delete', () => {
        var ctx = {
            components: {
                forEach: function () {}
            }
        };
        var func = () => {};
        spyOn(ctx.components, 'forEach').and.callThrough();
        componentInstance.forEach.call(ctx, func);
        expect(ctx.components.forEach).toHaveBeenCalledWith(func);
    });

    it('size', () => {
        var ctx = {
            components: {
                size: 1
            }
        };
        expect(componentInstance.size.call(ctx)).toBe(1);
    });

    it('entries', () => {
        var ctx = {
            components: {
                entries: function () {}
            }
        };
        spyOn(ctx.components, 'entries').and.callThrough();
        componentInstance.entries.call(ctx);
        expect(ctx.components.entries).toHaveBeenCalled();
    });

    it('clear', () => {
        var ctx = {
            components: {
                clear: function () {}
            }
        };
        spyOn(ctx.components, 'clear').and.callThrough();
        componentInstance.clear.call(ctx);
        expect(ctx.components.clear).toHaveBeenCalled();
    });

    it('keys', () => {
        var ctx = {
            components: {
                keys: function () {}
            }
        };
        spyOn(ctx.components, 'keys').and.callThrough();
        componentInstance.keys.call(ctx);
        expect(ctx.components.keys).toHaveBeenCalled();
    });

    it('values', () => {
        var ctx = {
            components: {
                values: function () {}
            }
        };
        spyOn(ctx.components, 'values').and.callThrough();
        componentInstance.values.call(ctx);
        expect(ctx.components.values).toHaveBeenCalled();
    });
});