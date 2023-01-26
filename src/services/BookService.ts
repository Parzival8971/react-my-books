import axios from 'axios';
import { BookResType } from '../types';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';

export const BookService = {
  async getBooks(token: string): Promise<BookResType[]> {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async addBook(book: BookResType, token: string): Promise<BookResType> {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
