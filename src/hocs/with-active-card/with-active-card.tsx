import React, {PureComponent, ComponentClass, ReactElement} from 'react';

import {FilmProps} from 'src/types/films';

interface State {
  activeCard: FilmProps | null;
}

const withActiveCard = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithActiveCard extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        activeCard: null
      };

      this._setActiveCard = this._setActiveCard.bind(this);
      this._resetActiveCard = this._resetActiveCard.bind(this);
    }

    private _resetActiveCard(): void {
      this.setState({activeCard: null});
    }

    private _setActiveCard(film: FilmProps): void {
      this.setState({activeCard: film});
    }

    public render(): ReactElement {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          setActiveCard={this._setActiveCard}
          resetActiveCard={this._resetActiveCard}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
