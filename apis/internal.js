import Axios from 'axios';

const apiUrl = `/api`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setupAccount = ({ name, subscribe }) => api.post('/auth/setup-account', { name, subscribe });
export const sendPasswordReset = email => api.post('/auth/send-password-reset', { email });
export const sendEmailVerification = () => api.post('/auth/send-email-verification');
export const updateEmail = ({ prevEmail, nextEmail }) => api.post('/auth/update-email', { prevEmail, nextEmail });
export const updateSubscriber = body => api.post('/auth/update-subscriber', body);

export const createPortalSession = () => api.post('/stripe/create-portal-session', {});
export const createCheckoutSession = lookupId => api.post('/stripe/create-checkout-session', { lookup_key: lookupId });

export default api;
