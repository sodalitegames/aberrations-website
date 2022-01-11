import Head from 'next/head';

import ErrorPage from 'next/error';

import PageLayout from '../layouts/PageLayout';
// import Sections from '../components/sections';

const Home = ({ metadata, content }) => {
  // Check if the required data was provided
  // if (!sections?.length) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <PageLayout full title={metadata.title} seo={metadata}>
        {/* <Sections sections={sections} /> */}
        {content}
      </PageLayout>
    </>
  );
};

export async function getStaticProps() {
  const page = await import('../content/pages/home.md').catch(error => null);

  console.log(page.html);

  console.log(page.attributes);
  //const { title, metadata, contentSections } = data;

  const { name, metadata } = page.attributes;

  return {
    props: {
      metadata,
      content: page.html,
    },
  };
}

export default Home;
