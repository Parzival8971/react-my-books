import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { TokenSerivce } from '../services/TokenService';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// 페이지 이동시 App 다시 렌더링 됨을 막기위해 함수 밖에 설정
const sagaMiddleware = createSagaMiddleware();

const create = () => {
  const token = TokenSerivce.get();
  // 새로고침시 로컬토큰과 Reudx sotre부분이 싱크가 필요하기 때문에, 처음으로 store가 만들어질 때, 로컬토큰을 얻어서 initialState와 동기화 하는부분
  const store = createStore(
    rootReducer,
    {
      auth: {
        token: token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
