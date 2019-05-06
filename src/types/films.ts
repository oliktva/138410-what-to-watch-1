import PropTypes from 'prop-types';

export const filmsPropTypes = {
  films: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  }).isRequired
};

export interface FilmProps {name: string; img: string}
