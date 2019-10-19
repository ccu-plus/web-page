import axios from 'axios';
import storage from 'store';
import store from '@/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  validateStatus: (status) => status >= 200 && status < 500,
});

const token = storage.get('api-token');

if (token) {
  instance.defaults.headers.common['Api-Token'] = token;
}

instance.interceptors.request.use(
  (config) => {
    const source = axios.CancelToken.source();

    config.cancelToken = source.token;

    store.state.requests.push(source);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
