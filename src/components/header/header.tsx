import React from 'react';
import PropTypes from 'prop-types';

import {UserProps, UserPropTypes} from 'src/types/user';

interface Props {
  user: UserProps;
  className: string;
}

const Header = ({user, className}: Props): JSX.Element => (
  <header className={`page-header ${className}`}>
    <div className="logo">
      <a className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
    <div className="user-block">
      {user.avatarUrl ? (
        <div className="user-block__avatar">
          <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      ) : (
        <a href="sign-in.html" className="user-block__link">Sign in</a>
      )}
    </div>
  </header>
);

Header.propTypes = {
  user: UserPropTypes.isRequired,
  className: PropTypes.string
};

Header.defaultProps = {
  className: ``
};

export default Header;
