import React from 'react';
import PropTypes from 'prop-types';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface Props {
  film: FilmProps;
  onClick(film: FilmProps): void;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
}

const SmallMovieCard = (props: Props): JSX.Element => {
  const {film, onClick, onMouseEnter, onMouseLeave} = props;
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="small-movie-card__play-btn" onClick={(): void => onClick(film)} type="button">
        Play
      </button>
      <div className="small-movie-card__image">
        <img src={film.img} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: filmPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

SmallMovieCard.defaultProps = {
  onMouseEnter: undefined,
  onMouseLeave: undefined,
};

export default SmallMovieCard;
