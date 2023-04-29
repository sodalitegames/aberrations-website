import ErrorPage from 'next/error';

import PageLayout from 'layouts/PageLayout';

import CategoryCard from 'components/blog/category-card';

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
      <div className="grid gap-4 mb-8 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
        {categories.map((category, index) => {
          return <CategoryCard key={index} category={category} />;
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
  })(require.context('../../../content/categories', true, /^\.\/.*\.md$/));

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
