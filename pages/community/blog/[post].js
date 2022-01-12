import Link from 'next/link';
import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../lib/apollo-client';

import { useAuth } from '../../../contexts/auth';

import PageLayout from '../../../layouts/PageLayout';

import DisplayBlogPost from '../../../components/elements/display-blog-post';
import BlogPostCard from '../../../components/elements/blog-post-card';

const PostPage = ({ post, metadata }) => {
  const { user, loading } = useAuth();

  // Check if the required data was provided
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      heading={post.title}
      seo={metadata}
      breadcrumbs={[
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: `/community/blog` },
        { name: post.title, href: `/community/blog/${metadata.slug}` },
      ]}
    >
      {/* Display the blog post */}
      <DisplayBlogPost post={post} loading={loading} user={user} />
      {/* End blog post */}

      <div className="mt-12">
        <h3 className="heading border-t border-b py-4 dark:border-gray-700">More posts you might like</h3>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
          {post.relatedPosts.map((post, index) => {
            return (
              <Link key={index} href={`/community/blog/${post.slug}`}>
                <a className="p-6 rounded-md hover:bg-gray-50 dark:hover:bg-dark-150">
                  <BlogPostCard post={post} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          slug
        }
      }
    `,
  });

  const paths = data.posts.map(post => ({
    params: {
      post: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { post } = context.params;

  const { data } = await client.query({
    query: gql`
      query Post($slug: String) {
        posts(where: { slug: $slug }) {
          title
          author
          slug
          datePublished
          excerpt
          content
          updatedAt
          restriction
          categories {
            name
            slug
            color
          }
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
          relatedPosts {
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
    variables: { slug: post },
  });

  return {
    props: {
      post: data.posts[0],
      metadata: {
        ...data.posts[0].metadata,
        title: `${data.posts[0].title} | Blog`,
        slug: data.posts[0].slug,
      },
    },
  };
}

export default PostPage;
