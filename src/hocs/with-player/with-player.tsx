import React, {PureComponent, ReactElement, ComponentClass} from 'react';

export const ITEMS_PER_PAGE = 20;

interface State {
  isPlaying: boolean;
  isFullscreen: boolean;
  currentTime: number;
  fulltime: number;
}

const withPlayer = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithPlayer extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        isPlaying: false,
        isFullscreen: false,
        currentTime: 0,
        fulltime: 0
      };

      this._play = this._play.bind(this);
      this._stop = this._stop.bind(this);
      this._openFullscreen = this._openFullscreen.bind(this);
      this._closeFullscreen = this._closeFullscreen.bind(this);
      this._setCurrentTime = this._setCurrentTime.bind(this);
      this._setFulltime = this._setFulltime.bind(this);
    }

    public render(): ReactElement {
      const {isPlaying, isFullscreen, currentTime, fulltime} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isFullscreen={isFullscreen}
          currentTime={currentTime}
          fulltime={fulltime}
          play={this._play}
          stop={this._stop}
          openFullscreen={this._openFullscreen}
          closeFullscreen={this._closeFullscreen}
          setCurrentTime={this._setCurrentTime}
          setFulltime={this._setFulltime}
        />
      );
    }

    private _play(): void {
      this.setState({isPlaying: true});
    }

    private _stop(): void {
      this.setState({isPlaying: false});
    }

    private _openFullscreen(): void {
      this.setState({isFullscreen: true});
    }

    private _closeFullscreen(): void {
      this.setState({isFullscreen: false});
    }

    private _setCurrentTime(time: number): void {
      this.setState({currentTime: Math.floor(time)});
    }

    private _setFulltime(time: number): void {
      this.setState({fulltime: Math.floor(time)});
    }
  }

  return WithPlayer;
};

export default withPlayer;
