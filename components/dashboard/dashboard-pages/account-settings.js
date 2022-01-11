import { useState, useEffect } from 'react';

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

import classNames from '../../../utils/functions/classnames';

import FormSection from '../components/FormSection';

import { useAuth } from '../../../contexts/auth';
import Notice from '../../elements/notice';

export default function Account({ user }) {
  const { setUser, updateUser, updateUserEmail, updateUserPassword, sendVerificationEmail } = useAuth();

  // account settings
  const [name, setName] = useState(user.name);

  // email change
  const [email, setEmail] = useState(user.email);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  // password change
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // feedback
  const [settingsMessage, setSettingsMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // Check to see if this is a reload from changing their password
    const query = new URLSearchParams(window.location.search);
    if (query.get('password') === 'success') {
      setNotice({ status: 'success', message: 'Your password has been successfully updated.' });
    }
  }, []);

  useEffect(() => {
    // set verify message if user's email has been verified
    if (!user.isEmailVerified) {
      setEmailVerified(false);
    }
  }, [user.isEmailVerified]);

  const sendEmailVerificationHandler = async () => {
    const message = await sendVerificationEmail();

    if (message.status === 'success') {
      setEmailSent({ status: 'success', message: 'Verification email has been sent. Please check your email and follow the instructions on the email.' });
    } else {
      setEmailSent(message);
    }
  };

  const updateAccountDetailsHandler = async e => {
    e.preventDefault();

    setProcessing('account-details');

    if (!name) {
      setSettingsMessage({ status: 'error', message: 'You must provide a name.' });
      setProcessing(false);
      return;
    }

    if (name === user.name) {
      setSettingsMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const data = await updateUser({ name });

    if (data) {
      setSettingsMessage({ status: data.status, message: data.message });
      setName(data.data.user.name);
      setUser(data.data.user);
      setProcessing(false);
    }
  };

  const updateEmailHandler = async e => {
    e.preventDefault();

    setProcessing('email-change');

    if (!email) {
      setEmailMessage({ status: 'error', message: 'You must provide an email.' });
      setProcessing(false);
      return;
    }

    if (email === user.email) {
      setEmailMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const data = await updateUserEmail(user.email, email);

    if (data) {
      setEmailMessage({ status: data.status, message: data.message });

      if (data.stats === 'success') {
        setEmail(user.email);
      }

      setProcessing(false);
    }
  };

  const updatePasswordHandler = async e => {
    e.preventDefault();

    setProcessing('password-change');

    if (!passwordCurrent) {
      setPasswordMessage({ status: 'error', message: 'You must provide your current password.' });
      setProcessing(false);
      return;
    }

    if (!password || !passwordConfirm) {
      setPasswordMessage({ message: 'You must provide both a password and a password confirmation.', status: 'error' });
      setProcessing(false);
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordMessage({ status: 'error', message: 'Passwords do not match.' });
      setProcessing(false);
      return;
    }

    if (passwordCurrent === password) {
      setPasswordMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const message = await updateUserPassword(passwordCurrent, password, passwordConfirm);

    if (message) {
      setPasswordMessage(message);
      setProcessing(false);
    }
  };

  return (
    <>
      {notice ? <Notice status={notice.status} message={notice.message} hideable /> : null}

      <FormSection
        heading="Account Details"
        description="Update your account information."
        ariaTag="account-details"
        submitText="Save changes"
        submitDescription="Please enter your full name, or a display name you are comfortable with."
        submitHandler={updateAccountDetailsHandler}
        processing={!!(processing === 'account-details')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              autoComplete="cc-given-name"
              className="input-secondary mt-1 w-full border border-gray-300 dark:border-transparent shadow-sm"
              onChange={e => setName(e.target.value)}
            />
          </div>
          {settingsMessage ? <Notice status={settingsMessage.status} message={settingsMessage.message} hideable /> : null}
        </>
      </FormSection>

      <FormSection
        heading="Your Email"
        description="This is the email address you will use to log in."
        ariaTag="your-email"
        submitText="Save changes"
        submitDescription="We will email you to verify the change."
        submitHandler={updateEmailHandler}
        processing={!!(processing === 'email-change')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                autoComplete="email"
                className="input-secondary w-full border border-gray-300 dark:border-transparent shadow-sm"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {emailVerified ? <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" /> : <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
              </div>
            </div>
          </div>

          {/* If email is verified */}
          {emailVerified ? (
            <p className="mt-2 text-sm text-green-600" id="verify-message">
              Your email is verified.
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-600" id="verify-message">
              {emailSent && <p className={classNames('font-medium', emailSent.status === 'success' ? 'text-green-600' : 'text-red-600')}>{emailSent.message}</p>}
              {!emailSent && (
                <p className="font-medium text-red-600">
                  Your email is not verified. If you have not recieved a verfication email, you can{' '}
                  <span className="cursor-pointer underline hover:text-red-700" onClick={sendEmailVerificationHandler}>
                    send another one here.
                  </span>
                </p>
              )}
            </p>
          )}

          {/* Email change feedback */}
          {emailMessage ? <Notice status={emailMessage.status} message={emailMessage.message} hideable /> : null}
        </>
      </FormSection>

      <FormSection
        heading="Password Change"
        description="Change your password."
        ariaTag="change-password"
        submitText="Save changes"
        submitDescription="For your security, you must enter your current password first in order to change it."
        submitHandler={updatePasswordHandler}
        processing={!!(processing === 'password-change')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current password
            </label>
            <input
              type="password"
              name="current-password"
              id="current-password"
              value={passwordCurrent}
              autoComplete="current-password"
              className="input-secondary mt-1 w-full border border-gray-300 dark:border-transparent shadow-sm"
              onChange={e => setPasswordCurrent(e.target.value)}
            />
          </div>

          <div className="my-3 md:w-6/12">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New password
            </label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              value={password}
              autoComplete="new-password"
              className="input-secondary mt-1 w-full border border-gray-300 dark:border-transparent shadow-sm"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-3 md:w-6/12">
            <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirm-new-password"
              id="confirm-new-password"
              value={passwordConfirm}
              autoComplete="confirm-new-password"
              className="input-secondary mt-1 w-full border border-gray-300 dark:border-transparent shadow-sm"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          {passwordMessage ? <Notice status={passwordMessage.status} message={passwordMessage.message} hideable /> : null}
        </>
      </FormSection>
    </>
  );
}
