import { useState, useEffect } from 'react';

import { CheckIcon, MailIcon, InformationCircleIcon } from '@heroicons/react/solid';

import Section from '../components/Section';

import Notice from '../../elements/notice';

export default function DashboardHome({ user }) {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // Check to see if this is a redirect from resetting their password
    const query = new URLSearchParams(window.location.search);
    if (query.get('reset') === 'success') {
      setNotice({ status: 'success', message: 'Your password has been successfully reset.' });
    }
  }, []);

  return (
    <>
      {notice ? <Notice status={notice.status} message={notice.message} hideable /> : null}

      <Section heading={`Hello there, ${user.name}`} description="Welcome to your dashboard." ariaTag="welcome">
        {/* MORE CONTENT GOES HERE WHEN I HAVE IT, PERHAPS EVEN SOME QUICK LINKS TO FORUM, BLOG, ETC */}
        {/* <p>More content is going to go here once it&apos;s ready.</p> */}
      </Section>

      <Section heading="Notifications and Timeline" description="You will be notified here of any invitations you have recieved." ariaTag="notifications">
        {user.timeline ? (
          <div className="mt-6 flow-root">
            <ul role="list" className="-mb-8">
              {user.timeline
                .slice(0)
                .reverse()
                .map((event, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== user.timeline.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-500" aria-hidden="true" /> : null}
                      <div className="relative flex space-x-3">
                        {event.type === 'INFO' ? (
                          <div>
                            <span className="bg-blue-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-dark-100">
                              <InformationCircleIcon className="h-5 w-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : event.type === 'RECIEVED' ? (
                          <div>
                            <span className="bg-yellow-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-dark-100">
                              <MailIcon className="h-5 w-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : event.type === 'COMPLETED' ? (
                          <div>
                            <span className="bg-green-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-dark-100">
                              <CheckIcon className="h-5 w-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-dark-100">
                              <InformationCircleIcon className="h-5 w-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        )}

                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{event.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                            <time dateTime={event.date}>{new Date(event.date).toLocaleDateString()}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </>
  );
}
