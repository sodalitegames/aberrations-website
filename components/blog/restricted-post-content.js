import { useState } from 'react';
import Link from 'next/link';

import SigninForm from '../auth/SigninForm';
import SignupForm from '../auth/SignupForm';

import { PostHeader } from './post-content';

const RestrictedPostContent = ({ post, member, paidPlan }) => {
  const [hasAccount, setHasAccount] = useState(false);

  if (member) {
    return (
      <article>
        <PostHeader post={post} />

        <div className="bg-gray-50 dark:bg-dark-50 p-4 rounded-md">
          <h2 className="mt-6 text-center text-3xl md:w-3/4 mx-auto font-extrabold">Sign up for a paid plan to read this post</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Signing up for paid plan unlocks exclusive access to more than just blog posts.{' '}
            <Link href="/dashboard/plan-and-billing">
              <a className="text-link cursor-pointer">Learn more here &rarr;</a>
            </Link>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6">
            <div className="w-full md:w-1/2 mx-auto">
              <p className="md:ml-8 mt-8 py-8 text-xl text-center md:text-left font-medium italic">&quot;{post.excerpt}&quot;</p>
            </div>

            <div className="w-full md:w-1/2 mx-auto">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-700 py-8 px-4 shadow rounded-lg sm:px-10">
                  <Link href="/dashboard/plan-and-billing">
                    <a className="btn-secondary w-full">See available plans</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article>
      <PostHeader post={post} />
      <div className="bg-gray-50 dark:bg-dark-50 p-4 rounded-md">
        <h2 className="mt-6 text-center text-3xl md:w-3/4 mx-auto font-extrabold">
          {hasAccount
            ? `Sign in to your account to ${paidPlan ? 'access your subscription and' : ''} read this post`
            : `You must sign up for a free account ${paidPlan ? 'then purchase a subscription' : ''} to read this post`}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          {hasAccount ? (
            <>
              Or{' '}
              <a className="text-link-accent3 font-normal" onClick={() => setHasAccount(false)}>
                create a free account
              </a>{' '}
              if you haven&apos;t already
            </>
          ) : (
            <>
              Or{' '}
              <a className="text-link-accent3 font-normal" onClick={() => setHasAccount(true)}>
                sign into your account
              </a>{' '}
              if you already have one
            </>
          )}
        </p>
        <div className="flex flex-col md:flex-row items-start justify-between mt-12 mb-6">
          {!hasAccount ? (
            <div className="w-full md:w-1/2 mx-auto">
              <p className="md:ml-8 mt-8 py-8 text-xl text-center md:text-left font-medium italic">&quot;{post.excerpt}&quot;</p>
            </div>
          ) : null}
          <div className="w-full md:w-1/2 mx-auto">
            {hasAccount ? <SigninForm redirectPath={`/community/blog/${post.metadata.slug}`} /> : <SignupForm redirectPath={`/community/blog/${post.metadata.slug}`} />}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RestrictedPostContent;
