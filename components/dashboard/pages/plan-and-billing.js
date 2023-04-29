import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { createPortalSession } from 'apis/internal';

import { useAuth } from 'contexts/auth';

import Section from 'components/dashboard/components/Section';
import FormSection from 'components/dashboard/components/FormSection';
import Pricing from 'components/dashboard/components/Pricing';

import Notice from 'components/elements/notice';

export default function PlanAndBilling({ pricingPlans }) {
  const router = useRouter();
  const { data } = useAuth();

  const [notice, setNotice] = useState(null);
  const [message, setMessage] = useState(null);

  const customerId = data?.stripe_customer_id;
  const subscriptionId = data?.stripe_subscription_id;
  const productId = data?.stripe_product_id || 'free';

  const interval = data?.stripe_subscription_interval || '';
  const canceled = data?.stripe_subscription_cancelled || false;

  const activePlan = pricingPlans.find(plan => plan.testProductId === productId || plan.liveProductId === productId);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const { success, canceled } = router.query;
    if (success) {
      setMessage({ status: 'success', heading: 'Order successful', message: 'Thank you for your subscription!!' });
    }
    if (canceled) {
      setMessage({ status: 'warn', heading: 'Order canceled', message: 'You can proceed with your order at any time.' });
    }
  }, [router.query]);

  useEffect(() => {
    if (customerId) {
      // if susbscription is cancelled or inactive, set the appropriate notice
      if (!subscriptionId) {
        setNotice({ status: 'info', heading: 'Your Paid Subscription is Inactive', message: 'Your paid subscription is inactive. You can renew it by purchasing a plan below.' });
      }

      if (canceled) {
        setNotice({
          status: 'warn',
          heading: 'Your Subscription Has Been Canceled',
          message: 'Your subscription has been canceled and will become inactive at the end of this billing cycle. You can renew your subscription in your subscription portal.',
        });
      }
    }
  }, [customerId, subscriptionId, canceled]);

  const redirectToCustomerPortal = async e => {
    e.preventDefault();

    try {
      const { data } = await createPortalSession();
      window.open(data.url);
    } catch (error) {
      return alert(error.message);
    }
  };

  {
    /* If they are on the Free Forever plan */
  }
  if (!subscriptionId) {
    return (
      <>
        {message ? <Notice status={message.status} heading={message.heading} message={message.message} hideable /> : null}
        {notice ? <Notice status={notice.status} heading={notice.heading} message={notice.message} hideable /> : null}

        {/* If they are on the Free Forever plan */}
        {!customerId && (
          <Section heading="My Plan" description="" ariaTag="my-plan">
            <PlanDetails plan={activePlan} interval={interval} />
          </Section>
        )}

        {/* If they have downgraded to the Free Forever plan */}
        {customerId && (
          <FormSection
            heading="My Plan"
            description="We partner with Stripe for simplified and secure billing."
            ariaTag="my-plan"
            submitText="Customer portal"
            submitDescription="Manage your details securely on Stripe."
            submitColor="primary"
            submitHandler={redirectToCustomerPortal}
          >
            <PlanDetails plan={activePlan} interval={interval} />
          </FormSection>
        )}

        <Section heading="About Plans" description="Sign up for a paid plan to unlock tools, resources, content, and more." ariaTag="about-plans">
          <Pricing active="free-forever" plans={pricingPlans} />
        </Section>
      </>
    );
  }

  {
    /* If they have subscribed to a paid plan */
  }
  return (
    <>
      {notice ? <Notice status={notice.status} heading={notice.heading} message={notice.message} hideable /> : null}

      <FormSection
        heading="My Plan"
        description="We partner with Stripe for simplified and secure billing."
        ariaTag="my-plan"
        submitText="Manage subscription"
        submitDescription="Manage your subscription securely on Stripe."
        submitColor="primary"
        submitHandler={redirectToCustomerPortal}
      >
        <PlanDetails plan={activePlan} interval={interval} />
      </FormSection>

      <Section heading="See More Plans" description="Upgrade your paid plan to unlock even more tools, resources, content, and more." ariaTag="about-plans">
        <Pricing
          active={interval === 'month' ? activePlan.lookupIdMonthly : activePlan.lookupIdYearly}
          plans={pricingPlans}
          customerId={customerId}
          subscriptionInterval={interval === 'year' ? 'Yearly' : 'Monthly'}
        />
      </Section>
    </>
  );
}

const PlanDetails = ({ plan, interval }) => {
  const price = interval === 'year' ? plan.priceYearly : plan.priceMonthly;

  return (
    <div className="relative flex flex-col p-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-dark-200 dark:border-gray-800 md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none">
      <div className="flex items-center text-sm">
        <span className="ml-3 font-medium">{plan.name}</span>
      </div>

      <div className="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center">
        <span className="font-medium">{interval ? `${price} / ${interval}` : price}</span>
      </div>

      <div className="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-right">Active</div>
    </div>
  );
};
