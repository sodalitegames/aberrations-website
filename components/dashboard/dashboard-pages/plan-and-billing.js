import { useState, useEffect } from 'react';

import api from '../../../apis/auth';

import Section from '../components/Section';
import FormSection from '../components/FormSection';
import Pricing from '../components/Pricing';

import Notice from '../../elements/notice';

export default function PlanAndBilling({ user, pricingPlans }) {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setNotice({ status: 'success', heading: 'Order successful', message: 'Thank you for your subscription!!' });
    }
    if (query.get('canceled')) {
      setNotice({ status: 'warn', heading: 'Order canceled', message: 'You can proceed with your order at any time.' });
    }
  }, []);

  useEffect(() => {
    if (user.subscription) {
      // if susbscription is canceled or inactive, set the appropriate notice
      if (user.subscription.status !== 'active') {
        setNotice({ status: 'info', heading: 'Your Subscription is Inactive', message: 'Your subscription is inactive. You can renew it in your subscription portal.' });
      }

      if (user.subscription.cancel_at_period_end) {
        setNotice({
          status: 'warn',
          heading: 'Your Subscription Has Been Canceled',
          message: 'Your subscription has been canceled and will become inactive at the end of this billing cycle. You can renew your subscription in your subscription portal.',
        });
      }
    }
  }, [user.subscription]);

  useEffect(() => {
    if (user.subscription) {
      // if subscription is active, get the subscription data
      if (user.subscription.status === 'active') {
        const { plan, price } = user.subscription.items.data[0];

        const subscriptionPrice = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency,
          minimumFractionDigits: 2,
        }).format(price.unit_amount / 100);

        setSubscriptionData({
          name: price.nickname,
          lookup_key: price.lookup_key,
          price: subscriptionPrice,
          interval: plan.interval,
          renews: new Date(user.subscription.current_period_end * 1000).toLocaleDateString(),
        });
      }
    }
  }, [user.subscription]);

  const redirectToCustomerPortal = async e => {
    e.preventDefault();

    try {
      const { data } = await api.post('/users/create-portal-session');
      window.open(data.url);
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <>
      {notice ? <Notice status={notice.status} heading={notice.heading} message={notice.message} hideable /> : null}

      {/* If they are on the Free Forever plan */}
      {!user.stripeCustomerId && !user.subscription ? (
        <Section heading="My Plan" description="" ariaTag="my-plan">
          <p>You are on the Free Forever plan.</p>
          {/* more details go here later */}
        </Section>
      ) : null}

      {/* If they have downgraded to the Free Forever plan */}
      {user.stripeCustomerId && user.subscription && user.subscription.status !== 'active' ? (
        <FormSection
          heading="My Plan"
          description="We partner with Stripe for simplified and secure billing."
          ariaTag="my-plan"
          submitText="Open customer portal"
          submitDescription="Manage your subscription securely on Stripe."
          submitColor="primary"
          submitHandler={redirectToCustomerPortal}
        >
          <p>You are on the Free Forever plan.</p>
          {/* more details go here later */}
        </FormSection>
      ) : null}

      {/* If they have subscribed to a paid plan */}
      {user.stripeCustomerId && user.subscription && subscriptionData && user.subscription.status === 'active' ? (
        <FormSection
          heading="My Plan"
          description="We partner with Stripe for simplified and secure billing."
          ariaTag="my-plan"
          submitText="Open customer portal"
          submitDescription="Manage your subscription securely on Stripe."
          submitColor="primary"
          submitHandler={redirectToCustomerPortal}
        >
          <div className="rounded-md bg-gray-50 dark:bg-dark-200 border-gray-200 dark:border-gray-800 relative border p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none">
            <div className="flex items-center text-sm">
              <span className="ml-3 font-medium">{subscriptionData.name}</span>
            </div>

            <div className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
              <span className="font-medium">
                {subscriptionData.price} / {subscriptionData.interval}
              </span>
            </div>

            <div className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right">
              {user.subscription.cancel_at_period_end ? 'expires' : 'renews'} on {subscriptionData.renews}
            </div>
          </div>
        </FormSection>
      ) : null}

      {/* Plans Overview if on Free Forever plan */}
      {!user.stripeCustomerId && !user.subscription ? (
        <Section heading="About Plans" description="Sign up for a paid plan to unlock tools, resources, content, and more." ariaTag="about-plans">
          <Pricing active="free-forever" plans={pricingPlans} />
        </Section>
      ) : null}

      {/* Plans Overview if on Free Forever plan, but used to have a subscription */}
      {user.stripeCustomerId && user.subscription && user.subscription.status !== 'active' ? (
        <Section heading="About Plans" description="Sign up for a paid plan to unlock tools, resources, content, and more." ariaTag="about-plans">
          <Pricing active="free-forever" plans={pricingPlans} />
        </Section>
      ) : null}

      {/* Plans Overview if on paid plan */}
      {user.stripeCustomerId && user.subscription && subscriptionData ? (
        <Section heading="See More Plans" description="Upgrade your paid plan to unlock even more tools, resources, content, and more." ariaTag="about-plans">
          <Pricing active={subscriptionData.lookup_key} plans={pricingPlans} paidPlan subscriptionInterval={subscriptionData.interval === 'month' ? 'Monthly' : 'Yearly'} />
        </Section>
      ) : null}
    </>
  );
}
