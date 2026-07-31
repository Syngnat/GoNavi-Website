# GoNavi Website Antigravity Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 GoNavi 官网从浅底卡片型工具站重构为统一深色主基调的 editorial product 官网，保留现有信息架构、路由与数据层。

**Architecture:** 本次重构只动布局层与视觉层，不改 locale 路由、release feed、docs manifest 与页面职责边界。先重置全站壳层和视觉变量，再按首页、发布页、文档页、路线图页分批重构页面骨架，最后补验证与收尾测试。

**Tech Stack:** React 18、TypeScript、Vite、React Router、React Markdown、Vitest、CSS Variables

---

## File Structure

### Existing files to modify

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/layout.css`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/FeatureRail.tsx`
- `src/components/sections/ScreenshotWall.tsx`
- `src/components/sections/DatabaseMatrix.tsx`
- `src/components/sections/ActionPanel.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/DownloadPage.tsx`
- `src/pages/DocsIndexPage.tsx`
- `src/pages/DocsArticlePage.tsx`
- `src/pages/ChangelogPage.tsx`
- `src/pages/RoadmapPage.tsx`
- `src/app/App.test.tsx`

### New files to create

- `src/app/layout-redesign.test.tsx`

---

### Task 1: Reset the Global Visual System and Shell

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/styles/layout.css`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Test: `src/app/layout-redesign.test.tsx`

- [ ] **Step 1: Write the failing shell redesign test**

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders the redesigned shell with a subdued editorial header', () => {
  render(
    <MemoryRouter initialEntries={['/zh']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('banner')).toHaveClass('site-header');
  expect(screen.getByRole('contentinfo')).toHaveClass('site-footer');
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/Syngnat/GoNavi');
});
```

- [ ] **Step 2: Run test to verify the new shell test is wired**

Run: `npm test -- --run src/app/layout-redesign.test.tsx`  
Expected: FAIL because the test file does not exist yet

- [ ] **Step 3: Replace the visual tokens with a dark editorial system**

```css
:root {
  color-scheme: dark;
  --bg: #060708;
  --bg-muted: #0d1014;
  --bg-elevated: #11161d;
  --surface-strong: #171d26;
  --text: #f3f5f7;
  --muted: #98a3b3;
  --accent: #d6dae0;
  --accent-strong: #ffffff;
  --line: rgba(255, 255, 255, 0.12);
  --line-strong: rgba(255, 255, 255, 0.22);
  --radius: 12px;
  --radius-lg: 18px;
  --radius-sm: 10px;
  --shadow: none;
  --shadow-soft: none;
}
```

```css
body {
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.04), transparent 24%),
    linear-gradient(180deg, #060708 0%, #0b0f14 100%);
  color: var(--text);
}
```

- [ ] **Step 4: Rebuild header and footer to be editorial, not bubbly**

```tsx
const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Download', path: '/download' },
  { label: 'Docs', path: '/docs' },
  { label: 'Changelog', path: '/changelog' },
  { label: 'Roadmap', path: '/roadmap' },
] as const;

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-shell__inner site-header__inner">
        <div className="site-brand">
          <span className="site-brand__name">GoNavi</span>
          <span className="site-brand__tag">Native database workflow</span>
        </div>
        <nav aria-label="Primary navigation" className="site-nav">
          {navigation.map((item) => (
            <NavLink key={item.label} end={item.path === '/'} to={withLocalePath(locale, item.path)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run shell tests**

Run: `npm test -- --run src/app/layout-redesign.test.tsx src/app/App.test.tsx`  
Expected: PASS

---

### Task 2: Rebuild the Homepage as a Long Editorial Page

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/FeatureRail.tsx`
- Modify: `src/components/sections/ScreenshotWall.tsx`
- Modify: `src/components/sections/DatabaseMatrix.tsx`
- Modify: `src/components/sections/ActionPanel.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/layout.css`
- Modify: `src/app/App.test.tsx`

- [ ] **Step 1: Extend the homepage test for the new editorial structure**

```tsx
test('renders the editorial homepage with a lead column and content rail', () => {
  render(
    <MemoryRouter initialEntries={['/zh']}>
      <App />
    </MemoryRouter>,
  );

  const main = screen.getByRole('main');

  expect(within(main).getByRole('heading', { name: '为多数据库工作流而生的原生桌面工作台' })).toBeInTheDocument();
  expect(within(main).getAllByRole('link', { name: '立即下载' })).toHaveLength(2);
  expect(within(main).getAllByRole('link', { name: 'GitHub' })).toHaveLength(2);
});
```

- [ ] **Step 2: Run the homepage test before implementation**

Run: `npm test -- --run src/app/App.test.tsx`  
Expected: FAIL after test expectations are updated to the new structure

- [ ] **Step 3: Replace card-grid homepage sections with editorial blocks**

```tsx
export default function HomePage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const content = getSiteContent(resolvedLocale);

  return (
    <div className="home-page home-page--editorial">
      <Hero content={content.hero} />
      <FeatureRail heading={content.featureRail} features={content.features} />
      <ScreenshotWall heading={content.screenshotWall} screenshots={content.screenshots} />
      <DatabaseMatrix content={content.databaseMatrix} />
      <ActionPanel content={content.actionPanel} />
    </div>
  );
}
```

```css
.home-page--editorial {
  display: grid;
  gap: 88px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  gap: 36px;
  border-top: 1px solid var(--line);
  padding-top: 40px;
}
```

- [ ] **Step 4: Rebuild CTA and section treatments**

```css
.home-cta {
  min-height: 42px;
  padding: 0 14px;
  border-radius: 0;
  border-bottom: 1px solid var(--line-strong);
  background: transparent;
}

.home-section {
  border-top: 1px solid var(--line);
  padding-top: 28px;
}
```

- [ ] **Step 5: Run homepage tests and build**

Run: `npm test -- --run src/app/App.test.tsx && npm run build`  
Expected: PASS

---

### Task 3: Rebuild Download and Changelog into Release Directories

**Files:**
- Modify: `src/pages/DownloadPage.tsx`
- Modify: `src/pages/ChangelogPage.tsx`
- Modify: `src/components/download/PlatformCard.tsx`
- Modify: `src/components/download/ReleaseSummary.tsx`
- Modify: `src/components/changelog/ReleaseTimeline.tsx`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Add a release directory test**

```tsx
test('renders the download page as an editorial release directory', () => {
  render(
    <MemoryRouter initialEntries={['/zh/download']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /从最新 release 直接进入桌面端下载/i })).toBeInTheDocument();
  expect(screen.getByText(/Release feed|发布来源/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the page test before refactoring**

Run: `npm test -- --run src/app/App.test.tsx`  
Expected: FAIL after the new expectations are added

- [ ] **Step 3: Shift release pages away from card walls**

```tsx
return (
  <div className="release-directory">
    <section className="release-directory__lead">
      <ReleaseSummary locale={resolvedLocale} release={latest} loading={loading} error={error} />
    </section>
    <section className="release-directory__rail">
      {platforms.map((platform) => (
        <PlatformCard key={platform} locale={resolvedLocale} platform={platform} asset={primaryAssets[platform]} />
      ))}
    </section>
  </div>
);
```

```css
.release-directory {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: 32px;
}
```

- [ ] **Step 4: Convert changelog into a sharper timeline**

```css
.release-timeline__item {
  grid-template-columns: 24px minmax(0, 1fr);
}

.release-timeline__body {
  padding: 0 0 28px 0;
  border-top: 1px solid var(--line);
  background: transparent;
}
```

- [ ] **Step 5: Run release tests and build**

Run: `npm test -- --run src/lib/releases.test.ts src/lib/useReleaseFeed.test.tsx src/app/App.test.tsx && npm run build`  
Expected: PASS

---

### Task 4: Rebuild Docs and Roadmap into Editorial Pages

**Files:**
- Modify: `src/pages/DocsIndexPage.tsx`
- Modify: `src/pages/DocsArticlePage.tsx`
- Modify: `src/pages/RoadmapPage.tsx`
- Modify: `src/components/docs/DocsSidebar.tsx`
- Modify: `src/components/docs/MarkdownPage.tsx`
- Modify: `src/components/roadmap/RoadmapColumns.tsx`
- Modify: `src/styles/layout.css`
- Modify: `src/components/docs/MarkdownPage.test.tsx`

- [ ] **Step 1: Tighten docs rendering expectations**

```tsx
test('renders docs with a narrow rail and a wide reading column', () => {
  render(
    <MemoryRouter initialEntries={['/zh/docs/quick-start']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('文档导航')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { name: '快速开始' }).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run docs tests before refactoring**

Run: `npm test -- --run src/content/docs/index.test.ts src/components/docs/MarkdownPage.test.tsx src/app/App.test.tsx`  
Expected: FAIL after the stronger editorial assertions are added

- [ ] **Step 3: Rebuild docs index and article layout**

```css
.docs-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 40px;
}

.docs-sidebar {
  border-right: 1px solid var(--line);
  padding-right: 20px;
}

.docs-article {
  max-width: 820px;
}
```

- [ ] **Step 4: Rebuild roadmap as a text-led plan page**

```css
.roadmap-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.roadmap-column {
  border-top: 1px solid var(--line);
  padding-top: 18px;
  background: transparent;
}
```

- [ ] **Step 5: Run docs and roadmap tests**

Run: `npm test -- --run src/content/docs/index.test.ts src/components/docs/MarkdownPage.test.tsx src/app/App.test.tsx && npm run build`  
Expected: PASS

---

### Task 5: Polish Metadata, 404 Experience, and Full-Site Verification

**Files:**
- Modify: `index.html`
- Modify: `src/pages/NotFoundPage.tsx`
- Modify: `src/app/metadata.test.ts`
- Modify: `README.md`

- [ ] **Step 1: Strengthen metadata verification**

```ts
test('website index reflects the redesigned dark editorial positioning', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  expect(html).toMatch(/GoNavi \| Native Database Workflow/);
  expect(html).toMatch(/og-cover\.svg/);
  expect(html).toMatch(/favicon\.svg/);
});
```

- [ ] **Step 2: Run metadata test before final adjustments**

Run: `npm test -- --run src/app/metadata.test.ts`  
Expected: PASS or require small copy updates if metadata changed during redesign

- [ ] **Step 3: Align 404 and README with the new design language**

```tsx
export default function NotFoundPage() {
  return (
    <section className="content-panel content-panel--not-found">
      <p className="content-panel__eyebrow">404</p>
      <h1 className="content-panel__title">页面不存在</h1>
      <p className="content-panel__copy">请从导航返回首页、文档、下载页或路线图。</p>
    </section>
  );
}
```

- [ ] **Step 4: Run full verification**

Run: `npm test && npm run build`  
Expected: PASS with all current tests green and production build generated

---

## Self-Review

- **Spec coverage:** 全站深色主基调、Antigravity 布局语言、首页/下载/文档/更新日志/路线图统一重构、保留路由与数据层，都有对应任务。
- **Placeholder scan:** 计划中没有 `TBD`、`TODO` 或“后续实现”类占位语句。
- **Type consistency:** 所有任务都沿用现有 `SiteLocale`、`App.tsx` 路由、release feed、docs manifest，不引入新的底层数据模型。

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-10-antigravity-layout-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
