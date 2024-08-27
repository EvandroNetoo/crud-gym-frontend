import axios from 'axios';

// Configurações padrão do Axios
export const api = axios.create({
  baseURL: 'http://localhost:8080/gym',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

