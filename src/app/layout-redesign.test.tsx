import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders the redesigned shell with a GoNavi editorial header', () => {
  render(
    <MemoryRouter initialEntries={['/zh']}>
      <App />
    </MemoryRouter>,
  );

  const banner = screen.getByRole('banner');

  expect(banner).toHaveClass('site-header');
  expect(screen.getByRole('contentinfo')).toHaveClass('site-footer');
  expect(within(banner).getByText('GoNavi')).toBeInTheDocument();
  expect(within(banner).getByText('原生数据库工作流')).toBeInTheDocument();
  expect(within(banner).getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
  expect(within(banner).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
});
