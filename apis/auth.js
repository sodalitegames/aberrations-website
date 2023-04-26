import Axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/v1`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
