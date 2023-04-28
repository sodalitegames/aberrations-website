import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

import { Player } from '../../../models/Player';
import { User } from '../../../models/User';

import { GROUP_IDS, subscribeEmailToGroup } from '../../../apis/mailerlite';

import { firebase, firestore } from '../../../lib/firebase-admin';
import { sendNotification } from '../../../lib/sendgrid';

const createPlayer = async (uid, email) => {
  let player;
  let stripe;

  // Check if player already exists
  const existingPlayer = await User.findOne({ email });

  if (existingPlayer) {
    // Create new user with existing users id
    player = await Player.create({
      _id: existingPlayer._id,
      email,
      uid,
    });

    // Collect data from previous user
    if (existingPlayer.stripeCustomerId) {
      stripe = {
        stripe_customer_id: existingPlayer.stripeCustomerId,
      };

      if (existingPlayer.subscription && existingPlayer.subscription.status === 'active') {
        stripe = {
          ...stripe,
          stripe_subscription_id: existingPlayer.subscription.id,
          stripe_product_id: existingPlayer.subscription.plan.product,
          stripe_subscription_interval: existingPlayer.subscription.plan.interval,
          stripe_subscription_cancelled: existingPlayer.subscription.cancel_at_period_end,
        };
      }
    }
  } else {
    // Create new user
    player = await Player.create({
      email,
      uid,
    });
  }

  let data = {
    player_id: player._id.toString(),
  };

  if (stripe) {
    data = {
      ...data,
      ...stripe,
    };
  }

  return { player, data };
};

const subscribeUserToEmailGroups = async (name, email, subscribe) => {
  const account = await subscribeEmailToGroup(GROUP_IDS.ACCOUNT_HOLDERS, { email, name, fields: { source: 'Account Creation' } });

  let mailing;
  let blog;

  if (subscribe) {
    mailing = await subscribeEmailToGroup(GROUP_IDS.MAILING_LIST, { email, name, fields: { source: 'Account Creation' } });
    blog = await subscribeEmailToGroup(GROUP_IDS.BLOG_NOTIFICATIONS, { email, name, fields: { source: 'Account Creation' } });
  }

  return { account, mailing, blog };
};

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    // Make sure the account has not already been set up
    if (req.user && req.user.player_id) {
      return res.status(409).json({ status: 'error', message: 'Your account has already been set up.' });
    }

    // Create player in MongoDB
    const { data } = await createPlayer(req.auth.uid, req.auth.email);

    // Update the user in auth
    const auth = await firebase.auth().updateUser(req.auth.uid, { displayName: req.body.name });

    // Create user in firestore
    const userRef = firestore.collection('users').doc(req.auth.uid);

    await userRef.set({
      email: auth.email,
      subscribe: req.body.subscribe,
      ...data,
    });

    let metadata = {};

    const user = (await userRef.get()).data();

    try {
      // Subscribe them to the appropriate Mailerlite lists
      metadata.subscribed = await subscribeUserToEmailGroups(auth.displayName, auth.email, user.subscribe);

      // Generate verification link
      const link = await firebase.auth().generateEmailVerificationLink(auth.email);

      // Send the verification email
      metadata.verification = await sendEmailVerification(auth.email, auth.displayName, link);

      // Send myself an email alert
      metadata.notified = await sendNotification(
        process.env.NOTIFICATION_EMAIL,
        'An Aberrations RPG Account has been set up',
        `${auth.displayName} (${auth.email}) has set up an Aberrations RPG account.`
      );
    } catch (err) {
      console.error(err);
      metadata.error = err;
    }

    res.status(201).json({ status: 'success', message: 'Your account has been successfully set up.', metadata });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occurred while setting up your account. Please try again later.' });
  }
});

export default handler;
