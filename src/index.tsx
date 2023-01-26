import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import create from './redux/create';
import { Provider } from 'react-redux';

const store = create();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
