import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import search from './../search/reducer';
import favorites from './../favotires/reducer';


const rootReducer = combineReducers({
    favorites,
    search
});

export default function (initialState = undefined) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
