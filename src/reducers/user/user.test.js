import MockAdapter from "axios-mock-adapter";

import configureAPI from 'src/api';
import {
  Operation,
  ActionCreator,
  LOG_IN_USER,
  LOG_IN_USER_ERROR
} from './user';

import {user, email, password} from 'src/fixtures/user';

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

  it(`log in user to app`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoginer = Operation.logInUser();

    apiMock
      .onPost(`/login`, {email, password})
      .reply(200, [{fake: true}]);

    return userLoginer(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOG_IN_USER,
          payload: [{fake: true}],
        });
      });
  });

  it(`log in user with error`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoginer = Operation.logInUser();

    apiMock
      .onPost(`/login`)
      .reply(400, [{fake: true}]);

    return userLoginer(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOG_IN_USER_ERROR,
          payload: [{fake: true}],
        });
      });
  });
});
