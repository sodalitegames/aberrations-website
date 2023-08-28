import GuestGuard from 'auth/guards/guest';

import PageLayout from 'layouts/PageLayout';

import ForgotPasswordForm from 'components/auth/ForgotPasswordForm';

export default function ForgotPassword({ metadata }) {
  return (
    <GuestGuard>
      <PageLayout title={metadata.title} seo={metadata} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Forgot your password?</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Enter your account email address and we’ll send you instructions on how to reset your password.</p>
        </div>
        {/* Forgot password form */}
        <ForgotPasswordForm />
        {/* End forgot password form */}
      </PageLayout>
    </GuestGuard>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Forgot Password',
        slug: '/auth/forgot-password',
      },
    },
  };
}
