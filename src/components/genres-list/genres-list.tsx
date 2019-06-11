import React, {PureComponent, ReactElement} from 'react';
import {Dispatch} from 'redux';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';

import {ActionCreator, Action} from 'src/reducers/films/films';
import {getGenre} from 'src/reducers/films/selectors';

import {State} from 'src/types/reducer';
import {GenreProps} from 'src/types/genres';

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

class GenresList extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  public render(): ReactElement {
    const {genres, active} = this.props;

    return (
      <ul className="catalog__genres-list">
        {genres.slice(0, GENRES_NUMBER).map((genre: GenreProps): JSX.Element => {
          const activeClass = `catalog__genres-item--active`;
          const empty = ``;

          return (
            <li
              className={`catalog__genres-item ${genre === active ? activeClass : empty}`}
              key={genre}
              onClick={genre === active ? undefined : this._handleTabClick(genre)}
            >
              <span className="catalog__genres-link">{genre}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  private _handleTabClick(genre: GenreProps): () => void {
    const {setFilterByGenre} = this.props;

    return (): void => setFilterByGenre(genre);
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State): StateProps => ({
  active: getGenre(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: Dispatch): DispatchProps => ({
  setFilterByGenre: (genre: GenreProps): Action => dispatch(ActionCreator.setFilterByGenre(genre))
});

export {GenresList};

const ConnectedComponent: any =
 connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(GenresList);

export default ConnectedComponent;
