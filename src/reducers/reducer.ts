import {combineReducers} from 'redux';
import filmsReducer, {State as FilmsState, initialState as filmsInitialState} from './films/films';
import namespaces from './namespaces';

export interface State {
  [namespaces.FILMS]: FilmsState;
}

export const initialState = {
  [namespaces.FILMS]: filmsInitialState
};

export default combineReducers<State>({
  [namespaces.FILMS]: filmsReducer
});
