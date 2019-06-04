import React, {PureComponent, ComponentClass} from 'react';

type Value = string | undefined;

interface State {
  email: Value;
  password: Value;
}

const withLoginData = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithLoginData extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        email: undefined,
        password: undefined
      };

      this._setEmailValue = this._setEmailValue.bind(this);
      this._setPasswordValue = this._setPasswordValue.bind(this);
    }

    private _setEmailValue(value: Value): void {
      this.setState({email: value});
    }

    private _setPasswordValue(value: Value): void {
      this.setState({password: value});
    }

    public render(): JSX.Element {
      const {email, password} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          setEmailValue={this._setEmailValue}
          setPasswordValue={this._setPasswordValue}
        />
      );
    }
  }

  return WithLoginData;
};

export default withLoginData;
