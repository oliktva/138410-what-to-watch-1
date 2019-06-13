import React, {Fragment, PureComponent, ReactElement} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import {compose} from 'redux';
import {AxiosError} from 'axios';
import {withRouter, RouteComponentProps} from 'react-router';

import paths from 'src/paths';
import {Operation} from 'src/reducers/films/films';
import {formatTime, formatLocaleTime} from 'src/helpers/time-helper';
import {getRatingDescription, getRatingDecimal} from 'src/helpers/rating-helper';
import withActiveTab from 'src/hocs/with-active-tab/with-active-tab';

import needRenderPlayer from 'src/hocs/need-render-player/need-render-player';
import Player from 'src/components/player/player';
import BackgroundImage from 'src/components/background-image/background-image';
import MoviePoster from 'src/components/movie-poster/movie-poster';
import CardButtons from 'src/components/card-buttons/card-buttons';
import MovieMeta from 'src/components/movie-meta/movie-meta';
import SmallFullMovieCardsList from 'src/components/small-movie-cards-list/small-movie-cards-list';
import Footer from 'src/components/footer/footer';

import {State, ThunkDispatch} from 'src/types/reducer';
import {FilmProps} from 'src/types/films';
import {ReviewProps} from 'src/types/reviews';

const TABS = [`overview`, `details`, `reviews`];

interface DispatchProps {
  addToFavorites: (filmId: number) => Promise<void>;
  removeFromFavorites: (filmId: number) => Promise<void>;
}

interface WithActiveTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NeedRenderPlayerProps {
  withPlayer: boolean;
  toggleRenderPlayer: () => void;
}

interface OwnProps {
  header: ReactElement;
  film: FilmProps | null;
  reviews: ReviewProps[];
  relatedFilms: FilmProps[];
}

type Props = OwnProps & WithActiveTabProps & NeedRenderPlayerProps & RouteComponentProps & DispatchProps;

const defaultProps = {
  isFull: false
};

class FullMovieCard extends PureComponent<Props> {
  public static defaultProps = defaultProps;

  public constructor(props: Props) {
    super(props);

    this._handlePlay = this._handlePlay.bind(this);
    this._handleToggleFavorite = this._handleToggleFavorite.bind(this);
    this._handleTabClick = this._handleTabClick.bind(this);
  }

  public componentDidUpdate(prevProps: Props) {
    const {film, setActiveTab} = this.props;

    if (prevProps.film && film && prevProps.film.id !== film.id) {
      setActiveTab(TABS[0]);
    }
  }

  public render(): ReactElement | null {
    const {
      film,
      reviews,
      withPlayer,
      toggleRenderPlayer,
      header,
      activeTab,
      relatedFilms
    } = this.props;

    if (!film) {
      return null;
    }

    return (
      <Fragment>
        {withPlayer && <Player film={film} closePlayer={toggleRenderPlayer} />}
        <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
          <div className="movie-card__hero">
            <BackgroundImage image={film.backgroundImage} name={film.name} />
            <h1 className="visually-hidden">WTW</h1>
            {header}
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <MovieMeta film={film} />
                <CardButtons
                  film={film}
                  onPlayButtonClick={this._handlePlay}
                  onFavoritesToggle={this._handleToggleFavorite}
                  isFull
                />
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <MoviePoster image={film.posterImage} name={film.name} kind="big" />
              <div className="movie-card__desc">
                {this._renderNav()}
                {activeTab === `overview` && this._renderOverview(film)}
                {activeTab === `details` && this._renderDetails(film)}
                {activeTab === `reviews` && this._renderReviews(reviews)}
              </div>
            </div>
          </div>
        </section>
        {this._renderMoreLikeThis(relatedFilms)}
      </Fragment>
    );
  }

  private _handlePlay(): void {
    this.props.toggleRenderPlayer();
  }

  private _handleToggleFavorite(): void {
    const {history, film, addToFavorites, removeFromFavorites} = this.props;

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

  private _handleTabClick(tab: string): () => void {
    const {setActiveTab} = this.props;

    return setActiveTab.bind(this, tab);
  }

  private _renderStarring(starring: string[], {isLine}: {isLine: boolean} = {isLine: false}): ReactElement[] | string {
    return isLine ? `${starring.join(`, `)} and other` : starring.join(`,\n`);
  }

  private _renderNav(): ReactElement {
    const {activeTab} = this.props;
    const activeClass = `movie-nav__item--active`;
    const empty = ``;

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab: string): ReactElement => (
            <li key={tab} className={`movie-nav__item ${tab === activeTab ? activeClass : empty}`}>
              <span className="movie-nav__link" onClick={tab === activeTab ? undefined : this._handleTabClick(tab)}>{tab}</span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  private _renderOverview(film: FilmProps): ReactElement {
    return (
      <Fragment>
        <div className="movie-rating">
          <div className="movie-rating__score">{film.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingDescription(film.rating)}</span>
            <span className="movie-rating__count">{getRatingDecimal(film.scoresCount)} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{film.description}</p>

          <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {this._renderStarring(film.starring, {isLine: true})}</strong></p>
        </div>
      </Fragment>
    );
  }

  private _renderDetails(film: FilmProps): ReactElement {
    return (
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{film.director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {this._renderStarring(film.starring)}
            </span>
          </p>
        </div>
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">
              {formatTime(film.runTime * 60, {withSeconds: false})}
            </span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{film.genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{film.released}</span>
          </p>
        </div>
      </div>
    );
  }

  private _renderReview(review: ReviewProps): ReactElement {
    return (
      <div className="review" key={review.id}>
        <blockquote className="review__quote">
          <p className="review__text">{review.comment}</p>
          <footer className="review__details">
            <cite className="review__author">{review.user.name}</cite>
            <time className="review__date" dateTime="2016-12-24">{formatLocaleTime(review.date)}</time>
          </footer>
        </blockquote>
        <div className="review__rating">{review.rating}</div>
      </div>
    );
  }

  private _renderReviews(reviews: ReviewProps[]): ReactElement {
    const firstColumnsReviews = reviews.filter((_, index: number): boolean => index % 2 === 0);
    const secondColumnsReviews = reviews.filter((_, index: number): boolean => index % 2 === 1);

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {firstColumnsReviews.map((review: ReviewProps): ReactElement => this._renderReview(review))}
        </div>
        <div className="movie-card__reviews-col">
          {secondColumnsReviews.map((review: ReviewProps): ReactElement => this._renderReview(review))}
        </div>
      </div>
    );
  }

  private _renderMoreLikeThis(relatedFilms: FilmProps[]): ReactElement {
    return (
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <SmallFullMovieCardsList films={relatedFilms} />
        </section>
        <Footer />
      </div>
    );
  }

}

export {FullMovieCard};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  addToFavorites: (filmId: number): Promise<void> => dispatch(Operation.addToFavorites(filmId)),
  removeFromFavorites: (filmId: number): Promise<void> => dispatch(Operation.addToFavorites(filmId))
});

const ConnectedComponent: any =
  compose(
    connect<{}, DispatchProps, OwnProps, State>(null, mapDispatchToProps),
    needRenderPlayer,
    withActiveTab(TABS),
    withRouter
  )(FullMovieCard);

export default ConnectedComponent;
