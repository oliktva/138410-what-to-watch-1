import {PureComponent, ReactElement} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

interface OwnProps {
  children: ReactElement;
}

type Props = OwnProps & RouteComponentProps;

class ScrollToTop extends PureComponent<Props> {
  public componentDidUpdate(prevProps: Props): void {
    const {location} = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render(): ReactElement {
    const {children} = this.props;

    return children;
  }
}

export {ScrollToTop};

export default withRouter(ScrollToTop);
