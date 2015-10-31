'use strict';

describe('logger', () => {
    let di = require('../');
    let Logger = di.load('@{appix}/components/logger');

    function log() {
    }

    it('construct', () => {
        var logInstance = new Logger();
        expect(logInstance.config).toEqual({
            enabled: false,
            console: false,
            inspectLevel: 5,
            level: 40
        });
        expect(logInstance.levels).toEqual([
            {
                name: 'TRACE',
                level: 10,
                call: console.info
            },
            {
                name: 'INFO',
                level: 20,
                call: console.info
            },
            {
                name: 'DEBUG',
                level: 30,
                call: console.log
            },
            {
                name: 'WARN',
                level: 40,
                call: console.warn
            },
            {
                name: 'ERROR',
                level: 50,
                call: console.error
            },
            {
                name: 'FATAL',
                level: 60,
                call: console.error
            }
        ]);
        expect(logInstance.hooks).toEqual(new Set);

        logInstance = new Logger({
            console: true,
            enabled: true
        });
        expect(logInstance.config).toEqual({
            enabled: true,
            console: true,
            inspectLevel: 5,
            level: 40
        });
        expect(logInstance.levels).toEqual([
            {
                name: 'TRACE',
                level: 10,
                call: console.info
            },
            {
                name: 'INFO',
                level: 20,
                call: console.info
            },
            {
                name: 'DEBUG',
                level: 30,
                call: console.log
            },
            {
                name: 'WARN',
                level: 40,
                call: console.warn
            },
            {
                name: 'ERROR',
                level: 50,
                call: console.error
            },
            {
                name: 'FATAL',
                level: 60,
                call: console.error
            }
        ]);
        expect(logInstance.hooks.size).toBe(6);
    });

    it('trace', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.trace.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 10);
    });

    it('info', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.info.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 20);
    });

    it('debug', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.debug.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 30);
    });

    it('warn', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.warn.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 40);
    });

    it('error', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.error.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 50);
    });

    it('fatal', () => {
        var m = 'message';
        var o = {};
        var ctx = {
            log: log
        };
        spyOn(ctx, 'log');
        var logInstance = new Logger();
        logInstance.fatal.call(ctx, m, o);
        expect(ctx.log).toHaveBeenCalledWith(m, o, 60);
    });

    it('getLevelName', () => {
        var logInstance = new Logger();

        //expect(logInstance.getLevelName(61)).toBe('FATAL');
        expect(logInstance.getLevelName(60)).toBe('FATAL');
        expect(logInstance.getLevelName(51)).toBe('TRACE');
        expect(logInstance.getLevelName(50)).toBe('ERROR');
        expect(logInstance.getLevelName(41)).toBe('TRACE');
        expect(logInstance.getLevelName(40)).toBe('WARN');
        expect(logInstance.getLevelName(31)).toBe('TRACE');
        expect(logInstance.getLevelName(30)).toBe('DEBUG');
        expect(logInstance.getLevelName(21)).toBe('TRACE');
        expect(logInstance.getLevelName(20)).toBe('INFO');
        expect(logInstance.getLevelName(11)).toBe('TRACE');
        expect(logInstance.getLevelName(10)).toBe('TRACE');
        expect(logInstance.getLevelName(9)).toBe('TRACE');
    });

    it('addHook error', () => {
        var logInstance = new Logger();
        let m;
        try {

            logInstance.addHook(1);
        } catch (e) {
            m = e.message;
        }
        expect(m).toBe('Logger hook must be function');
    });

    it('addHook', () => {
        let ctx = {
            hooks: new Set
        };
        function logHook() {

        }
        function* list(data) {
            for(let item of data) {
                yield item;
            }
        }
        var logInstance = new Logger();
        logInstance.addHook.call(ctx, logHook);
        expect(ctx.hooks.size).toBe(1);
        expect(list(ctx.hooks).next().value).toBe(logHook);
    });

    it('log', (done) => {
        let isDone = false;
        let ctx = {
            config: {
                enabled: true,
                inspectLevel: 5
            },
            hook: function hook(ldata) {
                expect(ldata.type).toBe('ERROR');
                expect(ctx.hook).toHaveBeenCalled();
                isDone = true;
                done();
            },
            getLevelName: function () {
                return 'ERROR';
            },
            hooks: []
        };
        let data = {};
        spyOn(ctx, 'hook').and.callThrough();
        ctx.hooks.push(ctx.hook);

        let logInstance = new Logger();
        logInstance.log.call(ctx, 'MESSAGE', data, 20);

        setTimeout(() => {
            if (!isDone) {
                fail('log test failed');
            }
            done();
        }, 200);
    });

});