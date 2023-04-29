import { useState } from 'react';

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

import { useAuth } from 'contexts/auth';

import classNames from 'utils/functions/classnames';

import FormSection from 'components/dashboard/components/FormSection';

import Notice from 'components/elements/notice';

export default function Account() {
  const { user, updateProfile, updateEmail, updatePassword, sendEmailVerification } = useAuth();

  // account settings
  const [name, setName] = useState(user.displayName);

  // email change
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // password change
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  // feedback
  const [settingsMessage, setSettingsMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [processing, setProcessing] = useState(null);

  const sendEmailVerificationHandler = async () => {
    const { result, error } = await sendEmailVerification();

    if (error) {
      setEmailSent(error);
      return;
    }

    setEmailSent(result);
  };

  const updateAccountDetailsHandler = async e => {
    e.preventDefault();

    setProcessing('account-details');

    if (!name) {
      setSettingsMessage({ status: 'error', message: 'You must provide a name.' });
      setProcessing(false);
      return;
    }

    if (name === user.displayName) {
      setSettingsMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const { result, error } = await updateProfile(name);

    if (error) {
      setSettingsMessage(error);
      setProcessing(false);
      return;
    }

    setSettingsMessage(result);
    setProcessing(false);
  };

  const updateEmailHandler = async e => {
    e.preventDefault();

    setProcessing('email-change');

    if (!email) {
      setEmailMessage({ status: 'error', message: 'You must provide an email.' });
      setProcessing(false);
      return;
    }

    if (!password) {
      setEmailMessage({ status: 'error', message: 'You must provide a password.' });
      setProcessing(false);
      return;
    }

    if (email === user.email) {
      setEmailMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const { result, error } = await updateEmail(password, email);

    if (error) {
      setEmailMessage(error);
      setProcessing(false);
      return;
    }

    setEmailMessage(result);
    setProcessing(false);

    setPassword('');
  };

  const updatePasswordHandler = async e => {
    e.preventDefault();

    setProcessing('password-change');

    if (!passwordCurrent) {
      setPasswordMessage({ status: 'error', message: 'You must provide your current password.' });
      setProcessing(false);
      return;
    }

    if (!newPassword || !newPasswordConfirm) {
      setPasswordMessage({ message: 'You must provide both a password and a password confirmation.', status: 'error' });
      setProcessing(false);
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setPasswordMessage({ status: 'error', message: 'Passwords do not match.' });
      setProcessing(false);
      return;
    }

    if (passwordCurrent === newPassword) {
      setPasswordMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const { result, error } = await updatePassword(passwordCurrent, newPassword);

    if (error) {
      setPasswordMessage(error);
      setProcessing(false);
      return;
    }

    setPasswordMessage(result);
    setProcessing(false);

    setPasswordCurrent('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  return (
    <>
      <FormSection
        heading="Account Details"
        description="Update your account information."
        ariaTag="account-details"
        submitText="Save changes"
        submitDescription="Please enter your full name, or a display name you are comfortable with."
        submitHandler={updateAccountDetailsHandler}
        submitDisabled={name === user.displayName || !name}
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
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
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
        submitDescription="For your security, you must enter your current password first in order to change your email."
        submitHandler={updateEmailHandler}
        submitDisabled={email === user.email || !email || !password}
        processing={!!(processing === 'email-change')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              autoComplete="password"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-3 md:w-6/12">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>

            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                autoComplete="email"
                className="w-full border border-gray-300 shadow-sm input-secondary dark:border-transparent"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {user.emailVerified ? <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" /> : <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />}
              </div>
            </div>
          </div>

          {/* If email is verified */}
          {user.emailVerified ? (
            <p className="mt-2 text-sm text-green-600" id="verify-message">
              Your email is verified.
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-600" id="verify-message">
              {emailSent ? (
                <span className={classNames('font-medium', emailSent.status === 'success' ? 'text-green-600' : 'text-red-600')}>{emailSent.message}</span>
              ) : (
                <span className="font-medium text-red-600">
                  Your email is not verified. If you have not recieved a verfication email, you can{' '}
                  <span className="underline cursor-pointer hover:text-red-700" onClick={sendEmailVerificationHandler}>
                    send another one here.
                  </span>
                </span>
              )}
            </p>
          )}

          {/* Email change feedback */}
          {emailMessage ? <Notice status={emailMessage.status} message={emailMessage.message} classes="mt-4" hideable /> : null}
        </>
      </FormSection>

      <FormSection
        heading="Password Change"
        description="Change your password."
        ariaTag="change-password"
        submitText="Save changes"
        submitDescription="For your security, you must enter your current password first in order to change it."
        submitHandler={updatePasswordHandler}
        submitDisabled={!passwordCurrent || !newPassword || !newPasswordConfirm || newPassword !== newPasswordConfirm}
        processing={!!(processing === 'password-change')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current password
            </label>
            <input
              type="password"
              name="current-password"
              id="current-password"
              value={passwordCurrent}
              autoComplete="current-password"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
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
              value={newPassword}
              autoComplete="new-password"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
              onChange={e => setNewPassword(e.target.value)}
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
              value={newPasswordConfirm}
              autoComplete="confirm-new-password"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
              onChange={e => setNewPasswordConfirm(e.target.value)}
            />
          </div>
          {passwordMessage ? <Notice status={passwordMessage.status} message={passwordMessage.message} hideable /> : null}
        </>
      </FormSection>
    </>
  );
}
