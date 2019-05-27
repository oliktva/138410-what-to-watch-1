import {FilmProps} from 'src/types/films';
import {GenreProps} from 'src/types/genres';

const ALL_GENRES = `All genres`;

export const getGenres = (films: FilmProps[]): GenreProps[] => {
  const filmsGenres = films.map((f: FilmProps): GenreProps => f.genre)
    .reduce((result: GenreProps[], genre: GenreProps): GenreProps[] => {
      if (!result.includes(genre)) {
        result.push(genre);
      }

      return result;
    }, []);

  return [ALL_GENRES, ...filmsGenres];
}

export const getFilmsByGenre = (films: FilmProps[], genre: GenreProps): FilmProps[] => {
  return genre === ALL_GENRES ?
    films :
    films.filter((f: FilmProps): boolean => f.genre === genre);
}