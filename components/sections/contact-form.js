import { MailIcon, PhoneIcon } from '@heroicons/react/outline';

export default function ContactForm({ data }) {
  return (
    <div className="relative shadow-sm mt-8">
      <h2 className="sr-only">Contact us</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 dark:bg-dark-100">
        {/* CONTACT INFORMATION */}
        <div className="relative overflow-hidden py-10 px-6 bg-secondary sm:px-10 xl:p-12">
          <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" width={343} height={388} viewBox="0 0 343 388" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z" fill="url(#linear1)" fillOpacity=".1" />
              <defs>
                <linearGradient id="linear1" x1="254.553" y1="107.554" x2="961.66" y2="814.66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" width={359} height={339} viewBox="0 0 359 339" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z" fill="url(#linear2)" fillOpacity=".1" />
              <defs>
                <linearGradient id="linear2" x1="192.553" y1="28.553" x2="899.66" y2="735.66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" width={160} height={678} viewBox="0 0 160 678" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z" fill="url(#linear3)" fillOpacity=".1" />
              <defs>
                <linearGradient id="linear3" x1="192.553" y1="325.553" x2="899.66" y2="1032.66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">{data.mainHeading}</h3>
          <p className="mt-6 text-base text-gray-100 max-w-3xl">{data.paragraph}</p>
          <dl className="mt-8 space-y-6">
            {data.phoneNumber ? (
              <>
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                <dd className="flex text-base text-gray-100">
                  <PhoneIcon className="flex-shrink-0 w-6 h-6 text-gray-100" aria-hidden="true" />
                  <span className="ml-3">{data.phoneNumber}</span>
                </dd>
              </>
            ) : null}
            <dt>
              <span className="sr-only">Email</span>
            </dt>
            <dd className="flex text-base text-gray-100">
              <MailIcon className="flex-shrink-0 w-6 h-6 text-gray-100" aria-hidden="true" />
              <span className="ml-3">{data.contactEmail}</span>
            </dd>
          </dl>
        </div>

        {/* CONTACT FORM */}
        <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
          <h3 className="text-lg font-medium">{data.formHeading}</h3>
          <form
            action="/community/contact/thanks"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            name={data.contactEmail}
            className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <input type="hidden" name="form-name" value={data.contactEmail} />
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800  rounded-md" required />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <span id="phone-optional" className="text-sm text-gray-500">
                  Optional
                </span>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800  rounded-md"
                  aria-describedby="phone-optional"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <div className="mt-1">
                <input type="text" name="subject" id="subject" className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800  rounded-md" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <span id="message-max" className="text-sm text-gray-500">
                  Max. 500 characters
                </span>
              </div>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="py-3 px-4 block w-full shadow-sm input-primary border-gray-300 dark:border-gray-800  rounded-md"
                  aria-describedby="message-max"
                  defaultValue={''}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button type="submit" className="btn-primary mt-2 px-6 py-3">
                {data.submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
