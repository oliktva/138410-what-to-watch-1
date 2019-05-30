import React, {PureComponent, ComponentClass} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIsAuthorizationRequired} from 'src/reducers/user/selectors';

import Main from 'src/components/main/main';
import SignIn from 'src/components/sign-in/sign-in';

import {State} from 'src/types/reducer';

interface StateProps {
  isAuthorizationRequired: boolean;
}

type Props = StateProps;

class App extends PureComponent<Props> {
  public static propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  }

  public render(): JSX.Element {
    const {isAuthorizationRequired} = this.props;

    return isAuthorizationRequired ? <SignIn /> : <Main />;
  }
}

const mapStateToProps = (state: State): StateProps => ({
  isAuthorizationRequired: getIsAuthorizationRequired(state)
});

export {App};

const connectedComponent: any =
 connect<StateProps, {}, {}, State>(mapStateToProps)(App);

export default connectedComponent as ComponentClass<{}>;
