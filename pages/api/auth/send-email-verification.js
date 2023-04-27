import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

import { firebase } from '../../../lib/firebase-admin';
import { sendEmailVerification } from '../../../lib/sendgrid';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  // Make sure the email is not already verified
  if (req.auth.emailVerified) {
    return res.status(409).json({ status: 'error', message: 'Your email has already been verified.' });
  }

  try {
    // Generate verification link
    const link = await firebase.auth().generateEmailVerificationLink(req.auth.email);

    // Send the verification email
    const sent = await sendEmailVerification(req.auth.email, req.auth.displayName, link);

    if (!sent) {
      return res.status(500).json({ status: 'error', message: 'An error occurred sending the email. Please try again later' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Email has been sent. Please check your inbox.',
    });
  } catch (err) {
    console.log(err);

    if (err.code === 'auth/internal-error') {
      return res.status(500).json({ status: 'error', message: 'You need to wait a while before you can send another email.' });
    }

    res.status(500).json({ status: 'error', message: 'An error occurred sending the email. Please try again later.', error: err });
  }
});

export default handler;
