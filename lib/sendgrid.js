// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const EMAIL_FROM = process.env.EMAIL_FROM;

export const sendPasswordReset = async (email, link) => {
  if (process.env.NODE_ENV !== 'production') email = process.env.NOTIFICATION_EMAIL;

  const mail = {
    to: email,
    from: EMAIL_FROM,
    subject: 'Reset your password for Aberrations RPG',
    text: `Hello,\nFollow this link to reset your Aberrations RPG password for your ${email} account.\n${link}\nIf you didn’t ask to reset your password, you can ignore this email.\nThanks,\nAberrations RPG team\n`,
    html: `
      <p>Hello,</p>
      <p>Follow this link to reset your Aberrations RPG password for your ${email} account.</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn’t ask to reset your password, you can ignore this email.</p>
      <p>Thanks,</p>
      <p>Aberrations RPG team</p>
    `,
  };

  try {
    await sendgrid.send(mail);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const sendEmailVerification = async (email, name, link) => {
  if (process.env.NODE_ENV !== 'production') email = process.env.NOTIFICATION_EMAIL;

  const mail = {
    to: email,
    from: EMAIL_FROM,
    subject: 'Verify your email for Aberrations RPG',
    text: `Hello ${name},\nFollow this link to verify your email address.\n${link}\nIf you didn’t ask to verify this address, you can ignore this email.\nThanks,\nAberrations RPG team\n`,
    html: `
      <p>Hello ${name},</p>
      <p>Follow this link to verify your email address.</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn’t ask to verify this address, you can ignore this email.</p>
      <p>Thanks,</p>
      <p>Aberrations RPG team</p>
    `,
  };

  try {
    await sendgrid.send(mail);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const sendEmailUpdate = async (prevEmail, newEmail, name, link) => {
  if (process.env.NODE_ENV !== 'production') prevEmail = process.env.NOTIFICATION_EMAIL;

  const mail = {
    to: prevEmail,
    from: EMAIL_FROM,
    subject: 'Your sign-in email was changed for Aberrations RPG',
    text: `Hello${name},\nYour sign-in email for Aberrations RPG was changed to ${newEmail}.\nIf you didn’t ask to change your email, follow this link to reset your sign-in email.\n${link}\nThanks,\nAberrations RPG team\n`,
    html: `
      <p>Hello${name},</p>
      <p>Your sign-in email for Aberrations RPG was changed to ${newEmail}.</p>
      <p>If you didn’t ask to change your email, follow this link to reset your sign-in email.</p>
      <p><a href="${link}">${link}</a></p>
      <p>Thanks,</p>
      <p>Aberrations RPG team</p>
    `,
  };

  try {
    await sendgrid.send(mail);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const sendNotification = async (email, subject, message) => {
  if (process.env.NODE_ENV !== 'production') email = process.env.NOTIFICATION_EMAIL;

  const mail = {
    to: email,
    from: EMAIL_FROM,
    subject: subject,
    text: message,
  };

  try {
    await sendgrid.send(mail);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
