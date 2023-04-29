import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';

import { Metadata } from 'utils/types/page-types';

import PageLayout from 'layouts/PageLayout';
import Sections from 'components/sections';

interface HomePageProps {
  sections: any[];
  metadata: Metadata;
}

const HomePage: React.FC<HomePageProps> = ({ metadata, sections }) => {
  // Check if the required data was provided
  if (!sections) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout full title={metadata.title} seo={metadata}>
      <Sections sections={sections} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const page = await import('../content/pages/home.md').catch(error => null);

  const { name, metadata, sections = [] } = page?.attributes;

  return {
    props: {
      metadata,
      sections,
    },
  };
};

export default HomePage;
