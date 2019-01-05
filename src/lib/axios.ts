import axios from "axios";
import bus from "./bus";
import store from "@/store";

const instance = axios.create();

instance.interceptors.request.use(
  config => {
    const source = axios.CancelToken.source();

    config.cancelToken = source.token;

    store.state.requests.push(source);

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    if (error.response) {
      bus.$emit(`api-response-${error.response.status}`);
    }

    return Promise.reject(error);
  }
);

export default instance;
