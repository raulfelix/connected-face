import debounce from 'debounce-promise';
import { get } from './Api';

export const getSchool = debounce((name) => {
  return get('/institutions?term=' + name).then(response => {
    return response.data;
  })
}, 800)