import ErrorPage from 'next/error';

import { fetchWorldNavigationData } from '../../utils/data/fetch-world-navigation-data';
import { generateWorldNavigation } from '../../utils/data/generate-world-navigation';

import PageLayout from '../../layouts/PageLayout';
import WorldPageLayout from '../../layouts/WorldPageLayout';

import MarkdownContent from '../../components/sections/markdown-content';

const WorldPage = ({ world, navigation }) => {
  // Check if the required data was provided
  if (!world || !navigation) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout title={world.metadata.title} seo={world.metadata} custom>
      <WorldPageLayout
        heading={`${world.metadata.title}`}
        navigation={navigation}
        worldSlug={world.metadata.slug}
        breadcrumbs={[
          { name: 'Worlds', href: '/worlds' },
          { name: world.metadata.title, href: `/worlds/${world.metadata.slug}` },
        ]}
      >
        <h2 className="heading">World Summary</h2>
        <MarkdownContent data={{ content: world.summary }} />
      </WorldPageLayout>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../content/worlds', true, /\.md$/));

  const paths = slugs.map(slug => ({
    params: {
      world: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { world: _world_param } = context.params;

  const worldContent = await import(`../../content/worlds/${_world_param}.md`).catch(error => null);
  const playbook = await import(`../../content/rules/${_world_param}-world-playbook.md`).catch(error => null);

  const { worldSummary } = playbook.attributes;
  const { metadata } = worldContent.attributes;

  console.log(worldContent.attributes);

  // GET WORLD NAVIGATION //
  const navigationData = await fetchWorldNavigationData(_world_param);
  const navigation = generateWorldNavigation(worldContent.attributes, navigationData, '');
  // END GET WORLD NAVIGATION //

  console.log(navigation);

  return {
    props: {
      world: {
        summary: worldSummary,
        metadata: {
          ...metadata,
          title: `World of ${metadata.title}`,
        },
      },
      navigation,
    },
  };
}

export default WorldPage;
