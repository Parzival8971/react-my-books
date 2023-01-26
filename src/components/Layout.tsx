import { ReactNode } from 'react';
import * as S from './Layout.styles';

interface ChildernProps {
  children: ReactNode;
}

const Layout = ({ children }: ChildernProps) => {
  return <S.Layout>{children}</S.Layout>;
};

export default Layout;
