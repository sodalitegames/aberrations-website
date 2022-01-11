import Link from 'next/link';

import Notice from './notice';
import RichText from '../sections/rich-text';

export const PostHeader = ({ post, notice }) => {
  return (
    <header>
      {notice ? <Notice message={notice} status="success" /> : null}

      <div className="my-3">
        <Link href={`/community/blog`}>
          <a className="btn-text">&larr; Back to blog</a>
        </Link>
      </div>

      <div className="font-semibold italic py-4 mb-4">
        <p>
          Published on {new Date(post.datePublished).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} by {post.author.replace('_', ' ')}
        </p>
        <p>
          Categories:{' '}
          {post.categories.map((categ, index) => {
            return (
              <Link key={categ.name} href={`/community/blog/categories/${categ.slug}`}>
                <a className="text-link-accent3">
                  {categ.name}
                  {index === post.categories.length - 1 ? '' : ', '}
                </a>
              </Link>
            );
          })}
        </p>
      </div>
    </header>
  );
};

const PostContent = ({ post, notice }) => {
  return (
    <article>
      <PostHeader post={post} notice={notice} />
      <RichText data={{ content: post.content }} />
    </article>
  );
};

export default PostContent;
