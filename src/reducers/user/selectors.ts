import Namespaces from 'src/reducers/namespaces';

import {State} from 'src/types/reducer';
import {UserProps} from 'src/types/user';

export const getUser = (state: State): UserProps => {
  const {id, email, name, avatarUrl} = state[Namespaces.USER];

  return {id, email, name, avatarUrl};
};

export const getError = (state: State): (string | undefined) => {
  return state[Namespaces.USER].error;
};
