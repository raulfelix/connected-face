import { get, post } from './Api';

class Project {
  create(payload, token) {
    return post('/project', payload, token)
  }

  createTag(payload) {
    return post('/tags', payload)
  }

  recent() {
    return get('/projects/recent')
  }

  byUser(token) {
    return get('/projects/user', token)
  }
}

export default Project;