import {createSelector} from 'reselect';

import Namespaces from 'src/reducers/namespaces';

import {State} from 'src/types/reducer';
import {FilmProps, ReviewProps} from 'src/types/films';
import {GenreProps} from 'src/types/genres';
import {ALL_GENRES, getGenresFilms} from 'src/helpers/genre-helpers';

export const getFilms = (state: State): FilmProps[] => {
  return state[Namespaces.FILMS].items;
};

export const getGenre = (state: State): GenreProps => {
  return state[Namespaces.FILMS].genre;
};

export const getFavorite = (state: State): FilmProps[] => {
  return state[Namespaces.FILMS].favorite;
};

export const getPromoFilm = (state: State): FilmProps | null => {
  return state[Namespaces.FILMS].promo;
};

export const getFilm = (state: State, id: number | string): FilmProps | null => {
  const allFilms = state[Namespaces.FILMS].items;

  return allFilms.find((f: FilmProps): boolean => f.id.toString() === id) || null;
};

export const getReviews = (state: State, id: number | string): ReviewProps[] => {
  const allReviews = state[Namespaces.FILMS].reviews;

  if (allReviews) {
    const idKey = typeof id === `string` ? parseInt(id) : id;
    return allReviews[idKey] || [];
  }

  return [];
};

export const getFilmsByGenre = createSelector(
  getFilms,
  getGenre,
  getGenresFilms
);

export const getGenres = createSelector(
  getFilms,
  (films: FilmProps[]): GenreProps[] => {
    const filmsGenres = films.map((f: FilmProps): GenreProps => f.genre)
      .reduce((result: GenreProps[], genre: GenreProps): GenreProps[] => {
        if (!result.includes(genre)) {
          result.push(genre);
        }

        return result;
      }, []);

    return [ALL_GENRES, ...filmsGenres];
  }
);
