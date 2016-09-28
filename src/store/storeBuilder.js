import createStore from './configureStore.prod';
import state from './../reducers/initialState';

export function createDefaultAppStore(){
    return createStore(state);
}

export function createDefaultAppStoreWithAlbums(albums){
    state.app.albums = albums
    return createStore(state);
}