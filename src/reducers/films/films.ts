import {Action as ReduxAction} from 'redux';
import {ThunkDispatch as ReduxThunkDispatch, ThunkAction as ReduxThunkAction} from 'redux-thunk';
import {AxiosResponse, AxiosInstance} from 'axios';
import camelcaseKeys from 'camelcase-keys';

import {GenreProps} from 'src/types/genres';
import {FilmProps} from 'src/types/films';
import {ThunkDispatch, ThunkAction, State as AppState} from 'src/types/reducer';

export const SET_GENRE = `SET_GENRE`;
export const LOAD_FILMS_SUCCESS = `LOAD_FILMS_SUCCESS`;
export const LOAD_FAVORITE_SUCCESS = `LOAD_FAVORITE_SUCCESS`;
export const UPDATE_FILM = `UPDATE_FILM`;

const ALL_GENRES = `All genres`;

export interface State {
  genre: GenreProps;
  items: FilmProps[];
  favorite: FilmProps[];
}

interface SetFilterAction extends ReduxAction {
  type: typeof SET_GENRE;
  payload: GenreProps;
}

interface LoadFilmsAction extends ReduxAction {
  type: typeof LOAD_FILMS_SUCCESS;
  payload: FilmProps[];
}

interface LoadFavoritesAction extends ReduxAction {
  type: typeof LOAD_FAVORITE_SUCCESS;
  payload: FilmProps[];
}

interface UpdateFilmAction extends ReduxAction {
  type: typeof UPDATE_FILM;
  payload: FilmProps;
}

export type Action = SetFilterAction | LoadFilmsAction | LoadFavoritesAction | UpdateFilmAction;

export type ThunkDispatch = ReduxThunkDispatch<State, AxiosInstance, Action>;
export type ThunkAction = ReduxThunkAction<Promise<void>, State, AxiosInstance, Action>;

export const initialState: State = {
  genre: ALL_GENRES,
  items: [],
  favorite: []
};

const updateFilm = (film: FilmProps, filmsList: FilmProps[]): FilmProps[] =>
  filmsList.map((f: FilmProps): FilmProps => (f.id === film.id ? film : f));

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
  },

  loadFavorite: (films: FilmProps[]): LoadFavoritesAction => {
    return {
      type: LOAD_FAVORITE_SUCCESS,
      payload: films
    };
  },

  updateFilm: (film: FilmProps): UpdateFilmAction => {
    return {
      type: UPDATE_FILM,
      payload: film
    };
  }
};

export const Operation = {
  loadFilms: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/films`)
        .then((response: AxiosResponse<FilmProps[]>): void => {
          const data = camelcaseKeys(response.data) as FilmProps[];

          dispatch(ActionCreator.loadFilms(data));
        });
    };
  },

  loadFavorite: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/favorite`)
        .then((response: AxiosResponse<FilmProps[]>): void => {
          const data = camelcaseKeys(response.data) as FilmProps[];

          dispatch(ActionCreator.loadFavorite(data));
        });
    };
  },

  addToFavorites: (filmId: number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/favorite/${filmId}/1`)
        .then((response: AxiosResponse<FilmProps>): void => {
          const data = camelcaseKeys(response.data) as FilmProps;

          dispatch(ActionCreator.updateFilm(data));
        });
    };
  },

  removeFromFavorites: (filmId: number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/favorite/${filmId}/0`)
        .then((response: AxiosResponse<FilmProps>): void => {
          const data = camelcaseKeys(response.data) as FilmProps;

          dispatch(ActionCreator.updateFilm(data));
        });
    };
  },
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

    case LOAD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorite: action.payload
      };

    case UPDATE_FILM:
      return {
        ...state,
        items: updateFilm(action.payload, state.items),
        favorite: updateFilm(action.payload, state.favorite)
      };

    default:
      return state;
  }
};

export default reducer;
