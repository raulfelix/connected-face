import UserStore from './UserStore';
import ProjectStore from './ProjectStore';

import AccountApi from '../requests/Account';
import ProjectApi from '../requests/Project';

class RootStore {
  constructor() {
    this.user = new UserStore(this, new AccountApi(this));
    this.projectStore = new ProjectStore(this, new ProjectApi());
  }
}

export default RootStore;