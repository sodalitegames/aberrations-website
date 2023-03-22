import RestrictedPostContent from './restricted-post-content';
import PostContent from './post-content';

const DisplayBlogPost = ({ post, user, isInitialized }) => {
  if (post.restriction === 'FREE_PLAN') {
    if (!isInitialized && user) {
      // if restricted to FREE plan, and the user has an account and is signed in
      return <PostContent post={post} notice="You have exclusive access to this post through your free membership" />;
    }

    // if restricted to FREE plan, and the user does not have an account or is not signed in
    return <RestrictedPostContent post={post} />;
  }

  if (post.restriction === 'PAID_PLAN') {
    if (!isInitialized && user) {
      if (user.subscription && user.subscription.status === 'active') {
        // if restricted to PAID plan, and the user has an account, is signed in, and has an active subscription
        return <PostContent post={post} notice="You have exclusive access to this post through your paid membership" />;
      }

      // if restricted to PAID plan, and the user has an account, is signed in, but does NOT have a subscription, or has a canceled subscription
      return <RestrictedPostContent post={post} member={user} paidPlan />;
    }

    // if restricted to PAID plan, and the user does not have an account or is not signed in
    return <RestrictedPostContent post={post} paidPlan />;
  }

  // if no restrictions
  return <PostContent post={post} />;
};

export default DisplayBlogPost;
