import { useEffect } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '../../layouts/PageLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

import DashboardHome from '../../components/dashboard/dashboard-pages/dashboard-home';

import Loader from '../../components/dashboard/components/Loader';

import { useAuth } from '../../contexts/auth.js';

export default function Dashboard({ metadata }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }

    if (!loading && !user?.data?.mongo_id) {
      router.push('/auth/account-setup');
    }
  }, [user, loading, router]);

  if (!user) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <Loader />
      </PageLayout>
    );
  }

  console.log(user);

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <DashboardLayout heading={metadata.title} active="">
        <DashboardHome user={user} />
      </DashboardLayout>
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
