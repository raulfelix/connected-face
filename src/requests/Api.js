import axios from 'axios';

export const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3333';

const instance = axios.create({
  baseURL: endpoint,
  timeout: 1000 * 60,
  headers: { 'Content-Type': 'application/json' },
});

export const get = (path, token) =>
  instance
    .get(path, {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.data)
    .catch(error => console.error(error));

export const post = (path, data, token) =>
  instance
    .post(`${path}`, data, {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.data)
    .catch(error => console.error(error));

export const put = (path, data, token) =>
  instance
    .put(`${path}`, data, {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
