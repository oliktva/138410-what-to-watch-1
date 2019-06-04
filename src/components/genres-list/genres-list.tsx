import React, {FunctionComponent, ReactElement} from 'react';
import {Dispatch} from 'redux';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import PropTypes from 'prop-types';

import {ActionCreator, Action} from 'src/reducers/films/films';
import {getGenre} from 'src/reducers/films/selectors';

import {State} from 'src/types/reducer';
import {GenreProps, genrePropTypes, genresPropTypes} from 'src/types/genres';

interface StateProps {
  active: GenreProps;
}

interface DispatchProps {
  setFilterByGenre: (genre: GenreProps) => void;
}

interface OwnProps {
  genres: GenreProps[];
}

type Props = StateProps & DispatchProps & OwnProps;

const GENRES_NUMBER = 10; // 9 + 1 (All genres)

const GenresList: FunctionComponent<Props> = (props): ReactElement => {
  const {genres, active, setFilterByGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.slice(0, GENRES_NUMBER).map((genre: GenreProps): JSX.Element => {
        const className = genre === active ?
          `catalog__genres-item catalog__genres-item--active` :
          `catalog__genres-item`;

        return (
          <li className={className} key={genre} onClick={(): void => setFilterByGenre(genre)}>
            <span className="catalog__genres-link">{genre}</span>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State): StateProps => ({
  active: getGenre(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: Dispatch): DispatchProps => ({
  setFilterByGenre: (genre: GenreProps): Action => dispatch(ActionCreator.setFilterByGenre(genre))
});

GenresList.propTypes = {
  genres: genresPropTypes.isRequired,
  active: genrePropTypes.isRequired,
  setFilterByGenre: PropTypes.func.isRequired
};

export {GenresList};

const ConnectedComponent: any =
 connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(GenresList);

export default ConnectedComponent;
