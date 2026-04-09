import { render, screen, waitFor } from '@testing-library/react';
import { fallbackReleases } from '../content/changelog-fallback';
import { useReleaseFeed } from './useReleaseFeed';

function ReleaseFeedProbe() {
  const { loading, releases, error } = useReleaseFeed();

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="count">{String(releases.length)}</span>
      <span data-testid="first-tag">{releases[0]?.tag ?? 'none'}</span>
      <span data-testid="error">{error ?? 'none'}</span>
    </div>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

test('falls back to local releases when GitHub feed fails', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

  render(<ReleaseFeedProbe />);

  await waitFor(() => {
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  expect(screen.getByTestId('count')).toHaveTextContent(String(fallbackReleases.length));
  expect(screen.getByTestId('first-tag')).toHaveTextContent(fallbackReleases[0]?.tag ?? 'none');
  expect(screen.getByTestId('error')).toHaveTextContent('network down');
});

test('uses public GitHub releases when the feed succeeds', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify([
        {
          tag_name: 'draft-build',
          name: 'Draft build',
          draft: true,
          assets: [],
        },
        {
          tag_name: 'v0.6.6',
          name: 'GoNavi v0.6.6',
          draft: false,
          prerelease: false,
          published_at: '2026-04-09T12:00:00Z',
          assets: [
            {
              name: 'GoNavi-0.6.6-Windows-Amd64.exe',
              browser_download_url: 'https://example.com/windows.exe',
              size: 1024,
            },
          ],
        },
      ]),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ),
  );

  render(<ReleaseFeedProbe />);

  await waitFor(() => {
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  expect(screen.getByTestId('count')).toHaveTextContent('1');
  expect(screen.getByTestId('first-tag')).toHaveTextContent('v0.6.6');
  expect(screen.getByTestId('error')).toHaveTextContent('none');
});
