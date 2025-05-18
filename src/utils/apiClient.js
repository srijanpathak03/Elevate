import axios from 'axios';
import { getAuthConfig } from './constants';
import Cookies from 'js-cookie';

// Create a function to get an axios instance with auth headers
export const getApiClient = () => {
  const cookies = { jwt: Cookies.get('jwt') };
  const config = getAuthConfig(cookies);
  
  const instance = axios.create({
    withCredentials: true,
    headers: {
      ...config.headers
    }
  });
  
  return instance;
};

// Create and export a default instance
const apiClient = getApiClient();
export default apiClient; 