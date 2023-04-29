import RestrictedPostContent from './restricted-post-content';
import PostContent from './post-content';

const DisplayBlogPost = ({ post, member, subscription }) => {
  if (post.restriction === 'FREE') {
    if (member) {
      // if restricted to FREE plan, and the user is a member and is signed in
      return <PostContent post={post} notice="You have exclusive access to this post through your free membership" />;
    }

    // if restricted to FREE plan, and the user does not have an account or is not signed in
    return <RestrictedPostContent post={post} />;
  }

  if (post.restriction === 'PAID') {
    if (member && subscription) {
      // if restricted to PAID plan, and the user has an account, is signed in, and has an active subscription
      return <PostContent post={post} notice="You have exclusive access to this post through your paid membership" />;
    }

    // if restricted to PAID plan, and the user does not have an account or is not signed in OR is signed in, but does NOT have an active subscription
    return <RestrictedPostContent post={post} member={member} requiresPaidPlan />;
  }

  // if no restrictions
  return <PostContent post={post} />;
};

export default DisplayBlogPost;
