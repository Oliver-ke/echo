import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Echo',
  headerHeight: 48,
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '',
  layout: 'mix',
};

export default Settings;
