import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import configureAPI from 'src/api';
import reducer, {initialState} from 'src/reducers/reducer';

import App from 'src/components/app/app';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

const api = configureAPI();
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);
const target = document.querySelector(`#root`);

render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  target
);
