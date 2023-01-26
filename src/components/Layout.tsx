import * as S from './Layout.styles';

interface ChildernProps {
  children: JSX.Element;
}

const Layout = ({ children }: ChildernProps) => {
  return <S.Layout>{children}</S.Layout>;
};

export default Layout;
