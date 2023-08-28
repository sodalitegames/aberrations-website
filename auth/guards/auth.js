import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'auth/context';

import PageLayout from 'layouts/PageLayout';

import Loader from 'components/dashboard/components/Loader';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // if user is not logged in, redirect to signup
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (!loading && user) {
    return <>{children(user)}</>;
  }

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
};

export default AuthGuard;
