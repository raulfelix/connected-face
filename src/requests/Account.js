import { get, post, put } from './Api';

class Account {
  constructor(root) {
    this.root = root;
  }

  signup(username, email, password, type) {
    return post('/signup', {
      username,
      email,
      password,
      type
    })
  }

  login(email, password) {
    return post('/login', {
      email,
      password
    });
  }

  logout(id, token) {
    return post('/logout', { id }, token);
  }

  profile() {
    return get(`/user/profile`, this.root.token)
  }

  createProfile(payload) {
    return post('/user/profile', payload, this.root.token)
  }

  updateProfile(payload) {
    return put('/user/profile', payload, this.root.token)
  }
}

export default Account;