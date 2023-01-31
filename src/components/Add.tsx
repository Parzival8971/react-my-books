import { useRef } from 'react';
import { message as messageDialog, Button, Input, PageHeader } from 'antd';
import * as S from './Add.styles';
import Layout from './Layout';
import TextArea from 'antd/lib/input/TextArea';
import { BookReqType } from '../types';

interface AddProps {
  loading: boolean;
  back: () => void;
  logout: () => void;
  add: (book: BookReqType) => void;
}

const Add = ({ loading, back, logout, add }: AddProps) => {
  // 비제어 컴포넌트 사용 uncontrolled component
  const titleRef = useRef<Input>(null);
  const messageRef = useRef<TextArea>(null);
  const authorRef = useRef<Input>(null);
  const urlRef = useRef<Input>(null);

  // Non-null assertion operator 피연산자가 null이나 undefined 값이 아님을 단언
  const AddClick = () => {
    const title = titleRef.current!.state.value;
    const message = messageRef.current!.state.value;
    const author = authorRef.current!.state.value;
    const url = urlRef.current!.state.value;
    // 값이 없을때 막아주기 위함
    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.info('작성칸을 채워주세요!');
      return;
    }

    add({ title, message, author, url });
  };

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
          <S.AntdInput ref={titleRef} placeholder='제목을 입력해주세요.' />
        </S.InputArea>
        <S.InputComment>
          내용
          <S.Required> *</S.Required>
        </S.InputComment>
        <S.InputArea>
          <S.AntdTextArea
            ref={messageRef}
            rows={8}
            placeholder='내용을 입력해주세요.'
          />
        </S.InputArea>
        <S.InputAuthor>
          작성자
          <S.Required> *</S.Required>
        </S.InputAuthor>
        <S.InputArea>
          <S.AntdInput ref={authorRef} placeholder='작성자를 입력해주세요.' />
        </S.InputArea>
        <S.InputUrl>
          URL
          <S.Required> *</S.Required>
        </S.InputUrl>
        <S.InputArea>
          <S.AntdInput ref={urlRef} placeholder='URL주소를 입력해주세요.' />
        </S.InputArea>
        <S.ButtonArea>
          <S.AtndButton
            size='large'
            type='primary'
            loading={loading}
            onClick={AddClick}
          >
            추가하기
          </S.AtndButton>
        </S.ButtonArea>
      </S.Add>
    </Layout>
  );
};

export default Add;
