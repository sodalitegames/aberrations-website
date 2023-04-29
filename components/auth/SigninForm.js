import { useState } from 'react';
import Link from 'next/link';

import { useAuth } from 'contexts/auth';

import Notice from 'components/elements/notice';
import SubmitButton from 'components/elements/submit-button';

export default function SigninForm() {
  const { signin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();

    setProcessing(true);

    if (!email || !password) {
      setMessage({ message: 'You must provide both an email and a password.', status: 'error' });
      setProcessing(false);
      return;
    }

    const { result, error } = await signin(email, password);

    if (error) {
      setMessage(error);
      setProcessing(false);
      return;
    }

    setMessage(result);
    setProcessing(false);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <Notice
            status="warn"
            heading="We have a new authentication system!"
            message="If you created an account with us before April 2023, you will need to create a new one now. Be sure to use the same email, so you don't lose any of your data."
            noIcon
          />
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Sign in" loading={processing} />
          </div>

          <div className="text-sm text-center">
            <Link href="/auth/forgot-password">
              <a className="text-link-accent3">Forgot your password?</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
