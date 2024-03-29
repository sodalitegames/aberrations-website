/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';

import Link from 'next/link';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { DesktopComputerIcon, UserGroupIcon, DocumentTextIcon, BookOpenIcon, CubeTransparentIcon } from '@heroicons/react/outline';

import PopoverCustom from './PopoverCustom';

import { useAuth } from 'contexts/auth';

import { attributes as global } from 'content/settings/global.md';
import { attributes as navigation } from 'content/settings/navigation.md';

const ICON_MAP = {
  DesktopComputerIcon: DesktopComputerIcon,
  UserGroupIcon: UserGroupIcon,
  DocumentTextIcon: DocumentTextIcon,
  BookOpenIcon: BookOpenIcon,
  CubeTransparentIcon: CubeTransparentIcon,
};

export default function Header() {
  const { user, signout } = useAuth();
  const { siteTitle } = global;
  const { headerNavigation } = navigation;

  return (
    <Popover className="relative border-b-2 border-gray-100 bg-gray-50 dark:bg-dark-50 dark:border-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-4 py-6 lg:justify-start md:space-x-10 sm:px-6">
          <div className="flex justify-start lg:w-0 xl:min-w-max lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">{siteTitle}</span>
                <h3 className="text-xl font-display">{siteTitle.toUpperCase()}</h3>
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent3-dark dark:focus:ring-accent3">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/************************************ DESKTOP MENU *****************************************/}
          <Popover.Group as="nav" className="hidden space-x-5 lg:flex xl:space-x-10">
            {headerNavigation.map(nav =>
              nav.children?.length ? (
                <PopoverCustom key={nav.name} name={nav.name} navigation={nav} actions={nav.callToActions} />
              ) : (
                <Link key={nav.name} href={`/${nav.path}`}>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200">{nav.name}</a>
                </Link>
              )
            )}
          </Popover.Group>
          <div className="items-center justify-end hidden lg:flex lg:flex-1 lg:w-0">
            {user ? (
              <>
                <a className="btn-text" onClick={signout}>
                  Logout
                </a>

                <Link href="/dashboard">
                  <a className="ml-6 btn-primary">Dashboard</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <a className="btn-text">Sign in</a>
                </Link>
                <Link href="/auth/signup">
                  <a className="ml-6 btn-primary">Sign up</a>
                </Link>
              </>
            )}
          </div>

          {/***************************************************************************************/}
        </div>
      </div>

      {/************************************ MOBILE MENU *****************************************/}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform lg:hidden">
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark-200 divide-gray-50 dark:divide-gray-800">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-2xl font-display">{siteTitle.toUpperCase()}</h3>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-dark-200 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent3">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {headerNavigation.map(({ name, path, iconRef, children }) => {
                    const icon = { icon: iconRef ? ICON_MAP[iconRef] : CubeTransparentIcon };
                    return (
                      <div key={name}>
                        <Link key={name} href={`/${path}`}>
                          <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50 dark:hover:bg-dark-300">
                            <icon.icon className="flex-shrink-0 w-6 h-6 text-accent3" aria-hidden="true" />
                            <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">{name}</span>
                          </a>
                        </Link>
                        {children?.length ? (
                          <div className="grid grid-cols-1 mt-8 font-normal gap-y-4 gap-x-8 ml-9">
                            {children.map(item => (
                              <Link key={item.name} href={`/${path}/${item.path}`}>
                                <a className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200">{item.name}</a>
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              <div>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <a className="w-full btn-primary">Dashboard</a>
                    </Link>
                    <p className="mt-6 text-base font-medium text-center text-gray-500">
                      <a className="btn-text" onClick={signout}>
                        Logout
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup">
                      <a className="w-full btn-primary">Sign up</a>
                    </Link>
                    <p className="mt-6 text-base font-medium text-center text-gray-500 dark:text-gray-300">
                      Have an account?{' '}
                      <Link href="/auth/signin">
                        <a className="text-link-accent3">Sign in</a>
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      {/***************************************************************************************/}
    </Popover>
  );
}
