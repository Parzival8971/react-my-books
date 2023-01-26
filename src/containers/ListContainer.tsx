import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { List } from '../components/List';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';

import { getBooks as getBooksSaga } from '../redux/modules/books';

export const ListContainer = () => {
  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  return <List books={books} loading={loading} getBooks={getBooks} />;
};
