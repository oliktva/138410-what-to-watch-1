import React, {ReactElement, Fragment, FunctionComponent} from 'react';

import BackgroundImage from 'src/components/background-image/background-image';
import MoviePoster from 'src/components/movie-poster/movie-poster';
import ReviewForm from 'src/components/review-form/review-form';

import {FilmProps} from 'src/types/films';
import {ReviewProps} from 'src/types/reviews';

interface Props {
  film: FilmProps;
  userReview: ReviewProps | null;
  addReview: (id: number, comment: string, rating: string) => Promise<void>;
  header: ReactElement;
}

const MovieCardReview: FunctionComponent<Props> = ({film, userReview, header, addReview}): ReactElement => (
  <Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <BackgroundImage image={film.backgroundImage} name={film.name} />
        <h1 className="visually-hidden">WTW</h1>
        {header}
        <MoviePoster image={film.posterImage} name={film.name} kind="small" />
      </div>
      <ReviewForm id={film.id} addReview={addReview} userReview={userReview} />
    </section>
  </Fragment>
);

export default MovieCardReview;
