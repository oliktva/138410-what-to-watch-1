import React from 'react';
import {render} from 'react-dom';

import Main from './components/main/main.tsx';

const target = document.querySelector(`#root`);

render(
  <Main />,
  target
);
