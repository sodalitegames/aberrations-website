import ErrorPage from 'next/error';

import PageLayout from 'layouts/PageLayout';
import BlogPostCard from 'components/blog/blog-post-card';
import EmailCTA from 'components/elements/email-cta';

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
      <div className="grid gap-4 mt-2 mb-8 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
        {posts
          .filter(post => post.featured)
          .map((post, index) => {
            return <BlogPostCard key={index} post={post} />;
          })}
      </div>
      <EmailCTA ctaText="Get updates, tips, and tricks sent straight to your inbox." buttonText="Sign me up" />
      <div className="grid gap-4 mt-8 mb-8 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
        {posts
          .filter(post => !post.featured)
          .map((post, index) => {
            return <BlogPostCard key={index} post={post} />;
          })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  // Import blog page metadata
  const page = await import('../../../content/pages/blog.md').catch(error => null);
  const { metadata } = page.attributes;

  const postsContext = require.context('../../../content/posts', true, /^\.\/.*\.md$/);

  const slugs = postsContext.keys().map(key => {
    return key.replace(/^.*[\\\/]/, '').slice(0, -3);
  });

  const posts = await Promise.all(
    slugs.map(async slug => {
      const post = await import(`../../../content/posts/${slug}.md`).catch(error => null);
      return { ...post.attributes, content: post.body };
    })
  );

  // Only return published posts
  const publishedPosts = posts.filter(post => post.state === 'Published');

  // Sort posts by date
  const sortedPosts = publishedPosts.sort((prev, curr) => new Date(curr.date) - new Date(prev.date));

  return {
    props: {
      posts: sortedPosts,
      metadata,
    },
  };
}

export default BlogPage;
