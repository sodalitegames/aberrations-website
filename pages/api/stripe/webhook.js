import Stripe from 'stripe';
import { buffer } from 'micro';

import { createHandler } from '../../../middleware';

import { GROUP_IDS, subscribeEmailToGroup, updateSubscriber } from '../../../apis/mailerlite';

import { firebase, firestore } from '../../../lib/firebase-admin';
import { sendNotification } from '../../../lib/sendgrid';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = createHandler();

handler.post(async (req, res) => {
  if (req.query.test) {
    return res.status(200).json({ status: 'success', message: 'Webhook operations skipped -- test mode.' });
  }

  try {
    let event;

    try {
      // Create stripe
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];
      // Convert req to a buffer
      const buf = await buffer(req);
      // Construct the event
      event = stripe.webhooks.constructEvent(buf, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.status(400).json({ status: 'error', message: '⚠️ Webhook signature verification failed.', error: err.message });
    }

    const subscription = event?.data?.object;
    const uid = subscription?.metadata?.uid;

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.deleted': {
        // fetch the user ref
        const userRef = firestore.collection('users').doc(uid);

        // delete the users stripe data in the database
        await userRef.update({ stripe_subscription_id: null, stripe_product_id: null, stripe_subscription_cancelled: null, stripe_subscription_interval: null });

        // fetch the user from auth service
        const auth = await firebase.auth().getUser(uid);

        // update the subscriber in mailerlite
        await updateSubscriber(auth.email, { fields: { subscription: 'Inactive' } });

        break;
      }

      case 'customer.subscription.created': {
        // fetch the user ref
        const userRef = firestore.collection('users').doc(uid);

        // save the users stripe data in the database
        await userRef.update({
          stripe_customer_id: subscription.customer,
          stripe_subscription_id: subscription.id,
          stripe_product_id: subscription.plan.product,
          stripe_subscription_interval: subscription.plan.interval,
        });

        // fetch the user from auth service
        const auth = await firebase.auth().getUser(uid);

        // save email to stripe customers mailerlite group
        await subscribeEmailToGroup(GROUP_IDS.STRIPE_CUSTOMERS, {
          email: auth.email,
          name: auth.displayName,
          fields: { subscription: 'Active' },
        });

        await sendNotification(process.env.NOTIFICATION_EMAIL, 'Aberrations RPG has a new subscriber', `${auth.displayName} (${auth.email}) has purchased a subscription.`);

        break;
      }

      case 'customer.subscription.updated': {
        // fetch the user ref
        const userRef = firestore.collection('users').doc(uid);

        // update the users stripe data in the database
        await userRef.update({
          stripe_product_id: subscription.plan.product,
          stripe_subscription_interval: subscription.plan.interval,
          stripe_subscription_cancelled: subscription.cancel_at_period_end,
        });

        // fetch the user from auth service
        const auth = await firebase.auth().getUser(uid);

        // update the subscriber in mailerlite
        await updateSubscriber(auth.email, { fields: { subscription: subscription.cancel_at_period_end ? 'Canceled' : 'Active' } });

        break;
      }

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send({ subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Webhook operations failed.', error: err.message });
  }
});

export default handler;
