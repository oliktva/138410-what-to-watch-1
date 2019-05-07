import React from 'react';

import Main from 'src/components/main/main';
import {films} from 'src/mocks/films';

const App = (): JSX.Element => (
  <Main films={films} />
);

export default App;
