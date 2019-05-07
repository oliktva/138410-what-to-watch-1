import PropTypes from 'prop-types';

export const filmPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
});

export const filmsPropTypes = PropTypes.arrayOf(filmPropTypes.isRequired);

export interface FilmProps {name: string; img: string}
