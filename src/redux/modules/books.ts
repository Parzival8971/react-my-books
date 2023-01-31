import axios from 'axios';
import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BookService } from '../../services/BookService';
import { BookReqType, BookResType } from '../../types';

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'practs/books' };

export const { pending, success, fail } = createActions(
  {
    SUCCESS: (books) => books,
  },
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
export const { getBooks, addBook, deleteBook, editBook } = createActions(
  {
    ADD_BOOK: (book: BookReqType) => book,
    DELETE_BOOK: (bookId: string) => bookId,
    EDIT_BOOK: (bookId: string, book: BookReqType) => ({ bookId, book }),
  },
  'GET_BOOKS',

  options
);

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookResType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
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

interface AddBookSagaAction extends AnyAction {
  payload: BookReqType;
}

function* addBookSaga(action: AddBookSagaAction) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const book: BookResType = yield call(
      BookService.addBook,
      token,
      action.payload
    );
    const books: BookResType[] = yield select((state) => state.books.books);
    yield put(success([...books, book]));
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

interface DeleteBookSagaAction extends AnyAction {
  bookId: number;
}

function* deleteBookSaga(action: DeleteBookSagaAction) {
  try {
    const bookId = action.payload;
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(BookService.deleteBook, token, bookId);
    const books: BookResType[] = yield select((state) => state.books.books);
    yield put(success(books.filter((book) => book.bookId !== bookId)));
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
interface EditBookSagaAction extends AnyAction {
  payload: {
    bookId: number;
    book: BookReqType;
  };
}

function* editBookSaga(action: EditBookSagaAction) {
  console.log(action);
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const newBook: EditBookSagaAction = yield call(
      BookService.editBook,
      token,
      action.payload.bookId,
      action.payload.book
    );
    const books: BookResType[] = yield select((state) => state.books.books);
    yield put(
      success(
        books.map((book) => (book.bookId === newBook.bookId ? newBook : book))
      )
    );
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

export function* booksSaga() {
  yield takeLatest(`${options.prefix}/GET_BOOKS`, getBooksSaga);
  yield takeLatest(`${options.prefix}/ADD_BOOK`, addBookSaga);
  yield takeLatest(`${options.prefix}/DELETE_BOOK`, deleteBookSaga);
  yield takeLatest(`${options.prefix}/EDIT_BOOK`, editBookSaga);
}
