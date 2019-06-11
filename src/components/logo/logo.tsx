import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import paths from 'src/paths';

interface Props {
  isLight?: boolean;
}

const Logo: FunctionComponent<Props> = ({ isLight }): ReactElement => (
  <div className="logo">
    <Link to={paths.main()} className={`logo__link ${isLight ? 'logo__link--light' : ''}`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

Logo.propTypes = {
  isLight: PropTypes.bool
}

Logo.defaultProps = {
  isLight: true
}

export default Logo;
