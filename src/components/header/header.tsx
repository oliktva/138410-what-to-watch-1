import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import paths from 'src/paths';

import {UserProps, UserPropTypes} from 'src/types/user';

interface Props {
  user: UserProps;
  heading?: string;
  className?: string;
}

const Header = ({user, className, heading}: Props): JSX.Element => (
  <header className={`page-header ${className}`}>
    <div className="logo">
      <a className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
    {heading && <h1 className="page-title user-page__title">{heading}</h1>}
    <div className="user-block">
      {user.avatarUrl ? (
        <div className="user-block__avatar">
          <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      ) : (
        <Link to={paths.login()} className="user-block__link">Sign in</Link>
      )}
    </div>
  </header>
);

Header.propTypes = {
  user: UserPropTypes.isRequired,
  heading: PropTypes.string,
  className: PropTypes.string
};

Header.defaultProps = {
  className: ``
};

export default Header;
