import { TokenSerivce } from './../../services/TokenService';
import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { UserService } from '../../services/UserService';

import { LoginReqType } from '../../types';
import axios from 'axios';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'mybooks/auth' };
// export const success = (token) => ({type:PENDING, payload: token})과 같은 형식
export const { success, pending, fail } = createActions(
  {
    SUCCESS: (token: string) => token,
  },
  'PENDING',
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
export const { login, logout } = createActions(
  {
    LOGIN: ({ email, password }: LoginReqType) => ({
      email,
      password,
    }),
  },
  'LOGOUT',
  options
);

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}

function* loginSaga(action: LoginSagaAction) {
  try {
    yield put(pending());
    // 토큰 api
    const token: string = yield call(UserService.login, action.payload);
    // 로컬에 저장
    TokenSerivce.set(token);
    // 지연시간 생성
    yield delay(1000);
    // 성공
    yield put(success(token));
    // 확인용
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error('error message: ', error);
      console.error('error message: ', error?.response?.data?.error);
      yield put(
        fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
      );
    } else {
      console.error('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    // 로컬 토큰 get
    // state는 auth.ts파일을 뜻함
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
  } catch (error) {
  } finally {
    // 로컬 토큰 삭제
    TokenSerivce.remove();
    yield put(success(null));
  }
}

export function* authSagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
}
