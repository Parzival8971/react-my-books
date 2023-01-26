import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { List } from '../components/List';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';

import { getBooks as getBooksSaga } from '../redux/modules/books';
import { logout as logoutSaga } from '../redux/modules/auth';

export const ListContainer = () => {
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

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const goAdd = useCallback(() => {
    navigate('/add');
  }, [navigate]);

  return (
    <List
      books={books}
      loading={loading}
      getBooks={getBooks}
      error={error}
      logout={logout}
      goAdd={goAdd}
    />
  );
};
