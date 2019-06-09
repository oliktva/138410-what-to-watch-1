import {Action as ReduxAction} from 'redux';
import {AxiosResponse, AxiosError, AxiosInstance} from 'axios';
import {toCamel} from 'convert-keys';

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

interface LogInUserAction extends ReduxAction {
  type: typeof LOG_IN_USER;
  payload: UserProps;
}

interface LogInUserErrorAction extends ReduxAction {
  type: typeof LOG_IN_USER_ERROR;
  payload: string;
}

export type Action = LogInUserAction | LogInUserErrorAction;

export const initialState: State = {
  isAuthorizationRequired: false,
  id: undefined,
  email: undefined,
  name: undefined,
  avatarUrl: undefined,
  error: undefined
};

export const ActionCreator = {
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
  loadUser: (): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.get(`/login`)
        .then((response: AxiosResponse<Record<string, any>>): void => {
          const data = toCamel<UserProps>(response.data);

          dispatch(ActionCreator.logInUser(data));
        }).catch((): void => {
          // don't care
        });
    };
  },

  logInUser: (email: string, password: string): ThunkAction => {
    return (dispatch: ThunkDispatch, _getState: () => AppState, api: AxiosInstance): Promise<void> => {
      return api.post(`/login`, {
        email,
        password
      }).then((response: AxiosResponse<Record<string, any>>): void => {
        const data = toCamel<UserProps>(response.data);

        dispatch(ActionCreator.logInUser(data));
      }).catch((error: AxiosError): void => {
        dispatch(ActionCreator.logInUserError(error.message));
      });
    };
  }
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
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
