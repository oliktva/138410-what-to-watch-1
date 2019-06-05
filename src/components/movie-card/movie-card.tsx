import React, {Fragment, PureComponent, ReactElement} from 'react';
import PropTypes from 'prop-types';

import needRenderPlayer from 'src/hocs/need-render-player/need-render-player';
import Player from 'src/components/player/player';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface OwnProps {
  header: ReactElement;
  film: FilmProps;
}

interface NeedRenderPlayerProps {
  withPlayer: boolean;
  toggleRenderPlayer: () => void;
}

type Props = OwnProps & NeedRenderPlayerProps;

const propTypes = {
  header: PropTypes.element.isRequired,
  film: filmPropTypes.isRequired,
  withPlayer: PropTypes.bool.isRequired,
  toggleRenderPlayer: PropTypes.func.isRequired
};

class MovieCard extends PureComponent<Props> {
  public static propTypes = propTypes

  public constructor(props: Props) {
    super(props);

    this._playHandler = this._playHandler.bind(this);
    this._addToMyListHandler = this._addToMyListHandler.bind(this);
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

  private _addToMyListHandler(): void {}

  private _renderButtons(): ReactElement {
    return (
      <div className="movie-card__buttons">
        <button className="btn btn--play movie-card__button" type="button" onClick={this._playHandler}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use href="#play-s" />
          </svg>
          <span>Play</span>
        </button>
        <button className="btn btn--list movie-card__button" type="button" onClick={this._addToMyListHandler}>
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use href="#add" />
          </svg>
          <span>My list</span>
        </button>
      </div>
    );
  }
}

export {MovieCard};

export default needRenderPlayer(MovieCard);
