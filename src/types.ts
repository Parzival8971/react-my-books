// Login 요청
export interface LoginReqType {
  email: string;
  password: string;
}

// Book 응답
export interface BookResType {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
  message: string;
}

// 요청
export interface BookReqType {
  title: string;
  author: string;
  message: string;
  url: string;
}
