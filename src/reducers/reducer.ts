import {combineReducers} from 'redux';

import {State} from 'src/types/reducer';
import filmsReducer, {initialState as filmsInitialState} from './films/films';
import userReducer, {initialState as userInitialState} from './user/user';
import Namespaces from './namespaces';

export const initialState = {
  [Namespaces.FILMS]: filmsInitialState,
  [Namespaces.USER]: userInitialState
};

export default combineReducers<State>({
  [Namespaces.FILMS]: filmsReducer,
  [Namespaces.USER]: userReducer
});
