// import { playTrack, loadYoutubeTrack } from './reducer';
// import createStore from './../../store/create';
// import * as request from './../../utils/request';
//
// describe('when playing a track', () => {
//     let store;
//     beforeEach(() => {
//         store = createStore();
//         request.requestGet = () => Promise.resolve({
//             items: [{
//                 id: { videoId: 'id42' },
//                 snippet: { title: 'myTitle' }
//             }]
//         });
//     });
//
//     it('should set its name and artist name as a bottom player state', (done) => {
//         store.subscribe(() => {
//             expect(store.getState().bottomPlayer.trackName).toEqual('myTrack');
//             done();
//         });
//         store.dispatch(playTrack('artistName', 'albumName', 'myTrack'));
//     }, 50);
//
//     it('should load a youtube video', (done) => {
//         store.subscribe(() => {
//             expect(store.getState().bottomPlayer.video.id).toEqual('id42');
//             done();
//         });
//         store.dispatch(loadYoutubeTrack('artistName', 'albumName', 'myTrack'));
//     }, 50);
// });
