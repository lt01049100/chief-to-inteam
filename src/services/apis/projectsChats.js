import { APIHost, request } from './utils'
import store from '../store'

class ProjectsChatsAPI {
  constructor() {}
  getProjectsChats(id) {
    if (store.state.user) {
      const url = id? `${APIHost}/projects?_organizationId=${id}`: `${APIHost}/projects`
      return request(url)
    }
  }
}

export default new ProjectsChatsAPI()