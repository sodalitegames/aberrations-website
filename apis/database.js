import Axios from 'axios';

const apiUrl = `${process.env.DATABASE_API_URL}`;

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
