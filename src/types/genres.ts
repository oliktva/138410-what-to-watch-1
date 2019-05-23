import PropTypes from 'prop-types';

export const genrePropTypes = PropTypes.string;
export const genresPropTypes = PropTypes.arrayOf(genrePropTypes);

export type GenreProps = string;
