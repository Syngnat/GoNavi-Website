import { useEffect, useState } from 'react';
import { fallbackReleases } from '../content/changelog-fallback';
import { GitHubReleaseLike, NormalizedRelease, normalizeRelease } from './releases';

const RELEASE_FEED_URL = 'https://api.github.com/repos/Syngnat/GoNavi/releases?per_page=20';

export type ReleaseFeedState = {
  loading: boolean;
  releases: NormalizedRelease[];
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to load release feed.';
}

export function useReleaseFeed(): ReleaseFeedState {
  const [state, setState] = useState<ReleaseFeedState>({
    loading: true,
    releases: fallbackReleases,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadFeed() {
      try {
        const response = await fetch(RELEASE_FEED_URL, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GitHub release feed request failed with status ${response.status}.`);
        }

        const payload = (await response.json()) as GitHubReleaseLike[];
        const releases = Array.isArray(payload)
          ? payload.map(normalizeRelease).filter((release) => !release.draft)
          : [];

        if (!active) {
          return;
        }

        if (releases.length === 0) {
          setState({
            loading: false,
            releases: fallbackReleases,
            error: 'GitHub returned no public releases. Showing the local fallback snapshot.',
          });
          return;
        }

        setState({
          loading: false,
          releases,
          error: null,
        });
      } catch (error) {
        if (!active || controller.signal.aborted) {
          return;
        }

        setState({
          loading: false,
          releases: fallbackReleases,
          error: getErrorMessage(error),
        });
      }
    }

    void loadFeed();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return state;
}
