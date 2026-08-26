import { ANALYTICS_ENDPOINT, ANALYTICS_STORAGE_KEY, isAnalyticsEnabled } from './analytics';

type AnalyticsEvent = {
  action?: string;
  file?: string;
  platform?: string;
  path?: string;
  referrer?: string;
};

function getVisitorId() {
  try {
    let visitorId = localStorage.getItem(ANALYTICS_STORAGE_KEY);

    if (!visitorId) {
      visitorId = `u_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
      localStorage.setItem(ANALYTICS_STORAGE_KEY, visitorId);
    }

    return visitorId;
  } catch {
    return null;
  }
}

function isLocalDevelopment() {
  return location.hostname === 'localhost'
    || location.hostname === '127.0.0.1'
    || location.hostname === '::1';
}

function normalisePath(pathname = location.pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function referrerHost() {
  try {
    return new URL(document.referrer).hostname;
  } catch {
    return '';
  }
}

function sendEvent({ action = '', file = '', platform = '', path, referrer = '' }: AnalyticsEvent = {}) {
  if (!isAnalyticsEnabled || isLocalDevelopment()) return;

  const visitorId = getVisitorId();
  if (!visitorId) return;

  const query = [
    `uid=${encodeURIComponent(visitorId)}`,
    `act=${encodeURIComponent(action)}`,
    `p=${normalisePath(path)}`,
    `file=${encodeURIComponent(file)}`,
    `plat=${encodeURIComponent(platform)}`,
    `ref=${encodeURIComponent(referrer)}`,
  ].join('&');
  const endpoint = `${ANALYTICS_ENDPOINT}?${query}`;

  try {
    if (navigator.sendBeacon(endpoint)) return;
  } catch {
    // Fall through to fetch when sendBeacon is unavailable or rejects the request.
  }

  fetch(endpoint, { method: 'GET', keepalive: true }).catch(() => {});
}

export function trackPageView() {
  sendEvent({ referrer: referrerHost() });
}

export function trackSponsorImpression(sponsorId: string) {
  sendEvent({
    action: 'sponsor_impression',
    file: sponsorId,
    platform: 'sponsor',
  });
}

export function trackSponsorClick(sponsorId: string, destination: string) {
  let destinationHost = '';

  try {
    destinationHost = new URL(destination).hostname;
  } catch {
    // The sponsor id is still sufficient to group the event if its URL is malformed.
  }

  sendEvent({
    action: 'sponsor_click',
    file: sponsorId,
    platform: destinationHost,
  });
}
