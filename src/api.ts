import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

export const SERVER_URL = `https://es31-server.appspot.com`;
export const ERROR_STATUSES = [404, 500, 503, 504];

const configureAPI = (onServerError: () => void): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${SERVER_URL}/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response: AxiosResponse) => response;
  const onFail = (error: AxiosError) => {
    if (error.response === void 0 || ERROR_STATUSES.includes(error.response.status)) {
      onServerError();
    }

    return Promise.reject(error);
  };

  instance.interceptors.response.use(onSuccess, onFail);

  return instance;
};

export default configureAPI;
