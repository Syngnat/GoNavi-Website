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
  expect(within(main).getByText('GoNavi / Native Database Workflow')).toBeInTheDocument();
  expect(within(main).getAllByRole('link', { name: '立即下载' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: 'GitHub' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: '立即下载' })[0]).toHaveAttribute('href', '/zh/download');
  expect(within(main).getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
  expect(within(main).getByRole('heading', { name: '常见数据库的统一入口' })).toBeInTheDocument();
  expect(within(main).getByText('工作流主叙事')).toBeInTheDocument();
  expect(within(main).getByText('产品切面')).toBeInTheDocument();
  expect(within(main).getByText('下载 / 文档 / 社区')).toBeInTheDocument();
  expect(within(main).getByText('编辑型产品官网')).toBeInTheDocument();
  expect(within(main).getByText('桌面版本目录')).toBeInTheDocument();
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
  expect(within(main).getByText('GoNavi / Native Database Workflow')).toBeInTheDocument();
  expect(within(main).getAllByRole('link', { name: 'Download' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: 'Download' })[0]).toHaveAttribute('href', '/en/download');
  expect(within(main).getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
    'href',
    'https://github.com/Syngnat/GoNavi',
  );
  expect(within(main).getByText('Workflow narrative')).toBeInTheDocument();
  expect(within(main).getByText('Product slices')).toBeInTheDocument();
  expect(within(main).getByText('Download / Docs / Community')).toBeInTheDocument();
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

test('renders the redesigned zh download and changelog entry pages', () => {
  render(
    <MemoryRouter initialEntries={['/zh/download']}>
      <App />
    </MemoryRouter>,
  );

  const main = screen.getByRole('main');

  expect(within(main).getByText('发布目录')).toBeInTheDocument();
  expect(within(main).getByRole('heading', { name: '从当前桌面 release 进入下载目录' })).toBeInTheDocument();
  expect(within(main).getByText('平台索引')).toBeInTheDocument();
});

test('renders the redesigned zh docs framing', () => {
  render(
    <MemoryRouter initialEntries={['/zh/docs']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getAllByText('文档目录')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: '把安装、连接和排查说明编排成一条连续阅读路径' })).toBeInTheDocument();
});

test('renders the redesigned zh changelog framing', () => {
  render(
    <MemoryRouter initialEntries={['/zh/changelog']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('版本时间线')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '按发布时间阅读 GoNavi 的发布轨迹' })).toBeInTheDocument();
});

test('renders the redesigned zh roadmap framing', () => {
  render(
    <MemoryRouter initialEntries={['/zh/roadmap']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('公开路线图')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '把产品方向、站点演进与社区协作放在同一份公开计划里' })).toBeInTheDocument();
});
