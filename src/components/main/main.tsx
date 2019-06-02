import React, {PureComponent, ComponentClass} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import PropTypes from 'prop-types';

import {getGenres, getFilmsByGenre} from 'src/reducers/films/selectors';
import {getUser} from 'src/reducers/user/selectors';
import {Operation} from 'src/reducers/films/films';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
import MovieCard from 'src/components//movie-card/movie-card';
import SmallMovieCardsList from 'src/components/small-movie-cards-list/small-movie-cards-list';
import GenresList from 'src/components/genres-list/genres-list';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps, filmsPropTypes} from 'src/types/films';
import {GenreProps, genresPropTypes} from 'src/types/genres';
import {UserProps, UserPropTypes} from 'src/types/user';

interface StateProps {
  filmsByGenre: FilmProps[];
  genres: GenreProps[];
  user: UserProps;
}

interface DispatchProps {
  loadFilms: () => void;
}

type Props = StateProps & DispatchProps;

class Main extends PureComponent<Props> {
  public static propTypes = {
    filmsByGenre: filmsPropTypes.isRequired,
    genres: genresPropTypes.isRequired,
    loadFilms: PropTypes.func.isRequired,
    user: UserPropTypes.isRequired
  };

  public componentDidMount(): void {
    const {loadFilms} = this.props;

    loadFilms();
  }

  public render(): JSX.Element {
    const {genres, filmsByGenre, user} = this.props;

    return (
      <PageWrapper>
        <MovieCard
          header={<Header user={user} className="movie-card__head" />}
        />
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList genres={genres} />
            <SmallMovieCardsList films={filmsByGenre} />
            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>
          <Footer />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, State> = (state: State): StateProps => ({
  genres: getGenres(state),
  filmsByGenre: getFilmsByGenre(state),
  user: getUser(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFilms: (): Promise<void> => dispatch(Operation.loadFilms())
});

export {Main};

const ConnectedComponent: any =
 connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Main);

export default ConnectedComponent as ComponentClass<{}>;
