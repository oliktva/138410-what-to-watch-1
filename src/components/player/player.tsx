import React, {PureComponent, Fragment, ReactElement} from 'react';
import PropTypes from 'prop-types';

import withPlayer from 'src/hocs/with-player/with-player';
import Video from 'src/components/video/video';

import {FilmProps, filmPropTypes} from 'src/types/films';

interface OwnProps {
  film: FilmProps;
}

interface WithPlayerProps {
  isPlaying: boolean;
  isFullscreen: boolean;
  fulltime: number;
  currentTime: number;
  play: () => void;
  stop: () => void;
  openFullscreen: () => void;
  closeFullscreen: () => void;
  setCurrentTime: (time: number) => void;
  setFulltime: (time: number) => void;
  closePlayer: () => void;
}

type Props = OwnProps & WithPlayerProps;

const propTypes = {
  film: filmPropTypes.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  fulltime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  openFullscreen: PropTypes.func.isRequired,
  closeFullscreen: PropTypes.func.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  setFulltime: PropTypes.func.isRequired,
  closePlayer: PropTypes.func.isRequired
};

const addZeroIfNeed = (value: number): string => {
  const digitsLength = value.toString().length;

  return digitsLength === 1 ? `0${value}` : value.toString();
};

const formatTime = (time: number): string => {
  const date = new Date(time * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getSeconds();

  return `${hh}:${addZeroIfNeed(mm)}:${addZeroIfNeed(ss)}`;
};

class Player extends PureComponent<Props> {
  public static propTypes = propTypes;

  public constructor(props: Props) {
    super(props);

    this._synchronizePlaying = this._synchronizePlaying.bind(this);
    this._handlePlayingToggle = this._handlePlayingToggle.bind(this);
    this._handlePlayerClose = this._handlePlayerClose.bind(this);
    this._handleFullscreenOpen = this._handleFullscreenOpen.bind(this);
  }

  public render(): ReactElement {
    const {
      film,
      isPlaying,
      isFullscreen,
      setCurrentTime,
      closeFullscreen,
      setFulltime
    } = this.props;

    return (
      <div className="player">
        <Video
          src={film.videoLink}
          preview={film.previewImage}
          isPlaying={isPlaying}
          isFullscreen={isFullscreen}
          needReset={false}
          setCurrentTime={setCurrentTime}
          setFulltime={setFulltime}
          closeFullscreen={closeFullscreen}
          synchronizePlaying={this._synchronizePlaying}
        />
        <button type="button" className="player__exit" onClick={this._handlePlayerClose}>Exit</button>
        {this._renderControls()}
      </div>
    );
  }

  private _handlePlayerClose(): void {
    this.props.closePlayer();
  }

  private _handleFullscreenOpen(): void {
    this.props.openFullscreen();
  }

  private _synchronizePlaying({isPlaying}: {isPlaying: boolean}): void {
    const {play, stop} = this.props;

    if (!this.props.isPlaying && isPlaying) {
      play();
    } else if (this.props.isPlaying && !isPlaying) {
      stop();
    }
  }

  private _handlePlayingToggle(): void {
    const {isPlaying, play, stop} = this.props;

    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }

  private _renderControls(): ReactElement {
    const {
      film,
      isPlaying,
      currentTime,
      fulltime
    } = this.props;

    const progress = fulltime ? (currentTime / fulltime) * 100 : 0;

    return (
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatTime(currentTime)}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={this._handlePlayingToggle}>
            {isPlaying ? this._renderPauseButton() : this._renderPlayButton()}
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={this._handleFullscreenOpen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use href="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    );
  }

  private _renderPlayButton(): ReactElement {
    return (
      <Fragment>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use href="#play-s" />
        </svg>
        <span>Play</span>
      </Fragment>
    );
  }

  private _renderPauseButton(): ReactElement {
    return (
      <Fragment>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use href="#pause"></use>
        </svg>
        <span>Pause</span>
      </Fragment>
    );
  }
}

export {Player};

export default withPlayer(Player);
