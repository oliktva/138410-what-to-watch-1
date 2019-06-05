import React, {Fragment, PureComponent, ReactElement} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';

import {Operation} from 'src/reducers/films/films';

import needRenderPlayer from 'src/hocs/need-render-player/need-render-player';
import Player from 'src/components/player/player';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps, filmPropTypes} from 'src/types/films';

interface DispatchProps {
  addToFavorites: (filmId: number) => Promise<void>;
  removeFromFavorites: (filmId: number) => Promise<void>;
}

interface OwnProps {
  header: ReactElement;
  film: FilmProps;
}

interface NeedRenderPlayerProps {
  withPlayer: boolean;
  toggleRenderPlayer: () => void;
}

type Props = OwnProps & NeedRenderPlayerProps & DispatchProps;

const propTypes = {
  header: PropTypes.element.isRequired,
  film: filmPropTypes.isRequired,
  withPlayer: PropTypes.bool.isRequired,
  toggleRenderPlayer: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired
};

class MovieCard extends PureComponent<Props> {
  public static propTypes = propTypes;

  public constructor(props: Props) {
    super(props);

    this._playHandler = this._playHandler.bind(this);
    this._addToMyListHandler = this._addToMyListHandler.bind(this);
    this._removeFilmHandler = this._removeFilmHandler.bind(this);
  }

  public render(): ReactElement {
    const {header, film, withPlayer, toggleRenderPlayer} = this.props;

    return (
      <Fragment>
        {withPlayer && <Player film={film} closePlayer={toggleRenderPlayer} />}
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          {header}
          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
              </div>
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>
                {this._renderButtons()}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  private _playHandler(): void {
    this.props.toggleRenderPlayer();
  }

  private _addToMyListHandler(): void {
    const {film, addToFavorites} = this.props;

    addToFavorites(film.id);
  }

  private _removeFilmHandler(): void {
    const {film, removeFromFavorites} = this.props;

    removeFromFavorites(film.id);
  }

  private _renderButtons(): ReactElement {
    const {film} = this.props;

    return (
      <div className="movie-card__buttons">
        <button className="btn btn--play movie-card__button" type="button" onClick={this._playHandler}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use href="#play-s" />
          </svg>
          <span>Play</span>
        </button>
        <button
          className="btn btn--list movie-card__button"
          type="button"
          onClick={film.isFavorite ? this._removeFilmHandler : this._addToMyListHandler}
        >
          {film.isFavorite ? (
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use href="#in-list" />
            </svg>
          ) : (
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use href="#add" />
            </svg>
          )}
          <span>My list</span>
        </button>
      </div>
    );
  }
}

export {MovieCard};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  addToFavorites: (filmId: number): Promise<void> => dispatch(Operation.addToFavorites(filmId)),
  removeFromFavorites: (filmId: number): Promise<void> => dispatch(Operation.addToFavorites(filmId))
});

const ConnectedComponent: any =
  compose(
    connect<{}, DispatchProps, OwnProps, State>(null, mapDispatchToProps),
    needRenderPlayer
  )(MovieCard);

export default ConnectedComponent;
