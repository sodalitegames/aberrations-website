import Axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_SENDGRID_API_URL}`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default api;
