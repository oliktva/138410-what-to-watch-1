import React, {PureComponent, ReactElement} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import PropTypes from 'prop-types';

import {getGenres, getFilmsByGenre, getPromoFilm} from 'src/reducers/films/selectors';
import {getUser} from 'src/reducers/user/selectors';
import {Operation} from 'src/reducers/films/films';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
import MovieCard from 'src/components//movie-card/movie-card';
import SmallMovieCardsList from 'src/components/small-movie-cards-list/small-movie-cards-list';
import GenresList from 'src/components/genres-list/genres-list';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps, filmPropTypes, filmsPropTypes} from 'src/types/films';
import {GenreProps, genresPropTypes} from 'src/types/genres';
import {UserProps, UserPropTypes} from 'src/types/user';

interface StateProps {
  filmsByGenre: FilmProps[];
  genres: GenreProps[];
  promo: FilmProps | null;
  user: UserProps;
}

interface DispatchProps {
  loadFilms: () => void;
  loadPromo: () => void;
}

type Props = StateProps & DispatchProps;

const propTypes = {
  filmsByGenre: filmsPropTypes.isRequired,
  genres: genresPropTypes.isRequired,
  promo: filmPropTypes,
  loadFilms: PropTypes.func.isRequired,
  loadPromo: PropTypes.func.isRequired,
  user: UserPropTypes.isRequired
};

class Main extends PureComponent<Props> {
  public static propTypes = propTypes;

  public componentDidMount(): void {
    const {loadFilms, loadPromo} = this.props;

    Promise.all([loadFilms(), loadPromo()]);
  }

  public render(): ReactElement | null {
    const {genres, filmsByGenre, promo, user} = this.props;

    if (filmsByGenre.length === 0) {
      return null;
    }

    return (
      <PageWrapper>
        <MovieCard
          header={<Header user={user} className="movie-card__head" />}
          film={promo}
        />
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList genres={genres} />
            <SmallMovieCardsList films={filmsByGenre} />
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
  promo: getPromoFilm(state),
  user: getUser(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFilms: (): Promise<void> => dispatch(Operation.loadFilms()),
  loadPromo: (): Promise<void> => dispatch(Operation.loadPromo())
});

export {Main};

const ConnectedComponent: any =
 connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Main);

export default ConnectedComponent;
