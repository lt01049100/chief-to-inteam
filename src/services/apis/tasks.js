import { APIHost, request } from './utils'
import store from '../store'

class TasksAPI {
  constructor() {}
  getTasks(id, isDone = false) {
      const url = `${APIHost}/tasks?queryAll=true&_tasklistId=${id}`
      // const url = `${APIHost}/stages/${id}/tasks?`
      //           + `isDone=${isDone}&`
      //           + `withInvolves=true&`
      //           + `count=20&`
      //           + `page=1&`
      //           + `_stageId=${id}`
      return request(url)
  }
}

export default new TasksAPI()