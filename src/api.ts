import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

const configureAPI = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => response;
  const onFail = (err: AxiosError): AxiosError => {
    return err;
  };

  instance.interceptors.response.use(onSuccess, onFail);

  return instance;
};

export default configureAPI;
