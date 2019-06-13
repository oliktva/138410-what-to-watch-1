import {Action as ReduxAction} from 'redux';
import {ThunkDispatch as ReduxThunkDispatch, ThunkAction as ReduxThunkAction} from 'redux-thunk';
import {AxiosResponse, AxiosInstance} from 'axios';
import {toCamel} from 'convert-keys';

import {GenreProps} from 'src/types/genres';
import {FilmProps} from 'src/types/films';
import {ReviewProps} from 'src/types/reviews';
import {ThunkDispatch, ThunkAction, State as AppState} from 'src/types/reducer';

export const SET_GENRE = `SET_GENRE`;
export const LOAD_FILMS_SUCCESS = `LOAD_FILMS_SUCCESS`;
export const LOAD_FAVORITE_SUCCESS = `LOAD_FAVORITE_SUCCESS`;
export const UPDATE_FILM = `UPDATE_FILM`;
export const LOAD_PROMO = `LOAD_PROMO`;
export const LOAD_REVIEWS = `LOAD_REVIEWS`;

const ALL_GENRES = `All genres`;

export interface State {
  genre: GenreProps;
  items: FilmProps[];
  favorite: FilmProps[];
  promo: FilmProps | null;
  reviews: {[key: number]: ReviewProps[]} | null;
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

interface LoadFilmPromoAction extends ReduxAction {
  type: typeof LOAD_PROMO;
  payload: FilmProps;
}

interface LoadReviewsAction extends ReduxAction {
  type: typeof LOAD_REVIEWS;
  payload: {id: number; reviews: ReviewProps[]};
}

export type Action =
  SetFilterAction | LoadFilmsAction | LoadFavoritesAction | UpdateFilmAction | LoadFilmPromoAction | LoadReviewsAction;

export type ThunkDispatch = ReduxThunkDispatch<State, AxiosInstance, Action>;
export type ThunkAction = ReduxThunkAction<Promise<void>, State, AxiosInstance, Action>;

export const initialState: State = {
  genre: ALL_GENRES,
  items: [],
  favorite: [],
  promo: null,
  reviews: null
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
  },

  loadPromo: (film: FilmProps): LoadFilmPromoAction => {
    return {
      type: LOAD_PROMO,
      payload: film
    };
  },

  loadReviews: (id: number, reviews: ReviewProps[]): LoadReviewsAction => {
    return {
      type: LOAD_REVIEWS,
      payload: {id, reviews}
    };
  }
};

export const Operation = {
  loadFilms: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/films`)
        .then((response: AxiosResponse<Record<string, any>[]>): void => {
          const data = response.data.map((f): FilmProps => toCamel<FilmProps>(f));

          dispatch(ActionCreator.loadFilms(data));
        });
    };
  },

  loadFavorite: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/favorite`)
        .then((response: AxiosResponse<Record<string, any>[]>): void => {
          const data = response.data.map((f): FilmProps => toCamel<FilmProps>(f));

          dispatch(ActionCreator.loadFavorite(data));
        });
    };
  },

  addToFavorites: (filmId: number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/favorite/${filmId}/1`)
        .then((response: AxiosResponse<Record<string, any>>): void => {
          const data = toCamel<FilmProps>(response.data);

          dispatch(ActionCreator.updateFilm(data));
        });
    };
  },

  removeFromFavorites: (filmId: number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/favorite/${filmId}/0`)
        .then((response: AxiosResponse<Record<string, any>>): void => {
          const data = toCamel<FilmProps>(response.data);

          dispatch(ActionCreator.updateFilm(data));
        });
    };
  },

  loadPromo: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/films/promo`)
        .then((response: AxiosResponse<Record<string, any>>): void => {
          const data = toCamel<FilmProps>(response.data);

          dispatch(ActionCreator.loadPromo(data));
        });
    };
  },

  loadReviews: (id: number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/comments/${id}`)
        .then((response: AxiosResponse<Record<string, any>[]>): void => {
          const data = response.data.map((r): ReviewProps => toCamel<ReviewProps>(r));

          dispatch(ActionCreator.loadReviews(id, data));
        });
    };
  },

  addReview: (id: number, reviewText: string, rating: string | number): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/comments/${id}`, {
        comment: reviewText,
        rating: typeof rating === `string` ? parseInt(rating, 10) : rating
      }).then((response: AxiosResponse<Record<string, any>[]>): void => {
        const data = response.data.map((r): ReviewProps => toCamel<ReviewProps>(r));

        dispatch(ActionCreator.loadReviews(id, data));
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

    case LOAD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorite: action.payload
      };

    case UPDATE_FILM:
      return {
        ...state,
        promo: state.promo ? updateFilm(action.payload, [state.promo])[0] : state.promo,
        items: updateFilm(action.payload, state.items),
        favorite: updateFilm(action.payload, state.favorite)
      };

    case LOAD_PROMO: {
      return {
        ...state,
        promo: action.payload
      };
    }

    case LOAD_REVIEWS: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.id]: action.payload.reviews
        }
      };
    }

    default:
      return state;
  }
};

export default reducer;
