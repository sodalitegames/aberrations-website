import { useState } from 'react';
import Link from 'next/link';

import { PostHeader } from './post-content';

const RestrictedPostContent = ({ post, member, paidPlan }) => {
  const [hasAccount, setHasAccount] = useState(false);

  if (member) {
    return (
      <article>
        <PostHeader post={post} />

        <div className="p-4 rounded-md bg-gray-50 dark:bg-dark-50">
          <h2 className="mx-auto mt-6 text-3xl font-extrabold text-center md:w-3/4">Sign up for a paid plan to read this post</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
            Signing up for paid plan unlocks exclusive access to more than just blog posts.{' '}
            <Link href="/dashboard/plan-and-billing">
              <a className="cursor-pointer text-link">Learn more here &rarr;</a>
            </Link>
          </p>
          <div className="flex flex-col items-center justify-between mt-12 mb-6 md:flex-row">
            <div className="w-full mx-auto md:w-1/2">
              <p className="py-8 mt-8 text-xl italic font-medium text-center md:ml-8 md:text-left">&quot;{post.excerpt}&quot;</p>
            </div>

            <div className="w-full mx-auto md:w-1/2">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-700 sm:px-10">
                  <Link href="/dashboard/plan-and-billing">
                    <a className="w-full btn-secondary">See available plans</a>
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
      <div className="p-4 rounded-md bg-gray-50 dark:bg-dark-50">
        <h2 className="mx-auto mt-6 text-3xl font-extrabold text-center md:w-3/4">
          {hasAccount
            ? `Sign in to your account to ${paidPlan ? 'access your subscription and' : ''} read this post`
            : `You must sign up for a free account ${paidPlan ? 'then purchase a subscription' : ''} to read this post`}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
          {hasAccount ? (
            <>
              Or{' '}
              <a className="font-normal text-link-accent3" onClick={() => setHasAccount(false)}>
                create a free account
              </a>{' '}
              if you haven&apos;t already
            </>
          ) : (
            <>
              Or{' '}
              <a className="font-normal text-link-accent3" onClick={() => setHasAccount(true)}>
                sign into your account
              </a>{' '}
              if you already have one
            </>
          )}
        </p>
        <div className="flex flex-col items-start justify-between mt-12 mb-6 md:flex-row">
          {!hasAccount ? (
            <div className="w-full mx-auto md:w-1/2">
              <p className="py-8 mt-8 text-xl italic font-medium text-center md:ml-8 md:text-left">&quot;{post.excerpt}&quot;</p>
            </div>
          ) : null}
          <div className="w-full mx-auto md:w-1/2">{hasAccount ? 'signin_form' : 'signup_form'}</div>
        </div>
      </div>
    </article>
  );
};

export default RestrictedPostContent;
