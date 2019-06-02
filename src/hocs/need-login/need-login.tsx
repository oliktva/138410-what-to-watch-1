import React, {PureComponent, ComponentClass} from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {compose} from 'recompose';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import paths from 'src/paths';
import {getUser} from 'src/reducers/user/selectors';

import {State} from 'src/types/reducer';
import {UserProps, UserPropTypes} from 'src/types/user';

interface StateProps {
  user: UserProps;
}

type Props = StateProps & RouteComponentProps;

const needLogin = (Component: any): any => {
  class NeedLogin extends PureComponent<Props> {
    public static propTypes = {
      user: UserPropTypes.isRequired
    }

    public componentDidMount(): void {
      const {user, history} = this.props;

      if (!user.id) {
        history.push(paths.login());
      }
    }

    public render(): JSX.Element {
      return <Component {...this.props} />;
    }
  }

  return NeedLogin;
};

export {needLogin};

const mapStateToProps: MapStateToProps<StateProps, RouteComponentProps, State> = (state: State): StateProps => ({
  user: getUser(state)
});

export default (Component: any): any =>{
  const ConnectedComponent: any =
    compose<Props, StateProps>(
      connect<StateProps, {}, RouteComponentProps, State>(mapStateToProps),
      withRouter
    )(needLogin(Component));

  return ConnectedComponent as ComponentClass<RouteComponentProps>;
};
