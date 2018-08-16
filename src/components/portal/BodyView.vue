<template>
  <div class="modal-body">
    <post-view></post-view>
  </div>
</template>

<script>
  import PostView from './../postview/PostView'

  export default {
    data() {
      return {}
    },
    components: {
      PostView
    }
  }
</script>

<style lang="less">
  .modal-body {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
  }
</style>
