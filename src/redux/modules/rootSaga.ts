import { all } from 'redux-saga/effects';

import { authSagas } from './auth';
import { booksSaga } from './books';

export default function* rootSaga() {
  yield all([authSagas(), booksSaga()]);
}
