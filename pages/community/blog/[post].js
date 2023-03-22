import ErrorPage from 'next/error';
import { useStytchUser } from '@stytch/nextjs';

import PageLayout from '../../../layouts/PageLayout';

import DisplayBlogPost from '../../../components/blog/display-blog-post';
import BlogPostCard from '../../../components/blog/blog-post-card';

const PostPage = ({ post, relatedPosts, metadata }) => {
  const { user, isInitialized } = useStytchUser();

  // Check if the required data was provided
  if (!post) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      heading={metadata.title}
      seo={{
        ...metadata,
        title: `${metadata.title} | Blog`,
      }}
      breadcrumbs={[
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: `/community/blog` },
        { name: metadata.title, href: `/community/blog/${metadata.slug}` },
      ]}
    >
      {/* Display the blog post */}
      <DisplayBlogPost post={post} isInitialized={isInitialized} user={user} />
      {/* End blog post */}

      <div className="mt-12">
        <h3 className="py-4 border-t border-b heading dark:border-gray-700">More posts you might like</h3>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
          {relatedPosts.map((post, index) => {
            return <BlogPostCard key={index} post={post} />;
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../content/posts', true, /\.md$/));

  const paths = slugs.map(slug => ({
    params: {
      post: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { post } = context.params;

  const postContent = await import(`../../../content/posts/${post}.md`);

  const { metadata, relatedPosts } = postContent.attributes;

  const relatedPostsContent = await Promise.all(
    relatedPosts.map(async slug => {
      const post = await import(`../../../content/posts/${slug}.md`).catch(error => null);
      return { ...post.attributes, content: post.body };
    })
  );

  return {
    props: {
      post: { ...postContent.attributes, content: postContent.body },
      relatedPosts: relatedPostsContent,
      metadata,
    },
  };
}

export default PostPage;
