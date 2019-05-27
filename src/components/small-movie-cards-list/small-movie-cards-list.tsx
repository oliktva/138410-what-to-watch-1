import React, {PureComponent} from 'react';

import withActiveCard from 'src/hocs/with-active-card/with-active-card';
import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {FilmProps, filmsPropTypes} from 'src/types/films';

interface Props {
  films: FilmProps[];
  activeCard: FilmProps | null;
  setActiveCard: (film: FilmProps) => void;
  resetActiveCard: () => void;
}

class SmallMovieCardsList extends PureComponent<Props> {
  public static propTypes = {
    films: filmsPropTypes.isRequired
  }

  private _timeoutId: number | null = null;

  public componentWillUnmount(): void {
    this._clearTimeout();
    this._setTimeout(null);
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

  public render(): JSX.Element {
    const {films, activeCard} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film): JSX.Element => (
          <SmallMovieCard
            key={film.id}
            film={film}
            isPlaying={activeCard ? film.id === activeCard.id : false}
            onMouseEnter={(f: FilmProps): void => this._handleHover(f)}
            onMouseLeave={(): void => this._handleClear()}
          />
        ))}
      </div>
    );
  }
}

export {SmallMovieCardsList};

export default withActiveCard(SmallMovieCardsList);
