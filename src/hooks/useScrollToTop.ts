import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동시 최상위로 이동 커스텀훅
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
