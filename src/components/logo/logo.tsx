import React from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';

const Logo = (): JSX.Element => (
  <div className="logo">
    <Link to={paths.main()} className="logo__link logo__link--light">
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export default Logo;
