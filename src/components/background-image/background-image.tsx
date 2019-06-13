import React, {FunctionComponent, ReactElement} from 'react';

interface Props {
  image: string;
  name: string;
}

const BackgroundImage: FunctionComponent<Props> = ({image, name}): ReactElement => (
  <div className="movie-card__bg">
    <img src={image} alt={name} />
  </div>
);

export default BackgroundImage;
