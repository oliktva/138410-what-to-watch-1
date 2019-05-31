import {Action as ReduxAction} from 'redux';
import {AxiosResponse, AxiosError, AxiosInstance} from 'axios';
import camelcaseKeys from 'camelcase-keys';

import {UserProps} from 'src/types/user';
import {ThunkDispatch, ThunkAction, State as AppState} from 'src/types/reducer';

export const TOGGLE_AUTHORIZATION_REQUIRED = `TOGGLE_AUTHORIZATION_REQUIRED`;
export const LOG_IN_USER = `LOG_IN_USER`;
export const LOG_IN_USER_ERROR = `LOG_IN_USER_ERROR`;

export interface State {
  isAuthorizationRequired: boolean;
  id?: number;
  email?: string;
  name?: string;
  avatarUrl?: string;
  error?: string;
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

interface LogInUserErrorAction extends ReduxAction {
  type: typeof LOG_IN_USER_ERROR;
  payload: string;
}

export type Action = ToggleAuthorizationRequiredAction | LogInUserAction | LogInUserErrorAction;

export const initialState: State = {
  isAuthorizationRequired: false,
  id: undefined,
  email: undefined,
  name: undefined,
  avatarUrl: undefined,
  error: undefined
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
  },

  logInUserError: (error: string): LogInUserErrorAction => {
    return {
      type: LOG_IN_USER_ERROR,
      payload: error
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
        dispatch(ActionCreator.toggleAuthorizationRequired({
          isAuthorizationRequired: false
        }));
      }).catch((error: AxiosError): void => {
        dispatch(ActionCreator.logInUserError(error.message));
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
        ...action.payload,
        error: undefined
      };

    case LOG_IN_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;