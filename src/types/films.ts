import PropTypes from 'prop-types';

export const filmPropTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  }).isRequired
};

export const filmsPropTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export interface FilmProps {name: string; img: string}
