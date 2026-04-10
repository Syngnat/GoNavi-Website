import { useParams } from 'react-router-dom';
import ActionPanel from '../components/sections/ActionPanel';
import DatabaseMatrix from '../components/sections/DatabaseMatrix';
import FeatureRail from '../components/sections/FeatureRail';
import Hero from '../components/sections/Hero';
import ScreenshotWall from '../components/sections/ScreenshotWall';
import { getSiteContent } from '../content/site';
import { resolveLocale } from '../lib/locale';

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
