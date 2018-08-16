// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'whatwg-fetch'
import 'tb-icons/lib/styles/tb-icons.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iview)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
