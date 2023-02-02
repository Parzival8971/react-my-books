import { FallbackProps } from 'react-error-boundary';

const Error = ({ error }: FallbackProps) => {
  if (error === undefined) {
    return <div>알수 없는 에러가 발생하였습니다.</div>;
  }
  return (
    <div>
      <h1>{`${error.message}의 에러가 발생하였습니다.`}</h1>
    </div>
  );
};

export default Error;
