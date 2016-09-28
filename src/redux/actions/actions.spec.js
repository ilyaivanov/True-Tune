import * as requestStub from './../../utils/request';
import {searchForAlbums} from './fuelSavingsActions';

/* eslint-disable */
requestStub.requestGet = () =>
    new Promise(resolve => resolve({
        topalbums: {album: []}
    }));
/* eslint-enable */


describe('Having a albums search action', function () {
    it('dispatch should be called', function (done) {
        let dispatchSpy = jasmine.createSpy('dispatch');

        searchForAlbums('Asura')(dispatchSpy).then(() => {
            expect(dispatchSpy).toHaveBeenCalled();
            done();
        }, function (error) {
            fail(error);
            done();
        });
    });
});


