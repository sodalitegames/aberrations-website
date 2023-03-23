import { Fragment, useState, useCallback } from 'react';
import { useStytch } from '@stytch/nextjs';

import { login_expiration_minutes, session_duration_minutes, BASE_URL } from '../../../lib/stytch';

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

import classNames from '../../../utils/functions/classnames';

import FormSection from '../components/FormSection';

import Notice from '../../elements/notice';

export default function Account({ user }) {
  const stytch = useStytch();

  // account settings
  const [firstName, setFirstName] = useState(user.name.first_name);
  const [lastName, setLastName] = useState(user.name.last_name);

  // email change
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // password change
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // feedback
  const [settingsMessage, setSettingsMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [processing, setProcessing] = useState(null);

  const updateUser = useCallback(
    async data => {
      return await stytch.user.update(data);
    },
    [stytch]
  );

  const resetPassword = useCallback(
    async (existing_password, new_password) => {
      return await stytch.passwords.resetByExistingPassword({
        existing_password,
        new_password,
        session_duration_minutes,
      });
    },
    [stytch]
  );

  const sendMagicLink = useCallback(
    async email => {
      return await stytch.magicLinks.email.send(email, {
        login_magic_link_url: `${BASE_URL}/auth/verify-email`,
        signup_magic_link_url: `${BASE_URL}/auth/verify-email`,
        login_expiration_minutes,
      });
    },
    [stytch]
  );

  const sendEmailVerification = async email => {
    const resp = await sendMagicLink(email);

    if (resp) {
      setEmailSent({ status: 'success', message: 'Verification email has been sent. Please check your onbox and follow the instructions on the email.' });
    }
  };

  const updateUserHandler = async e => {
    e.preventDefault();

    setProcessing('update-user');

    if (!firstName) {
      setSettingsMessage({ status: 'error', message: 'You must provide a first name.' });
      setProcessing(false);
      return;
    }

    if (firstName === user.name.first_name && lastName === user.name.last_name) {
      setSettingsMessage({ status: 'info', message: 'There are no changes to apply.' });
      setProcessing(false);
      return;
    }

    const resp = await updateUser({ name: { first_name: firstName, last_name: lastName } });

    if (resp) {
      setSettingsMessage({ status: 'success', message: 'Updates successfully applied.' });
      setFirstName(resp.user.name.first_name);
      setLastName(resp.user.name.last_name);
      setProcessing(false);
    }
  };

  const addEmailHandler = async e => {
    e.preventDefault();

    setProcessing('add-email');

    if (!email) {
      setEmailMessage({ status: 'error', message: 'You must provide an email.' });
      setProcessing(false);
      return;
    }

    const resp = await sendMagicLink(email);

    if (resp) {
      setEmailMessage({ status: 'success', message: 'Please check your inbox to verify your new email address.' });
      setProcessing(false);
    }
  };

  const resetPasswordHandler = async e => {
    e.preventDefault();

    setProcessing('reset-password');

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

    const resp = await resetPassword(passwordCurrent, password);

    if (resp) {
      setPasswordMessage({ status: 'success', message: 'Password successfully reset.' });
      setProcessing(false);
    }
  };

  return (
    <>
      <FormSection
        heading="Account Details"
        description="Update your account information."
        ariaTag="update-user"
        submitText="Save changes"
        submitDescription="Please enter your full name, or a display name you are comfortable with."
        submitHandler={updateUserHandler}
        processing={!!(processing === 'account-details')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              autoComplete="cc-first-name"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className="my-3 md:w-6/12">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              autoComplete="cc-last-name"
              className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
              onChange={e => setLastName(e.target.value)}
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
        submitHandler={addEmailHandler}
        processing={!!(processing === 'add-email')}
      >
        <>
          <div className="my-3 md:w-6/12">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            {user.emails.map(({ email, verified }) => (
              <Fragment key={email}>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input type="text" className="w-full border border-gray-300 shadow-sm input-secondary dark:border-transparent" value={email} disabled />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {verified ? <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" /> : <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />}
                  </div>
                </div>

                {/* If email is verified */}
                {verified ? (
                  <p className="my-2 text-sm text-green-600" id="verify-message">
                    Your email is verified.
                  </p>
                ) : (
                  <p className="my-2 text-sm text-red-600" id="verify-message">
                    {emailSent && <span className={classNames('font-medium', emailSent.status === 'success' ? 'text-green-600' : 'text-red-600')}>{emailSent.message}</span>}
                    {!emailSent && (
                      <span className="font-medium text-red-600">
                        Your email is not verified. If you have not recieved a verfication email, you can{' '}
                        <a className="underline cursor-pointer hover:text-red-700" onClick={() => sendEmailVerification(email)}>
                          send another one here.
                        </a>
                      </span>
                    )}
                  </p>
                )}
              </Fragment>
            ))}
            <button className="mt-4 btn-tertiary">Add New Email</button>
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
            </div>
          </div>

          {/* Email change feedback */}
          {emailMessage ? <Notice status={emailMessage.status} message={emailMessage.message} hideable /> : null}
        </>
      </FormSection>

      {user.password && (
        <FormSection
          heading="Password Change"
          description="Change your password."
          ariaTag="change-password"
          submitText="Save changes"
          submitDescription="For your security, you must enter your current password first in order to change it."
          submitHandler={resetPasswordHandler}
          processing={!!(processing === 'reset-password')}
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
                value={password}
                autoComplete="new-password"
                className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
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
                className="w-full mt-1 border border-gray-300 shadow-sm input-secondary dark:border-transparent"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </div>
            {passwordMessage ? <Notice status={passwordMessage.status} message={passwordMessage.message} hideable /> : null}
          </>
        </FormSection>
      )}
    </>
  );
}
