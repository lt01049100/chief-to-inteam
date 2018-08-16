// 配置
let env = process.env.NODE_ENV
const host = env === 'development' ? 'http://inteam.test.hubpd.com' : 'http://inteam.hubpd.com'
const root = env === 'development' ? '' : ''
let config = {
  env: env,
  host: host,
  root: root,
  serverRoot: ''
}

module.exports = config