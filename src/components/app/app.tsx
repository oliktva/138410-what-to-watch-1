import React, {FunctionComponent, ReactElement} from 'react';

import withUserPreload from 'src/hocs/with-user-preload/with-user-preload';
import Routes from 'src/routes';

const App: FunctionComponent = (): ReactElement => (
  <Routes />
);

export {App};

export default withUserPreload(App);
