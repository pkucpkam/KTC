import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos', 
  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 10000, 
});

export default axiosClient;