import axios from 'axios';

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  validateStatus: (status) => status >= 200 && status < 500,
});
