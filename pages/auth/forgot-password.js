import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth';

import PageLayout from '../../layouts/PageLayout';

import Notice from '../../components/elements/notice';
import SubmitButton from '../../components/elements/submit-button';

import Loader from '../../components/dashboard/components/Loader';

export default function ForgotPassword({ metadata }) {
  const router = useRouter();
  const { forgotPassword, user, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // if user is logged in, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!email) {
      setMessage({ message: 'You must provide an email.', status: 'error' });
      setProcessing(false);
      return;
    }

    const message = await forgotPassword(email);

    if (message.status === 'success') {
      setEmail('');
      setMessage(message);
      setProcessing(false);
    } else {
      setMessage(message);
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title={metadata.title} seo={metadata} custom>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} full>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">Forgot your password?</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">Enter your account email address and we’ll send you instructions on how to reset your password.</p>
      </div>

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
    </PageLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Forgot Password',
        slug: '/auth/forgot-password',
      },
    },
  };
}
