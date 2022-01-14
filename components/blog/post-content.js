import Link from 'next/link';

import { parseDate } from '../../utils/functions/parse-date';
import { getCategory } from '../../utils/functions/split-data';

import MarkdownContent from '../sections/markdown-content';

import Notice from '../elements/notice';

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
          Published on {parseDate(post.date)} by {post.author}
        </p>
        <p>
          Categories:{' '}
          {post.categories.map((categ, index) => {
            const category = getCategory(categ);
            return (
              <Link key={category.title} href={`/community/blog/categories/${category.slug}`}>
                <a className="text-link-accent3">
                  {category.title}
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
      <MarkdownContent data={{ content: post.content }} />
    </article>
  );
};

export default PostContent;
