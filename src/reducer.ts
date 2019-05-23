import {GenreProps} from 'src/types/genres';
import {FilmProps} from 'src/types/films';

import {films} from 'src/mocks/films';

export const SET_GENRE = `SET_GENRE`;
export const LOAD_FILMS_SUCCESS = `LOAD_FILMS_SUCCESS`;

const ALL_GENRES = `All genres`;

export interface State {
  genre: GenreProps;
  films: FilmProps[];
}

interface SetFilterAction {
  type: typeof SET_GENRE;
  payload: GenreProps;
}

interface LoadFilmsAction {
  type: typeof LOAD_FILMS_SUCCESS;
  payload: FilmProps[];
}

export type Action = LoadFilmsAction | SetFilterAction;

const initialState: State = {
  genre: ALL_GENRES,
  films: []
};

export const ActionCreator = {
  setFilterByGenre: (genre: GenreProps): SetFilterAction => {
    return {
      type: SET_GENRE,
      payload: genre
    };
  },

  loadFilms: (): LoadFilmsAction => {
    return {
      type: LOAD_FILMS_SUCCESS,
      payload: films
    };
  }
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD_FILMS_SUCCESS:
      return {
        ...state,
        films: action.payload
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

