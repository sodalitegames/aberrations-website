import Stripe from 'stripe';

import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // This is the url to which the customer will be redirected when they are done managing their billing with the portal.
    const returnUrl = `${process.env.FRONTEND_BASE_URL}/dashboard/plan-and-billing`;

    // stripeCustomerId was saved to the user in the webhook, when the initial session was created
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: req.user.stripe_customer_id,
      return_url: returnUrl,
    });

    res.status(200).json({ url: portalSession.url });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Portal session could not be created.' });
  }
});

export default handler;
