import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';
import {SERVER_URL} from 'src/api';

import Logo from 'src/components/logo/logo';
import Breadcrumbs from 'src/components/breadcrumbs/breadcrumbs';

import {UserProps} from 'src/types/user';
import {FilmProps} from 'src/types/films';

interface Props {
  user?: UserProps;
  heading?: string;
  className?: string;
  withBreadcrumbs?: boolean;
  film?: FilmProps;
  isLightLogo?: boolean;
}

const Header: FunctionComponent<Props> = ({user, className, heading, film, withBreadcrumbs, isLightLogo}): ReactElement => (
  <header className={`page-header ${className}`}>
    <Logo isLight={isLightLogo} />
    {heading && <h1 className="page-title user-page__title">{heading}</h1>}
    {withBreadcrumbs && film && <Breadcrumbs film={film} />}
    {user && (
      <div className="user-block">
        {user.avatarUrl ? (
          <Link to={paths.mylist()}>
            <div className="user-block__avatar">
              <img src={`${SERVER_URL}${user.avatarUrl}`} alt="User avatar" width="63" height="63" />
            </div>
          </Link>
        ) : (
          <Link to={paths.login()} className="user-block__link">Sign in</Link>
        )}
      </div>
    )}
  </header>
);

Header.defaultProps = {
  className: ``,
  withBreadcrumbs: false,
  isLightLogo: true
};

export default Header;
