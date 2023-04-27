import { createHandler } from '../../../middleware';

import { firebase } from '../../../lib/firebase-admin';
import { sendPasswordReset } from '../../../lib/sendgrid';

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    // Generate reset link
    const link = await firebase.auth().generatePasswordResetLink(req.body.email);

    // Send the reset email
    const sent = await sendPasswordReset(req.body.email, link);

    if (!sent) {
      return res.status(500).json({ status: 'error', message: 'An error occurred sending the email. Please try again later' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Email has been sent. Please check your inbox.',
    });
  } catch (err) {
    console.log(err);
    console.log(err.code);

    switch (err.code) {
      case 'auth/email-not-found':
        return res.status(404).json({ status: 'error', message: 'No user with that email can be found.' });
      case 'auth/invalid-email':
        return res.status(404).json({ status: 'error', message: 'The email provided is invalid' });
      case 'auth/internal-error':
        return res.status(500).json({ status: 'error', message: 'You need to wait a while before you can send another email.' });
      default:
        return res.status(500).json({ status: 'error', message: 'An error occurred sending the email. Please try again later.' });
    }
  }
});

export default handler;
