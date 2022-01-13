import ErrorPage from 'next/error';

import PageLayout from '../layouts/PageLayout';
import Sections from '../components/sections';

const MainPage = ({ metadata, sections }) => {
  // Check if the required data was provided
  if (!sections) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} breadcrumbs={[{ name: `${metadata.title}`, href: `/${metadata.slug}` }]}>
      <Sections sections={sections} />
    </PageLayout>
  );
};

export const getStaticPaths = async () => {
  const {
    attributes: { paths: siteMap },
  } = await import('../content/settings/paths.md');

  const paths = siteMap.map(({ parent }) => ({ params: { main: parent } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const { main } = context.params;

  const page = await import(`../content/pages/${main}.md`).catch(error => null);

  const { metadata, sections = [] } = page.attributes;

  return {
    props: {
      metadata,
      sections,
    },
  };
};

export default MainPage;
