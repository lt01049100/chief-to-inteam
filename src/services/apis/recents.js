import { APIHost, request } from './utils'
import _data from './index.mock'

class RecentsAPI {
  constructor() {}
  getRecents() {
    const url = `${APIHost}/rooms/recent-users`
    return request(url)
    // return Promise.resolve(_data.objectList)
  }
}

export default new RecentsAPI()