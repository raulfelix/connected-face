class ProjectStore {
  projects;

  constructor(root, api) {
    this.root = root;
    this.api = api
  }

  async create(payload) {
    try {
      const { project } = await this.api.create(payload, this.root.token);
      return project
    } catch (e) {
      console.error(e)
    }
  }

  async createTag(payload) {
    try {
      await this.api.createTag(payload);
    } catch (e) {
      console.error(e)
    }
  }

  async recent() {
    try {
      const { projects } = await this.api.recent();
      return projects
    } catch (e) {
      console.error(e)
      return [];
    }
  }

  async byUser() {
    try {
      const { projects } = await this.api.byUser(this.root.token);
      return projects
    } catch (e) {
      console.error(e)
      return [];
    }
  }
}

export default ProjectStore;