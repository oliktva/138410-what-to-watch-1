import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';
import Video from 'src/components/video/video';

import {FilmProps} from 'src/types/films';

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
      <Link to={paths.film(film.id)} className="small-movie-card__link">
        <Video
          src={film.previewVideoLink}
          preview={film.previewImage}
          isPlaying={isPlaying}
        />
        <h3 className="small-movie-card__title">{film.name}</h3>
      </Link>
    </article>
  );
};

SmallMovieCard.defaultProps = {
  onMouseEnter: undefined,
  onMouseLeave: undefined,
};

export default SmallMovieCard;
