import React, {PureComponent} from 'react';

import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {FilmProps, filmsPropTypes} from 'src/types/films';

interface Props {
  films: FilmProps[];
}

interface State {
  activeCard: FilmProps | null;
}

class SmallMovieCardsList extends PureComponent<Props, State> {
  public static propTypes = {
    films: filmsPropTypes.isRequired
  }

  public constructor(props: Props) {
    super(props);

    this.state = {
      activeCard: null
    };
  }

  private _handleHover(film: FilmProps): void {
    setTimeout((): void => {
      this.setState({activeCard: film});
    }, 1000);
  }

  private _handleClear(): void {
    this.setState({activeCard: null});
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
