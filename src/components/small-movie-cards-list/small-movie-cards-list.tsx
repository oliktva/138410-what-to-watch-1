import React, {Fragment, PureComponent, ReactElement} from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';

import withActiveCard from 'src/hocs/with-active-card/with-active-card';
import withPagination from 'src/hocs/with-pagination/with-pagination';
import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {FilmProps, filmPropTypes, filmsPropTypes} from 'src/types/films';

interface OwnProps {
  films: FilmProps[];
}

interface WithActiveProps {
  activeCard: FilmProps | null;
  setActiveCard: (film: FilmProps) => void;
  resetActiveCard: () => void;
}

interface WithPaginationProps {
  maxItemsPerPage: number;
  goToNextPage: () => void;
  resetPage: () => void;
}

type Props = OwnProps & WithActiveProps & WithPaginationProps;

const propTypes = {
  films: filmsPropTypes.isRequired,
  activeCard: filmPropTypes,
  setActiveCard: PropTypes.func.isRequired,
  resetActiveCard: PropTypes.func.isRequired,
  maxItemsPerPage: PropTypes.number.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired
};

class SmallMovieCardsList extends PureComponent<Props> {
  public static propTypes = propTypes;

  private _timeoutId: number | null = null;

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.films !== this.props.films) {
      this.props.resetPage();
    }
  }

  public componentWillUnmount(): void {
    this._clearTimeout();
    this._setTimeout(null);
  }

  public render(): ReactElement {
    const {films, activeCard, maxItemsPerPage, goToNextPage} = this.props;
    const filmsOnPage = films.slice(0, maxItemsPerPage);
    const needNextPageButton = filmsOnPage.length < films.length;

    return (
      <Fragment>
        <div className="catalog__movies-list">
          {filmsOnPage.map((film): JSX.Element => (
            <SmallMovieCard
              key={film.id}
              film={film}
              isPlaying={activeCard ? film.id === activeCard.id : false}
              onMouseEnter={(f: FilmProps): void => this._handleHover(f)}
              onMouseLeave={(): void => this._handleClear()}
            />
          ))}
        </div>
        {needNextPageButton && (
          <div className="catalog__more">
            <button
              className="catalog__button" type="button"
              onClick={goToNextPage}
            >
                Show more
            </button>
          </div>
        )}
      </Fragment>
    );
  }

  private _handleHover(film: FilmProps): void {
    const timeoutId = window.setTimeout((): void => {
      this._setTimeout(null);
      this.props.setActiveCard(film);
    }, 1000);

    this._setTimeout(timeoutId);
  }

  private _handleClear(): void {
    this._clearTimeout();
    this.props.resetActiveCard();
  }

  private _setTimeout(timeoutId: number | null): void {
    this._timeoutId = timeoutId;
  }

  private _clearTimeout(): void {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
    }
  }
}

export {SmallMovieCardsList};

const wrappedComponent: any = compose(
  withActiveCard,
  withPagination
)(SmallMovieCardsList);

export default wrappedComponent;
