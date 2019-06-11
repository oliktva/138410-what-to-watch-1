import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
});

export interface UserProps {
  id?: number;
  email?: string;
  name?: string;
  avatarUrl?: string;
}
