import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '../../layouts/PageLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

import Loader from '../../components/dashboard/components/Loader';
import Section from '../../components/dashboard/components/Section';

import Notice from '../../components/elements/notice';

import { useAuth } from '../../contexts/auth.js';

export default function Dashboard({ metadata }) {
  const router = useRouter();
  const { user, data, loading } = useAuth();

  const [notice, setNotice] = useState(null);

  const { setup } = router.query;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }

    if (!loading && (!data || (data && !data.player_id))) {
      router.push('/auth/account-setup');
    }
  }, [user, data, loading, router]);

  useEffect(() => {
    if (setup === 'success') {
      setNotice({ status: 'success', message: 'Your account has been successfully set up.' });
    }
  }, [setup]);

  if (!user) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <Loader />
      </PageLayout>
    );
  }

  console.log('user:', user);
  console.log('data:', data);

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <DashboardLayout heading={metadata.title} active="">
        {notice ? <Notice status={notice.status} message={notice.message} hideable /> : null}
        <Section heading={`Hello there, ${user.displayName}`} description="Welcome to your dashboard." ariaTag="welcome">
          {/* <p>More content is going to go here once it's ready.</p> */}
        </Section>
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
