import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser } from '@stytch/nextjs';

import PageLayout from '../../layouts/PageLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

import DashboardHome from '../../components/dashboard/dashboard-pages/dashboard-home';

import Loader from '../../components/dashboard/components/Loader';

export default function Dashboard({ metadata }) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  console.log('user:', user);

  useEffect(() => {
    if (isInitialized && user === null) {
      router.push('/auth/signin');
    }

    if (isInitialized && user) {
      if (!user.trusted_metadata.mongo_id) {
        router.push('/auth/account-setup');
      }
    }
  }, [user, isInitialized, router]);

  if (user) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <DashboardLayout heading={metadata.title} active="">
          <DashboardHome user={user} />
        </DashboardLayout>
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
        title: 'My Dashboard',
        slug: '/dashboard',
      },
    },
  };
}
