import axios from 'axios';
const api = axios.create({
  baseURL: 'https://omnistack-backend-py.herokuapp.com',
});

export default api;