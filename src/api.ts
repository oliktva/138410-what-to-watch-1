import axios, {AxiosInstance} from 'axios';

const configureAPI = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  return instance;
};

export default configureAPI;
