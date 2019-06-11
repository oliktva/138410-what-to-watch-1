import React, {PureComponent, ReactElement} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {compose} from 'redux';
import PropTypes from 'prop-types';

import {Operation} from 'src/reducers/films/films';
import {getFilm, getReviews} from 'src/reducers/films/selectors';
import {getUser} from 'src/reducers/user/selectors';
import needLogin from 'src/hocs/need-login/need-login';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import MovieCardReview from 'src/components/movie-card-review/movie-card-review';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps, filmPropTypes, reviewsPropTypes, ReviewProps} from 'src/types/films';
import {UserProps, userPropTypes} from 'src/types/user';

interface StateProps {
  film: FilmProps | null;
  reviews: ReviewProps[];
  user: UserProps;
}

interface DispatchProps {
  loadFilms: () => void;
  loadReviews: (id: number) => void;
  addReview: (id: number, reviewText: string, rating: string) => Promise<void>;
}

type OwnProps = RouteComponentProps<{id: string}>;

type Props = StateProps & DispatchProps & OwnProps;

const propTypes = {
  film: filmPropTypes,
  reviews: reviewsPropTypes.isRequired,
  user: userPropTypes.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired
};

class Review extends PureComponent<Props> {
  public static propTypes = propTypes;

  public componentDidMount(): void {
    const {loadFilms, loadReviews, match: {params: {id}}} = this.props;

    Promise.all([loadFilms(), loadReviews(parseInt(id, 10))]);
  }

  public render(): ReactElement | null {
    const {film, reviews, user, addReview} = this.props;

    if (!film || reviews.length === 0) {
      return null;
    }

    const userReview = reviews.find((r: ReviewProps): boolean => r.user.id === user.id) || null;

    const header = <Header
      user={user}
      film={film}
      isLightLogo={false}
      withBreadcrumbs
    />;

    return (
      <PageWrapper>
        <MovieCardReview
          header={header}
          film={film}
          userReview={userReview}
          addReview={addReview}
        />
      </PageWrapper>
    );
  }
}


const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State, ownProps: OwnProps): StateProps => ({
  film: getFilm(state, ownProps.match.params.id),
  reviews: getReviews(state, ownProps.match.params.id),
  user: getUser(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFilms: (): Promise<void> => dispatch(Operation.loadFilms()),
  loadReviews: (id: number): Promise<void> => dispatch(Operation.loadReviews(id)),
  addReview: (id: number, reviewText: string, rating: string): Promise<void> => dispatch(Operation.addReview(id, reviewText, rating))
});

export {Review};

const ConnectedComponent: any = compose(
  connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps),
  needLogin
)(Review);

export default ConnectedComponent;
