// 配置
let env = process.env.NODE_ENV
const host = env === 'development' ? 'http://inteam.test.hubpd.com' : 'http://inteam.hubpd.com'
const root = env === 'development' ? '' : ''

const preText = '人民网评：让老百姓吃得放心，住得安心--观点--人民网'

let config = {
  env: env,
  host: host,
  root: root,
  serverRoot: '',
  preText: preText
}

module.exports = config