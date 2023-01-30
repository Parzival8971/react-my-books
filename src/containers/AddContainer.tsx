import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Add from '../components/Add';
import { RootState } from '../redux/modules/rootReducer';
import { logout as logoutSaga } from '../redux/modules/auth';

const AddContainer = () => {
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return <Add loading={loading} back={back} logout={logout} />;
};

export default AddContainer;
