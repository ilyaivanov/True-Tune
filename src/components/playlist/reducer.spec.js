// import reducer, { playNextTrack } from '../reducer';
//
//
// describe('Having a playlist reducer', function () {
//     let initialState;
//     beforeEach(function () {
//         initialState = {
//             selectedAlbum: {
//                 tracks: [
//                     { name: 'myTrack1' },
//                     { name: 'myTrack2' }]
//             },
//             currentTrackIndex: 0
//         };
//     });
//
//     describe('when selecting a next track', function () {
//         it('index should be incremented', function () {
//             let receivedState = reducer(initialState, playNextTrack());
//
//             expect(receivedState.currentTrackIndex).toEqual(1);
//         });
//
//         describe('calling play when current track is played', function () {
//             it('should do nothing', function () {
//                 let receivedState = reducer(initialState, playNextTrack());
//
//                 let anotherState = reducer(receivedState , playNextTrack());
//
//                 expect(anotherState).toBe(receivedState);
//             });
//         });
//     });
//
//
//
// });
