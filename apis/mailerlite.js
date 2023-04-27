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

export const updateSubscriber = async (email, body) => {
  try {
    await api.put(`/subscribers/${email}`, body);
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteSubscriber = async email => {
  try {
    await api.delete(`/subscribers/${email}`);
    return true;
  } catch (err) {
    return false;
  }
};

export const getSubscribersGroups = async email => {
  try {
    const { data } = await api.get(`/subscribers/${email}/groups`);
    return data;
  } catch (err) {
    return false;
  }
};
