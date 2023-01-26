import styled from '@emotion/styled';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const Book = styled.div`
  display: table;
  overflow: hidden;
  table-layout: fixed;
`;

export const Title = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
`;

export const LinkColor = styled(Link)`
  color: #8a8a8a;
`;

export const Author = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
`;

export const Created = styled.div`
  color: #999999;
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  padding-left: 10px;
`;

export const Tooltips = styled.div`
  color: #999999;
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  padding-left: 10px;
`;

export const ButtonUrl = styled(Button)`
  margin-right: 5px;
`;
