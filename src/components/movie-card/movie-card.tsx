import React, {FunctionComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface Props {
  header: ReactElement;
  film: FilmProps;
}

const MovieCard: FunctionComponent<Props> = ({header, film}): ReactElement => (
  <section className="movie-card">
    <div className="movie-card__bg">
      <img src={film.backgroundImage} alt={film.name} />
    </div>
    <h1 className="visually-hidden">WTW</h1>
    {header}
    <div className="movie-card__wrap">
      <div className="movie-card__info">
        <div className="movie-card__poster">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
        <div className="movie-card__desc">
          <h2 className="movie-card__title">{film.name}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{film.genre}</span>
            <span className="movie-card__year">{film.released}</span>
          </p>
          <div className="movie-card__buttons">
            <button className="btn btn--play movie-card__button" type="button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use href="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list movie-card__button" type="button">
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use href="#add" />
              </svg>
              <span>My list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

MovieCard.propTypes = {
  header: PropTypes.element.isRequired,
  film: filmPropTypes.isRequired
};

export default MovieCard;
