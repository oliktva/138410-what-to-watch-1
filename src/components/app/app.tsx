import React, {Component, ComponentClass} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {State, ActionCreator, Action} from 'src/reducer';

import Main from 'src/components/main/main';

import {FilmProps, filmsPropTypes} from 'src/types/films';
import {GenreProps, genrePropTypes} from 'src/types/genres';

interface StateProps {
  films: FilmProps[];
  genre: GenreProps;
}

interface DispatchProps {
  loadFilms: () => void;
  setFilterByGenre: (genre: GenreProps) => void;
}

type Props = StateProps & DispatchProps;

const ALL_GENRES = `All genres`;

class App extends Component<Props> {
  public static propTypes = {
    films: filmsPropTypes.isRequired,
    genre: genrePropTypes.isRequired,
    loadFilms: PropTypes.func.isRequired,
    setFilterByGenre: PropTypes.func.isRequired
  }

  public componentDidMount(): void {
    const {loadFilms} = this.props;

    loadFilms();
  }

  private _getGenres(): GenreProps[] {
    const {films} = this.props;

    return films.map((f: FilmProps): GenreProps => f.genre)
      .reduce((result: GenreProps[], genre: GenreProps): GenreProps[] => {
        if (!result.includes(genre)) {
          result.push(genre);
        }

        return result;
      }, []);
  }

  private _getFilmsByGenre(genre: GenreProps): FilmProps[] {
    const {films} = this.props;

    return genre === ALL_GENRES ?
      films :
      films.filter((f: FilmProps): boolean => f.genre === genre);
  }

  private _onGenreChange(genre: GenreProps): void {
    const {setFilterByGenre} = this.props;

    setFilterByGenre(genre);
  }

  public render(): JSX.Element {
    const {genre} = this.props;
    const genres = [ALL_GENRES, ...this._getGenres()];

    return (
      <Main
        films={this._getFilmsByGenre(genre)}
        genres={genres}
        active={genre}
        onGenreChange={(g: GenreProps): void => this._onGenreChange(g) }
      />
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  films: state.films,
  genre: state.genre
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadFilms: (): Action => dispatch(ActionCreator.loadFilms()),
  setFilterByGenre: (genre: GenreProps): Action => dispatch(ActionCreator.setFilterByGenre(genre))
});

export {App};

const connectedApp: any = connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp as ComponentClass<{}>;
