import PageLayout from 'layouts/PageLayout';
import FullContentMessage from 'layouts/components/FullContentMessage';

const ContactThanks = ({ data, metadata }) => {
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
        title: 'Thank you for reaching out!',
        slug: 'thanks',
      },
      data: {
        heading: 'We are glad you reached out!',
        subheading: 'Thank you',
        message: 'Thank you for the email! We will get back to you as soon as we can.',
        linkText: 'Go back home',
        linkHref: '/',
      },
    },
  };
}

export default ContactThanks;
