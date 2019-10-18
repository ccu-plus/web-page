import axios from 'axios';
import bus from './bus';
import store from '@/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  validateStatus: (status) => status >= 200 && status < 500,
});

if (localStorage.getItem('api-token')) {
  instance.defaults.headers.common['Api-Token'] = localStorage.getItem('api-token');
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      bus.$emit(`api-response-${error.response.status}`);
    }

    return Promise.reject(error);
  },
);

export default instance;
