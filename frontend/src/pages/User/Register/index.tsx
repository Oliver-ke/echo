import { RegisterUserDocument, SignupInput } from '@/apollo';
import { USER_TYPE_ENUM } from '@/typings/types';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage as RegisterFormPage,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { history, Link } from '@umijs/max';
import { message, Tabs } from 'antd';
import { FC, useState } from 'react';
import styles from './index.less';

interface FormInput extends SignupInput {
  confirmPassword: String;
}

const RegisterPage: FC = () => {
  const [userType, setUserType] = useState<USER_TYPE_ENUM>(USER_TYPE_ENUM.FELLOW);
  const [registerUser] = useMutation(RegisterUserDocument);

  const handleSubmit = async (value: FormInput) => {
    const { email, password, confirmPassword, firstname, lastname } = value;

    if (password !== confirmPassword) {
      return message.error('Confirm password must match password');
    }

    await registerUser({
      variables: { input: { email, password, firstname, lastname } },
      onError: () => {
        const defaultLoginFailureMessage = 'Incorrect form input';
        message.error(defaultLoginFailureMessage);
      },
      onCompleted: (data) => {
        console.log(data.signup.accessToken);
        localStorage.setItem('token', data.signup.accessToken);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      },
    });
  };

  return (
    <div className={styles.containerP1}>
      <div className={styles.containerP2}>
        <div className={styles.formContainer}>
          <RegisterFormPage
            backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
            logo={<img alt="logo" src="/logo.svg" />}
            title=""
            subTitle="we rise together"
            onFinish={async (values) => {
              await handleSubmit(values as FormInput);
            }}
            actions={
              <div className={styles.actionContainer}>
                <span>
                  Already have an account? <Link to="/user/login">Login</Link>
                </span>
              </div>
            }
          >
            <Tabs
              activeKey={userType}
              type="card"
              onChange={(activeKey) => setUserType(activeKey as USER_TYPE_ENUM)}
            >
              <Tabs.TabPane key={USER_TYPE_ENUM.FELLOW} tab={'As Fellow'} />
              <Tabs.TabPane key={USER_TYPE_ENUM.COACH} tab={'As Coach'} />
            </Tabs>
            <ProFormText
              name="firstname"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder="Enter First Name"
              rules={[
                {
                  required: true,
                  message: 'First Name is required',
                },
              ]}
            />
            <ProFormText
              name="lastname"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder="Enter Last Name"
              rules={[
                {
                  required: true,
                  message: 'Last Name is required',
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={'prefixIcon'} />,
              }}
              placeholder="Enter Email"
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'Only emails are allowed',
                },
              ]}
            />
            {userType === USER_TYPE_ENUM.COACH && (
              <ProFormSelect
                name="specialization"
                valueEnum={{
                  Drug: 'Drug Withdrawn',
                  Cancer: 'Cancer',
                  Accident: 'Accident',
                  MentalHealth: 'MentalHealth',
                }}
                fieldProps={{
                  size: 'large',
                }}
                placeholder="Select Your Specialization"
                rules={[{ required: true, message: 'Please select your country!' }]}
              />
            )}
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder="Enter Password"
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters',
                },
              ]}
            />
            <ProFormText.Password
              name="confirmPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder="Enter Confirm Password"
              rules={[
                {
                  required: true,
                  message: 'Confirm Password is required',
                },
              ]}
            />
          </RegisterFormPage>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
