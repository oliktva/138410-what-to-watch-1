import React, {PureComponent, RefObject} from 'react';
import PropTypes from 'prop-types';

type VideoProps = HTMLVideoElement | null;

interface Props {
  src: string;
  preview: string;
  isPlaying: boolean;
}

const propTypes = {
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

class Videoplayer extends PureComponent<Props> {
  public static propTypes = propTypes;

  private _videoRef: RefObject<HTMLVideoElement>;

  public constructor(props: Props) {
    super(props);

    this._videoRef = React.createRef();
  }

  public componentDidMount(): void {
    const {src, preview} = this.props;
    const video: VideoProps = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = preview;
      video.muted = true;

      video.onpause = (): void => {
        this._resetPlayer(video);
      };
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    const {isPlaying} = this.props;
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

  private _resetPlayer(video: VideoProps): void {
    if (video) {
      video.currentTime = 0;
      video.load();
    }
  }

  public render(): JSX.Element {
    return (
      <video className="player__video" ref={this._videoRef} />
    );
  }
}

export default Videoplayer;
