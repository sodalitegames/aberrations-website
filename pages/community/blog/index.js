import Link from 'next/link';
import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../lib/apollo-client';

import PageLayout from '../../../layouts/PageLayout';
import BlogPostCard from '../../../components/elements/blog-post-card';
import EmailCTA from '../../../components/elements/email-cta';

const BlogPage = ({ posts, metadata }) => {
  // Check if the required data was provided
  if (!posts) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      seo={metadata}
      breadcrumbs={[
        { name: 'Community', href: '/community' },
        { name: metadata.title, href: `/community/${metadata.slug}` },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8 mt-2">
        {posts.map((post, index) => {
          if (post.featuredPost) {
            return (
              <Link key={index} href={`/community/blog/${post.slug}`}>
                <a className="p-6 rounded-md hover:bg-gray-50 dark:hover:bg-dark-150">
                  <BlogPostCard post={post} />
                </a>
              </Link>
            );
          }
          return null;
        })}
      </div>
      <EmailCTA ctaText="Get updates, tips, and tricks sent straight to your inbox." buttonText="Sign me up" />
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 mb-8 mt-8">
        {posts.map((post, index) => {
          if (post.featuredPost) {
            return null;
          }
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

export async function getStaticProps(context) {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts(sort: "datePublished:desc") {
          title
          author
          slug
          datePublished
          excerpt
          featuredPost
          restriction
          categories {
            name
            slug
            color
          }
        }
      }
    `,
  });

  // const posts = data.posts.filter(post => new Date(post.datePublished) < Date.now());

  return {
    props: {
      posts: data.posts,
      metadata: {
        title: 'Blog',
        description: 'Explore our blog to learn more about role-playing, world building, game mastering (we call it CCing), creating campaigns, campaign stories, and more.',
        slug: 'blog',
      },
    },
  };
}

export default BlogPage;
