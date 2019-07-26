import UserStore from './UserStore';
import AccountApi from '../requests/Account';

class RootStore {
  constructor() {
    this.user = new UserStore(new AccountApi());
  }
}

export default RootStore;