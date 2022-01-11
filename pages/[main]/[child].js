import ErrorPage from 'next/error';

import PageLayout from '../../layouts/PageLayout';
import Sections from '../../components/sections';

import { getParent } from '../../utility/get-parent';

const ChildPage = ({ parent, metadata, sections }) => {
  // Check if the required data was provided
  if (!sections) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      seo={metadata}
      breadcrumbs={[
        { name: `${parent.title}`, href: `/${parent.slug}` },
        { name: `${metadata.title}`, href: `/${parent.slug}/${metadata.slug}` },
      ]}
    >
      <Sections sections={sections} />
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const {
    attributes: { paths: siteMap },
  } = await import('../../content/settings/paths.md');

  console.log(siteMap);

  let paths = [];

  siteMap
    .filter(parent => parent.children)
    .forEach(({ parent, children }) => {
      const childPaths = children.map(({ child }) => ({
        params: {
          main: parent,
          child: child,
        },
      }));

      paths = [...paths, ...childPaths];
    });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { child } = context.params;

  const page = await import(`../../content/pages/${child}.md`).catch(error => null);

  const { name, parent, metadata, sections = [] } = page.attributes;

  return {
    props: {
      metadata,
      parent: getParent(parent),
      sections,
    },
  };
}

export default ChildPage;
