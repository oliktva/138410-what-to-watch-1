import React, {FunctionComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

import Videoplayer from 'src/components/videoplayer/videoplayer';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface Props {
  film: FilmProps;
  isPlaying: boolean;
  onMouseEnter?(f: FilmProps): void;
  onMouseLeave?(): void;
}

const SmallMovieCard: FunctionComponent<Props> = (props): ReactElement => {
  const {film, isPlaying, onMouseEnter, onMouseLeave} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={(): void => {
        if (onMouseEnter) {
          onMouseEnter(film);
        }
      }}
      onMouseLeave={onMouseLeave}
    >
      <Videoplayer
        src={film.previewVideoLink}
        preview={film.previewImage}
        isPlaying={isPlaying}
      />
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: filmPropTypes.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

SmallMovieCard.defaultProps = {
  onMouseEnter: undefined,
  onMouseLeave: undefined,
};

export default SmallMovieCard;
