import Link from 'next/link';
import { useState } from 'react';

import api from '../../lib/email-api';
import { EMAIL_LISTS } from '../../utils/maps/email-lists';

import { attributes as navigation } from '../../content/settings/navigation.md';

import SubmitButton from '../../components/elements/submit-button';

export default function Footer() {
  const { footerNavigation } = navigation;

  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const mailingListFormSubmit = async e => {
    e.preventDefault();

    if (!email) return;

    setProcessing(true);

    try {
      await api.put('/marketing/contacts', {
        list_ids: [EMAIL_LISTS.ABERRATIONS_RPG_UNCONFIRMED],
        contacts: [
          {
            email,
          },
        ],
      });
      setProcessing(false);
      setSuccess(true);
      setEmail('');
    } catch (e) {
      setProcessing(false);
      setFailure(true);
    }
  };

  return (
    <footer className="bg-dark-50 dark:bg-dark-50 border-t dark:border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:col-span-2">
            {footerNavigation.map(col => (
              <div key={col.name}>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{col.name}</h3>
                <ul role="list" className="mt-4 space-y-1">
                  {col.navigationItems.map(({ name, href, externalLink }) => (
                    <li key={name}>
                      {externalLink ? (
                        <a href={href} className="text-sm font-light text-gray-300 hover:text-white">
                          {name}
                        </a>
                      ) : (
                        <Link href={href}>
                          <a className="text-sm font-light text-gray-300 hover:text-white">{name}</a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Join our mailing list</h3>
            <p className="mt-4 text-sm font-light text-gray-300">Keep up to date on new worlds, lore, and game updates.</p>
            <form className="mt-4 sm:flex sm:max-w-md" onSubmit={mailingListFormSubmit}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="footer-email"
                autoComplete="email"
                value={email}
                required
                className="input-accent3 appearance-none min-w-0 w-full rounded-md py-2 px-4"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <SubmitButton type="primary" classes="text-sm" text={success ? 'Success!' : 'Sign me up'} loading={processing} />
              </div>
            </form>
            {success && <p className="text-primary-fade mt-4">Thank you! Please check your inbox to activate your subscription.</p>}
            {failure && <p className="text-red-400 mt-4">Sorry, something went wrong. Please try again later.</p>}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          {/* <div className="flex space-x-6 md:order-2">
            {navigation.social.map(item => (
              <Link key={item.name} href={item.href}>
                <a className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              </Link>
            ))}
          </div> */}
          <p className="mt-8 text-sm text-gray-400 md:mt-0 md:order-1">
            &copy; 2021{' '}
            <a href="https://sodalitegames.com" target="_blank" rel="noreferrer">
              Sodalite Games, LLC
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
