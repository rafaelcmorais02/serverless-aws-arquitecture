import axios from 'axios';
import log from './../lib/logger';

const httpRequest = (options = {}) => {
  const instance = axios.create(options);

  instance.interceptors.request.use(
    (config) => {
      log.info(config.data);
      return config;
    },
    (error) => {
      log.error(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      log.info(response.data);
      return response;
    },
    (error) => {
      if (error.response) {
        // Request made and server responded
        log.error(error.response);
        return Promise.reject(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        log.error(error.request);
        return Promise.reject(error.request);
      }
      // Something happened in setting up the request that triggered an Error
      log.error(error.message);
      return Promise.reject(error.message);
    }
  );

  return instance;
};
export default httpRequest;
