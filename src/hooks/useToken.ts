import { RootState } from './../redux/modules/rootReducer';
import { useSelector } from 'react-redux';

// token만 받는 custom hooks
export const useToken = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  return token;
};
