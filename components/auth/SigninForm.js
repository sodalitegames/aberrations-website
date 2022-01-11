import { useState } from 'react';
import Link from 'next/link';

import { useAuth } from '../../contexts/auth';

import Notice from '../elements/notice';
import SubmitButton from '../elements/submit-button';

export default function SigninForm({ redirectPath }) {
  const { login } = useAuth();

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

    const message = await login(email, password, redirectPath);

    if (message) {
      setMessage(message);
      setProcessing(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white dark:bg-dark-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
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
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary dark:focus:ring-primary-fade dark:bg-dark-400 border-gray-300 dark:border-gray-800 rounded"
                checked
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password">
                <a className="text-link-accent3">Forgot your password?</a>
              </Link>
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Sign in" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
