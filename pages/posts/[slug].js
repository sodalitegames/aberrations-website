// pages/posts/[slug].jsx
import React from 'react';

// Blog Post Page Component
const PostPage = props => {
  const { post } = props;
  const { title, author, content } = post;

  return (
    <div>
      <span>{title}</span>
      <span>{author}</span>
      <p>{content}</p>
    </div>
  );
};

// compile paths for each post with params object containing the post slug.
// note that in `[slug].jsx`, the `slug` key was defined to be read in the params object.
export const getStaticPaths = async () => {
  // fetch all posts

  console.log(require.context('../../content/posts'));

  const pizza = (context => {
    console.log(context);

    const keys = context.keys();

    console.log(keys);

    return keys.map(key => {
      return { params: { slug: key.replace(/^.*[\\\/]/, '').slice(0, -3) } };
    });
  })(require.context('../../content/posts', true, /\.md$/));

  console.log(pizza);

  // const posts = getAllPosts(['title']);

  // console.log(posts);

  // const postsPaths = posts.map(post => ({
  //   params: {
  //     slug: post.title.toLowerCase(),
  //   },
  // }));

  return {
    paths: pizza,
    fallback: false,
  };
};

// For each post context, map its contents to the blog post component
export const getStaticProps = async context => {
  const { slug } = context.params;

  // fetch post content by its slug
  //const post = getPostBySlug(params.slug, ['title', 'author', 'content']);

  const post = await import(`../../content/posts/${slug}.md`).catch(error => null);

  console.log(post);

  return {
    props: {
      post: post.attributes,
    },
  };
};

export default PostPage;
