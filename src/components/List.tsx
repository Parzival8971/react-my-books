import { useEffect } from 'react';
import Layout from './Layout';
import { Button, PageHeader, Table } from 'antd';

import { BookResType } from '../types';

interface BooksProps {
  books: BookResType[] | null;
  loading: boolean;
  getBooks: () => void;
}

export const List = ({ books, loading, getBooks }: BooksProps) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const addBook = () => {};
  const logout = () => {};
  const goAdd = () => {};

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
            render: (_, record) => <div>book</div>,
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
