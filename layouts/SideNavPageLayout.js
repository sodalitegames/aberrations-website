import SideNav from './components/SideNav';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/outline';

export default function SideNavPageLayout({ sideNav, children }) {
  const [open, setOpen] = useState(false);

  const closePanel = () => {
    setOpen(false);
  };

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-4 relative">
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
      <section className="md:col-span-9 lg:col-span-9 xl:col-span-9">{children}</section>
      <aside className="md:block md:col-span-3 lg:block lg:col-span-3 xl:blockd xl:col-span-3">
        <div className="sticky top-6 space-y-4 overflow-y-scroll p-2 hide-scrollbar" style={{ maxHeight: '85vh' }}>
          {/****** SIDE NAVIGATION ******/}
          <SideNav navigation={sideNav} classes="hidden md:block" />
          {/****** END SIDE NAVIGATION ******/}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0  overflow-y-scroll md:hidden z-50" onClose={setOpen}>
              <div className="absolute inset-0  overflow-y-scroll">
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
                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-300">Page Navigation</Dialog.Title>
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
                          <SideNav navigation={sideNav} closePanel={closePanel} />
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
