import { useEffect } from 'react';
import Layout from './Layout';
import { Button, PageHeader, Table } from 'antd';

import { BookResType } from '../types';
import Book from './Book';

interface BooksProps {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
  getBooks: () => void;
  logout: () => void;
  goAdd: () => void;
}

export const List = ({
  books,
  loading,
  getBooks,
  error,
  logout,
  goAdd,
}: BooksProps) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  // data를 가져오다가 에러가 생겼을 경우 로직
  useEffect(() => {
    if (error) {
      logout();
    }
  }, []);

  const addBook = () => {};

  return (
    <Layout>
      <PageHeader
        title='나만의 책장'
        subTitle='리스트를 추가해보세요!'
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
            render: (_, record) => <Book {...record} />,
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
