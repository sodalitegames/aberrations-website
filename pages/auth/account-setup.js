import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth';

import PageLayout from '../../layouts/PageLayout';

import AccountSetupForm from '../../components/auth/AccountSetupForm';
import Loader from '../../components/dashboard/components/Loader';

export default function Signup({ metadata }) {
  const router = useRouter();
  const { user, data, loading } = useAuth();

  useEffect(() => {
    // If user is not logged in, redirect to signup
    if (!loading && !user) {
      router.push('/auth/signup');
    }

    // If account is already set up, redirect to dashboard
    if (!loading && user && data) {
      if (data.player_id) {
        router.push('/dashboard');
      }
    }
  }, [user, data, loading, router]);

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
        <h2 className="mt-6 text-3xl font-extrabold text-center">Finish setting up your account</h2>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">This is an important step if you want to use any of our digital products.</p>
      </div>
      {/* Account setup form */}
      <AccountSetupForm />
      {/* End set up form */}
    </PageLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Account setup',
        slug: '/auth/account-setup',
      },
    },
  };
}
