import { useState } from 'react';
import Link from 'next/link';

import { useAuth } from 'auth/context';

import Notice from 'components/elements/notice';
import SubmitButton from 'components/elements/submit-button';

export default function ForgotPasswordForm() {
  const { sendPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!email) {
      setMessage({ message: 'You must provide an email.', status: 'error' });
      setProcessing(false);
      return;
    }

    const { result, error } = await sendPasswordReset(email);

    if (error) {
      setMessage(error);
      setProcessing(false);
      return;
    }

    setMessage(result);
    setProcessing(false);
    setEmail('');
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Send reset instructions" loading={processing} />
          </div>

          <div className="flex justify-center">
            <div className="text-sm">
              <Link href="/auth/signin">
                <a className="btn-text">Nevermind, take me back</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
