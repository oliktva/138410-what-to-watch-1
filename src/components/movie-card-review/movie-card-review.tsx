import React, {PureComponent, ReactElement, Fragment} from 'react';
import PropTypes from 'prop-types';

import BackgroundImage from 'src/components/background-image/background-image';
import MoviePoster from 'src/components/movie-poster/movie-poster';
import ReviewForm from 'src/components/review-form/review-form';

import {FilmProps, filmPropTypes, reviewPropTypes, ReviewProps} from 'src/types/films';

interface Props {
  film: FilmProps;
  review: ReviewProps | null;
  addReview: (review: ReviewProps) => void;
  header: ReactElement;
}

const propTypes = {
  film: filmPropTypes.isRequired,
  review: reviewPropTypes,
  addReview: PropTypes.func.isRequired,
  header: PropTypes.element.isRequired
}

class MovieCardReview extends PureComponent<Props> {
  public static propTypes = propTypes;

  public render(): ReactElement | null {
    const {film, review, header} = this.props;

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <BackgroundImage image={film.backgroundImage} name={film.name} />
            <h1 className="visually-hidden">WTW</h1>
            {header}
            <MoviePoster image={film.posterImage} name={film.name} kind="small" />
          </div>
          <ReviewForm />
        </section>
      </Fragment>
    )
  }
}

export default MovieCardReview;
