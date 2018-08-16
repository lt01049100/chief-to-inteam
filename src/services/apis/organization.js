import { APIHost, request } from './utils'
import store from '../store'

class OrganizationAPI {
  constructor() {}
  getOrganization() {
    if (store.state.user) {
      const url = `${APIHost}/organizations`
      return request(url)
    }
  }
}

export default new OrganizationAPI()