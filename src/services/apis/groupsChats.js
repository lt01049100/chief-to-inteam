import { APIHost, request } from './utils'
import store from '../store'

class GroupsChatsAPI {
  constructor() {}
  getGroupsChats() {
    const url = `${APIHost}/groups`
    return request(url)
  }
}

export default new GroupsChatsAPI()