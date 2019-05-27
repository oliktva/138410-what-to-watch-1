import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from 'src/reducer';
import App from 'src/components/app/app';

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
const target = document.querySelector(`#root`);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
