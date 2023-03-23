import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser } from '@stytch/nextjs';

import PageLayout from '../../layouts/PageLayout';

import Loader from '../../components/dashboard/components/Loader';

import AccountSetupForm from '../../components/auth/AccountSetupForm';

export default function AccountSetup({ metadata }) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  useEffect(() => {
    if (isInitialized && user === null) {
      router.push('/auth/signin');
    }

    if (isInitialized && user) {
      if (user.trusted_metadata.mongo_id) {
        router.push('/dashboard');
      }
    }
  }, [user, isInitialized, router]);

  if (user) {
    return (
      <PageLayout title={metadata.title} seo={metadata} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Finish setting up your account</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">This is an important step if you want to use any of our digital products</p>
          {/* Account Setup form */}
          <AccountSetupForm user={user} />
          {/* End Account Setup form */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <Loader />
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
