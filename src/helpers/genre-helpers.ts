import {FilmProps} from 'src/types/films';
import {GenreProps} from 'src/types/genres';

export const ALL_GENRES = `All genres`;

export const getGenresFilms = (films: FilmProps[], genre: GenreProps): FilmProps[] => {
  return genre === ALL_GENRES ?
    films :
    films.filter((f: FilmProps): boolean => f.genre === genre);
}
