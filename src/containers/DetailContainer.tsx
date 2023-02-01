import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Detail from '../components/Detail';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';
import { logout as logoutSaga } from '../redux/modules/auth';
import { getBooks as getBooksSaga } from '../redux/modules/books';

const DetailContainer = () => {
  const { id } = useParams();
  const currentBookId = Number(id) || -1;

  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const edit = useCallback(() => {
    navigate(`/edit/${currentBookId}`);
  }, [currentBookId, navigate]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Detail
      book={
        books === null
          ? null
          : books.find((book) => book.bookId === currentBookId)
      }
      error={error}
      getBooks={getBooks}
      back={back}
      edit={edit}
      logout={logout}
    />
  );
};

export default DetailContainer;
