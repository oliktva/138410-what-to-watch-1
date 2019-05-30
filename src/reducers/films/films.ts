import {Action as ReduxAction} from 'redux';
import {ThunkDispatch as ReduxThunkDispatch, ThunkAction as ReduxThunkAction} from 'redux-thunk';
import {AxiosResponse, AxiosInstance} from 'axios';
import camelcaseKeys from 'camelcase-keys';

import {GenreProps} from 'src/types/genres';
import {FilmProps} from 'src/types/films';
import {ThunkDispatch, ThunkAction, State as AppState} from 'src/types/reducer';

export const SET_GENRE = `SET_GENRE`;
export const LOAD_FILMS_SUCCESS = `LOAD_FILMS_SUCCESS`;

const ALL_GENRES = `All genres`;

export interface State {
  genre: GenreProps;
  items: FilmProps[];
}

interface SetFilterAction extends ReduxAction {
  type: typeof SET_GENRE;
  payload: GenreProps;
}

interface LoadFilmsAction extends ReduxAction {
  type: typeof LOAD_FILMS_SUCCESS;
  payload: FilmProps[];
}

export type Action = SetFilterAction | LoadFilmsAction;

export type ThunkDispatch = ReduxThunkDispatch<State, AxiosInstance, Action>;
export type ThunkAction = ReduxThunkAction<Promise<void>, State, AxiosInstance, Action>;

export const initialState: State = {
  genre: ALL_GENRES,
  items: []
};

export const ActionCreator = {
  setFilterByGenre: (genre: GenreProps): SetFilterAction => {
    return {
      type: SET_GENRE,
      payload: genre
    };
  },

  loadFilms: (films: FilmProps[]): LoadFilmsAction => {
    return {
      type: LOAD_FILMS_SUCCESS,
      payload: films
    };
  }
};

export const Operation = {
  loadFilms: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/films`)
        .then((response: AxiosResponse): void => {
          const data = camelcaseKeys(response.data) as FilmProps[];

          dispatch(ActionCreator.loadFilms(data));
        });
    };
  }
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD_FILMS_SUCCESS:
      return {
        ...state,
        items: action.payload
      };

    case SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
