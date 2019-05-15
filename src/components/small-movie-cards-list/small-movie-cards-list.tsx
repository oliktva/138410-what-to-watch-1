import React, {PureComponent} from 'react';

import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {FilmProps, filmsPropTypes} from 'src/types/films';

interface Props {
  films: FilmProps[];
}

interface State {
  activeCard: FilmProps | null;
  timeoutId: number | null;
}

class SmallMovieCardsList extends PureComponent<Props, State> {
  public static propTypes = {
    films: filmsPropTypes.isRequired
  }

  public constructor(props: Props) {
    super(props);

    this.state = {
      activeCard: null,
      timeoutId: null
    };
  }

  public componentWillUnmount(): void {
    this._clearTimeout();
  }

  private _handleHover(film: FilmProps): void {
    const timeoutId = window.setTimeout((): void => {
      this.setState({activeCard: film, timeoutId: null});
    }, 1000);

    this._setTimeout(timeoutId);
  }

  private _handleClear(): void {
    this._clearTimeout();
    this.setState({activeCard: null});
  }

  private _setTimeout(timeoutId: number): void {
    this.setState({timeoutId});
  }

  private _clearTimeout(): void {
    const {timeoutId} = this.state;
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }

  public render(): JSX.Element[] {
    const {films} = this.props;
    const {activeCard} = this.state;

    return films.map((film): JSX.Element => (
      <SmallMovieCard
        key={film.id}
        film={film}
        isPlaying={activeCard ? film.id === activeCard.id : false}
        onMouseEnter={(f: FilmProps): void => this._handleHover(f)}
        onMouseLeave={(): void => this._handleClear()}
      />
    ));
  }
}

export default SmallMovieCardsList;
