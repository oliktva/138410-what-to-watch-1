import React, {FunctionComponent, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import paths from 'src/paths';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface Props {
  film: FilmProps;
}

const Breadcrumbs: FunctionComponent<Props> = ({film}): ReactElement => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={paths.film(film.id)}>{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Add review</span>
        </li>
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  film: filmPropTypes.isRequired
};

export default Breadcrumbs;
