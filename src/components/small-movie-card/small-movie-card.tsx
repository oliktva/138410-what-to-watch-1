import React, {Fragment} from 'react';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface Props {film: FilmProps; onClick(): void}

const SmallMovieCard = ({film, onClick}: Props): JSX.Element => (
  <Fragment>
    <article className="small-movie-card catalog__movies-card">
      <button className="small-movie-card__play-btn" type="button">Play</button>
      <div className="small-movie-card__image">
        <img src={film.img} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onClick}>{film.name}</a>
      </h3>
    </article>
  </Fragment>
);

SmallMovieCard.propTypes = filmPropTypes;

export default SmallMovieCard;
