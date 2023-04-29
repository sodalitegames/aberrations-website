import Link from 'next/link';

import NewlineText from '../utility/newline-text';

import { getPost } from '../../utils/functions/split-data';

export default function CategoryCard({ category }) {
  return (
    <div className="mt-0 bg-white border shadow dark:bg-dark-100 b-gray-100 dark:border-gray-800 sm:rounded-lg">
      <Link href={`/community/blog/categories/${category.metadata.slug}`}>
        <a>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6">{category.metadata.title}</h3>
          </div>
        </a>
      </Link>
      <div className="px-4 py-5 border-t border-gray-200 dark:border-gray-800 sm:px-6">
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
            <dt className="-mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Featured Posts</dt>
            <dd className="flex flex-wrap mt-4 text-sm">
              {category.featuredPosts
                ? category.featuredPosts.map((postString, index) => {
                    const post = getPost(postString);
                    return (
                      <Link key={index} href={`/community/blog/${post.slug}`}>
                        <a className="p-1 px-2 mt-1 mr-1 text-white bg-gray-700 rounded-full" style={{ backgroundColor: category.color }}>
                          {post.title}
                        </a>
                      </Link>
                    );
                  })
                : 'No featured posts'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
