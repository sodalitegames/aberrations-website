import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth';

import PageLayout from '../../layouts/PageLayout';
import SigninForm from '../../components/auth/SigninForm';

import Loader from '../../components/dashboard/components/Loader';

export default function Signin({ metadata }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // if user is logged in, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} full>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to Aberrations RPG</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Or{' '}
          <Link href="/auth/signup">
            <a className="text-link-accent3 font-normal">create an account</a>
          </Link>{' '}
          if you haven&lsquo;t already
        </p>
      </div>
      {/* Sign in form */}
      <SigninForm redirectPath="/dashboard" />
      {/* End sign in form */}
    </PageLayout>
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
