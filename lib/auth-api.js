import Axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/v2`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setupAccount = ({ firstName, lastName, subscribe }) => api.post('/auth/setup-account', { firstName, lastName, subscribe }, { withCredentials: true });

export default api;
