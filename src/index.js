import React from 'react';
import {render} from 'react-dom';

import Main from './components/main/main.jsx';

const target = document.querySelector(`#root`);

render(
  <Main />,
  target
);
