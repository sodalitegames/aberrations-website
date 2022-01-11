import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/solid';

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className="mb-2 overflow-x-auto hide-scrollbar">
      <nav className="sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <Link href="/">
                <a className="text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Home</a>
              </Link>
            </div>
          </li>
          {breadcrumbs.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                <Link href={item.href}>
                  <a className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 min-w-max">{item.name}</a>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
