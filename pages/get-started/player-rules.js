import ErrorPage from 'next/error';

import api from '../../lib/strapi-api';

import PageLayout from '../../layouts/PageLayout';

import HtmlContent from '../../components/sections/html-content';

import SectionDivider from '../../components/elements/section-divider';
import Notice from '../../components/elements/notice';

import ActionCard from '../../components/elements/cards/action-card';

const PlayerRulesPage = ({ playerRules, belongingsInDepth, actionsAndTests, navigation, metadata }) => {
  // Check if the required data was provided
  if (!playerRules || !belongingsInDepth || !actionsAndTests) {
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
        status="info"
        message="While the game is in beta, only the most updated rules will be displayed. If you wish to see what changes we are making,"
        link={{ text: 'visit our beta change log.', href: '/beta-change-log', inline: true }}
        accent
      />

      <SectionDivider heading="Player Rules" id="player-rules" nomargin />

      <HtmlContent data={{ content: playerRules }} />

      <SectionDivider heading="Belongings In-Depth" id="belongings-in-depth-section" />

      <HtmlContent data={{ content: belongingsInDepth }} />

      <SectionDivider heading="Actions and Tests" id="actions-and-tests" />
      <h2 className="heading" id="free-actions">
        Free Actions
      </h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8">
        {actionsAndTests.freeActions.map(action => (
          <ActionCard key={action.name} action={action} />
        ))}
      </div>

      <h2 className="heading" id="minor-actions">
        Minor Actions
      </h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8">
        {actionsAndTests.minorActions.map(action => (
          <ActionCard key={action.name} action={action} />
        ))}
      </div>

      <h2 className="heading" id="major-actions">
        Major Actions
      </h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8">
        {actionsAndTests.majorActions.map(action => (
          <ActionCard key={action.name} action={action} />
        ))}
      </div>

      <h2 className="heading" id="contested-tests">
        Contested Tests
      </h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
        {actionsAndTests.contestedTests.map(action => (
          <ActionCard key={action.name} action={action} />
        ))}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const page = await import(`../../content/pages/player-rules.md`).catch(error => null);
  const playerRules = await import(`../../content/rules/player-rules.md`).catch(error => null);
  const belongingsInDepth = await import(`../../content/rules/belongings-in-depth.md`).catch(error => null);

  const { data: actionsAndTests } = await api.get('/actions-and-tests');

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
    {
      name: 'Actions and Tests',
      idRef: 'actions-and-tests',
      children: [
        {
          name: 'Free Actions',
          idRef: 'free-actions',
        },
        {
          name: 'Minor Actions',
          idRef: 'minor-actions',
        },
        {
          name: 'Major Actions',
          idRef: 'major-actions',
        },
        {
          name: 'Contested Tests',
          idRef: 'contested-tests',
        },
      ],
    },
  ];

  return {
    props: {
      playerRules: playerRules.html,
      belongingsInDepth: belongingsInDepth.html,
      actionsAndTests,
      navigation,
      metadata,
    },
  };
}

export default PlayerRulesPage;
