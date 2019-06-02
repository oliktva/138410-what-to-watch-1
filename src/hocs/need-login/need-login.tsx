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

  const mapStateToProps: MapStateToProps<StateProps, {}, State> = (state: State): StateProps => ({
    user: getUser(state)
  });

  const connectedComponent: any =
    compose<Props, ComponentClass<Props>>(
      connect<StateProps, {}, {}, State>(mapStateToProps),
      withRouter
    )(NeedLogin);

  return connectedComponent as ComponentClass<{}>;
};

export default needLogin;
