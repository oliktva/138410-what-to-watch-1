import MockAdapter from "axios-mock-adapter";

import configureAPI from 'src/api';
import {
  Operation,
  ActionCreator,
  SET_GENRE,
  LOAD_FILMS_SUCCESS,
  LOAD_FAVORITE_SUCCESS,
  UPDATE_FILM,
  LOAD_PROMO,
  LOAD_REVIEWS
} from './films';

import {films, film} from 'src/fixtures/films';
import {reviews, review} from 'src/fixtures/reviews';
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

  it(`updateFilm`, () => {
    const filmAction = ActionCreator.updateFilm(film);

    expect(filmAction.type).toEqual(UPDATE_FILM);
    expect(filmAction.payload).toEqual(film);
  });

  it(`loadPromo`, () => {
    const filmAction = ActionCreator.loadPromo(film);

    expect(filmAction.type).toEqual(LOAD_PROMO);
    expect(filmAction.payload).toEqual(film);
  });

  it(`loadReviews`, () => {
    const filmAction = ActionCreator.loadReviews(film.id, reviews);

    expect(filmAction.type).toEqual(LOAD_REVIEWS);
    expect(filmAction.payload.id).toEqual(film.id);
    expect(filmAction.payload.reviews).toEqual(reviews);
  });
});

describe(`Operator`, () => {
  it(`load films from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_FILMS_SUCCESS,
          payload: [{fake: true}]
        });
      });
  });

  it(`load favorite from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.loadFavorite();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_FAVORITE_SUCCESS,
          payload: [{fake: true}]
        });
      });
  });

  it(`add to favorites`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.addToFavorites(film.id);

    apiMock
      .onPost(`/favorite/${film.id}/1`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UPDATE_FILM,
          payload: [{fake: true}]
        });
      });
  });

  it(`remove from favorites`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.removeFromFavorites(film.id);

    apiMock
      .onPost(`/favorite/${film.id}/0`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UPDATE_FILM,
          payload: [{fake: true}]
        });
      });
  });

  it(`load promo from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_PROMO,
          payload: [{fake: true}]
        });
      });
  });

  it(`load reviews from server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.loadReviews(film.id);

    apiMock
      .onGet(`/comments/${film.id}`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_REVIEWS,
          payload: {
            id: film.id,
            reviews: [{fake: true}]
          }
        });
      });
  });

  it(`add review to server`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loader = Operation.addReview(film.id, review.comment, review.rating);

    apiMock
      .onPost(`/comments/${film.id}`, {comment: review.comment, rating: review.rating})
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_REVIEWS,
          payload: {
            id: film.id,
            reviews: [{fake: true}]
          }
        });
      });
  });
});
