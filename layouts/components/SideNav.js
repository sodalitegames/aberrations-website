import { Disclosure } from '@headlessui/react';

import classNames from '../../utils/functions/classnames';

const SideNav = ({ navigation, classes, closePanel }) => {
  return (
    <nav className={classNames('space-y-1', classes)} aria-label="Sidebar">
      {navigation.map(item =>
        !item.children?.length ? (
          <div key={item.name}>
            <a
              href={`#${item.idRef}`}
              onClick={closePanel}
              className={classNames(
                item.current
                  ? 'bg-gray-100 dark:bg-dark-200 text-gray-900 dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-200 hover:text-gray-900 dark:hover:text-gray-200',
                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              {item.name}
            </a>
          </div>
        ) : (
          <Disclosure as="div" key={item.name} className="space-y-1">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 dark:bg-dark-200 text-gray-900 dark:text-gray-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-200 hover:text-gray-900 dark:hover:text-gray-200',
                    'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent3-dark dark:focus:ring-accent3'
                  )}
                >
                  <span className="flex-1">{item.name}</span>
                  <svg
                    className={classNames(
                      open ? 'text-gray-400 dark:text-gray-300 rotate-90' : 'text-gray-300 dark:text-gray-400',
                      'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 dark:group-hover:text-gray-300 transition-colors ease-in-out duration-150'
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  {item.children.map(subItem => (
                    <span key={subItem.name} onClick={closePanel}>
                      <Disclosure.Button
                        key={subItem.name}
                        as="a"
                        href={`#${subItem.idRef}`}
                        className="group w-full flex items-center pl-6 pr-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-200"
                      >
                        {subItem.name}
                      </Disclosure.Button>
                    </span>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </nav>
  );
};

export default SideNav;
