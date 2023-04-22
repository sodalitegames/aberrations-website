import Axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/v2`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setupAccount = ({ name, subscribe }) => api.post('/auth/setup-account', { name, subscribe });
export const forgotPassword = email => api.post('/auth/forgot-password', { email });
export const sendEmailVerification = () => api.post('/auth/send-email-verification');

export const createPortalSession = () => api.post('/users/create-portal-session', {});
export const createCheckoutSession = lookupId => api.post('/users/create-checkout-session', { lookup_key: lookupId });

export default api;
