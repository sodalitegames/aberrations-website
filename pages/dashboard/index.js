import PageLayout from 'layouts/PageLayout';
import DashboardLayout from 'layouts/DashboardLayout';

import Section from 'components/dashboard/components/Section';

import { AberrationsSheets } from 'components/dashboard/pages/digital-tools';

import AuthGuard from 'auth/guards/auth';

export default function Dashboard({ metadata }) {
  return (
    <AuthGuard>
      {user => (
        <PageLayout title={metadata.title} seo={metadata} custom>
          <DashboardLayout heading={metadata.title} active="">
            <Section heading={`Hello there, ${user.displayName}`} description="Welcome to your dashboard." ariaTag="welcome">
              {/* <p>More content is going to go here once it's ready.</p> */}
            </Section>
            <AberrationsSheets hasJoined={user.has_joined_sheets} />
          </DashboardLayout>
        </PageLayout>
      )}
    </AuthGuard>
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
