import Link from 'next/link';
import ErrorPage from 'next/error';

import { useAuth } from '../../../contexts/auth';

import PageLayout from '../../../layouts/PageLayout';

import DisplayBlogPost from '../../../components/blog/display-blog-post';
import BlogPostCard from '../../../components/blog/blog-post-card';

const PostPage = ({ post, relatedPosts, metadata }) => {
  const { user, loading } = useAuth();

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
      <DisplayBlogPost post={post} loading={loading} user={user} />
      {/* End blog post */}

      <div className="mt-12">
        <h3 className="heading border-t border-b py-4 dark:border-gray-700">More posts you might like</h3>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6">
          {relatedPosts.map((post, index) => {
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
      return { ...post.attributes, content: post.html };
    })
  );

  return {
    props: {
      post: { ...postContent.attributes, content: postContent.html },
      relatedPosts: relatedPostsContent,
      metadata,
    },
  };
}

export default PostPage;