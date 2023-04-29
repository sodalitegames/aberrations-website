import Link from 'next/link';
import { BellIcon, CogIcon, CreditCardIcon, DocumentTextIcon, DesktopComputerIcon } from '@heroicons/react/outline';

import classNames from 'utils/functions/classnames';

import ContentLayout from 'layouts/ContentLayout';

const subNavigation = [
  { name: 'Dashboard', href: '', icon: BellIcon },
  { name: 'Account Settings', href: 'account-settings', icon: CogIcon },
  { name: 'Plan & Billing', href: 'plan-and-billing', icon: CreditCardIcon },
  { name: 'Resources', href: 'resources', icon: DocumentTextIcon },
  { name: 'Digital Tools', href: 'digital-tools', icon: DesktopComputerIcon },
];

export default function DashboardLayout({ active, children, heading }) {
  return (
    <ContentLayout heading={heading}>
      <div className="relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/****** NAVIGATION ******/}
          <aside className="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map(item => (
                <Link key={item.name} href={`/dashboard/${item.href}`}>
                  <a
                    className={classNames(
                      item.href === active ? 'bg-gray-50 dark:bg-dark-200 text-gray-900 dark:text-gray-200' : 'dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-200',
                      'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                    )}
                    aria-current={item.name === active ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.href === active ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
          </aside>
          {/****** END NAVIGATION ******/}
          {/****** CONTENT ******/}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">{children}</div>
          {/****** END CONTENT ******/}
        </div>
      </div>
    </ContentLayout>
  );
}
