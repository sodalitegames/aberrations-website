import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'auth/context';

import Notice from 'components/elements/notice';
import SubmitButton from 'components/elements/submit-button';

export default function VerifyEmailForm() {
  const router = useRouter();
  const { resendSignupCode, confirmSignup } = useAuth();

  const { email } = router.query;

  const [code, setCode] = useState(true);

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleResendSignupCode = async () => {
    try {
      await resendSignupCode?.(email);
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!code) {
      setMessage({ message: 'You must provide a code.', status: 'error' });
      setProcessing(false);
      return;
    }

    try {
      await confirmSignup?.(email, code);
      setMessage({ status: 'success', message: 'You have successfully confirmed your email.' });
      router.push('/auth/signin');
    } catch (err) {
      setMessage({ status: 'error', message: err?.message || 'An unknown error occurred. Please try again later.' });
    } finally {
      setProcessing(false);
    }
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
              <input id="email" name="email" type="email" value={email} readOnly className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800" />
            </div>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium">
              Code
            </label>
            <div className="mt-1">
              <input id="code" name="code" type="number" value={code} className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800" onChange={e => setCode(e.target.value)} />
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
              Didn&apos;t recieve the code?{' '}
              <a className="font-normal text-link-accent3" onClick={handleResendSignupCode}>
                Resend code
              </a>
            </p>
          </div>

          <div>
            <SubmitButton type="primary" text="Verify my email" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
