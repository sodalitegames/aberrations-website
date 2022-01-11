import { useEffect, useState } from 'react';
import Link from 'next/link';

import { BriefcaseIcon, GlobeIcon, LibraryIcon, MapIcon, OfficeBuildingIcon, UserGroupIcon, IdentificationIcon, FolderOpenIcon, BookmarkAltIcon } from '@heroicons/react/outline';

import { Disclosure } from '@headlessui/react';

import classNames from '../../utils/functions/classnames';

const ICON_MAP = {
  BriefcaseIcon: BriefcaseIcon,
  GlobeIcon: GlobeIcon,
  LibraryIcon: LibraryIcon,
  MapIcon: MapIcon,
  OfficeBuildingIcon: OfficeBuildingIcon,
  UserGroupIcon: UserGroupIcon,
  IdentificationIcon: IdentificationIcon,
  FolderOpenIcon: FolderOpenIcon,
  BookmarkAltIcon: BookmarkAltIcon,
};

export default function DisclosureCustom({ item, children, nested, terNested }) {
  const [icon, setIcon] = useState({ icon: GlobeIcon });

  useEffect(() => {
    if (!item.icon) return;
    // map icon ref to icon component
    setIcon({ icon: ICON_MAP[item.icon] });
  }, [item.icon]);

  return (
    <Disclosure as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              item.current ? 'bg-gray-200 text-gray-900 dark:bg-dark-200 dark:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent3-dark dark:focus:ring-accent3 dark:text-gray-300 dark:hover:bg-dark-200 dark:hover:text-gray-200',
              nested ? 'pl-11' : '',
              terNested ? 'pl-16' : ''
            )}
          >
            {!nested && !terNested && <icon.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" />}
            <span className="flex-1">{item.name}</span>
            <svg
              className={classNames(
                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 dark:group-hover:text-gray-200 transition-colors ease-in-out duration-150'
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export function DisclosureLink({ item, nested, terNested, closePanel }) {
  const [icon, setIcon] = useState({ icon: GlobeIcon });

  useEffect(() => {
    if (!item.icon) return;
    // map icon ref to icon component
    setIcon({ icon: ICON_MAP[item.icon] });
  }, [item.icon]);

  return (
    <Link href={item.href}>
      <a
        className={classNames(
          'group w-full flex items-center pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-200 dark:hover:text-gray-200',
          nested ? 'pl-16 font-normal' : 'pl-11',
          terNested ? 'pl-24 font-normal' : 'pl-11'
        )}
        onClick={closePanel}
      >
        {item.icon && (
          <icon.icon className={classNames(item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
        )}
        {item.name}
      </a>
    </Link>
  );
}
