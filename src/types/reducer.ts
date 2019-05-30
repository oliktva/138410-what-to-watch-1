import {ThunkDispatch as ReduxThunkDispatch, ThunkAction as ReduxThunkAction} from 'redux-thunk';
import {AxiosInstance} from 'axios';

import {
  State as FilmsState,
  Action as FilmsAction
} from 'src/reducers/films/films';

import {
  State as UserState,
  Action as UserAction
} from 'src/reducers/user/user';

import Namespaces from 'src/reducers/namespaces';

export interface State {
  [Namespaces.FILMS]: FilmsState;
  [Namespaces.USER]: UserState;
}

export type Action = FilmsAction | UserAction;
export type ThunkDispatch = ReduxThunkDispatch<State, AxiosInstance, Action>;
export type ThunkAction = ReduxThunkAction<Promise<void>, State, AxiosInstance, Action>;
