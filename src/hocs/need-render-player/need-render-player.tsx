import React, {PureComponent, ComponentClass, ReactElement} from 'react';

interface State {
  withPlayer: boolean;
}

const needRenderPlayer = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class NeedRenderPlayer extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        withPlayer: false
      };

      this._toggleRenderPlayer = this._toggleRenderPlayer.bind(this);
    }

    private _toggleRenderPlayer(): void {
      this.setState({withPlayer: !this.state.withPlayer});
    }

    public render(): ReactElement {
      return (
        <Component
          {...this.props}
          withPlayer={this.state.withPlayer}
          toggleRenderPlayer={this._toggleRenderPlayer}
        />
      );
    }
  }

  return NeedRenderPlayer;
};

export default needRenderPlayer;
