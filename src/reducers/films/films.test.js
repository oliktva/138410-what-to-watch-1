import MockAdapter from "axios-mock-adapter";

import configureAPI from 'src/api';
import {Operation, ActionCreator, SET_GENRE, LOAD_FILMS_SUCCESS} from './films';

import {films} from 'src/fixtures/films';
import {genre} from 'src/fixtures/genres';

describe(`ActionCreator`, () => {
  it(`setFilterByGenre`, () => {
    expect(ActionCreator.setFilterByGenre(genre)).toEqual({
      type: SET_GENRE,
      payload: genre
    });
  });

  it(`loadFilms`, () => {
    const filmAction = ActionCreator.loadFilms(films);

    expect(filmAction.type).toEqual(LOAD_FILMS_SUCCESS);
    expect(Array.isArray(filmAction.payload)).toEqual(true);
    expect(filmAction.payload).toEqual(films);
  });

  it(`load films from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_FILMS_SUCCESS,
          payload: [{fake: true}],
        });
      });
  });
});
