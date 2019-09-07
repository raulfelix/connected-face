import { setStorage, clearStorage, getUser, userExists } from './Session';

class UserStore {
  id;
  type;
  username;
  profile;

  constructor(root, api) {
    this.root = root;
    this.api = api

    if (userExists()) {
      const { token } = getUser();
      this.root.token = token
    }
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

  writeAuth(token) {
    console.log('write', token)
    setStorage({ token })
    this.root.token = token;
  }

  async login(email, password) {
    try {
      const { token, isProfileComplete } = await this.api.login(email, password)
      this.writeAuth(token)
      this.setUserDetails({ email });
      return {
        success: true,
        isProfileComplete
      };
    } catch (e) {
      console.error('couldnt login')
    }
    return false;
  }

  async logout() {
    try {
      await this.api.logout(this.id, this.root.token)
      clearStorage();
      return true;
    } catch (e) {
      console.error('couldnt logout')
    }
    return false;
  }

  async fetchProfile() {
    try {
      const { profile } = await this.api.profile();
      this.profile = profile;
      this.profileComplete = profile.first_name ? true : false;
      return profile;
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  async createProfile(payload) {
    try {
      const ok = await this.api.createProfile(payload);
      this.profileComplete = true;
      return ok;
    } catch (e) {
      console.error(e)
    }
  }

  async updateProfile(payload) {
    try {
      return await this.api.updateProfile(payload);
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