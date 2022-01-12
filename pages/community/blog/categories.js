import Link from 'next/link';
import ErrorPage from 'next/error';

import PageLayout from '../../../layouts/PageLayout';

import CategoryCard from '../../../components/blog/category-card';

const CategoriesPage = ({ categories, metadata }) => {
  // Check if the required data was provided
  if (!categories) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      seo={metadata}
      breadcrumbs={[
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: '/community/blog' },
        { name: metadata.title, href: `/community/blog/${metadata.slug}` },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8">
        {categories.map((category, index) => {
          return (
            <Link key={index} href={`/community/blog/categories/${category.metadata.slug}`}>
              <a>
                <CategoryCard category={category} />
              </a>
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  // Import categories page metadata
  const page = await import('../../../content/pages/categories.md').catch(error => null);
  const { metadata } = page.attributes;

  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../content/categories', true, /\.md$/));

  const categories = await Promise.all(
    slugs.map(async slug => {
      const category = await import(`../../../content/categories/${slug}.md`).catch(error => null);
      return { ...category.attributes };
    })
  );

  return {
    props: {
      categories,
      metadata,
    },
  };
}

export default CategoriesPage;