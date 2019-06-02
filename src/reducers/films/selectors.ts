import {createSelector} from 'reselect';

import Namespaces from 'src/reducers/namespaces';

import {State} from 'src/types/reducer';
import {FilmProps} from 'src/types/films';
import {GenreProps} from 'src/types/genres';

const ALL_GENRES = `All genres`;

export const getFilms = (state: State): FilmProps[] => {
  return state[Namespaces.FILMS].items;
};

export const getGenre = (state: State): GenreProps => {
  return state[Namespaces.FILMS].genre;
};

export const getFilmsByGenre = createSelector(
  getFilms,
  getGenre,
  (films: FilmProps[], genre: GenreProps): FilmProps[] => {
    return genre === ALL_GENRES ?
      films :
      films.filter((f: FilmProps): boolean => f.genre === genre);
  }
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
