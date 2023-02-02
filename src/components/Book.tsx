import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './Book.styles';

import moment from 'moment';
import {
  BookTwoTone,
  DeleteOutlined,
  DiffOutlined,
  EditOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface BookProps {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
  deleteBook: (bookId: number) => void;
  goEdit: (bookId: number) => void;
}

const Book = React.memo(
  ({
    bookId,
    title,
    author,
    createdAt,
    url,
    deleteBook,
    goEdit,
  }: BookProps) => {
    const clickDelete = () => {
      deleteBook(bookId);
    };
    const clickEdit = () => {
      goEdit(bookId);
    };

    return (
      <S.Book>
        <S.Title>
          <Link to={`/book/${bookId}`}>
            <BookTwoTone /> {title}
          </Link>
        </S.Title>
        <S.Author>
          <S.LinkColor to={`/book/${bookId}`}>
            <HighlightOutlined /> {author}
          </S.LinkColor>
        </S.Author>
        <S.Created>{moment(createdAt).format('YYYY-MM-DD- h:mm a')}</S.Created>
        <S.Tooltips>
          <Tooltip title={url}>
            <a href={url} target='_BLANK' rel='noreferrer'>
              {/* 버튼에 칠드런이 없는이유는 icon으로 아이콘그림을 넣어주기 위함 */}
              <S.ButtonUrl
                size='small'
                shape='circle'
                icon={<DiffOutlined />}
              />
            </a>
          </Tooltip>
          <Tooltip title='Edit'>
            <S.ButtonUrl
              size='small'
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={clickEdit}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              size='small'
              type='primary'
              shape='circle'
              danger
              icon={<DeleteOutlined />}
              onClick={clickDelete}
            />
          </Tooltip>
        </S.Tooltips>
      </S.Book>
    );
  }
);

export default Book;
