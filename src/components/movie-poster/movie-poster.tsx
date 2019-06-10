import React, {FunctionComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

interface Props {
  image: string;
  name: string;
  isBig?: boolean;
}

const MoviePoster: FunctionComponent<Props> = ({image, name, isBig}): ReactElement => (
  <div className={`movie-card__poster ${isBig ? 'movie-card__poster--big' : ''}`}>
    <img src={image} alt={`${name} poster`} width="218" height="327" />
  </div>
);

MoviePoster.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isBig: PropTypes.bool
}

MoviePoster.defaultProps = {
  isBig: false
}

export default MoviePoster;
