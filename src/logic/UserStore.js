import { setStorage, clearStorage, getUser, userExists } from './Session';

class UserStore {
  id;
  type;
  username;
  profile;

  constructor(root, api) {
    if (userExists()) {
      const {id, type, username } = getUser();
      this.id = id
      this.type = type
      this.username = username
    }
    this.api = api
    console.log(this)
  }

  get profileRoute() {
    return '/user/profile';
  }

  setUserDetails({id, type, username}) {
    this.id = id;
    this.type = type;
    this.username = username;
  }

  exists() {
    return this.id !== null;
  }

  async login(email, password) {
    try {
      const response = await this.api.login(email, password)
      this.setUserDetails(response);
      setStorage(response)
      return true;
    } catch (e) {
      console.error('couldnt login')
    }
    return false;
  }

  async logout() {
    try {
      await this.api.logout(this.id)
      clearStorage();
      return true;
    } catch (e) {
      console.error('couldnt logout')
    }
    return false;
  }

  async fetchProfile() {
    try {
      const { profile } = await this.api.profile(this.id);
      this.profile = profile;
      return profile;
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  async updateProfile(profile) {
    try {
      profile.id = this.profile.id;
      const ok = await this.api.updateProfile(profile);
      return ok;
    } catch (e) {
      console.error(e)
    }
  }

  async signup(username, email, password, type) {
    try {
      await this.api.signup(username, email, password, type);
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }
}

export default UserStore;