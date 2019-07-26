import { get, post } from './Api';

class Account {
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

  profile(id) {
    return get(`/user/${id}/profile`)
  }

  updateProfile(profile) {
    return post('/user/profile', profile)
  }
}

export default Account;