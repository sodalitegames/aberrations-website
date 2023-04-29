import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'contexts/auth';

import PageLayout from 'layouts/PageLayout';

import Notice from 'components/elements/notice';
import LoadingSpinner from 'components/elements/loading-spinner';

export default function VerifyEmail() {
  const { verifyEmail, verifyEmailUpdate } = useAuth();

  const router = useRouter();
  const { token, update } = router.query;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token) {
      if (update) {
        async function requestVerificationUpdate() {
          const message = await verifyEmailUpdate(token);
          setMessage(message);
        }
        requestVerificationUpdate();
      } else {
        async function requestVerification() {
          const message = await verifyEmail(token);
          setMessage(message);
        }
        requestVerification();
      }
    }
  }, [token, update, verifyEmail, verifyEmailUpdate]);

  return (
    <PageLayout title="Verify your email" seo={{ title: 'Verify your email' }} full>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-6 text-3xl font-extrabold text-center">Verify your email</h2>
          </div>
          {message ? (
            <Notice message={message.message} status={message.status} link={{ text: 'Sign in', href: '/dashboard/account-settings', external: true }} />
          ) : (
            <div className="flex justify-center w-full">
              <LoadingSpinner dark />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
