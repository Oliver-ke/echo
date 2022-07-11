import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { ApolloProvider } from '@apollo/client';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { createElement } from 'react';
import defaultSettings from '../config/defaultSettings';
import { client } from './apollo';
import { DEV } from './env.config';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
  token: string;
}> {
  const token = localStorage.getItem('token') || '';
  if (history.location.pathname !== loginPath) {
    // @TODO: perform some action based on login path
    return {
      token,
      settings: defaultSettings,
    };
  }
  return {
    token,
    settings: defaultSettings,
  };
}

// ProLayout https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.token && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    siderWidth: 208,
    links: DEV
      ? [
          <Link key="openapi" to="https://echo-be.herokuapp.com/graphql" target="_blank">
            <LinkOutlined />
            <span>Open Graphql Playground</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      if (initialState?.loading) return <h1>Loading..</h1>;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

export function rootContainer(container: any) {
  const Provider = () => <ApolloProvider client={client}> {container} </ApolloProvider>;
  return createElement(Provider, null, container);
}
