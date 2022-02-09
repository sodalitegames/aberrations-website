import { GetStaticProps } from 'next';
import Head from 'next/head';

import ErrorPage from 'next/error';

import { Metadata } from '../utils/types/page-types';

import PageLayout from '../layouts/PageLayout';
import Sections from '../components/sections';

interface HomePageProps {
  sections: any[];
  metadata: Metadata;
}

const HomePage: React.FC<HomePageProps> = ({ metadata, sections }) => {
  // Check if the required data was provided
  if (!sections?.length) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <PageLayout full title={metadata.title} seo={metadata}>
        <Sections sections={sections} />
      </PageLayout>
    </>
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
