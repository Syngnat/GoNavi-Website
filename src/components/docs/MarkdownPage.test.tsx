import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MarkdownPage from './MarkdownPage';

test('rewrites relative markdown links to locale-aware docs routes', () => {
  render(
    <MemoryRouter>
      <MarkdownPage body="See [Install](./install.md)." locale="zh" title="快速开始" />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'Install' })).toHaveAttribute('href', '/zh/docs/install');
});
