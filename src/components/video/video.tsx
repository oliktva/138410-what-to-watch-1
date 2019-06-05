import React, {PureComponent, RefObject, ReactElement} from 'react';
import PropTypes from 'prop-types';

type VideoProps = HTMLVideoElement | null;

interface Props {
  src: string;
  preview: string;
  isPlaying: boolean;
  isFullscreen: boolean;
  needReset: boolean;
  togglePlaying: ({isPlaying}: {isPlaying: boolean}) => void;
  setCurrentTime: (time: number) => void;
  setFulltime: (time: number) => void;
  closeFullscreen: () => void;
}

const propTypes = {
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool,
  needReset: PropTypes.bool,
  togglePlaying: PropTypes.func,
  setCurrentTime: PropTypes.func,
  closeFullscreen: PropTypes.func,
  setFulltime: PropTypes.func
};

const defaultProps = {
  needReset: true,
  isFullscreen: false,
  togglePlaying: (): void => {},
  setCurrentTime: (): void => {},
  closeFullscreen: (): void => {},
  setFulltime: (): void => {}
};

class Video extends PureComponent<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  private _videoRef: RefObject<HTMLVideoElement>;

  public constructor(props: Props) {
    super(props);

    this._videoRef = React.createRef();
  }

  public componentDidMount(): void {
    const {
      src,
      preview,
      needReset,
      setCurrentTime,
      setFulltime,
      togglePlaying
    } = this.props;

    const video: VideoProps = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = preview;
      video.muted = true;

      video.oncanplay = (): void => setFulltime(video.duration);

      video.onplay = (): void => {
        togglePlaying({isPlaying: true});
      };

      video.onpause = (): void => {
        togglePlaying({isPlaying: false});

        if (needReset) {
          this._resetPlayer(video);
        }
      };

      video.ontimeupdate = (): void => {
        setCurrentTime(video.currentTime);
      };
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    const {isPlaying, isFullscreen} = this.props;
    const video = this._videoRef.current;

    if (video && prevProps.isPlaying !== isPlaying) {
      if (isPlaying) {
        video.play()
          .catch((): void => {
            this._resetPlayer(video);
          });
      } else {
        video.pause();
      }
    }

    if (video && prevProps.isFullscreen !== isFullscreen) {
      if (isFullscreen) {
        this._openFullscreen();
      }

    }
  }

  public componentWillUnmount(): void {
    const video: VideoProps = this._videoRef.current;

    if (video) {
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.src = ``;
    }
  }

  public render(): ReactElement {
    return (
      <video className="player__video" ref={this._videoRef} />
    );
  }

  private _resetPlayer(video: VideoProps): void {
    if (video) {
      video.currentTime = 0;
      video.load();
    }
  }

  private _openFullscreen(): void {
    const {closeFullscreen} = this.props;
    const video: any = this._videoRef.current;
    let fullscreen: Promise<void> | null = null;

    if (video) {
      if (video.requestFullscreen) {
        fullscreen = video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        fullscreen = video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        fullscreen = video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        fullscreen = video.msRequestFullscreen();
      }
    }

    if (fullscreen) {
      fullscreen.then((): void => {
        document.onfullscreenchange = closeFullscreen;
      });
    }
  }
}

export default Video;
