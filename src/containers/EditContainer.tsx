import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Edit from '../components/Edit';
import {
  editBook as editBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';
import { RootState } from '../redux/modules/rootReducer';
import { logout as logoutSaga } from '../redux/modules/auth';
import { BookReqType, BookResType } from '../types';

const EditContainer = () => {
  const { id } = useParams();
  const currentBookId = Number(id) || -1;

  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const edit = useCallback(
    (book: BookReqType) => {
      dispatch(editBookSaga(currentBookId, book));
      navigate('/');
    },
    [dispatch, currentBookId, navigate]
  );

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Edit
      book={
        books === null
          ? null
          : books.find((book) => book.bookId === currentBookId)
      }
      getBooks={getBooks}
      error={error}
      loading={loading}
      edit={edit}
      back={back}
      logout={logout}
    />
  );
};

export default EditContainer;
