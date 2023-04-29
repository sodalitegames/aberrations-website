import Stripe from 'stripe';

import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const URL = `${process.env.FRONTEND_BASE_URL}/dashboard/plan-and-billing`;

    let info = {};

    // if already has customer id, use that, otherwise provide the accounts email
    if (req.user.stripe_customer_id) {
      info.customer = req.user.stripe_customer_id;
    } else {
      info.customer_email = req.auth.email;
    }

    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
      ...info,
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          uid: req.auth.uid,
          player_id: req.user.player_id,
        },
      },
      mode: 'subscription',
      success_url: `${URL}?success=true`,
      cancel_url: `${URL}?canceled=true`,
    });

    // return the session id
    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Checkout session could not be created.' });
  }
});

export default handler;
