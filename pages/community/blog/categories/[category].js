import Link from 'next/link';
import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../../lib/apollo-client';

import PageLayout from '../../../../layouts/PageLayout';
import BlogPostCard from '../../../../components/elements/blog-post-card';
import EmailCTA from '../../../../components/elements/email-cta';

const CategoryPage = ({ posts, category, metadata }) => {
  // Check if the required data was provided
  if (!posts || !category) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      seo={metadata}
      breadcrumbs={[
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: '/community/blog' },
        { name: 'Blog Categories', href: '/community/blog/categories' },
        { name: metadata.title, href: `/community/blog/categories/${metadata.slug}` },
      ]}
    >
      <p className="my-8">{category.metadata.description}</p>

      <EmailCTA ctaText={`Get ${metadata.title} sent straight to your inbox`} buttonText="Sign me up" />

      <h2 className="heading">Posts in this Category</h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
        {posts.map((post, index) => {
          return (
            <Link key={index} href={`/community/blog/${post.slug}`}>
              <a className="p-6 rounded-md hover:bg-gray-50 dark:hover:bg-dark-150">
                <BlogPostCard post={post} />
              </a>
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        postCategories {
          slug
        }
      }
    `,
  });

  const paths = data.postCategories.map(category => ({
    params: {
      category: category.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { category } = context.params;

  const { data } = await client.query({
    query: gql`
      query Categories($slug: String) {
        postCategories(where: { slug: $slug }) {
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
            author
            slug
            datePublished
            excerpt
            restriction
            categories {
              name
              slug
              color
            }
          }
        }
      }
    `,
    variables: { slug: category },
  });

  return {
    props: {
      category: data.postCategories[0],
      posts: data.postCategories[0].posts,
      metadata: data.postCategories[0].metadata,
    },
  };
}

export default CategoryPage;
