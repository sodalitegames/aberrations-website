/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { getIcon } from 'utils/functions/get-icon';

export default function FeatureWithScreenshot({ data }) {
  const icon = getIcon(data.iconRef);
  return (
    <div className="relative pt-12 pb-12 overflow-hidden">
      <div className="relative">
        {data.image.side === 'RIGHT' ? (
          <div className="lg:mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-primary">
                    <icon.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">{data.heading}</h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{data.text}</p>
                  <div className="mt-6">
                    {data.button.externalLink ? (
                      <a
                        href={data.button.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-light"
                      >
                        <span className="mr-2">{data.button.text}</span> <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={data.button.href}>
                        <a className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-light">{data.button.text}</a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={`/${data.image.image}`}
                  alt="Aberrations RPG Sheets user interface"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-primary">
                    <icon.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">{data.heading}</h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{data.text}</p>
                  <div className="mt-6">
                    {data.button.externalLink ? (
                      <a
                        href={data.button.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-light"
                      >
                        <span className="mr-2">{data.button.text}</span> <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={data.button.href}>
                        <a className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-light">{data.button.text}</a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={`/${data.image.image}`}
                  alt="Aberrations RPG Sheets user interface"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
