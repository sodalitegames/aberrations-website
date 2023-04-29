import { useState } from 'react';
import Link from 'next/link';

import { XIcon } from '@heroicons/react/outline';

import { attributes as global } from 'content/settings/global.md';

export default function SiteBanner() {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) {
    return null;
  }

  const { siteBanner } = global;

  return (
    <div className="relative bg-secondary dark:bg-secondary">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="text-sm font-light text-white">
            <span className="md:hidden">{siteBanner.shortText}</span>
            <span className="hidden md:inline">{siteBanner.longText}</span>
            {siteBanner.link.text && siteBanner.link.href ? (
              <span className="block sm:ml-2 sm:inline-block">
                <Link href={siteBanner.link.href}>
                  <a className="font-bold text-white underline hover:text-gray-200">
                    {siteBanner.link.text} <span aria-hidden="true">&rarr;</span>
                  </a>
                </Link>
              </span>
            ) : null}
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
          <button type="button" className="flex p-2 rounded-md hover:bg-secondary-deep focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setShowBanner(false)}>
            <span className="sr-only">Dismiss</span>
            <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
