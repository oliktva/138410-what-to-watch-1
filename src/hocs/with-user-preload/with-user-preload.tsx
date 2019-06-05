import React, {PureComponent, ComponentClass, ReactElement} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';

import {Operation} from 'src/reducers/user/user';

import {State as GlobalState, ThunkDispatch} from 'src/types/reducer';

interface DispatchProps {
  loadUser: () => Promise<void>;
}

interface State {
  isLoading: boolean;
}

const withUserPreload = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;
  type T = Exclude<P, DispatchProps>;

  class WithUserPreload extends PureComponent<T, State> {
    public constructor(props: T) {
      super(props);

      this.state = {
        isLoading: true
      };
    }

    public componentDidMount(): void {
      this.props.loadUser().then((): void => {
        this.setState({isLoading: false});
      });
    }

    public render(): ReactElement | null {
      return this.state.isLoading ? null : <Component {...this.props} />;
    }
  }

  return WithUserPreload;
};

export {withUserPreload};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadUser: (): Promise<void> => dispatch(Operation.loadUser())
});

export default (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;
  type T = P & DispatchProps;

  const ConnectedComponent = connect<{}, DispatchProps, {}, GlobalState>(null, mapDispatchToProps)(withUserPreload(Component));

  return ConnectedComponent;
};
