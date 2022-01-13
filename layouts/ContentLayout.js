import PageHeading from './components/PageHeading';

export default function ContentLayout({ title, heading, breadcrumbs, children }) {
  return (
    <>
      <PageHeading breadcrumbs={breadcrumbs}>{heading || title}</PageHeading>
      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">{children}</main>
    </>
  );
}
