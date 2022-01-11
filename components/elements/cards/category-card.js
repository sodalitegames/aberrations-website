import Link from 'next/link';
import NewlineText from '../../utility/newline-text';

import CardContainer from '../card-container';

export default function CategoryCard({ category }) {
  return (
    <CardContainer heading={category.name} noImage noMargin>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={category.metadata.description} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 -mb-3">Posts</dt>
          <dd className="mt-4 text-sm flex flex-wrap">
            {category.posts.map((post, index) => {
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
    </CardContainer>
  );
}
