import { APIHost, request } from './utils'
import store from '../store'

class ChatMessageAPI {
  constructor() {}
  
  postMessage(id, body) {
    const url = `${APIHost}/rooms/${id}/activities`
    return request(url, 'POST', body)
  }
  postTaskMessage(id, body) {
    const url = `${APIHost}/tasks/${id}/activities`
    return request(url, 'POST', body)
  }
}

export default new ChatMessageAPI()