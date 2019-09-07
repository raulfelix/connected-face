import debounce from 'debounce-promise';
import { get } from './Api';

export const getTags = debounce((name) => {
  return get(`/tags?term=${name}`)
    .then(response => {
      if (response && response.data) {
        return response.data
      } else {
        return []
      }
    })
}, 800)