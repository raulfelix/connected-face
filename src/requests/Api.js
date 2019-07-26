import axios from 'axios';

export const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3333';

const instance = axios.create({
  baseURL: endpoint,
  timeout: 1000 * 60,
  headers: { 'Content-Type': 'application/json' },
});

export const get = (path) =>
  instance
    .get(path)
    .then(response => response.data)
    .catch(error => console.error(error));

export const post = (path, data) =>
  instance
    .post(`${path}`, data)
    .then(response => response.data)
    .catch(error => console.error(error));
