import Link from 'next/link';

import { parseDate } from '../../utils/functions/parse-date';
import { getCategory } from '../../utils/functions/split-data';

export default function BlogPostCard({ post }) {
  return (
    <div className="p-6 rounded-md hover:bg-gray-50 dark:hover:bg-dark-150">
      <Link href={`/community/blog/${post.metadata.slug}`}>
        <a>
          <p className="text-xl font-semibold">
            {post.metadata.title}{' '}
            {post.restriction && post.restriction !== 'NONE' ? (
              <span className="text-sm font-normal rounded-full p-1 px-2 bg-gray-200 dark:bg-gray-500 text-gray-500 dark:text-gray-300 ml-2">
                {post.restriction === 'FREE_PLAN' ? 'Members Only' : post.restriction === 'PAID_PLAN' ? 'Paid Members' : null}
              </span>
            ) : null}
          </p>

          <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{parseDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.author}</span>
          </div>
        </a>
      </Link>

      <div className="mt-3">
        {post.categories.map(categ => {
          const category = getCategory(categ);
          return (
            <Link key={category.title} href={`/community/blog/categories/${category.slug}`}>
              <a className="rounded-full mr-1 p-1 px-2 text-xs font-medium text-white" style={{ backgroundColor: category.color }}>
                {category.title}
              </a>
            </Link>
          );
        })}
      </div>

      <Link href={`/community/blog/${post.metadata.slug}`}>
        <a>
          <p className="mt-3 text-base">{post.excerpt || post.metadata.description}</p>

          <div className="mt-3">
            <span className="btn-text">Read full story</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
