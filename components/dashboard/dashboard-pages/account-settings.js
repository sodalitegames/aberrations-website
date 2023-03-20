import { useState, useEffect } from 'react';

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

import classNames from '../../../utils/functions/classnames';

import FormSection from '../components/FormSection';

import { useAuth } from '../../../contexts/auth';
import Notice from '../../elements/notice';

export default function Account({ user }) {
  const { setUser, updateUser, updateUserEmail, updateUserPassword, sendVerificationEmail, verifyEmailStart } = useAuth();

  // account settings
  const [firstName, setFirstName] = useState(user.name.first_name);
  const [lastName, setLastName] = useState(user.name.last_name);

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

  const sendEmailVerification = async email => {
    const resp = await verifyEmailStart(email);

    console.log('HERE', resp);

    setEmailSent(resp);

    // if (message.status === 'success') {
    //   setEmailSent({ status: 'success', message: 'Verification email has been sent. Please check your email and follow the instructions on the email.' });
    // } else {
    //   setEmailSent(message);
    // }
  };

  const updateAccountDetailsHandler = async e => {
    e.preventDefault();

    setProcessing('account-details');

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

    const data = await updateUser({ name: { first_name: firstName, last_name: lastName } });

    if (data) {
      setSettingsMessage({ status: data.status, message: data.message });
      setFirstName(data.data.user.name.first_name);
      setLastName(data.data.user.name.last_name);
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
        submitHandler={updateEmailHandler}
        processing={!!(processing === 'email-change')}
      >
        <>
          {user.emails.map(({ email, verified }) => (
            <>
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
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {verified ? <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" /> : <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />}
                  </div>
                </div>
              </div>

              {/* If email is verified */}
              {verified ? (
                <p className="mt-2 text-sm text-green-600" id="verify-message">
                  Your email is verified.
                </p>
              ) : (
                <p className="mt-2 text-sm text-red-600" id="verify-message">
                  {emailSent && <p className={classNames('font-medium', emailSent.status === 'success' ? 'text-green-600' : 'text-red-600')}>{emailSent.message}</p>}
                  {!emailSent && (
                    <span className="font-medium text-red-600">
                      Your email is not verified. If you have not recieved a verfication email, you can{' '}
                      <span className="underline cursor-pointer hover:text-red-700" onClick={() => sendEmailVerification(email)}>
                        send another one here.
                      </span>
                    </span>
                  )}
                </p>
              )}
            </>
          ))}

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
    </>
  );
}
