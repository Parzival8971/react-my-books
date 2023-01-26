import { createActions, handleActions } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BookService } from '../../services/BookService';

import { BookResType, customError } from '../../types';

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'practs/books' };

export const { pending, success, fail } = createActions(
  'SUCCESS',
  'PENDING',
  'FAIL',
  options
);

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const reducer = handleActions<BooksState, BookResType[]>(
  {
    PENDING: (state, action) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
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
export const { getBooks } = createActions('GET_BOOKS', options);

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookResType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    // 타입가드로 클래스 에러 객체 사용(에러 부분 어려움)
    // console.log(error.code);
    // console.log(error.message);
    // console.log(error?.response?.data?.error);
    if (error instanceof customError) {
      yield put(
        fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
      );
    } else {
      yield put(fail(new Error('UNKNOWN_ERROR')));
    }
  }
}
export function* booksSaga() {
  yield takeLatest(`${options.prefix}/GET_BOOKS`, getBooksSaga);
}
