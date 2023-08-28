import Link from 'next/link';

import GuestGuard from 'auth/guards/guest';

import PageLayout from 'layouts/PageLayout';

import SigninForm from 'components/auth/SigninForm';

export default function Signin({ metadata }) {
  return (
    <GuestGuard>
      <PageLayout title={metadata.title} seo={metadata} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Sign in to Aberrations RPG</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
            Or{' '}
            <Link href="/auth/signup">
              <a className="font-normal text-link-accent3">create an account</a>
            </Link>{' '}
            if you haven&lsquo;t already
          </p>
        </div>
        {/* Sign in form */}
        <SigninForm />
        {/* End sign in form */}
      </PageLayout>
    </GuestGuard>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Sign in',
        slug: '/auth/signin',
      },
    },
  };
}
