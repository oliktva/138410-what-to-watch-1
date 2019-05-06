import React from 'react';
import {render} from 'react-dom';

import App from 'src/components/app/app';

const target = document.querySelector(`#root`);

render(
  <App />,
  target
);
