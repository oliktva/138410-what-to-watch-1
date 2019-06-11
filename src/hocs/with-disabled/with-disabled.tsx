import React, {PureComponent, ComponentClass, ReactElement} from 'react';

interface State {
  isDisabled: boolean;
}

const withDisabled = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithDisabled extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        isDisabled: false
      };

      this._toggleDisabled = this._toggleDisabled.bind(this);
    }

    public render(): ReactElement {
      const {isDisabled} = this.state;

      return (
        <Component
          {...this.props}
          isDisabled={isDisabled}
          toggleDisabled={this._toggleDisabled}
        />
      );
    }

    private _toggleDisabled({isDisabled}: {isDisabled: boolean}): void {
      this.setState({isDisabled});
    }
  }

  return WithDisabled;
};

export default withDisabled;
