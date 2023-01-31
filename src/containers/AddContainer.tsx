import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Add from '../components/Add';
import { RootState } from '../redux/modules/rootReducer';
import { logout as logoutSaga } from '../redux/modules/auth';
import {
  addBook as addBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';
import { BookReqType, BookResType } from '../types';

const AddContainer = () => {
  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const add = useCallback(
    (book: BookReqType) => {
      dispatch(addBookSaga(book));
      navigate('/');
    },
    [dispatch, navigate]
  );

  return (
    <Add
      books={books}
      getBooks={getBooks}
      add={add}
      loading={loading}
      back={back}
      logout={logout}
      error={error}
    />
  );
};

export default AddContainer;
