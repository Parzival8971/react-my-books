import React, { useEffect } from 'react';
import { Button, PageHeader, Table } from 'antd';
import Layout from './Layout';
import { BookType } from '../types';
import Book from './Book';
import styles from './List.module.css';

interface ListProps {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
  getBooks: () => void;
  logout: () => void;
  goAdd: () => void;
}

const List: React.FC<ListProps> = ({
  books,
  loading,
  getBooks,
  error,
  logout,
  goAdd,
}) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key='2'
            type='primary'
            onClick={goAdd}
            className={styles.button}
          >
            Add Book
          </Button>,
          <Button
            key='1'
            type='primary'
            onClick={logout}
            className={styles.button}
          >
            Logout
          </Button>,
        ]}
      />
      <Table
        dataSource={books || []}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => <Book {...record} />,
          },
        ]}
        loading={books === null || loading}
        // loading={false}
        showHeader={false}
        className={styles.table}
        rowKey='bookId'
        pagination={false}
      />
    </Layout>
  );
};

export default List;
