import Link from 'next/link';

import NewlineText from '../utility/newline-text';

import { getPost } from '../../utils/functions/split-data';

export default function CategoryCard({ category }) {
  return (
    <div className="bg-white dark:bg-dark-100 shadow border b-gray-100 dark:border-gray-800 sm:rounded-lg mt-0">
      <Link href={`/community/blog/categories/${category.metadata.slug}`}>
        <a>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium">{category.metadata.title}</h3>
          </div>
        </a>
      </Link>
      <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Link href={`/community/blog/categories/${category.metadata.slug}`}>
              <a>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
                <dd className="mt-1 text-sm">
                  <NewlineText text={category.metadata.description} />
                </dd>
              </a>
            </Link>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 -mb-3">Featured Posts</dt>
            <dd className="mt-4 text-sm flex flex-wrap">
              {category.featuredPosts?.map((postString, index) => {
                const post = getPost(postString);
                return (
                  <Link key={index} href={`/community/blog/${post.slug}`}>
                    <a className="rounded-full mt-1 mr-1 bg-gray-700 text-white p-1 px-2" style={{ backgroundColor: category.color }}>
                      {post.title}{' '}
                      {/* {post.restriction && post.restriction !== 'NONE' ? `(${post.restriction === 'FREE_PLAN' ? 'Members Only' : post.restriction === 'PAID_PLAN' ? 'Paid Members' : null})` : null} */}
                    </a>
                  </Link>
                );
              })}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
