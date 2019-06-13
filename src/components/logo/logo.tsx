import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';

interface Props {
  isLight?: boolean;
}

const Logo: FunctionComponent<Props> = ({isLight}): ReactElement => {
  const lightClass = `logo__link--light`;
  const empty = ``;
  return (
    <div className="logo">
      <Link to={paths.main()} className={`logo__link ${isLight ? lightClass : empty}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.defaultProps = {
  isLight: true
};

export default Logo;
