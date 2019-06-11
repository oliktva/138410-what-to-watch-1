import React, {FunctionComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

interface Props {
  image: string;
  name: string;
  kind?: `small` | `big` | `default`;
}

const MoviePoster: FunctionComponent<Props> = ({image, name, kind}): ReactElement => (
  <div className={`movie-card__poster movie-card__poster--${kind}`}>
    <img src={image} alt={`${name} poster`} width="218" height="327" />
  </div>
);

MoviePoster.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  kind: PropTypes.oneOf([`small`, `big`, `default`])
};

MoviePoster.defaultProps = {
  kind: `default`
};

export default MoviePoster;
