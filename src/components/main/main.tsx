import React, {PureComponent, ComponentClass} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getGenres, getFilmsByGenre} from 'src/reducers/films/selectors';
import {getUser} from 'src/reducers/user/selectors';
import {ActionCreator} from 'src/reducers/user/user';
import {Operation} from 'src/reducers/films/films';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
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
  needAuthorizationHandler: () => void;
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
    const {genres, filmsByGenre, user, needAuthorizationHandler} = this.props;

    return (
      <PageWrapper>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header user={user} needAuthorizationHandler={needAuthorizationHandler} className="movie-card__head" />
          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>
              <div className="movie-card__desc">
                <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">Drama</span>
                  <span className="movie-card__year">2014</span>
                </p>
                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use href="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use href="#add" />
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
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

const mapStateToProps = (state: State): StateProps => ({
  genres: getGenres(state),
  filmsByGenre: getFilmsByGenre(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFilms: (): Promise<void> => dispatch(Operation.loadFilms()),
  needAuthorizationHandler: () => dispatch(ActionCreator.toggleAuthorizationRequired({
    isAuthorizationRequired: true
  }))
});

export {Main};

const connectedComponent: any =
 connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Main);

export default connectedComponent as ComponentClass<{}>;
