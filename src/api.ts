import axios, {AxiosInstance} from 'axios';

export const SERVER_URL = `https://es31-server.appspot.com`;

const configureAPI = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${SERVER_URL}/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
};

export default configureAPI;
