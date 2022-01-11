import Link from 'next/link';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MenuAlt3Icon, XIcon, BookOpenIcon } from '@heroicons/react/outline';

import ContentLayout from './ContentLayout';
import DisclosureCustom, { DisclosureLink } from './components/DisclosureCustom';
import Notice from '../components/elements/notice';

export default function WorldPageLayout({ title, heading, breadcrumbs, navigation, children, worldSlug }) {
  const [open, setOpen] = useState(false);

  const closePanel = () => {
    setOpen(false);
  };

  return (
    <div className="md:grid md:grid-cols-12">
      <section className="md:col-span-9 lg:col-span-9 xl:col-span-9 border-r border-gray-200 dark:border-gray-800">
        <ContentLayout title={title} heading={heading} breadcrumbs={breadcrumbs}>
          {/* ***************** MOBILE NAV ICON ***************** */}
          <div className="sticky top-5 right-0.5 my-4 flex justify-end z-40 md:hidden">
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent3-dark dark:focus:ring-accent3"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open page nav panel</span>
                <MenuAlt3Icon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
          </div>
          {/* ***************** END MOBILE NAV ICON ***************** */}
          <Notice
            status="warn"
            heading="Important Notice"
            message="All Avarice world lore is currently being written and revised, and is not officially released. Due to this, any of the lore is subject to change with or without notice up until an official release is announced."
          />
          {children}
        </ContentLayout>
      </section>
      <aside className="md:block md:col-span-3 lg:block lg:col-span-3 xl:blockd xl:col-span-3 bg-gray-100 dark:bg-dark-100 py-1">
        <div className="sticky top-2 space-y-4 overflow-y-scroll hide-scrollbar" style={{ maxHeight: '85vh' }}>
          {/****** SIDE NAVIGATION ******/}
          <div className="flex flex-col grow pt-4 pb-4 hidden md:block">
            <div className="mt-5 grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
                <Link href={`/get-started/world-playbooks/${worldSlug}`}>
                  <a className="text-gray-600 hover:bg-gray-50 hover:text-gray-600 group w-full flex items-center pl-2 py-2 text-sm font-medium border-b-2 border-t-2 mb-6 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-dark-200 dark:hover:text-gray-200">
                    <BookOpenIcon className="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    {navigation.worldName} World Playbook
                  </a>
                </Link>

                {navigation.worldNav.map(item =>
                  !item.children ? (
                    <DisclosureLink key={item.name} item={item} closePanel={closePanel} />
                  ) : (
                    <DisclosureCustom key={item.name} item={item}>
                      {item.children.map(subItem =>
                        !subItem.children ? (
                          <DisclosureLink key={subItem.name} item={subItem} closePanel={closePanel} />
                        ) : (
                          <DisclosureCustom key={subItem.name} item={subItem} nested>
                            {subItem.children.map(terItem =>
                              !terItem.children ? (
                                <DisclosureLink key={terItem.name} item={terItem} closePanel={closePanel} nested />
                              ) : (
                                <DisclosureCustom key={terItem.name} item={terItem} terNested>
                                  {terItem.children.map(quatItem => (
                                    <DisclosureLink key={quatItem.name} item={quatItem} closePanel={closePanel} terNested />
                                  ))}
                                </DisclosureCustom>
                              )
                            )}
                          </DisclosureCustom>
                        )
                      )}
                    </DisclosureCustom>
                  )
                )}
              </nav>
            </div>
          </div>
          {/****** END SIDE NAVIGATION ******/}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden md:hidden z-50" onClose={setOpen}>
              <div className="absolute inset-0 overflow-hidden">
                <Dialog.Overlay className="absolute inset-0" />

                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-200"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <div className="w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white dark:bg-dark-100 shadow-xl overflow-y-scroll">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-300">World Page Navigation</Dialog.Title>
                            <div className="ml-3 h-7 flex items-center">
                              <button
                                type="button"
                                className="bg-white dark:bg-dark-100 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent3-dark dark:focus:ring-accent3"
                                onClick={closePanel}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                          {/* Replace with your content */}
                          {/****** MOBILE SIDE NAVIGATION ******/}
                          <div className="flex flex-col grow pt-4 pb-4 overflow-y-auto">
                            <div className="mt-5 grow flex flex-col">
                              <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
                                <Link href={`/get-started/world-playbooks/${worldSlug}`}>
                                  <a className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-2 py-2 text-sm font-medium border-b-2 border-t-2 mb-6 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-dark-200 dark:hover:text-gray-200">
                                    <BookOpenIcon className="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                                    {navigation.worldName} World Playbook
                                  </a>
                                </Link>

                                {navigation.worldNav.map(item =>
                                  !item.children ? (
                                    <DisclosureLink key={item.name} item={item} closePanel={closePanel} />
                                  ) : (
                                    <DisclosureCustom key={item.name} item={item}>
                                      {item.children.map(subItem =>
                                        !subItem.children ? (
                                          <DisclosureLink key={subItem.name} item={subItem} closePanel={closePanel} />
                                        ) : (
                                          <DisclosureCustom key={subItem.name} item={subItem} nested>
                                            {subItem.children.map(terItem =>
                                              !terItem.children ? (
                                                <DisclosureLink key={terItem.name} item={terItem} closePanel={closePanel} nested />
                                              ) : (
                                                <DisclosureCustom key={terItem.name} item={terItem} terNested>
                                                  {terItem.children.map(quatItem => (
                                                    <DisclosureLink key={quatItem.name} item={quatItem} closePanel={closePanel} terNested />
                                                  ))}
                                                </DisclosureCustom>
                                              )
                                            )}
                                          </DisclosureCustom>
                                        )
                                      )}
                                    </DisclosureCustom>
                                  )
                                )}
                              </nav>
                            </div>
                          </div>
                          {/****** END SIDE NAVIGATION ******/}
                          {/* /End replace */}
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </aside>
    </div>
  );
}
