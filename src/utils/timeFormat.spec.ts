import formatTime from './timeFormat';

describe('Having a time in milliseconds', function () {
    it('formatting should return time on 00:00:00 format', function () {
        expect(formatTime((1 * 60 * 60) + (10 * 60) + (43))).toEqual('01:10:43');
    });
});