import React, {PureComponent, ReactNode} from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface OwnProps {
  children?: ReactNode;
} 

type Props = OwnProps & RouteComponentProps;

class ScrollToTop extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const {location} = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {children} = this.props;

    return children;
  }
}

export {ScrollToTop};

export default withRouter(ScrollToTop);