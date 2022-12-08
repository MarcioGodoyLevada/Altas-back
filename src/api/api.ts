import axios from 'axios';
import https from 'https';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  maxRedirects: 0,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default api;
