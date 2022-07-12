import { LoginUserDocument } from '@/apollo';
import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { FormattedMessage, history } from '@umijs/max';
import { Alert, message } from 'antd';
import React from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [loginUser, { error }] = useMutation(LoginUserDocument);

  const handleSubmit = async (values: API.LoginParams) => {
    const { autoLogin, ...emailAndPassword } = values;
    await loginUser({
      variables: { input: emailAndPassword },
      onError: () => {
        const defaultLoginFailureMessage = 'Incorrect email or password';
        message.error(defaultLoginFailureMessage);
      },
      onCompleted: (data) => {
        console.log(data.login.accessToken);
        localStorage.setItem('token', data.login.accessToken);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title=""
          subTitle="WE RISE TOGETHER"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {error && <LoginMessage content="Login Error" />}
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Email Address"
              rules={[
                {
                  required: true,
                  message: 'Email is Required',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Enter Password"
              rules={[
                {
                  required: true,
                  message: 'Password is Required',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="Remember Me" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forget Password" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
