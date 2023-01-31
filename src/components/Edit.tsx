import { useEffect, useRef } from 'react';
import { message as messageDialog, Button, PageHeader, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

import Layout from './Layout';
import { BookReqType, BookResType } from '../types';
import * as S from './Edit.styles';

interface EditProps {
  book: BookResType | undefined | null;
  edit: (book: BookReqType) => void;
  back: () => void;
  logout: () => void;
  loading: boolean;
  error: Error | null;
  getBooks: () => void;
}

const Edit = ({
  book,
  edit,
  back,
  logout,
  loading,
  error,
  getBooks,
}: EditProps) => {
  // 비제어 컴포넌트 사용 uncontrolled component
  const titleRef = useRef<Input>(null);
  const messageRef = useRef<TextArea>(null);
  const authorRef = useRef<Input>(null);
  const urlRef = useRef<Input>(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  if (book === null) {
    return null;
  }

  if (book === undefined) {
    return (
      <div>
        <h1>NotFound Book</h1>
      </div>
    );
  }

  // Non-null assertion operator 피연산자가 null이나 undefined 값이 아님을 단언
  const EditClick = () => {
    const title = titleRef.current!.state.value;
    const message = messageRef.current!.state.value;
    const author = authorRef.current!.state.value;
    const url = urlRef.current!.state.value;
    // 수정된 내용이 없을때
    if (
      book?.title === title &&
      book?.message === message &&
      book?.author === author &&
      book?.url === url
    ) {
      messageDialog.info('수정된 내용이 없습니다.');
      return;
    }
    // 값이 없을때 막아주기 위함
    if (
      title.length === 0 ||
      message.length === 0 ||
      author.length === 0 ||
      url.length === 0
    ) {
      messageDialog.info('작성칸을 수정해 주세요!');
      return;
    }
    edit({ title, message, author, url });
  };

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <FormOutlined /> 정보 수정하기
          </div>
        }
        subTitle='책 내용을 수정해주세요!'
        extra={[
          <Button key='1' onClick={logout}>
            Logout
          </Button>,
        ]}
      />
      <S.BgBook src='/bg_book.jpg' alt='books' />

      <S.Edit>
        <S.InputTitle>
          제목
          <S.Required> *</S.Required>
        </S.InputTitle>
        <S.InputArea>
          <S.AntdInput
            ref={titleRef}
            defaultValue={book?.title || ''}
            placeholder='제목을 입력해주세요.'
          />
        </S.InputArea>
        <S.InputComment>
          내용
          <S.Required> *</S.Required>
        </S.InputComment>
        <S.InputArea>
          <S.AntdTextArea
            ref={messageRef}
            defaultValue={book?.message || ''}
            rows={8}
            placeholder='내용을 입력해주세요.'
          />
        </S.InputArea>
        <S.InputAuthor>
          작성자
          <S.Required> *</S.Required>
        </S.InputAuthor>
        <S.InputArea>
          <S.AntdInput
            ref={authorRef}
            defaultValue={book?.author || ''}
            placeholder='작성자를 입력해주세요.'
          />
        </S.InputArea>
        <S.InputUrl>
          URL
          <S.Required> *</S.Required>
        </S.InputUrl>
        <S.InputArea>
          <S.AntdInput
            ref={urlRef}
            defaultValue={book?.url || ''}
            placeholder='URL주소를 입력해주세요.'
          />
        </S.InputArea>
        <S.ButtonArea>
          <S.AtndButton
            size='large'
            loading={loading}
            type='primary'
            onClick={EditClick}
          >
            수정하기
          </S.AtndButton>
        </S.ButtonArea>
      </S.Edit>
    </Layout>
  );
};

export default Edit;
