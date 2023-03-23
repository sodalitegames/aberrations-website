import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser } from '@stytch/nextjs';

import PageLayout from '../../layouts/PageLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

import Account from '../../components/dashboard/dashboard-pages/account-settings';
import PlanAndBilling from '../../components/dashboard/dashboard-pages/plan-and-billing';
import Resources from '../../components/dashboard/dashboard-pages/resources';
import DigitalTools from '../../components/dashboard/dashboard-pages/digital-tools';

import Loader from '../../components/dashboard/components/Loader';

export default function DashboardSection({ resources, digitalTools, pricingPlans, metadata }) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  useEffect(() => {
    if (isInitialized && user === null) {
      router.push('/auth/signin');
    }
  }, [user, isInitialized, router]);

  if (user) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <DashboardLayout heading={metadata.title} active={metadata.slug}>
          {metadata.slug === 'account-settings' && <Account user={user} />}
          {metadata.slug === 'plan-and-billing' && <PlanAndBilling user={user} pricingPlans={pricingPlans} />}
          {metadata.slug === 'resources' && <Resources user={user} resources={resources} />}
          {metadata.slug === 'digital-tools' && <DigitalTools user={user} digitalTools={digitalTools} />}
        </DashboardLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={metadata.title} custom>
      <Loader />
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const paths = ['account-settings', 'plan-and-billing', 'resources', 'digital-tools'].map(slug => ({ params: { section: slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { section } = context.params;

  const dashboard = await import(`../../content/settings/dashboard.md`).catch(error => null);

  const { resources, digitalTools, pricingPlans } = dashboard.attributes;

  let metadata;

  switch (section) {
    case 'account-settings':
      metadata = {
        title: 'Account Settings',
        slug: section,
      };
      break;
    case 'plan-and-billing':
      metadata = {
        title: 'Plan & Billing',
        slug: section,
      };
      break;
    case 'resources':
      metadata = {
        title: 'Resources',
        slug: section,
      };
      break;
    case 'digital-tools':
      metadata = {
        title: 'Digital Tools',
        slug: section,
      };
      break;
    default:
      metadata = {
        title: 'My Dashboard',
        slug: 'dashboard',
      };
      break;
  }

  return {
    props: {
      resources,
      digitalTools,
      pricingPlans,
      metadata,
    },
  };
}
