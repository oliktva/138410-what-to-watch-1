import React, {PureComponent, ComponentClass, ReactElement} from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {compose} from 'redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import paths from 'src/paths';
import {getUser} from 'src/reducers/user/selectors';

import {State} from 'src/types/reducer';
import {UserProps} from 'src/types/user';

interface StateProps {
  user: UserProps;
}

type Props = StateProps & RouteComponentProps;

const needLogin = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;
  type T = Exclude<P, Props>;

  class NeedLogin extends PureComponent<T> {
    public componentDidMount(): void {
      const {user, history} = this.props;

      if (!user.id) {
        history.push(paths.login());
      }
    }

    public render(): ReactElement {
      return <Component {...this.props} />;
    }
  }

  return NeedLogin;
};

export {needLogin};

const mapStateToProps: MapStateToProps<StateProps, RouteComponentProps, State> = (state: State): StateProps => ({
  user: getUser(state)
});

export default (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;
  type T = P & Props;

  const ConnectedComponent =
    compose(
      connect<StateProps, {}, RouteComponentProps, State>(mapStateToProps),
      withRouter
    )(needLogin(Component));

  return ConnectedComponent as ComponentClass<T>;
};
