import ErrorPage from 'next/error';

import PageLayout from '../layouts/PageLayout';
import Sections from '../components/sections';

const Page = ({ metadata, sections }) => {
  // Check if the required data was provided
  if (!sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} breadcrumbs={[{ name: `${metadata.title}`, href: `/${metadata.slug}` }]}>
      <Sections sections={sections} />
    </PageLayout>
  );
};

export const getStaticPaths = async () => {
  const paths = (context => {
    return context.keys().map(key => ({ params: { slug: key.replace(/^.*[\\\/]/, '').slice(0, -3) } }));
  })(require.context('../content/pages', true, /\.md$/));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const { slug } = context.params;

  const page = await import(`../content/pages/${slug}.md`).catch(error => null);

  console.log(page.attributes);

  const { name, metadata, sections } = page.attributes;

  return {
    props: {
      metadata,
      sections,
    },
  };
};

export default Page;
