import React from 'react';

import {GenreProps, genrePropTypes, genresPropTypes} from 'src/types/genres';

interface Props {
  genres: GenreProps[];
  active: GenreProps;
  onGenreChange: (genre: GenreProps) => void;
}

const GenresList = (props: Props): JSX.Element => {
  const {genres, active, onGenreChange} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre: GenreProps): JSX.Element => {
        const className = genre === active ?
          `catalog__genres-item catalog__genres-item--active` :
          `catalog__genres-item`;

        return (
          <li className={className} key={genre} onClick={(): void => onGenreChange(genre)}>
            <span className="catalog__genres-link">{genre}</span>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genres: genresPropTypes.isRequired,
  active: genrePropTypes.isRequired
};

export default GenresList;
