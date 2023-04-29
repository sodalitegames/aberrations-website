import { createHandler } from 'middleware';

import authenticateMiddleware from 'middleware/authenticate';

import { updateSubscriber } from 'apis/mailerlite';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    const success = await updateSubscriber(req.auth.email, req.body);
    if (!success) {
      return res.status(500).json({ status: 'error', message: 'Subscriber could not be updated.' });
    }
    res.status(200).json({ status: 'success', message: 'Subscribe was successfully updated.' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Subscriber could not be updated.' });
  }
});

export default handler;
