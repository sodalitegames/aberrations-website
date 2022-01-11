import { useState } from 'react';

import { useAuth } from '../../contexts/auth';

import Notice from '../elements/notice';
import SubmitButton from '../elements/submit-button';

export default function SignupForm({ redirectPath }) {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!name || !email || !password || !passwordConfirm) {
      setMessage({ message: 'You must fill out all fields.', status: 'error' });
      setProcessing(false);
      return;
    }

    if (password !== passwordConfirm) {
      setMessage({ status: 'fail', message: 'Passwords do not match.' });
      setProcessing(false);
      return;
    }

    const message = await signup(name, email, password, passwordConfirm, subscribe, redirectPath);

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
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>

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

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                autoComplete="confirm-password"
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
                onChange={e => setPasswordConfirm(e.target.value)}
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
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Sign me up for the mailing list
              </label>
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Create my account" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
