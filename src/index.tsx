import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// antd-css 적용
import 'antd/dist/antd.css';
// redux-store
import create from './redux/create';
// provider 전달
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
