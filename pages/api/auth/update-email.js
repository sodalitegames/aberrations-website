import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

import { Player } from '../../../models/Player';

import { subscribeEmailToGroup, getSubscribersGroups, deleteSubscriber, getSubscriber } from '../../../apis/mailerlite';

import { firebase, firestore } from '../../../lib/firebase-admin';
import { sendEmailVerification } from '../../../lib/sendgrid';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    // Make sure the previous and next emails were provided
    if (!req.body.prevEmail || !req.body.nextEmail) {
      return res.status(500).json({ status: 'error', message: 'Your must provide a previous and next email.' });
    }

    // Fetch user in firestore
    const userRef = firestore.collection('users').doc(req.auth.uid);
    const user = (await userRef.get()).data();

    const PREV_EMAIL = user.email;

    let prevEmails = [];

    if (user.previous_emails && user.previous_emails.length) {
      prevEmails = user.previous_emails;
    }
    // Update user in firestore
    await userRef.update({
      email: req.auth.email,
      previous_emails: [...prevEmails, PREV_EMAIL],
    });

    // Update the player in mongodb
    const player = await Player.findByIdAndUpdate(user.player_id, { email: req.auth.email });

    let metadata = {};

    try {
      if (PREV_EMAIL !== req.auth.email) {
        // Find the old email's subscriber in mailerlite
        const subscriber = await getSubscriber(PREV_EMAIL);

        // Find the old email's groups in mailerlite
        const subscriberGroups = await getSubscribersGroups(PREV_EMAIL);

        if (subscriber && subscriberGroups) {
          // Create new subscriber and subscribe it to all of old subscribers groups
          metadata.subscribed = await Promise.all(
            subscriberGroups.map(async group => {
              let fields = {};

              subscriber.fields.forEach(field => {
                fields[field.key] = field.value;
              });

              const response = await subscribeEmailToGroup(group.id, { email: req.auth.email, name: subscriber.name, fields });
              return { name: group.name, subscribed: response };
            })
          );

          // Delete the old contact from mailerlite
          metadata.deleted = await deleteSubscriber(PREV_EMAIL);
        }
      }

      // Generate verification link
      const verificationLink = await firebase.auth().generateEmailVerificationLink(req.auth.email);

      // Send the verification email
      metadata.verification = await sendEmailVerification(req.auth.email, req.auth.displayName, verificationLink);

      // Generate email change link -- not a feauture yet: https://github.com/firebase/firebase-admin-node/issues/1614
      // Generate update link
      // const updateLink = await firebase.auth().generateEmailChangeLink(req.auth.email);
      // Send the update email
      // metadata.notified = await sendEmailUpdate(PREV_EMAIL, req.auth.email, req.auth.displayName, updateLink);
    } catch (err) {
      console.error(err);
      metadata.error = err;
    }

    res.status(201).json({ status: 'success', message: 'Your email has been successfully updated.', user, player, metadata });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occurred while updating your email. Please try again later.' });
  }
});

export default handler;
