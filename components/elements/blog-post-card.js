import Link from 'next/link';

export default function BlogPostCard({ post }) {
  return (
    <div>
      <p className="text-xl font-semibold">
        {post.title}{' '}
        {post.restriction && post.restriction !== 'NONE' ? (
          <span className="text-sm font-normal rounded-full p-1 px-2 bg-gray-200 dark:bg-gray-500 text-gray-500 dark:text-gray-300 ml-2">
            {post.restriction === 'FREE_PLAN' ? 'Members Only' : post.restriction === 'PAID_PLAN' ? 'Paid Members' : null}
          </span>
        ) : null}
      </p>

      <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={post.datePublished}>{new Date(post.datePublished).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.author.replace('_', ' ')}</span>
      </div>

      <div className="mt-3">
        {post.categories.map(categ => {
          return (
            <Link key={categ.name} href={`/community/blog/categories/${categ.slug}`}>
              <a className="rounded-full mr-1 p-1 px-2 text-xs font-medium text-white" style={{ backgroundColor: categ.color }}>
                {categ.name}
              </a>
            </Link>
          );
        })}
      </div>

      <p className="mt-3 text-base">{post.excerpt}</p>

      <div className="mt-3">
        <span className="btn-text">Read full story</span>
      </div>
    </div>
  );
}
