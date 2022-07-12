import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from '@umijs/max';
import { Alert } from 'antd';
import React, { useState } from 'react';
import { LoginUserDocument } from '../../../graphql-operations';
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
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [loginUser, { loading, error }] = useMutation(LoginUserDocument);
  console.log(loading, error);
  const handleSubmit = async (values: API.LoginParams) => {
    const { autoLogin, ...emailAndPassword } = values;
    await loginUser({
      variables: { input: emailAndPassword },
      onError: () => {
        // show error message
      },
      onCompleted: (data) => {
        console.log(data.login.accessToken);
      },
    });
    // try {
    //   const msg = await login({ ...values, type: 'account' });
    //   if (msg.status === 'ok') {
    //     const defaultLoginSuccessMessage = 'Login successful';
    //     message.success(defaultLoginSuccessMessage);
    //     const urlParams = new URL(window.location.href).searchParams;
    //     history.push(urlParams.get('redirect') || '/');
    //     return;
    //   }
    //   setUserLoginState(msg);
    // } catch (error) {
    //   const defaultLoginFailureMessage = 'Incorrect email or password';
    //   console.log(error);
    //   message.error(defaultLoginFailureMessage);
    // }
  };
  const { status, type: loginType } = userLoginState;

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
          {status === 'error' && <LoginMessage content="Login Error" />}
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
          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage content="Unable to process request" />
          )}
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
