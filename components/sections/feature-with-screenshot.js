/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { SparklesIcon, ExternalLinkIcon } from '@heroicons/react/outline';

export default function FeatureWithScreenshot({ data }) {
  return (
    <div className="relative pt-12 pb-12 overflow-hidden">
      <div className="relative">
        {data.screenshotSide === 'RIGHT' ? (
          <div className="lg:mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-primary">
                    <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">{data.heading}</h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{data.paragraph}</p>
                  <div className="mt-6">
                    {/* data.externalLink */}
                    {data.externalLink ? (
                      <a
                        href={data.buttonHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light"
                      >
                        <span className="mr-2">{data.buttonText}</span> <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={data.buttonHref}>
                        <a className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light">{data.buttonText}</a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={data.screenshot.url}
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-primary">
                    <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">{data.heading}</h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{data.paragraph}</p>
                  <div className="mt-6">
                    {/* data.externalLink */}
                    <a href={data.buttonHref} className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light">
                      {data.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={data.screenshot.url}
                  alt="Customer profile user interface"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
