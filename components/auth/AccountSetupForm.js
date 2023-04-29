import { useState } from 'react';

import { useAuth } from '../../contexts/auth';

import Notice from '../elements/notice';
import SubmitButton from '../elements/submit-button';

export default function AccountSetupForm() {
  const { setupAccount } = useAuth();

  const [name, setName] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!name) {
      setMessage({ message: 'You must fill out all fields.', status: 'error' });
      setProcessing(false);
      return;
    }

    const { result, error } = await setupAccount(name, subscribe);

    if (error) {
      setMessage(error);
      setProcessing(false);
      return;
    }

    setMessage(result);
    setProcessing(false);

    window.open('/dashboard?setup=success', '_self');
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                autoComplete="name"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setName(e.target.value)}
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
