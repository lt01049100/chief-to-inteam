import { APIHost, request } from './utils'
import store from '../store'

class ProjectsGroupsAPI {
  constructor() {}
  getProjectsGroups(id) {
    if (store.state.user) {
      const url = id? `${APIHost}/projects?_organizationId=${id}`: `${APIHost}/projects`
      return request(url)
    }
  }
}

export default new ProjectsGroupsAPI()