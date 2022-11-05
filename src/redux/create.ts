import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';
import { routerMiddleware } from 'connected-react-router';
import history from '../history';

const create = () => {
  const sagaMiddleware = createSagaMiddleware();

  const sotre = createStore(
    reducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return sotre;
};

export default create;
