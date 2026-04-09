import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import App from '../App';

function LocationProbe() {
  const location = useLocation();

  return <div data-testid="pathname">{location.pathname}</div>;
}

test('renders the locale-aware shell on a nested zh route', () => {
  render(
    <MemoryRouter initialEntries={['/zh/docs/quick-start']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/zh');
  expect(screen.getByRole('link', { name: 'Download' })).toHaveAttribute('href', '/zh/download');
  expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/zh/docs');
  expect(screen.getByRole('link', { name: 'Changelog' })).toHaveAttribute('href', '/zh/changelog');
  expect(screen.getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '/zh/roadmap');
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
  expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/docs/quick-start');
  expect(within(screen.getByRole('main')).getAllByRole('heading', { name: '快速开始' }).length).toBeGreaterThan(0);
});

test('renders the locale switch correctly on a nested en route', () => {
  render(
    <MemoryRouter initialEntries={['/en/docs/quick-start']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/en');
  expect(screen.getByRole('link', { name: 'ZH' })).toHaveAttribute('href', '/zh/docs/quick-start');
  expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/docs/quick-start');
  expect(within(screen.getByRole('main')).getAllByRole('heading', { name: 'Quick Start' }).length).toBeGreaterThan(0);
});

test('renders the branded homepage hero on the zh homepage', () => {
  render(
    <MemoryRouter initialEntries={['/zh']}>
      <App />
    </MemoryRouter>,
  );

  const main = screen.getByRole('main');

  expect(
    within(main).getByRole('heading', { name: '为多数据库工作流而生的原生桌面工作台' }),
  ).toBeInTheDocument();
  expect(within(main).getAllByRole('link', { name: '立即下载' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: 'GitHub' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: '立即下载' })[0]).toHaveAttribute('href', '/zh/download');
  expect(within(main).getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
  expect(within(main).getByRole('heading', { name: '常见数据库的统一入口' })).toBeInTheDocument();
  expect(within(main).getByText('能力序列')).toBeInTheDocument();
  expect(within(main).getByText('界面片段')).toBeInTheDocument();
  expect(within(main).getByText('行动入口')).toBeInTheDocument();
});

test('renders the branded homepage hero on the en homepage', () => {
  render(
    <MemoryRouter initialEntries={['/en']}>
      <App />
    </MemoryRouter>,
  );

  const main = screen.getByRole('main');

  expect(
    within(main).getByRole('heading', { name: 'A native desktop workstation for multi-database workflows' }),
  ).toBeInTheDocument();
  expect(within(main).getAllByRole('link', { name: 'Download' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: 'Download' })[0]).toHaveAttribute('href', '/en/download');
  expect(within(main).getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
});

test('preserves search and hash when switching locales on internal pages', () => {
  render(
    <MemoryRouter initialEntries={['/zh/docs/quick-start?tab=api#install']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'ZH' })).toHaveAttribute(
    'href',
    '/zh/docs/quick-start?tab=api#install',
  );
  expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute(
    'href',
    '/en/docs/quick-start?tab=api#install',
  );
});

test('redirects the root path to /zh', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <LocationProbe />
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByTestId('pathname')).toHaveTextContent('/zh');
});
