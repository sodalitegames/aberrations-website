import { useState } from 'react';

import api from '../../lib/email-api';
import { EMAIL_LISTS } from '../../utils/maps/email-lists';

import SubmitButton from '../elements/submit-button';

export default function MailingList({ data }) {
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const formSubmit = async e => {
    e.preventDefault();

    if (!email) return;

    setProcessing(true);

    try {
      await api.put('/marketing/contacts', {
        list_ids: [EMAIL_LISTS.ABERRATIONS_RPG_UNCONFIRMED],
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
    <div className="relative sm:py-16">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative rounded-2xl px-6 py-10 bg-primary dark:bg-primary-dark overflow-hidden shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path className="text-primary-fade text-opacity-40 dark:text-opacity-10" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
              <path className="text-primary-light text-opacity-40 dark:text-opacity-10" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
          </div>
          <div className="relative">
            <div className="sm:text-center">
              <h2 className="text-3xl font-extrabold text-white dark:text-gray-200 tracking-tight sm:text-4xl">{data.heading}</h2>
              <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-300">{data.text}</p>
            </div>
            <form className="mt-12 sm:mx-auto sm:max-w-lg sm:flex" onSubmit={formSubmit}>
              <div className="min-w-0 flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  className="input-secondary block w-full rounded-md px-5 py-3 shadow-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <SubmitButton type="secondary" classes="text-sm px-5 py-3" text={success ? 'Success!' : data.button} loading={processing} />
              </div>
            </form>
            {success && <p className="text-gray-100 mt-4 text-center">Thank you! Please check your inbox to activate your subscription.</p>}
            {failure && <p className="text-gray-100 mt-4 text-center">Sorry, something went wrong. Please try again later.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
