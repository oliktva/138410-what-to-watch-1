import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import configureAPI from 'src/api';
import reducer, {initialState} from 'src/reducers/reducer';
import App from 'src/components/app/app';

const api = configureAPI();
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  ) as any
);
const target = document.querySelector(`#root`);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
