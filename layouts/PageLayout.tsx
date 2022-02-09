import ContentLayout from './ContentLayout';
import FullPageLayout from './FullPageLayout';
import SideNavPageLayout from './SideNavPageLayout';

import Header from './components/Header';
import Footer from './components/Footer';
import SiteBanner from './components/SiteBanner';
import DarkModeToggle from './components/DarkModeToggle';
import Seo from './components/Seo';

import { Metadata, SideNavItem, Breadcrumb } from '../utils/types/page-types';

interface PageLayoutProps {
  title?: string;
  heading?: string;
  seo: Metadata;
  breadcrumbs?: Breadcrumb[];
  sideNav?: SideNavItem[];
  custom?: boolean;
  full?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ seo, sideNav, custom, full, title, heading, breadcrumbs, children }) => {
  return (
    <>
      <Seo metadata={seo} />
      <div className="relative flex flex-col justify-between min-h-screen bg-white dark:bg-black dark:text-gray-300">
        <div>
          <SiteBanner />
          <Header />
          <div className="mx-auto max-w-7xl">
            {!custom && !full ? (
              <ContentLayout title={title} heading={heading} breadcrumbs={breadcrumbs}>
                {sideNav ? <SideNavPageLayout sideNav={sideNav}>{children}</SideNavPageLayout> : children}
              </ContentLayout>
            ) : full ? (
              <FullPageLayout>{children}</FullPageLayout>
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
        <Footer />

        <div className="fixed bottom-0.5 right-0.5 m-4">
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
