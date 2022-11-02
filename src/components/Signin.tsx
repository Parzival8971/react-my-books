import { Button, Col, Input, Row } from 'antd';
import styles from './Signin.module.css';

const Signin = () => {
  return (
    <Row align='middle' className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              className={styles.signin_bg}
              alt='Signin'
              src='/bg_signin.png'
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email<span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                className={styles.input}
                placeholder='Email'
                autoComplete='email'
                name='email'
              />
            </div>
            <div className={styles.password_title}>
              Password<span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                className={styles.input}
                type='password'
                autoComplete='current-password'
                name='email'
              />
            </div>
            <div className={styles.button_area}>
              <Button className={styles.button} size='large'>
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Signin;
