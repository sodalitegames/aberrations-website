import { useState, useEffect } from 'react';
import Link from 'next/link';

import { DocumentTextIcon, ChartSquareBarIcon, SparklesIcon } from '@heroicons/react/solid';

const ICON_MAP = {
  DocumentTextIcon: DocumentTextIcon,
  ChartSquareBarIcon: ChartSquareBarIcon,
  SparklesIcon: SparklesIcon,
};

export default function Action({ heading, description, iconRef, href, externalLink, index, length }) {
  const [icon, setIcon] = useState({ icon: DocumentTextIcon });

  useEffect(() => {
    if (!iconRef) return;
    // map icon ref to icon component
    setIcon({ icon: ICON_MAP[iconRef] });
  }, [iconRef]);

  return (
    <div className="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent3-dark dark:focus-within:ring-accent3">
      <div>
        <span className="inline-flex p-3 rounded-lg text-accent3-deep dark:text-accent3 bg-accent3 dark:bg-accent3-deep">
          <icon.icon className="w-6 h-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          {externalLink ? (
            <a href={href} className="focus:outline-none" target="_blank" rel="noreferrer">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              {heading}
            </a>
          ) : (
            <Link href={href}>
              <a className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {heading}
              </a>
            </Link>
          )}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <span className="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400" aria-hidden="true">
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  );
}
