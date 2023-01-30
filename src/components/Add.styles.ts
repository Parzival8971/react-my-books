import styled from '@emotion/styled';
import { Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export const Add = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 40px;
  text-align: left;
  padding-left: 40px;
`;

export const Required = styled.span`
  color: #971931;
`;

export const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const AntdInput = styled(Input)`
  width: 720px;
  margin-right: 40px;
  margin-left: 40px;
  border-radius: 1px;
  border-width: 1px;
  min-height: 100;
  font-family: Roboto;
`;

export const AntdTextArea = styled(TextArea)`
  width: 720px;
  margin-right: 40px;
  margin-left: 40px;
  border-radius: 1px;
  border-width: 1px;
  min-height: 100;
  font-family: Roboto;
`;

export const InputComment = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 40px;
`;

export const InputAuthor = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 40px;
`;

export const InputUrl = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 40px;
`;

export const ButtonArea = styled.div`
  text-align: right;
  padding-right: 40px;
  margin-top: 20px;
`;

export const AtndButton = styled(Button)`
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  width: 120px;
`;
