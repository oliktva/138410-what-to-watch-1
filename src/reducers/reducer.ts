import {combineReducers} from 'redux';
import filmsReducer, {State as FilmsState, initialState as filmsInitialState} from './films/films';
import Namespaces from './namespaces';

export interface State {
  [Namespaces.FILMS]: FilmsState;
}

export const initialState = {
  [Namespaces.FILMS]: filmsInitialState
};

export default combineReducers<State>({
  [Namespaces.FILMS]: filmsReducer
});
