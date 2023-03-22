import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StytchLogin, useStytchUser } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

import { login_expiration_minutes, signup_expiration_minutes, reset_password_expiration_minutes } from '../../lib/stytch';

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
        loginRedirectURL: 'http://localhost:3000/auth/authenticate',
        loginExpirationMinutes: login_expiration_minutes,
        signupRedirectURL: 'http://localhost:3000/auth/authenticate',
        signupExpirationMinutes: signup_expiration_minutes,
        createUserAsPending: true,
      },
      passwordOptions: {
        loginExpirationMinutes: login_expiration_minutes,
        loginRedirectURL: 'http://localhost:3000/auth/authenticate',
        resetPasswordExpirationMinutes: reset_password_expiration_minutes,
        resetPasswordRedirectURL: 'http://localhost:3000/auth/reset-password',
      },
    },
    styles: {
      hideHeaderText: true,
      fontFamily: '"Kanit", sans-serif',
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
      <StytchLogin config={stytchProps.config} styles={stytchProps.styles} callbacks={stytchProps.callbacks} />
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
