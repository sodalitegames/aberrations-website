import GuestGuard from 'auth/guards/guest';

import PageLayout from 'layouts/PageLayout';

import VerifyEmailForm from 'components/auth/VerifyEmailForm';

export default function VerifyEmail({ metadata }) {
  return (
    <GuestGuard>
      <PageLayout title={metadata.title} seo={metadata} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Verify your email to access your account</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">This is a required step if you want to use any of our digital products.</p>
        </div>
        {/* Verfiy email form */}
        <VerifyEmailForm />
        {/* End verify email form */}
      </PageLayout>
    </GuestGuard>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Verify email',
        slug: '/auth/verify-email',
      },
    },
  };
}
