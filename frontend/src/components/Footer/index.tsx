import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'Built with ❤️ for Planetscale x Hashnode hackathon';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'ECHO',
          title: 'ECHO',
          href: 'https://website.echo.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
