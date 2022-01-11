import PageLayout from '../layouts/PageLayout';
import FullContentMessage from '../layouts/components/FullContentMessage';

const NotFound = ({ data, metadata }) => {
  return (
    <PageLayout title={metadata.title} seo={metadata} full>
      <FullContentMessage data={data} />
    </PageLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Not Found',
        slug: '',
      },
      data: {
        heading: 'Page not found.',
        subheading: '404 error',
        message: 'Sorry, we couldn’t find the page you’re looking for.',
        linkText: 'Go to homepage',
        linkHref: '/',
      },
    },
  };
}

export default NotFound;
