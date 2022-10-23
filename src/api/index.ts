import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data',
  timeout: 1000,
});

export const getUsers = () => instance.get('');
