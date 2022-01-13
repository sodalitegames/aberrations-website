import ErrorPage from 'next/error';

import api from '../../lib/strapi-api';

import PageLayout from '../../layouts/PageLayout';

import MarkdownContent from '../../components/sections/markdown-content';

import SectionDivider from '../../components/elements/section-divider';
import Notice from '../../components/elements/notice';
import NpcTable from '../../components/elements/npc-table';

import { getSlug } from '../../utils/functions/get-slug';

const CCGuide = ({ ccGuide, presetNpcTypes, navigation, metadata }) => {
  // Check if the required data was provided
  if (!ccGuide || !presetNpcTypes) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout
      title="CC Guide"
      sideNav={navigation}
      seo={metadata}
      breadcrumbs={[
        { name: 'Get Started', href: '/get-started' },
        { name: 'CC Guide', href: '/get-started/cc-guide' },
      ]}
    >
      <Notice
        status="info"
        message="While the game is in beta, only the most updated rules will be displayed. If you wish to see what changes we are making,"
        link={{ text: 'visit our beta change log.', href: '/beta-change-log', inline: true }}
        accent
      />
      <Notice status="warn" message="The CC Guide is not currently available, but will be soon. We apologize and thank you for your patience as we get it ready for you." accent />

      <SectionDivider heading="CC Guide" id="cc-guide" nomargin />
      <MarkdownContent data={{ content: ccGuide }} />

      <SectionDivider heading="Preset NPC Types" id="preset-npc-types" />
      <MarkdownContent data={{ content: presetNpcTypes.overview }} />

      {presetNpcTypes.npcTable.map(table => (
        <div key={table.npcType} id={getSlug(table.npcType)}>
          <h2 className="heading">{table.npcType}</h2>
          <NpcTable rows={table.level} />
        </div>
      ))}
    </PageLayout>
  );
};

export async function getStaticProps() {
  const page = await import(`../../content/pages/cc-guide.md`).catch(error => null);
  const ccGuide = await import(`../../content/rules/cc-guide.md`).catch(error => null);

  const { data: presetNpcTypes } = await api.get(`/preset-npc-types`);

  const { name, metadata } = page.attributes;

  const navigation = [
    {
      name: 'CC Guide',
      idRef: 'cc-guide',
      children: ccGuide.attributes.navigation,
    },
    {
      name: 'Preset NPC Types',
      idRef: 'preset-npc-types',
      children: presetNpcTypes.npcTable.map(table => ({ name: table.npcType, idRef: getSlug(table.npcType) })),
    },
  ];

  return {
    props: {
      ccGuide: ccGuide.body,
      presetNpcTypes,
      navigation,
      metadata,
    },
  };
}

export default CCGuide;
