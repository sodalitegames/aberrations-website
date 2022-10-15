import ErrorPage from 'next/error';

import api from '../../lib/strapi-api';

import { Metadata, SideNavItem } from '../../utils/types/page-types';

import PageLayout from '../../layouts/PageLayout';

import MarkdownContent from '../../components/sections/markdown-content';

import SectionDivider from '../../components/elements/section-divider';
import Notice, { NoticeStatus } from '../../components/elements/notice';

import ActionCard from '../../components/elements/cards/action-card';

interface PlayerRulesPageProps {
  playerRules: string;
  belongingsInDepth: string;
  navigation: SideNavItem[];
  metadata: Metadata;
}

const PlayerRulesPage: React.FC<PlayerRulesPageProps> = ({ playerRules, belongingsInDepth, navigation, metadata }) => {
  // Check if the required data was provided
  if (!playerRules || !belongingsInDepth) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout
      title="Player Rules"
      sideNav={navigation}
      seo={metadata}
      breadcrumbs={[
        { name: 'Get Started', href: '/get-started' },
        { name: 'Player Rules', href: '/get-started/player-rules' },
      ]}
    >
      <Notice
        status={NoticeStatus.Info}
        message="While the game is in beta, only the most updated rules will be displayed. If you wish to see what changes we are making,"
        link={{ text: 'visit our beta change log.', href: '/beta-change-log', inline: true }}
        accent
      />

      <SectionDivider heading="Player Rules" id="player-rules" nomargin />

      <MarkdownContent data={{ content: playerRules }} />

      <SectionDivider heading="Belongings In-Depth" id="belongings-in-depth-section" />

      <MarkdownContent data={{ content: belongingsInDepth }} />
    </PageLayout>
  );
};

export async function getStaticProps() {
  const page = await import(`../../content/pages/player-rules.md`).catch(error => null);
  const playerRules = await import(`../../content/rules/player-rules.md`).catch(error => null);
  const belongingsInDepth = await import(`../../content/rules/belongings-in-depth.md`).catch(error => null);

  if (!page || !playerRules || !belongingsInDepth) {
    return {};
  }

  const { name, metadata } = page.attributes;

  const navigation = [
    {
      name: 'Player Rules',
      idRef: 'player-rules',
      children: playerRules.attributes.navigation,
    },
    {
      name: 'Belongings In-Depth',
      idRef: 'belongings-in-depth',
      children: belongingsInDepth.attributes.navigation,
    },
  ];

  return {
    props: {
      playerRules: playerRules.body,
      belongingsInDepth: belongingsInDepth.body,
      navigation,
      metadata,
    },
  };
}

export default PlayerRulesPage;
