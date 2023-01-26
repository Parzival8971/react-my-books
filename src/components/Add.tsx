import { PageHeader } from 'antd';
import Layout from './Layout';

const Add = () => {
  return (
    <Layout>
      <PageHeader
        title='나만의 책장'
        subTitle='리스트를 추가해보세요!'
        extra={[]}
      />
    </Layout>
  );
};

export default Add;
