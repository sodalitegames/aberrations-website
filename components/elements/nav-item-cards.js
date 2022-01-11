import Link from 'next/link';

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
} from '@heroicons/react/outline';

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

export default function NavItemCards({ cards, parent }) {
  return (
    <>
      {cards.map((card, index) => {
        const icon = { icon: ICON_MAP[card.iconRef] };
        if (!icon) icon.icon = DocumentTextIcon;
        return (
          <Link key={index} href={`/${parent}/${card.slug}`}>
            <a>
              <div className="bg-white dark:bg-dark-150 hover:bg-gray-50 dark:hover:bg-dark-200 overflow-hidden shadow rounded-lg divide-y divide-gray-200 mb-8">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between flex-wrap md:flex-nowrap">
                  <div className="flex justify-between flex-nowrap">
                    <div>
                      <span className="text-gray-100 dark:text-white bg-secondary-fade dark:bg-secondary rounded-lg inline-flex p-3">
                        <icon.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl leading-6 font-medium dark:text-gray-200">{card.name}</h4>
                      <p className="mt-1 text-md text-gray-500 dark:text-gray-300">{card.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
}
