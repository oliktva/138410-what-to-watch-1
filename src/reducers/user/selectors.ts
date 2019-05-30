import namespaces from 'src/reducers/namespaces';

import {State} from 'src/types/reducer';
import {UserProps} from 'src/types/user';

export const getUser = (state: State): UserProps => {
  const {id, email, name, avatarUrl} = state[namespaces.USER];

  return {id, email, name, avatarUrl};
};

export const getIsAuthorizationRequired = (state: State): boolean => {
  return state[namespaces.USER].isAuthorizationRequired;
};
