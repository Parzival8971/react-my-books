import { Button, PageHeader } from 'antd';
import Layout from './Layout';
import * as S from './Add.styles';

interface AddProps {
  loading: boolean;
  back: () => void;
  logout: () => void;
}

const Add = ({ loading, back, logout }: AddProps) => {
  const click = () => {};

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title='나만의 책장'
        subTitle='리스트를 추가해보세요!'
        extra={[
          <Button key='1' ghost={false} onClick={logout}>
            로그아웃
          </Button>,
        ]}
      />
      <S.Add>
        <S.InputTitle>
          제목
          <S.Required> *</S.Required>
        </S.InputTitle>
        <S.InputArea>
          <S.AntdInput placeholder='제목을 입력해주세요.' />
        </S.InputArea>
        <S.InputComment>
          내용
          <S.Required> *</S.Required>
        </S.InputComment>
        <S.InputArea>
          <S.AntdTextArea rows={8} placeholder='내용을 입력해주세요.' />
        </S.InputArea>
        <S.InputAuthor>
          작성자
          <S.Required> *</S.Required>
        </S.InputAuthor>
        <S.InputArea>
          <S.AntdInput placeholder='작성자를 입력해주세요.' />
        </S.InputArea>
        <S.InputUrl>
          URL
          <S.Required> *</S.Required>
        </S.InputUrl>
        <S.InputArea>
          <S.AntdInput placeholder='URL주소를 입력해주세요.' />
        </S.InputArea>
        <S.ButtonArea>
          <S.AtndButton
            size='large'
            type='primary'
            loading={loading}
            onClick={click}
          >
            추가하기
          </S.AtndButton>
        </S.ButtonArea>
      </S.Add>
    </Layout>
  );
};

export default Add;
