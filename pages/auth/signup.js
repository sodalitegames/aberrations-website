import Link from 'next/link';

import GuestGuard from 'auth/guards/guest';

import PageLayout from 'layouts/PageLayout';

import SignupForm from 'components/auth/SignupForm';

export default function Signup({ metadata }) {
  return (
    <GuestGuard>
      <PageLayout title={metadata.title} seo={metadata} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Create my Aberrations RPG account</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
            Or{' '}
            <Link href="/auth/signin">
              <a className="font-normal text-link-accent3">sign in</a>
            </Link>{' '}
            if you already have an account
          </p>
        </div>
        {/* Sign up form */}
        <SignupForm redirectPath="/dashboard" />
        {/* End sign up form */}
      </PageLayout>
    </GuestGuard>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Create my account',
        slug: '/auth/signup',
      },
    },
  };
}
