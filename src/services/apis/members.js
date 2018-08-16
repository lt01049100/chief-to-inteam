import { APIHost, request } from './utils'
import store from '../store'

class MembersAPI {
  constructor() {}
  getMembers(id) {
    // if (store.state.organizationId) {
      // /api/v2/organizations/5a3d2f99526750e2eb0c6595/members
      // boundToObjectType=organization
      // _boundToObjectId=5a3d2f99526750e2eb0c6595
      // all=true
      // _organizationId=5a3d2f99526750e2eb0c6595

      const url = `${APIHost}/projects/members`
      // const url = `${APIHost}/v2/organizations/${id}/members?`
      //           + `boundToObjectType=organization&`
      //           + `_boundToObjectId=${id}&`
      //           + `all=true&`
      //           + `_organizationId=${id}`
      return request(url)
    // }
  }
}

export default new MembersAPI()