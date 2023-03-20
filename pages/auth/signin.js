import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StytchLogin, useStytchUser } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

import PageLayout from '../../layouts/PageLayout';

import Loader from '../../components/dashboard/components/Loader';

export default function Signin({ metadata }) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  console.log(user);

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

  const stytchProps = {
    config: {
      products: [Products.emailMagicLinks, Products.passwords],
      emailMagicLinksOptions: {
        loginRedirectURL: 'http://localhost:3000/auth/login',
        loginExpirationMinutes: 30,
        signupRedirectURL: 'http://localhost:3000/auth/signup',
        signupExpirationMinutes: 30,
        createUserAsPending: true,
      },
      passwordOptions: {
        loginExpirationMinutes: 30,
        loginRedirectURL: 'http://localhost:3000/auth/login',
        resetPasswordExpirationMinutes: 30,
        resetPasswordRedirectURL: 'http://localhost:3000/auth/reset-password',
      },
    },
    styles: {
      container: { width: '321px' },
      colors: { primary: '#0577CA' },
      fontFamily: '"Helvetica New", Helvetica, sans-serif',
    },
    callbacks: {
      onEvent: message => console.log(message),
      onSuccess: message => console.log(message),
      onError: message => console.log(message),
    },
  };

  return (
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
      <StytchLogin config={stytchProps.config} callbacks={stytchProps.callbacks} />
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
