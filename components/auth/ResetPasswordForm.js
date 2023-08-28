import { useState } from 'react';

import { useAuth } from 'auth/context';

import Notice from 'components/elements/notice';
import SubmitButton from 'components/elements/submit-button';

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!password || !passwordConfirm) {
      setMessage({ message: 'You must provide both a password and a password confirmation.', status: 'error' });
      setProcessing(false);
      return;
    }

    if (password !== passwordConfirm) {
      setMessage({ status: 'error', message: 'Passwords do not match.' });
      setProcessing(false);
      return;
    }

    const message = await resetPassword(token, password, passwordConfirm);

    if (message) {
      setMessage(message);
      setProcessing(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
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
                required
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
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
                required
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Reset my password" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
