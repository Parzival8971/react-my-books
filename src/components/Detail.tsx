import { ZoomInOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import Layout from './Layout';
import * as S from './Detail.styles';
import { BookResType } from '../types';
import { useEffect } from 'react';

interface DetailProps {
  book: BookResType | null | undefined;
  error: Error | null;
  back: () => void;
  edit: () => void;
  getBooks: () => void;
  logout: () => void;
}

const Detail = ({ book, error, edit, getBooks, back, logout }: DetailProps) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

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

  const goEdit = () => {
    edit();
  };

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ZoomInOutlined /> {book.title}
          </div>
        }
        subTitle={book.author}
        extra={[
          <Button key='2' type='primary' onClick={goEdit}>
            수정이동
          </Button>,
          <Button key='1' onClick={logout}>
            로그아웃
          </Button>,
        ]}
      />

      <S.BgBook src='/bg_book.jpg' alt='books' />

      <S.Detail>
        <S.InputTitle>
          제목
          <S.Required> *</S.Required>
        </S.InputTitle>
        <S.InputArea>
          <S.AntdInput
            value={book.title}
            readOnly
            placeholder='제목을 입력해주세요.'
          />
        </S.InputArea>
        <S.InputComment>
          내용
          <S.Required> *</S.Required>
        </S.InputComment>
        <S.InputArea>
          <S.AntdTextArea
            rows={8}
            value={book.message}
            readOnly
            placeholder='내용을 입력해주세요.'
          />
        </S.InputArea>
        <S.InputAuthor>
          작성자
          <S.Required> *</S.Required>
        </S.InputAuthor>
        <S.InputArea>
          <S.AntdInput
            value={book.author}
            readOnly
            placeholder='작성자를 입력해주세요.'
          />
        </S.InputArea>
        <S.InputUrl>
          URL
          <S.Required> *</S.Required>
        </S.InputUrl>
        <S.InputArea>
          <S.AntdInput
            value={book.url}
            readOnly
            placeholder='URL주소를 입력해주세요.'
          />
        </S.InputArea>
        <S.ButtonArea></S.ButtonArea>
      </S.Detail>
    </Layout>
  );
};

export default Detail;
