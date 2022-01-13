import Link from 'next/link';
import ErrorPage from 'next/error';

import PageLayout from '../../../layouts/PageLayout';
import BlogPostCard from '../../../components/blog/blog-post-card';
import EmailCTA from '../../../components/elements/email-cta';

const BlogPage = ({ posts, metadata }) => {
  // Check if the required data was provided
  if (!posts) {
    return <ErrorPage statusCode={500} />;
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
          if (post.featured) {
            return (
              <Link key={index} href={`/community/blog/${post.metadata.slug}`}>
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
          if (post.featured) {
            return null;
          }
          return (
            <Link key={index} href={`/community/blog/${post.metadata.slug}`}>
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

export async function getStaticProps() {
  // Import blog page metadata
  const page = await import('../../../content/pages/blog.md').catch(error => null);
  const { metadata } = page.attributes;

  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../content/posts', true, /\.md$/));

  const posts = await Promise.all(
    slugs.map(async slug => {
      const post = await import(`../../../content/posts/${slug}.md`).catch(error => null);
      return { ...post.attributes, content: post.html };
    })
  );

  // Only return published posts
  let publishedPosts = posts.filter(post => post.state === 'Published');

  return {
    props: {
      posts: publishedPosts,
      metadata,
    },
  };
}

export default BlogPage;
