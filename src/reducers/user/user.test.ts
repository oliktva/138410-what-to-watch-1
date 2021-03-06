import MockAdapter from "axios-mock-adapter";

import {
  Operation,
  ActionCreator,
  LOG_IN_USER,
  LOG_IN_USER_ERROR
} from './user';
import configureAPI from '../../api';
import {user, email, password} from '../../fixtures/user';

describe(`ActionCreator`, () => {
  it(`logInUser`, () => {
    const loginAction = ActionCreator.logInUser(user);

    expect(loginAction.type).toEqual(LOG_IN_USER);
    expect(loginAction.payload).toEqual(user);
  });

  it(`logInUserError`, () => {
    const errorMessage = `error message`;
    const loginAction = ActionCreator.logInUserError(errorMessage);

    expect(loginAction.type).toEqual(LOG_IN_USER_ERROR);
    expect(loginAction.payload).toEqual(errorMessage);
  });
});

describe(`Operator`, () => {
  it(`load user`, () => {
    const dispatch = jest.fn();
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const loader = Operation.loadUser();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOG_IN_USER,
          payload: [{fake: true}]
        });
      });
  });

  it(`log in user to app`, () => {
    const dispatch = jest.fn();
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const loader = Operation.logInUser(email, password);

    apiMock
      .onPost(`/login`, {email, password})
      .reply(200, [{fake: true}]);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOG_IN_USER,
          payload: [{fake: true}]
        });
      });
  });

  it(`log in user with error`, () => {
    const dispatch = jest.fn();
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const loader = Operation.logInUser(email, password);

    apiMock
      .onPost(`/login`)
      .reply(400);

    return loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOG_IN_USER_ERROR,
          payload: `Request failed with status code 400`,
        });
      });
  });
});
