import { useState } from 'react';

import api from '../../lib/email-api';
import { EMAIL_LISTS } from '../../utils/maps/email-lists';

import SubmitButton from './submit-button';

export default function EmailCTA({ ctaText, buttonText }) {
  // BLOG_NEWSLETTER
  // CHANGELOG_UPDATES

  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const mailingListFormSubmit = async e => {
    e.preventDefault();

    if (!email) return;

    setProcessing(true);

    let listIds = [EMAIL_LISTS.ABERRATIONS_RPG_UNCONFIRMED];

    try {
      await api.put('/marketing/contacts', {
        list_ids: listIds,
        contacts: [
          {
            email,
          },
        ],
      });
      setProcessing(false);
      setSuccess(true);
      setEmail('');
    } catch (e) {
      setProcessing(false);
      setFailure(true);
    }
  };

  return (
    <div className="mt-4 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center border-b border-t dark:border-gray-800 py-8">
      <p className="text-xl text-gray-500 dark:text-gray-400">{ctaText}</p>
      <form className="mt-6 flex flex-col sm:flex-col lg:mt-0 lg:justify-end" onSubmit={mailingListFormSubmit}>
        <div className="flex flex-col sm:flex-row lg:justify-end">
          <div className="lg:w-1/2">
            <label htmlFor="cta-email" className="sr-only">
              Email address
            </label>
            <input
              id="cta-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              required
              className="input-secondary w-full border border-gray-300 dark:border-transparent lg:max-w-xs"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
            <SubmitButton type="secondary" classes="text-sm" text={success ? 'Success!' : buttonText} loading={processing} />
          </div>
        </div>
        {success && <p className="text-secondary-light dark:text-gray-400 mt-4 lg:text-right">Thank you! Please check your inbox to activate your subscription.</p>}
        {failure && <p className="text-red-400 mt-4 lg:text-right">Sorry, something went wrong. Please try again later.</p>}
      </form>
    </div>
  );
}
