import React, {PureComponent, ComponentClass, FormEvent, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import PropTypes from 'prop-types';

import paths from 'src/paths';
import {getUser, getError} from 'src/reducers/user/selectors';
import {Operation, ActionCreator, Action} from 'src/reducers/user/user';
import withLoginData from 'src/hocs/with-login-data/with-login-data';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';

import {State, ThunkDispatch} from 'src/types/reducer';
import {UserProps, UserPropTypes} from 'src/types/user';

type Value = string | undefined;

interface StateProps {
  user: UserProps;
  error?: string;
}

interface DispatchProps {
  logInUser: (email: string, password: string) => Promise<void>;
  showError: (message: string) => Action;
}

interface OwnProps {
  email: Value;
  password: Value;
  setEmailValue: (value: Value) => void;
  setPasswordValue: (value: Value) => void;
}

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps;

class SignIn extends PureComponent<Props> {
  public static propTypes = {
    user: UserPropTypes.isRequired,
    logInUser: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    setEmailValue: PropTypes.func.isRequired,
    setPasswordValue: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
  };

  public constructor(props: any) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
  }

  private _onSubmit(evt: FormEvent<HTMLFormElement>): void {
    const {email, password, logInUser, showError, history} = this.props;

    evt.preventDefault();

    if (email && password) {
      logInUser(email, password).then((): void => {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.push(paths.main());
        }
      });
    } else {
      showError(`Please enter a valid email address and password`);
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
    const {user, error} = this.props;

    return (
      <PageWrapper>
        <div className="user-page">
          <Header user={user} className="user-page__head" />
          <div className="sign-in user-page__content">
            <form className="sign-in__form" onSubmit={this._onSubmit}>
              {error && (
                <div className="sign-in__message">
                  <p>{error}</p>
                </div>
              )}
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
  user: getUser(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  logInUser: (email: string, password: string): Promise<void> => dispatch(Operation.logInUser(email, password)),
  showError: (message: string): Action => dispatch(ActionCreator.logInUserError(message))
});

export {SignIn};

const connectedComponent: any =
  compose(
    connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps),
    withLoginData,
    withRouter
  )(SignIn);

export default connectedComponent as ComponentClass<{}>;
