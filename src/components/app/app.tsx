import React, {PureComponent, ReactElement} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';

import {Operation} from 'src/reducers/user/user';
import Routes from 'src/routes';

import {State, ThunkDispatch} from 'src/types/reducer';

interface DispatchProps {
  loadUser: () => Promise<void>;
}

class App extends PureComponent<DispatchProps> {
  public componentDidMount(): void {
    const {loadUser} = this.props;

    loadUser();
  }

  public render(): ReactElement {
    return <Routes />;
  }
}

export {App};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadUser: (): Promise<void> => dispatch(Operation.loadUser())
});

const ConnectedComponent: any = connect<{}, DispatchProps, {}, State>(null, mapDispatchToProps)(App);

export default ConnectedComponent;
