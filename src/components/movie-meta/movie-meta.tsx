import React, {FunctionComponent, ReactElement, Fragment} from 'react';

import {FilmProps} from 'src/types/films';

interface Props {
  film: FilmProps;
}

const MovieMeta: FunctionComponent<Props> = ({film}): ReactElement => (
  <Fragment>
    <h2 className="movie-card__title">{film.name}</h2>
    <p className="movie-card__meta">
      <span className="movie-card__genre">{film.genre}</span>
      <span className="movie-card__year">{film.released}</span>
    </p>
  </Fragment>
);

export default MovieMeta;
