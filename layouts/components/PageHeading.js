import Breadcrumbs from 'layouts/components/Breadcrumbs';

export default function PageHeading({ breadcrumbs, children }) {
  return (
    <div className="px-4 pt-8 pb-4 border-b sm:px-6 lg:px-8 dark:border-gray-800">
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="heading">{children}</h1>
        </div>
      </div>
    </div>
  );
}
