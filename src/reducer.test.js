import {ActionCreator, SET_GENRE, LOAD_FILMS_SUCCESS} from './reducer';

const genre = `Drama`;

describe(`ActionCreator`, () => {
  it(`setFilterByGenre`, () => {
    expect(ActionCreator.setFilterByGenre(genre)).toEqual({
      type: SET_GENRE,
      payload: genre
    });
  });

  it(`loadFilms`, () => {
    const filmAction = ActionCreator.loadFilms();

    expect(filmAction.type).toEqual(LOAD_FILMS_SUCCESS);
    expect(Array.isArray(filmAction.payload)).toEqual(true);
  });
});
