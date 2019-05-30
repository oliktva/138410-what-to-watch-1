import {Action as ReduxAction} from 'redux';
import {AxiosResponse, AxiosInstance} from 'axios';
import camelcaseKeys from 'camelcase-keys';

import {UserProps} from 'src/types/user';
import {ThunkDispatch, ThunkAction, State as AppState} from 'src/types/reducer';

export const TOGGLE_AUTHORIZATION_REQUIRED = `TOGGLE_AUTHORIZATION_REQUIRED`;
export const LOG_IN_USER = `LOG_IN_USER`;

export interface State {
  isAuthorizationRequired: boolean;
  id?: number;
  email?: string;
  name?: string;
  avatarUrl?: string;
}

interface IsAuthorizationRequiredProps {
  isAuthorizationRequired: boolean;
}

interface ToggleAuthorizationRequiredAction extends ReduxAction {
  type: typeof TOGGLE_AUTHORIZATION_REQUIRED;
  payload: IsAuthorizationRequiredProps;
}

interface LogInUserAction extends ReduxAction {
  type: typeof LOG_IN_USER;
  payload: UserProps;
}

export type Action = ToggleAuthorizationRequiredAction | LogInUserAction;

export const initialState: State = {
  isAuthorizationRequired: true,
  id: undefined,
  email: undefined,
  name: undefined,
  avatarUrl: undefined
};

export const ActionCreator = {
  toggleAuthorizationRequired: ({isAuthorizationRequired}: IsAuthorizationRequiredProps): ToggleAuthorizationRequiredAction => {
    return {
      type: TOGGLE_AUTHORIZATION_REQUIRED,
      payload: {
        isAuthorizationRequired
      }
    };
  },

  logInUser: (user: UserProps): LogInUserAction => {
    return {
      type: LOG_IN_USER,
      payload: user
    };
  }
};

export const Operation = {
  logInUser: (email: string, password: string): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/login`, {
        email,
        password
      }).then((response: AxiosResponse): void => {
        const data = camelcaseKeys(response.data) as UserProps;

        dispatch(ActionCreator.logInUser(data));
      });
    };
  }
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case TOGGLE_AUTHORIZATION_REQUIRED:
      return {
        ...state,
        isAuthorizationRequired: action.payload.isAuthorizationRequired
      };

    case LOG_IN_USER:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export default reducer;
