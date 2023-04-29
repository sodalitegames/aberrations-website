import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth.js';

import PageLayout from '../../layouts/PageLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

import Account from '../../components/dashboard/pages/account-settings.js';
import PlanAndBilling from '../../components/dashboard/pages/plan-and-billing.js';
import Resources from '../../components/dashboard/pages/resources.js';
import DigitalTools from '../../components/dashboard/pages/digital-tools.js';

import Loader from '../../components/dashboard/components/Loader';

export default function DashboardSection({ resources, digitalTools, pricingPlans, metadata }) {
  const router = useRouter();
  const { user, data, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (!user || !data) {
    return (
      <PageLayout title={metadata.title} custom>
        <Loader />
      </PageLayout>
    );
  }

  console.log('user:', user);
  console.log('user:', data);

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <DashboardLayout heading={metadata.title} active={metadata.slug}>
        {metadata.slug === 'account-settings' && <Account />}
        {metadata.slug === 'plan-and-billing' && <PlanAndBilling pricingPlans={pricingPlans} />}
        {metadata.slug === 'resources' && <Resources resources={resources} />}
        {metadata.slug === 'digital-tools' && <DigitalTools digitalTools={digitalTools} />}
      </DashboardLayout>
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
