import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { doCheckToken } from './actions/authActions';
import { doGetConfig } from './actions/configActions';

import './index.scss';
import App from './components/app/App';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
  )
);

store.dispatch(doCheckToken());
store.dispatch(doGetConfig());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
