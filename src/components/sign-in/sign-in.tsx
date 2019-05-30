import React, {PureComponent, ComponentClass, FormEvent, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import {getUser} from 'src/reducers/user/selectors';
import {Operation} from 'src/reducers/user/user';
import withLoginData from 'src/hocs/with-login-data/with-login-data';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';

import {State, ThunkDispatch} from 'src/types/reducer';
import {UserProps, UserPropTypes} from 'src/types/user';

type Value = string | undefined;

interface StateProps {
  user: UserProps;
}

interface DispatchProps {
  logInUser: (email: string, password: string) => Promise<void>;
}

interface OwnProps {
  email: Value;
  password: Value;
  setEmailValue: (value: Value) => void;
  setPasswordValue: (value: Value) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class SignIn extends PureComponent<Props> {
  public static propTypes = {
    user: UserPropTypes.isRequired,
    logInUser: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    setEmailValue: PropTypes.func.isRequired,
    setPasswordValue: PropTypes.func.isRequired
  };

  public static defaultProps = {
    email: null,
    password: null
  }

  public constructor(props: any) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
  }

  private _onSubmit(evt: FormEvent<HTMLFormElement>): void {
    const {email, password, logInUser} = this.props;

    evt.preventDefault();

    if (email && password) {
      logInUser(email, password);
    }
  }

  private _onEmailChange(evt: ChangeEvent<HTMLInputElement>): void {
    const {setEmailValue} = this.props;
    const {target} = evt;

    if (target) {
      setEmailValue(target.value);
    }
  }

  private _onPasswordChange(evt: ChangeEvent<HTMLInputElement>): void {
    const {setPasswordValue} = this.props;
    const {target} = evt;

    if (target) {
      setPasswordValue(target.value);
    }
  }

  public render(): JSX.Element {
    const {user} = this.props;

    return (
      <PageWrapper>
        <div className="user-page">
          <Header user={user} className="user-page__head" />
          <div className="sign-in user-page__content">
            <form className="sign-in__form" onSubmit={this._onSubmit}>
              <div className="sign-in__fields">
                <div className="sign-in__field">
                  <input
                    className="sign-in__input"
                    type="email"
                    placeholder="Email address"
                    name="user-email"
                    id="user-email"
                    onChange={this._onEmailChange}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input
                    className="sign-in__input"
                    type="password"
                    placeholder="Password"
                    name="user-password"
                    id="user-password"
                    onChange={this._onPasswordChange}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  logInUser: (email: string, password: string): Promise<void> => dispatch(Operation.logInUser(email, password))
});

export {SignIn};

const connectedComponent: any =
  compose(
    connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps),
    withLoginData
  )(SignIn);

export default connectedComponent as ComponentClass<{}>;
