import { APIHost, request } from './utils'
import store from './../store'

class UserAPI {
  getUser() {
    if (store.state.user._id !== undefined) {
      return Promise.resolve(store.state.user)
    }
    const url = `${APIHost}/users/me`
    return request(url)
  }
}

export default new UserAPI()