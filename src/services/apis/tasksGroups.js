import { APIHost, request } from './utils'
import store from '../store'

class TasksGroupsAPI {
  constructor() {}
  getTasksGroups(id) {
    // if (store.state.projectId) {
      // console.log('getTasksGroups: '+id)
      const url = `${APIHost}/tasklists?_projectId=${id}`
      return request(url)
    // }
  }
}

export default new TasksGroupsAPI()