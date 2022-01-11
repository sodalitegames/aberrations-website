import { CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';

import api from '../../../lib/auth-api';
import { getStripe } from '../../../lib/stripe-client';

import classNames from '../../../utils/functions/classnames';

export default function Pricing({ active, plans, subscriptionInterval, paidPlan }) {
  const [interval, setInterval] = useState('month');

  const handleCheckout = async lookupId => {
    if (paidPlan) {
      // if paid plan, redirect to customer portal
      try {
        const { data } = await api.post('/users/create-portal-session');
        window.open(data.url);
      } catch (error) {
        return alert(error.message);
      }
    } else {
      // otherwise, create a checkout session
      try {
        const { data } = await api.post('/users/create-checkout-session', {
          lookup_key: lookupId,
        });

        const { sessionId } = data;

        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        return alert(error.message);
      }
    }
  };

  return (
    <>
      <div className="sm:flex sm:flex-col sm:align-center">
        <div className="relative self-start mb-6 bg-gray-100 dark:bg-dark-200 rounded-lg p-0.5 flex sm:mt-8">
          <button
            type="button"
            className={classNames(
              interval === 'month' ? 'bg-white dark:bg-dark-300' : 'text-gray-700 dark:text-gray-400',
              'relative w-1/2  border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:z-10 sm:w-auto sm:px-8'
            )}
            onClick={() => setInterval('month')}
          >
            Monthly billing
          </button>
          <button
            type="button"
            className={classNames(
              interval === 'year' ? 'bg-white dark:bg-dark-300' : 'text-gray-700 dark:text-gray-400',
              'ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium  whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:z-10 sm:w-auto sm:px-8'
            )}
            onClick={() => setInterval('year')}
          >
            Yearly billing
          </button>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:mx-auto xl:grid-cols-3">
        {plans.map(tier => (
          <div
            key={tier.name}
            className={classNames(
              tier.lookupIdMonthly === active || tier.lookupIdYearly === active ? 'border-2 border-gray-200 dark:border-gray-800' : 'border border-gray-200 dark:border-gray-800',
              'rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-800 dark:bg-dark-200'
            )}
          >
            <div className="p-6">
              <h2 className="text-lg leading-6 font-medium dark:text-gray-200">{tier.name}</h2>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">{tier.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold dark:text-gray-200">{interval === 'month' ? tier.priceMonthly : tier.priceYearly}</span>{' '}
                {tier.priceMonthly !== 'Free' ? <span className="text-base font-medium text-gray-500 dark:text-gray-300">/ {interval}</span> : null}
              </p>
              <button
                disabled={active === tier.lookupIdMonthly || active === tier.lookupIdYearly}
                className={classNames(
                  active === tier.lookupIdMonthly || active === tier.lookupIdYearly
                    ? 'text-gray-400 dark:text-gray-500 bg-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-700 cursor-default'
                    : 'bg-primary border-primary-light text-white hover:bg-primary-light',
                  'mt-8 block w-full border rounded-md py-2 text-sm font-semibold text-center'
                )}
                onClick={() => handleCheckout(interval === 'month' ? tier.lookupIdMonthly : tier.lookupIdYearly)}
              >
                {active === tier.lookupIdMonthly || active === tier.lookupIdYearly
                  ? `Current Plan ${tier.lookupIdMonthly !== 'free-forever' ? `(${subscriptionInterval})` : ''}`
                  : paidPlan
                  ? 'Manage Subscription'
                  : `Purchase ${tier.name}`}
              </button>
            </div>

            <div className="pt-6 pb-8 px-6">
              <h3 className="text-sm font-medium tracking-wide uppercase text-gray-700 dark:text-gray-300">What&apos;s included</h3>
              <ul role="list" className="mt-6 space-y-4">
                {tier.includedFeatures.map(({ feature }) => (
                  <li key={feature} className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* <h3 className="text-sm font-medium tracking-wide uppercase text-gray-700 dark:text-gray-300 pt-6">Aberrations RPG Sheets</h3>
              <ul role="list" className="mt-6 space-y-4">
                {tier.sheetsFeatures.map(({ feature }) => (
                  <li key={feature} className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul> */}
              <h3 className="text-sm font-medium tracking-wide uppercase text-gray-700 dark:text-gray-300 pt-6">Features coming soon</h3>
              <ul role="list" className="mt-6 space-y-4">
                {tier.comingSoon.map(({ feature }) => (
                  <li key={feature} className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
