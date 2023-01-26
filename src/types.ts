// Error 타입
export class CustomError_Class extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

// Login 요청
export interface LoginReqType {
  email: string;
  password: string;
}

// Book 요청
export interface BookResType {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
  message?: string;
}
