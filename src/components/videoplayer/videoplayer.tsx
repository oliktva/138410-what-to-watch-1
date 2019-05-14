import React, {PureComponent, RefObject} from 'react';
import PropTypes from 'prop-types';

interface Props {
  src: string;
  preview: string;
  isPlaying: boolean;
}

interface State {
  isLoading: boolean;
  isPlaying: boolean;
}

const propTypes = {
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

class Videoplayer extends PureComponent<Props, State> {
  public static propTypes = propTypes;

  private _videoRef: RefObject<HTMLVideoElement>;

  public constructor(props: Props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  public componentDidMount(): void {
    const {src, preview} = this.props;
    const video: HTMLVideoElement | null = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = preview;
      video.muted = true;

      video.oncanplaythrough = (): void => {
        this.setState({
          isLoading: false,
        });
      };

      video.onplay = (): void => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = (): void => {
        video.currentTime = 0;
        video.load();

        this.setState({
          isPlaying: false,
        });
      };
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (video && prevProps.isPlaying !== isPlaying) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  public componentWillUnmount(): void {
    const video: HTMLVideoElement | null = this._videoRef.current;

    if (video) {
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.src = ``;
    }
  }

  public render(): JSX.Element {
    return (
      <video className="player__video" ref={this._videoRef} />
    );
  }
}

export default Videoplayer;
