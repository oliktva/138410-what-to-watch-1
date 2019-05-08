import React, {PureComponent} from 'react';

import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {FilmProps, filmsPropTypes} from 'src/types/films';

interface Props {
  films: FilmProps[];
}

interface State {
  activeCard: FilmProps | null;
  playCard: FilmProps | null;
}

class SmallMovieCardsList extends PureComponent<Props, State> {
  public static propTypes = {
    films: filmsPropTypes.isRequired
  }

  public constructor(props: Props) {
    super(props);

    this.state = {
      activeCard: null,
      playCard: null
    };
  }

  private _handlePlayVideo(film: FilmProps): void {
    this.setState({playCard: film});
  }

  private _handleHover(film: FilmProps): void {
    this.setState({activeCard: film});
  }

  private _handleClear(): void {
    this.setState({activeCard: null, playCard: null});
  }

  public render(): JSX.Element[] {
    const {films} = this.props;

    return films.map((film, index): JSX.Element => (
      <SmallMovieCard
        key={index}
        film={film}
        onClick={(f: FilmProps): void => this._handlePlayVideo(f)}
        onMouseEnter={(): void => this._handleHover(film)}
        onMouseLeave={(): void => this._handleClear()}
      />
    ));
  }
}

export default SmallMovieCardsList;
