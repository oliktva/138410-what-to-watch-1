import MockAdapter from "axios-mock-adapter";

import configureAPI from 'src/api';
import {Operation, ActionCreator, TOGGLE_AUTHORIZATION_REQUIRED, LOG_IN_USER} from './user';

import {user, email, password} from 'src/fixtures/user';

describe(`ActionCreator`, () => {
  it(`toggleAuthorizationRequired`, () => {
    expect(ActionCreator.toggleAuthorizationRequired({isAuthorizationRequired: true})).toEqual({
      type: TOGGLE_AUTHORIZATION_REQUIRED,
      payload: {isAuthorizationRequired: true}
    });
  });

  it(`logInUser`, () => {
    const filmAction = ActionCreator.logInUser(user);

    expect(filmAction.type).toEqual(LOG_IN_USER);
    expect(filmAction.payload).toEqual(user);
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
});
