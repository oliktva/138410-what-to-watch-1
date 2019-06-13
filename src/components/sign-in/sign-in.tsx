import React, {
  PureComponent,
  FormEvent,
  ChangeEvent,
  ReactElement
} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import {compose} from 'redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import paths from 'src/paths';
import {getUser, getError} from 'src/reducers/user/selectors';
import {Operation, ActionCreator, Action} from 'src/reducers/user/user';
import withFormFields from 'src/hocs/with-form-fields/with-form-fields';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';

import {State, ThunkDispatch} from 'src/types/reducer';
import {UserProps} from 'src/types/user';

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
  form: {
    [key: string]: Value;
  };
  setFieldValue: (field: string, value: Value) => void;
}

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps;

class SignIn extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFieldChange = this._handleFieldChange.bind(this);
  }

  public componentDidMount(): void {
    const {user, history} = this.props;

    if (user.id) {
      history.push(paths.main());
    }
  }

  public render(): ReactElement {
    const {user, error} = this.props;

    return (
      <PageWrapper>
        <div className="user-page">
          <Header user={user} className="user-page__head" />
          <div className="sign-in user-page__content">
            <form className="sign-in__form" onSubmit={this._handleFormSubmit}>
              {error && (
                <div className="sign-in__message">
                  <p>{error}</p>
                </div>
              )}
              <div className="sign-in__fields">
                {this._renderEmailField()}
                {this._renderPasswordField()}
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


  private _handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    const {form, logInUser, showError, history} = this.props;
    const email = form[`user-email`];
    const password = form[`user-password`];

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

  private _handleFieldChange(evt: ChangeEvent<HTMLInputElement>): void {
    const {setFieldValue} = this.props;
    const {target} = evt;

    if (target) {
      setFieldValue(target.name, target.value);
    }
  }

  private _renderEmailField(): ReactElement {
    const {form} = this.props;
    const email = form[`user-email`];

    return (
      <div className="sign-in__field">
        <input
          className="sign-in__input"
          type="email"
          placeholder="Email address"
          name="user-email"
          id="user-email"
          value={email}
          onChange={this._handleFieldChange}
        />
        <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
      </div>
    );
  }

  private _renderPasswordField(): ReactElement {
    const {form} = this.props;
    const password = form[`user-password`];

    return (
      <div className="sign-in__field">
        <input
          className="sign-in__input"
          type="password"
          placeholder="Password"
          name="user-password"
          id="user-password"
          value={password}
          onChange={this._handleFieldChange}
        />
        <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
      </div>
    );
  }
}

export {SignIn};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State): StateProps => ({
  user: getUser(state),
  error: getError(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  logInUser: (email: string, password: string): Promise<void> => dispatch(Operation.logInUser(email, password)),
  showError: (message: string): Action => dispatch(ActionCreator.logInUserError(message))
});

const ConnectedComponent: any =
  compose(
    connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps),
    withFormFields,
    withRouter
  )(SignIn);

export default ConnectedComponent;
