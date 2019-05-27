import React, {FunctionComponent} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {State, ActionCreator, Action} from 'src/reducer';
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

const GenresList = (props: Props): JSX.Element => {
  const {genres, active, setFilterByGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre: GenreProps): JSX.Element => {
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

const mapStateToProps = (state: State): StateProps => ({
  active: state.genre
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
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

export default ConnectedComponent as FunctionComponent<OwnProps>;