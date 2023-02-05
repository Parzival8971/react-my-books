import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
// antd-css 적용
import 'antd/dist/antd.css';
// redux-store
import create from './redux/create';
// provider 전달
import { Provider } from 'react-redux';

const store = create();
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
