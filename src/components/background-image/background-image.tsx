import React, {FunctionComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

interface Props {
  image: string;
  name: string;
}

const BackgroundImage: FunctionComponent<Props> = ({image, name}): ReactElement => (
  <div className="movie-card__bg">
    <img src={image} alt={name} />
  </div>
);

BackgroundImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default BackgroundImage;
