'use strict';

describe('error', () => {
    let di = require('../');
    let error = di.load('@{appix}/error');

    it('should throw Exception', function throwException() {
        let m;
        try {
            new error.Exception('This is an test');
        } catch (e) {
            m = e.message;
        }
        expect(m).toBe('This is an test');
    });
});