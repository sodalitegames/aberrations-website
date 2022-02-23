import { GetStaticProps, NextPage } from 'next';

import PageLayout from '../layouts/PageLayout';
import FullContentMessage from '../layouts/components/FullContentMessage';

import { Metadata } from 'utils/types/page-types';

type NotFoundProps = {
  metadata: Metadata;
  data: {
    heading: string;
    subheading: string;
    message: string;
    linkText: string;
    linkHref: string;
  };
};

const NotFound: NextPage<NotFoundProps> = ({ data, metadata }) => {
  return (
    <PageLayout title={metadata.title} seo={metadata} full>
      <FullContentMessage data={data} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
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
};

export default NotFound;
