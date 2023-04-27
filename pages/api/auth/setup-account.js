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
      console.log('ite worked!');
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

  console.log(stripe);

  if (stripe) {
    data = {
      ...data,
      ...stripe,
    };
  }

  return { player, data };
};

const subscribeUserToEmailGroups = async (name, email, subscribe) => {
  if (process.env.NODE_ENV !== 'production') return false;

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
    const { player, data } = await createPlayer(req.auth.uid, req.auth.email);

    // Update the user in auth
    const auth = await firebase.auth().updateUser(req.auth.uid, { displayName: req.body.name });

    // Create user in firestore
    const userRef = firestore.collection('users').doc(req.auth.uid);

    await userRef.set({
      email: req.auth.email,
      subscribe: req.body.subscribe,
      ...data,
    });

    const user = (await userRef.get()).data();

    let metadata = {};

    try {
      // Subscribe them to the appropriate Mailerlite lists
      metadata.subscribed = await subscribeUserToEmailGroups(req.body.name, req.auth.email, req.body.subscribe);

      // Send myself an email alert
      metadata.notified = await sendNotification(
        process.env.NOTIFICATION_EMAIL,
        'An Aberrations RPG Account has been set up',
        `${req.body.name} (${req.auth.email}) has set up an Aberrations RPG account.`
      );
    } catch (err) {
      console.error(err);
      metadata.error = err;
    }

    res.status(201).json({ auth, user, player, metadata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'An error occurred while setting up your account. Please try again later.', error: err });
  }
});

export default handler;
