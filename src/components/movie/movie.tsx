import React, {PureComponent, ReactElement} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import PropTypes from 'prop-types';

import {getGenresFilms} from 'src/helpers/genre-helpers';
import {Operation} from 'src/reducers/films/films';
import {getFilm, getReviews, getFilms} from 'src/reducers/films/selectors';
import {getUser} from 'src/reducers/user/selectors';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import FullMovieCard from 'src/components/full-movie-card/full-movie-card';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps, filmPropTypes, filmsPropTypes} from 'src/types/films';
import {reviewsPropTypes, ReviewProps} from 'src/types/reviews';
import {UserProps, userPropTypes} from 'src/types/user';

interface StateProps {
  film: FilmProps | null;
  films: FilmProps[];
  reviews: ReviewProps[];
  user: UserProps;
}

interface DispatchProps {
  loadFilms: () => void;
  loadReviews: (id: number) => void;
}

type OwnProps = RouteComponentProps<{id: string}>;

type Props = StateProps & DispatchProps & OwnProps;

const propTypes = {
  films: filmsPropTypes,
  film: filmPropTypes,
  reviews: reviewsPropTypes.isRequired,
  user: userPropTypes.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired
};

class Movie extends PureComponent<Props> {
  public static propTypes = propTypes;

  public componentDidMount(): void {
    const {loadFilms, loadReviews, match: {params: {id}}} = this.props;

    Promise.all([loadFilms(), loadReviews(parseInt(id, 10))]);
  }

  public render(): ReactElement | null {
    const {film, films, reviews, user} = this.props;

    if (film === null) {
      return null;
    }

    const relatedFilms = getGenresFilms(films, film.genre)
      .filter((f: FilmProps): boolean => f.id !== film.id)
      .slice(0, 4);

    const sortedReviews = reviews.sort((r1: ReviewProps, r2: ReviewProps): number => {
      if (r1.date < r2.date) {
        return 1;
      } else if (r1.date > r2.date) {
        return -1;
      }

      return 0;
    });

    return (
      <PageWrapper>
        <FullMovieCard
          header={<Header user={user} className="movie-card__head" />}
          film={film}
          reviews={sortedReviews}
          relatedFilms={relatedFilms}
        />
      </PageWrapper>
    );
  }
}

export {Movie};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State, ownProps: OwnProps): StateProps => ({
  films: getFilms(state),
  film: getFilm(state, ownProps.match.params.id),
  reviews: getReviews(state, ownProps.match.params.id),
  user: getUser(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFilms: (): Promise<void> => dispatch(Operation.loadFilms()),
  loadReviews: (id: number): Promise<void> => dispatch(Operation.loadReviews(id))
});

const ConnectedComponent: any =
  connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(Movie as any);

export default ConnectedComponent;
