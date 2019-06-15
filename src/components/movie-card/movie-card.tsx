import React, {Fragment, PureComponent, ReactElement} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import {compose} from 'redux';
import {AxiosError} from 'axios';
import {withRouter, RouteComponentProps} from 'react-router';

import paths from 'src/paths';
import {Operation} from 'src/reducers/films/films';

import needRenderPlayer from 'src/hocs/need-render-player/need-render-player';
import Player from 'src/components/player/player';
import BackgroundImage from 'src/components/background-image/background-image';
import MoviePoster from 'src/components/movie-poster/movie-poster';
import CardButtons from 'src/components/card-buttons/card-buttons';
import MovieMeta from 'src/components/movie-meta/movie-meta';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps} from 'src/types/films';
import {ReviewProps} from 'src/types/reviews';

interface DispatchProps {
  addToFavorites: (filmId: number) => Promise<void>;
  removeFromFavorites: (filmId: number) => Promise<void>;
}

interface OwnProps {
  header: ReactElement;
  film: FilmProps | null;
  reviews: ReviewProps[];
}

interface NeedRenderPlayerProps {
  withPlayer: boolean;
  toggleRenderPlayer: () => void;
}

type Props = OwnProps & NeedRenderPlayerProps & RouteComponentProps & DispatchProps;

class MovieCard extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);

    this._handlePlay = this._handlePlay.bind(this);
    this._handleToggleFavorite = this._handleToggleFavorite.bind(this);
  }

  public render(): ReactElement | null {
    const {film, header, withPlayer, toggleRenderPlayer} = this.props;

    return (
      <Fragment>
        {film && withPlayer && <Player film={film} closePlayer={toggleRenderPlayer} />}
        <section className="movie-card">
          {film && <BackgroundImage image={film.backgroundImage} name={film.name} />}
          <h1 className="visually-hidden">WTW</h1>
          {header}
          <div className="movie-card__wrap">
            {film && <div className="movie-card__info">
              <MoviePoster image={film.posterImage} name={film.name} />
              <div className="movie-card__desc">
                <MovieMeta film={film} />
                <CardButtons
                  film={film}
                  onPlayButtonClick={this._handlePlay}
                  onFavoritesToggle={this._handleToggleFavorite}
                />
              </div>
            </div>}
          </div>
        </section>
      </Fragment>
    );
  }

  private _handlePlay(): void {
    this.props.toggleRenderPlayer();
  }

  private _handleToggleFavorite(): void {
    const {film, addToFavorites, removeFromFavorites, history} = this.props;

    if (film) {
      if (film.isFavorite) {
        removeFromFavorites(film.id);
      } else {
        addToFavorites(film.id)
          .catch((error: AxiosError) => {
            if (error.response && error.response.status === 403) {
              history.push(paths.login());
            }
          });
      }
    }
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
    needRenderPlayer,
    withRouter
  )(MovieCard);

export default ConnectedComponent;
