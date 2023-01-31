import { useEffect } from 'react';
import { Button, PageHeader, Table } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { BookResType } from '../types';
import Layout from './Layout';
import Book from './Book';

interface BooksProps {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
  getBooks: () => void;
  logout: () => void;
  goAdd: () => void;
  deleteBook: (bookId: number) => void;
}

export const List = ({
  books,
  loading,
  getBooks,
  error,
  logout,
  goAdd,
  deleteBook,
}: BooksProps) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  // data를 가져오다가 에러가 생겼을 경우 로직
  useEffect(() => {
    // if (error) {
    //   logout();
    // }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={
          <div>
            <BookOutlined /> 나만의 책장
          </div>
        }
        subTitle='나만의 책장을 만들어 보세요!'
        extra={[
          <Button key='2' ghost type='primary' onClick={goAdd}>
            책 추가하기
          </Button>,
          <Button key='1' onClick={logout}>
            로그아웃
          </Button>,
        ]}
      />
      <Table
        dataSource={books || []}
        columns={[
          {
            title: '나의 책 목록',
            dataIndex: 'book',
            key: 'book',
            // ...record는 dataSource에 넣어준 값들을 펼쳐서 넣어줌
            render: (_, record) => <Book {...record} deleteBook={deleteBook} />,
          },
        ]}
        loading={books === null || loading}
        // 상단헤더 부분
        showHeader={true}
        rowKey='bookId'
        pagination={false}
      />
    </Layout>
  );
};
