import { CheckIcon, MailIcon, InformationCircleIcon } from '@heroicons/react/solid';

import Section from '../components/Section';

export default function DashboardHome({ user }) {
  return (
    <>
      <Section heading={`Hello there, ${user.name.first_name}`} description="Welcome to your dashboard." ariaTag="welcome">
        {/* MORE CONTENT GOES HERE WHEN I HAVE IT, PERHAPS EVEN SOME QUICK LINKS TO FORUM, BLOG, ETC */}
        {/* <p>More content is going to go here once it&apos;s ready.</p> */}
      </Section>

      <Section heading="Notifications and Timeline" description="You will be notified here of any invitations you have recieved." ariaTag="notifications">
        {user.timeline ? (
          <div className="flow-root mt-6">
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
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-700 rounded-full ring-8 ring-white dark:ring-dark-100">
                              <InformationCircleIcon className="w-5 h-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : event.type === 'RECIEVED' ? (
                          <div>
                            <span className="flex items-center justify-center w-8 h-8 bg-yellow-700 rounded-full ring-8 ring-white dark:ring-dark-100">
                              <MailIcon className="w-5 h-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : event.type === 'COMPLETED' ? (
                          <div>
                            <span className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-white dark:ring-dark-100">
                              <CheckIcon className="w-5 h-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary ring-8 ring-white dark:ring-dark-100">
                              <InformationCircleIcon className="w-5 h-5 text-white dark:text-gray-200" aria-hidden="true" />
                            </span>
                          </div>
                        )}

                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{event.message}</p>
                          </div>
                          <div className="text-sm text-right text-gray-500 whitespace-nowrap dark:text-gray-300">
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
