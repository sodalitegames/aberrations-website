/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';

import Link from 'next/link';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { DesktopComputerIcon, UserGroupIcon, DocumentTextIcon, BookOpenIcon, CubeTransparentIcon } from '@heroicons/react/outline';

import PopoverCustom from './PopoverCustom';

import { useAuth } from '../../contexts/auth';

import { attributes as global } from '../../content/settings/global.md';
import { attributes as navigation } from '../../content/settings/navigation.md';

const ICON_MAP = {
  DesktopComputerIcon: DesktopComputerIcon,
  UserGroupIcon: UserGroupIcon,
  DocumentTextIcon: DocumentTextIcon,
  BookOpenIcon: BookOpenIcon,
  CubeTransparentIcon: CubeTransparentIcon,
};

export default function Header() {
  const { user, logout } = useAuth();
  const { siteTitle } = global;
  const { headerNavigation } = navigation;

  return (
    <Popover className="relative bg-gray-50 dark:bg-dark-50 border-b-2 border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className=" flex justify-between items-center py-6 lg:justify-start md:space-x-10 px-4 sm:px-6">
          <div className="flex justify-start lg:w-0 xl:min-w-max lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">{siteTitle}</span>
                <h3 className="text-xl font-display">{siteTitle.toUpperCase()}</h3>
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 lg:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent3-dark dark:focus:ring-accent3">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/************************************ DESKTOP MENU *****************************************/}
          <Popover.Group as="nav" className="hidden lg:flex space-x-5 xl:space-x-10">
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
          <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
            {user ? (
              <>
                <a className="btn-text" onClick={logout}>
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
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-50">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-dark-200 divide-y-2 divide-gray-50 dark:divide-gray-800">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-2xl font-display">{siteTitle.toUpperCase()}</h3>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white dark:bg-dark-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent3">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
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
                          <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-dark-300">
                            <icon.icon className="flex-shrink-0 h-6 w-6 text-accent3" aria-hidden="true" />
                            <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">{name}</span>
                          </a>
                        </Link>
                        {children?.length ? (
                          <div className="grid grid-cols-1 gap-y-4 gap-x-8 mt-8 ml-9 font-normal">
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
            <div className="py-6 px-5 space-y-6">
              <div>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <a className="w-full btn-primary">Dashboard</a>
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      <a className="btn-text" onClick={logout}>
                        Logout
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup">
                      <a className="w-full btn-primary">Sign up</a>
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-300">
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
