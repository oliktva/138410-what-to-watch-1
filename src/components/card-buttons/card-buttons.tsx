import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';

import {FilmProps} from 'src/types/films';

interface Props {
  film: FilmProps;
  isFull?: boolean;
  onPlayButtonClick: () => void;
  onFavoritesToggle: () => void;
}

const CardButtons: FunctionComponent<Props> = ({film, isFull, onPlayButtonClick, onFavoritesToggle}): ReactElement => (
  <div className="movie-card__buttons">
    <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use href="#play-s" />
      </svg>
      <span>Play</span>
    </button>
    <button
      className="btn btn--list movie-card__button"
      type="button"
      onClick={onFavoritesToggle}
    >
      {film.isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use href="#in-list" />
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use href="#add" />
        </svg>
      )}
      <span>My list</span>
    </button>
    {isFull && <Link to={paths.review(film.id)} className="btn movie-card__button">Add review</Link>}
  </div>
);

CardButtons.defaultProps = {
  isFull: false
};

export default CardButtons;
