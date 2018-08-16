import { APIHost, request } from './utils'
import store from '../store'

class ChatRoomAPI {
  constructor() {}

  // 私聊聊天室
  getRoomByUser(_userId) {
    const url = `${APIHost}/rooms/users/${_userId}?_bindToObjectId=0&count=30&page=1`
    return request(url)
  }

  // 群聊聊天室
  getRoomByGroupChat(_groupId) {
    const url = `${APIHost}/rooms/groups/${_groupId}?_bindToObjectId=0&count=30&page=1`
    return request(url)
  }

  // 任务组群聊聊天室
  getRoomByProjectGroupChat(_projectId) {
    const url = `${APIHost}/rooms/projects/${_projectId}?_bindToObjectId=0&count=30&page=1`
    return request(url)
  }
}

export default new ChatRoomAPI()