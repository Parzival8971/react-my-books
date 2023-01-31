import { TokenSerivce } from './../../services/TokenService';
import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { UserService } from '../../services/UserService';

import { LoginReqType } from '../../types';
import axios from 'axios';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'practs/auth' };
// export const success = () => ({type:PENDING})과 같은 형식
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
    // TokenAPI Post
    const token: string = yield call(UserService.login, action.payload);
    // Localstorege Set Token
    TokenSerivce.set(token);
    // Success
    yield put(success(token));
    // push not complate
    console.log(success(token));
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
    // State Get Token
    // state는 auth.ts파일을 뜻함
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
