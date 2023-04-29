// MailerLite API cannot be used directly on the client side -- it must be used from the server //

import axios from 'axios';

const apiUrl = process.env.MAILER_LITE_API_URL || '';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'X-MailerLite-ApiKey': process.env.MAILER_LITE_API_KEY || '',
    'Content-Type': 'application/json',
  },
});

export const GROUP_IDS = {
  ACCOUNT_HOLDERS: '109984643',
  BETA_TESTERS: '109984649',
  BLOG_NOTIFICATIONS: '110799179',
  MAILING_LIST: '109984640',
  STRIPE_CUSTOMERS: '109984706',
};

export const subscribeEmailToGroup = async (groupId, { name, email, fields }) => {
  if (process.env.NODE_ENV !== 'production') return false;

  try {
    await api.post(`/groups/${groupId}/subscribers`, {
      email,
      name,
      fields,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const getSubscriber = async email => {
  if (process.env.NODE_ENV !== 'production') return false;

  try {
    const { data: subscriber } = await api.get(`/subscribers/${email}`);
    if (subscriber.error) return false;
    return subscriber;
  } catch (err) {
    return false;
  }
};

export const updateSubscriber = async (email, body) => {
  if (process.env.NODE_ENV !== 'production') return false;

  try {
    await api.put(`/subscribers/${email}`, body);
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteSubscriber = async email => {
  if (process.env.NODE_ENV !== 'production') return false;

  try {
    await api.delete(`/subscribers/${email}`);
    return true;
  } catch (err) {
    return false;
  }
};

export const getSubscribersGroups = async email => {
  if (process.env.NODE_ENV !== 'production') return false;

  try {
    const { data: groups } = await api.get(`/subscribers/${email}/groups`);
    return groups;
  } catch (err) {
    return false;
  }
};
