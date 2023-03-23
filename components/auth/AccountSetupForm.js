import { useState } from 'react';
import { useStytch } from '@stytch/nextjs';

import { setupAccount } from '../../lib/auth-api';

import Notice from '../elements/notice';
import SubmitButton from '../elements/submit-button';

export default function AccountSetupForm({ user }) {
  const stytch = useStytch();

  const [firstName, setFirstName] = useState(user.name.first_name);
  const [lastName, setLastName] = useState(user.name.last_name);
  const [subscribe, setSubscribe] = useState(true);

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!firstName || !lastName) {
      setMessage({ message: 'You must fill out all fields.', status: 'error' });
      setProcessing(false);
      return;
    }

    try {
      const resp = await setupAccount({ firstName, lastName, subscribe });

      if (resp) {
        stytch.user.get();
      }
    } catch (e) {
      setMessage({ status: 'error', message: 'Something went wrong. Please try again later.' });
      setProcessing(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                autoComplete="first-name"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <div className="mt-1">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                autoComplete="last-name"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="subscribe"
                name="subscribe"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary dark:focus:ring-primary-fade dark:bg-dark-400 dark:border-gray-800"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
              />
              <label htmlFor="subscribe" className="block ml-2 text-sm">
                Sign me up for the mailing list
              </label>
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Set up my account" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
