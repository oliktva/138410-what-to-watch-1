import PropTypes from 'prop-types';

export const UserPropTypes = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
});

export interface UserProps {
  id: number | null;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
}
