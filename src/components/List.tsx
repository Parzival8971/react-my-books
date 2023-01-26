import Layout from './Layout';
import { BookResType } from '../types';
import { useEffect } from 'react';

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

  return <Layout />;
};
