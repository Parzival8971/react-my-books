import { TokenSerivce } from './../../services/TokenService';
import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { UserService } from '../../services/UserService';

import { CustomError_Class, LoginReqType } from '../../types';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'practs/auth' };

export const { success, pending, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  options
);

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    // token은 string이지만 error는 보류
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options
);

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', options);

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}

function* loginSaga(action: LoginSagaAction) {
  try {
    yield put(pending());
    // TokenAPI Post
    const token: string = yield call(UserService.login, action.payload);
    // Localstorege Set Token
    TokenSerivce.set(token);
    // Success
    yield put(success(token));
    // push not complate
  } catch (error: unknown) {
    // 타입가드로 클래스 에러 객체 사용(에러 부분 어려움)
    // console.log(error.code);
    // console.log(error.message);
    // console.log(error?.response?.data?.error);
    if (error instanceof CustomError_Class) {
      yield put(
        fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
      );
    } else {
      yield put(fail(new Error('UNKNOWN_ERROR')));
    }
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    // State Get Token
    const token: string = yield select((state) => state.auth.token);
    // TokenAPI Delete
    yield call(UserService.logout, token);
    // push
  } catch (error) {
  } finally {
    // Localstorege Remove Token
    TokenSerivce.remove();
    yield put(success(null));
  }
}

export function* authSagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
}
