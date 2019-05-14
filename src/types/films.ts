import PropTypes from 'prop-types';

export const filmPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired
});

export const filmsPropTypes = PropTypes.arrayOf(filmPropTypes.isRequired);

export interface FilmProps {
  name: string;
  img: string;
  video: string;
  id: number;
}
