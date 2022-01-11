import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth';

import PageLayout from '../../layouts/PageLayout';
import SignupForm from '../../components/auth/SignupForm';

import Loader from '../../components/dashboard/components/Loader';

export default function Signup({ metadata }) {
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
        <h2 className="mt-6 text-center text-3xl font-extrabold">Create my Aberrations RPG account</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Or{' '}
          <Link href="/auth/signin">
            <a className="text-link-accent3 font-normal">sign in</a>
          </Link>{' '}
          if you already have an account
        </p>
      </div>
      {/* Sign up form */}
      <SignupForm redirectPath="/dashboard" />
      {/* End sign up form */}
    </PageLayout>
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
