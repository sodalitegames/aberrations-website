import Link from 'next/link';

import { attributes as navigation } from '../../content/settings/navigation.md';

import MailerLiteForm from 'components/elements/mailer-lite-form';

interface FooterNavColumn {
  name: string;
  navigationItems: {
    name: string;
    href: string;
    externalLink?: boolean;
  }[];
}

const Footer = () => {
  const { footerNavigation }: { footerNavigation: FooterNavColumn[] } = navigation;

  return (
    <footer className="border-t bg-dark-50 dark:bg-dark-50 dark:border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
            {footerNavigation.map(col => (
              <div key={col.name}>
                <h3 className="text-sm font-semibold tracking-wider text-gray-200 uppercase">{col.name}</h3>
                <ul role="list" className="mt-4 space-y-1">
                  {col.navigationItems.map(({ name, href, externalLink }) => (
                    <li key={name}>
                      {externalLink ? (
                        <a href={href} className="text-sm font-light text-gray-300 hover:text-white">
                          {name}
                        </a>
                      ) : (
                        <Link href={href}>
                          <a className="text-sm font-light text-gray-300 hover:text-white">{name}</a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold tracking-wider text-gray-200 uppercase">Join our mailing list</h3>
            <p className="mt-4 text-sm font-light text-gray-300">Keep up to date on new worlds, lore, and game updates.</p>

            <div className="w-full -mx-6">
              <MailerLiteForm type="primary" />
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-800 md:flex md:items-center md:justify-between">
          {/* <div className="flex space-x-6 md:order-2">
            {navigation.social.map(item => (
              <Link key={item.name} href={item.href}>
                <a className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </a>
              </Link>
            ))}
          </div> */}
          <p className="mt-8 text-sm text-gray-400 md:mt-0 md:order-1">
            &copy; 2021{' '}
            <a href="https://sodalitegames.com" target="_blank" rel="noreferrer">
              Sodalite Games, LLC
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
