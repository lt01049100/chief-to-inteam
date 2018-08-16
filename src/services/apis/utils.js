import store from './../store'
import config from './../../config'

export const APIHost = `${config.host}/api`
// export const fileHost = 'https://download.inteam.hubpd.com'

export function request(url, method = 'GET', body) {
  const user = store.state.user
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  if (user) {
    headers.Authorization = user.strikerAuth
  }
  return window.fetch(url, {
    headers,
    credentials: 'include',
    method,
    body: typeof body === 'object' ? JSON.stringify(body) : body
  })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
          .catch(() => {return ''})
      } else {
        return Promise.reject(response)
      }
    })
}
