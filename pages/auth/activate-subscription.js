import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import api from '../../lib/auth-api';

import PageLayout from '../../layouts/PageLayout';

import Notice from '../../components/elements/notice';
import LoadingSpinner from '../../components/elements/loading-spinner';

export default function ActivateSubscription() {
  const router = useRouter();
  const { email, token } = router.query;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (email && token) {
      async function activateSubscription() {
        try {
          const { data } = await api.post('/email/activateSubscription', { secret: process.env.NEXT_PUBLIC_SENDGRID_SECRET, email, listId: token });
          setMessage(data);
        } catch (err) {
          setMessage({ status: 'error', message: 'An error occurred while activating your subscription. Please try again later.' });
        }
      }
      activateSubscription();
    } else {
      setMessage({ message: 'Insufficient subscriber information has been provided.', status: 'warn' });
    }
  }, [email, token]);

  return (
    <PageLayout title="Activate your subscription" seo={{ title: 'Activate your subscription' }} full>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-dark-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-6 text-center text-3xl font-extrabold">Activate your subscription</h2>
          </div>
          {message ? (
            <Notice message={message.message} status={message.status} link={{ text: 'Go to home', href: '/' }} />
          ) : (
            <div className="w-full flex justify-center">
              <LoadingSpinner dark />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
