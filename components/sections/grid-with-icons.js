import Link from 'next/link';

import { CloudUploadIcon, CogIcon, LockClosedIcon, RefreshIcon, ServerIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/outline';

export default function GridWithIcons({ data }) {
  return (
    <div className="relative py-16">
      <div className="mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-base font-semibold tracking-wider text-primary-light uppercase">{data.subheading}</h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{data.heading}</p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500 dark:text-gray-400">{data.paragraph}</p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.gridItems.map(item => (
              <div key={item.title} className="pt-6">
                <Link href={item.linkHref || '#'}>
                  <a>
                    <div className="flow-root bg-gray-50 dark:bg-dark-150 rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-secondary rounded-md shadow-lg">
                            <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium tracking-tight">{item.title}</h3>
                        <p className="mt-5 text-base text-gray-500 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
