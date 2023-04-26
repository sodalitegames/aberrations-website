import ErrorPage from 'next/error';

import api from '../../apis/database';

import PageLayout from '../../layouts/PageLayout';

import MarkdownContent from '../../components/sections/markdown-content';

import SectionDivider from '../../components/elements/section-divider';
import Notice from '../../components/elements/notice';
import NpcTable from '../../components/elements/npc-table';

import { slugify } from '../../utils/functions/slugify';

const CCGuide = ({ ccGuide, npcTypes, navigation, metadata }) => {
  // Check if the required data was provided
  if (!ccGuide || !npcTypes) {
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
        message="While the game is in alpha, only the most updated rules will be displayed. If you wish to see what changes we are making,"
        link={{ text: 'visit our change log.', href: '/change-log', inline: true }}
        accent
      />
      <Notice status="warn" message="The CC Guide is not currently available, but will be soon. We apologize and thank you for your patience as we get it ready for you." accent />

      <SectionDivider heading="CC Guide" id="cc-guide" nomargin />
      <MarkdownContent data={{ content: ccGuide }} />

      <SectionDivider heading="Npc Types" id="npc-types" />
      {npcTypes.map(type => (
        <div key={type.id} id={slugify(type.name)}>
          <h4 className="heading">{type.name}</h4>
          <NpcTable rows={type.levels} />
        </div>
      ))}
    </PageLayout>
  );
};

export async function getStaticProps() {
  const page = await import(`../../content/pages/cc-guide.md`).catch(error => null);
  const ccGuide = await import(`../../content/rules/cc-guide.md`).catch(error => null);

  const {
    data: { docs: npcTypes },
  } = await api.get('/npc-types?limit=100');

  const { name, metadata } = page.attributes;

  const navigation = [
    {
      name: 'CC Guide',
      idRef: 'cc-guide',
      children: ccGuide.attributes.navigation,
    },
    {
      name: 'Npc Types',
      idRef: 'npc-types',
      children: npcTypes.map(type => ({ name: type.name, idRef: slugify(type.name) })),
    },
  ];

  return {
    props: {
      ccGuide: ccGuide.body,
      npcTypes,
      navigation,
      metadata,
    },
  };
}

export default CCGuide;
