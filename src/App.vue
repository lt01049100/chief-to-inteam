<template>
  <div id="app">
    <modal-view></modal-view>
  </div>
</template>

<script>
import { ModalView } from './components'
import { userAPI, store } from './services'
import config from './config'

export default {
  name: 'app',
  created() {
    userAPI.getUser()
      .then(user => {
        store.state.user = user
      })
      .catch(err => {
        console.error(err)
        let currentUrl = encodeURIComponent(window.location.href)
        window.location.href = `${config.host}/login?next=${currentUrl}`
      })
  },
  components: {
    ModalView
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Helvetica Neue','PingFang SC','Microsoft Yahei','微软雅黑','STXihei','华文细黑','sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eee;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
