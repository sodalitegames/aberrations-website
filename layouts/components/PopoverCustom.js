import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';

import { Popover, Transition } from '@headlessui/react';

import {
  BookmarkAltIcon,
  DesktopComputerIcon,
  PlayIcon,
  UserGroupIcon,
  SupportIcon,
  GlobeIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CollectionIcon,
  MailIcon,
  ChartSquareBarIcon,
  SparklesIcon,
  ExternalLinkIcon,
  DatabaseIcon,
  CubeTransparentIcon,
  FingerPrintIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';

import classNames from '../../utils/functions/classnames';

const ICON_MAP = {
  BookmarkAltIcon: BookmarkAltIcon,
  DesktopComputerIcon: DesktopComputerIcon,
  PlayIcon: PlayIcon,
  UserGroupIcon: UserGroupIcon,
  SupportIcon: SupportIcon,
  GlobeIcon: GlobeIcon,
  DocumentTextIcon: DocumentTextIcon,
  BookOpenIcon: BookOpenIcon,
  CollectionIcon: CollectionIcon,
  MailIcon: MailIcon,
  ChartSquareBarIcon: ChartSquareBarIcon,
  SparklesIcon: SparklesIcon,
  ExternalLinkIcon: ExternalLinkIcon,
  DatabaseIcon: DatabaseIcon,
  CubeTransparentIcon: CubeTransparentIcon,
  FingerPrintIcon: FingerPrintIcon,
};

export default function PopoverCustom({ name, navigation, actions }) {
  const [icon, setIcon] = useState({ icon: FingerPrintIcon });

  useEffect(() => {
    if (!navigation.iconRef) return;
    // map icon ref to icon component
    setIcon({ icon: ICON_MAP[navigation.iconRef] });
  }, [navigation.iconRef]);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent3-dark dark:focus:ring-accent3 dark:text-gray-300 dark:hover:text-gray-200 pl-2'
            )}
          >
            <span>{name}</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-900 dark:text-gray-200' : 'text-gray-500 dark:text-gray-300', 'ml-2 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-gray-200')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white dark:bg-dark-100 px-5 py-6 sm:gap-8 sm:p-8">
                  {navigation.showInChildList === 'Top' && (
                    <Link href={`/${navigation.path}`}>
                      <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-dark-200">
                        <icon.icon className="flex-shrink-0 h-6 w-6 text-accent3-dark dark:text-accent3" aria-hidden="true" />
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900 dark:text-gray-200">{navigation.name}</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{navigation.description}</p>
                        </div>
                      </a>
                    </Link>
                  )}
                  {navigation.children.map(({ name, path, description, iconRef }) => {
                    const icon = { icon: ICON_MAP[iconRef] };
                    return (
                      <Link key={name} href={`/${navigation.path}/${path}`}>
                        <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-dark-200">
                          <icon.icon className="flex-shrink-0 h-6 w-6 text-accent3-dark dark:text-accent3" aria-hidden="true" />
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900 dark:text-gray-200">{name}</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{description}</p>
                          </div>
                        </a>
                      </Link>
                    );
                  })}
                  {navigation.showInChildList === 'Bottom' && (
                    <Link href={`/${navigation.path}`}>
                      <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-dark-200">
                        <icon.icon className="flex-shrink-0 h-6 w-6 text-accent3-dark dark:text-accent3" aria-hidden="true" />
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900 dark:text-gray-200">{navigation.name}</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{navigation.description}</p>
                        </div>
                      </a>
                    </Link>
                  )}
                </div>

                {actions?.length ? (
                  <div className="px-5 py-5 bg-gray-50 dark:bg-dark-100 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8 border-t border-transparent dark:border-gray-600">
                    {actions.map(({ name, path, iconRef, externalLink }) => {
                      const icon = { icon: ICON_MAP[iconRef] };
                      return (
                        <div key={name} className="flow-root">
                          {externalLink ? (
                            <a href={path} className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                              <icon.icon className="flex-shrink-0 h-6 w-6 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                              <span className="ml-3">{name}</span>
                            </a>
                          ) : path ? (
                            <Link href={`${path}`}>
                              <a className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <icon.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">{name}</span>
                              </a>
                            </Link>
                          ) : (
                            <span className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-500 dark:text-gray-300">
                              <icon.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                              <span className="ml-3">{name}</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
