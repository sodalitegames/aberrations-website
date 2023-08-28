import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'auth/context';

import PageLayout from 'layouts/PageLayout';

import Loader from 'components/dashboard/components/Loader';

const GuestGuard = ({ children }) => {
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
      <PageLayout
        title="Loading..."
        seo={{
          title: 'Loading...',
        }}
        custom
      >
        <Loader />
      </PageLayout>
    );
  }

  return <>{children}</>;
};

export default GuestGuard;
