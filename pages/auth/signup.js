import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStytchUser } from '@stytch/nextjs';

import PageLayout from '../../layouts/PageLayout';

import Loader from '../../components/dashboard/components/Loader';

import AuthenticateForm from '../../components/auth/AuthenticateForm';

export default function Signup({ metadata }) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  useEffect(() => {
    if (isInitialized && user) {
      router.push('/dashboard');
    }
  }, [user, isInitialized, router]);

  if (!isInitialized) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <Loader />
      </PageLayout>
    );
  }

  return (
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
        {/* Sign up form */}
        <AuthenticateForm />
        {/* End sign up form */}
      </div>
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
