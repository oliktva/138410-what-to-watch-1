import MockAdapter from "axios-mock-adapter";

import configureAPI from 'src/api';
import {
  Operation,
  ActionCreator,
  SET_GENRE,
  LOAD_FILMS_SUCCESS,
  LOAD_FAVORITE_SUCCESS
} from './films';

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

  it(`loadFavorites`, () => {
    const filmAction = ActionCreator.loadFavorite(films);

    expect(filmAction.type).toEqual(LOAD_FAVORITE_SUCCESS);
    expect(Array.isArray(filmAction.payload)).toEqual(true);
    expect(filmAction.payload).toEqual(films);
  });
});

describe(`Operator`, () => {
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

  it(`load favorite from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const favoriteLoader = Operation.loadFavorite();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoriteLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_FAVORITE_SUCCESS,
          payload: [{fake: true}],
        });
      });
  });
});
