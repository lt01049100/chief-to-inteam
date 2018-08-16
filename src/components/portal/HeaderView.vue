<template>
  <div class="modal-header">
    <div class="modal-title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return { title: '分享到采编联动平台' }
    }
  }
</script>

<style lang="less">
  .modal-header {
    flex: 0 0 auto;
    padding: 0;
    margin: 15px 0 0;
    text-align: center;
    position: relative;

    .modal-title {
      font-size: 18px;
      font-weight: 500;
      line-height: 26px;
      padding: 0 15px 15px;
      color: #333333;
      border-bottom: 1px solid #E5E5E5;
    }
  }
</style>
