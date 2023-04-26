import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ErrorPage from 'next/error';

import { Breadcrumb, Metadata } from '../utils/types/page-types';

import PageLayout from '../layouts/PageLayout';
import Sections from '../components/sections';

type ConfigPath = {
  parent: string;
  children?: { child: string }[];
};

type PagePath = {
  params: {
    page: string[];
  };
};

interface Props {
  breadcrumbs: Breadcrumb[];
  metadata: Metadata;
  sections: any[];
}

const Page: NextPage<Props> = ({ breadcrumbs, metadata, sections }) => {
  // Check if the required data was provided
  if (!sections) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} breadcrumbs={breadcrumbs}>
      <Sections sections={sections} />
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    attributes: { paths: siteMap },
  } = await import('../content/settings/paths.md');

  let paths: PagePath[] = [];

  siteMap.forEach(({ parent, children }: ConfigPath) => {
    paths = [...paths, { params: { page: [parent] } }];

    if (children && children.length) {
      paths = [...paths, ...children.map(({ child }) => ({ params: { page: [parent, child] } }))];
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { page } = context.params!;

  if (!page || typeof page === 'string') return { props: {} };

  const [slug] = page.slice(-1);

  const data = await import(`../content/pages/${slug}.md`).catch(error => null);

  const { parent, metadata, sections = [] } = data.attributes;

  let breadcrumbs = [{ name: `${metadata.title}`, href: `/${metadata.slug}` }];

  if (parent) {
    const crumbs = parent.split('__');
    breadcrumbs.unshift({ name: `${crumbs[0]}`, href: `/${crumbs[1]}` });
  }

  return {
    props: {
      metadata,
      breadcrumbs,
      sections,
    },
  };
};

export default Page;
