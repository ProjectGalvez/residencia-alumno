import axios from 'axios';
import { LocalStorage } from 'quasar';

const URL = `${process.env.SERVER_URL}`;
//const router = useRouter();

const documentosApi = axios.create({
  baseURL: URL,
});

documentosApi.interceptors.request.use(
  (config) => {
    config.headers['Accept'] = 'application/json';
    const token = LocalStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

documentosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default documentosApi;
