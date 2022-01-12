import Link from 'next/link';
import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../lib/apollo-client';

import PageLayout from '../../../layouts/PageLayout';
import CategoryCard from '../../../components/elements/cards/category-card';

const CategoriesPage = ({ categories, metadata }) => {
  // Check if the required data was provided
  if (!categories) {
    return <ErrorPage statusCode={404} />;
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
            <Link key={index} href={`/community/blog/categories/${category.slug}`}>
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
  const { data } = await client.query({
    query: gql`
      query Categories {
        postCategories {
          name
          slug
          color
          metadata {
            title
            slug
            description
            shareImage {
              url
            }

            twitterUsername
            twitterCardType
          }
          posts {
            title
            slug
            restriction
          }
        }
      }
    `,
  });

  return {
    props: {
      categories: data.postCategories,
      metadata: {
        title: 'Blog Categories',
        description: 'Explore our blog to learn more about role-playing, world building, game mastering (we call it CCing), creating campaigns, campaign stories, and more.',
        slug: 'categories',
      },
    },
  };
}

export default CategoriesPage;
