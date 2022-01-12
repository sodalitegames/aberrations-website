import Link from 'next/link';
import ErrorPage from 'next/error';

import PageLayout from '../../../../layouts/PageLayout';
import BlogPostCard from '../../../../components/blog/blog-post-card';
import EmailCTA from '../../../../components/elements/email-cta';

const CategoryPage = ({ posts, category, metadata }) => {
  // Check if the required data was provided
  if (!posts || !category) {
    return <ErrorPage statusCode={500} />;
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
      <p className="mb-10">{category.metadata.description}</p>

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
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../../content/categories', true, /\.md$/));

  const paths = slugs.map(slug => ({
    params: {
      category: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { category } = context.params;

  const categoryContent = await import(`../../../../content/categories/${category}.md`);

  const { metadata, color } = categoryContent.attributes;

  // Import all posts
  const postSlugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../../content/posts', true, /\.md$/));

  const allPosts = await Promise.all(
    postSlugs.map(async slug => {
      const post = await import(`../../../../content/posts/${slug}.md`).catch(error => null);
      return { ...post.attributes, content: post.html };
    })
  );

  // Only return published posts
  let publishedPosts = allPosts.filter(post => post.state === 'Published');

  const postsInCategory = publishedPosts.filter(post => {
    // Format includes text to match how the data string is stored in the posts relation property
    return post.categories.includes(`${metadata.title}__${metadata.slug}__${color}`);
  });

  return {
    props: {
      category: categoryContent.attributes,
      posts: postsInCategory,
      metadata,
    },
  };
}

export default CategoryPage;
