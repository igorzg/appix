'use strict';

describe('router', () => {

    class RouteRule {
        parseRequest() {}
        createUrl() {}
    }

    let di = require('../');
    let logger = {
        info: () => {
        }
    };
    let app = {
        getComponent: (key) => {
            if (key === 'appix/logger') {
                return logger;
            }
        }
    };

    let Router = di.mock('@{appix}/components/router', {
        'typed-js': di.load('typed-js'),
        '@{appix}/component': di.load('@{appix}/component'),
        '@{appix}/error': di.load('@{appix}/error'),
        '@{appix}/route-rule': RouteRule
    });
    let routerInstance;

    beforeEach(() => {
        routerInstance = new Router({}, app);
    });

    it('constructs', () => {

        spyOn(logger, 'info').and.callThrough();
        routerInstance = new Router({
            url: '/error',
            route: 'error/handler',
            errorRoute: 'error/handle',
            useCustomErrorHandler: true
        }, app);
        expect(logger.info).toHaveBeenCalled();
        routerInstance = new Router({
            url: '/error-1',
            route: 'test/handler',
            useCustomErrorHandler: true
        }, app);
        expect(routerInstance.error.route).toBe('test/handler');

        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        expect(routerInstance.error.route).toBe(undefined);

    });

    it('add', () => {
        let route = {
            url: '/home',
            route: 'home/index'
        };
        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        spyOn(logger, 'info').and.callThrough();
        routerInstance.add(route);
        expect(logger.info).toHaveBeenCalledWith('Router.add', new RouteRule(app, route));
        expect(routerInstance.routes.size).toBe(1);

        routerInstance.add([route, route]);
        expect(routerInstance.routes.size).toBe(3);

        let error;
        try {
            routerInstance.add('abc');
        } catch (e) {
            error = e;
        }
        expect(error.message).toBe('rule must be instance of RouteRule class');
        expect(error.code).toBe(500);

    });

    it('parseRequest error', (done) => {
        let route = {
            url: '/home',
            route: 'home/index'
        };
        spyOn(RouteRule.prototype, 'parseRequest').and.callThrough();
        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        routerInstance.add(route);

        return routerInstance
            .parseRequest('/home', 'GET', {})
            .catch((error) => {
                expect(error.message).toBe('Router.parseRequest: /home no route found, method: GET');
                expect(error.code).toBe(404);
                expect(RouteRule.prototype.parseRequest).toHaveBeenCalledWith('/home', 'GET', {});
            })
            .catch(fail)
            .then(done);
    });

    it('parseRequest', (done) => {
        let route = {
            url: '/home',
            route: 'home/index'
        };
        spyOn(RouteRule.prototype, 'parseRequest').and.callThrough();
        RouteRule.prototype.parseRequest = () => {
            return Promise.resolve(true);
        };
        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        routerInstance.add(route);

        return routerInstance
            .parseRequest('/home', 'GET')
            .then(data => expect(data).toBe(true))
            .catch(fail)
            .then(done);
    });

    it('createUrl', (done) => {
        let route = {
            url: '/home',
            route: 'home/index'
        };
        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        routerInstance.add(route);
        RouteRule.prototype.createUrl = () => {
            return Promise.resolve('/home');
        };
        return routerInstance
            .createUrl('home/index', {})
            .then(data => {
                expect(data).toBe('/home');
                done();
            })
            .catch(fail)
            .then(done);
    });

    it('createUrl error', (done) => {
        let route = {
            url: '/home',
            route: 'home/index'
        };
        spyOn(RouteRule.prototype, 'createUrl').and.callThrough();

        routerInstance = new Router({
            useCustomErrorHandler: false
        }, app);
        routerInstance.add(route);
        RouteRule.prototype.createUrl = () => {
            return Promise.resolve(false);
        };
        let params = new Map();
        params.set('q', 1);
        return routerInstance
            .createUrl('home/index', params)
            .then(data => expect(data).toBe('/home/index?q=1'))
            .catch(fail)
            .then(done);
    });

});