<template>
<div class="modal-view">
    <header-view></header-view>
    <body-view></body-view>

  <transition name="slide-fade" :duration="4000">
    <post-success v-if="successful"></post-success>
    <post-fail v-if="fail"></post-fail>
  </transition>
</div>
</template>

<script>
  import HeaderView from './HeaderView'
  import BodyView from './BodyView'
  import PostSuccess from './PostSuccess'
  import PostFail from './PostFail'

  import { store, bus } from './../../services'

  export default {
      data () {
          return {
              successful: false,
              fail: false
          }
      },
      components: {
          HeaderView,
          BodyView,
          PostSuccess,
          PostFail,
      },
      created() {
        bus.$on('successful', (value) => this.successful = value)
        bus.$on('fail', (value) => this.fail = value)
      },
  }
</script>

<style lang="less">
  .modal-view {
    flex: 1;
    width: 100%;
    min-width: 800px;
    max-width: 1000px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 50px auto;
    background-color: #fff;
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }
  /* Reset `button` and button-style `input` default styles */
  
  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  button {
    background: none;
    border: 0;
    color: inherit;
    /* cursor: default; */
    font: inherit;
    outline: none;
    line-height: normal;
    overflow: visible;
    padding: 0;
    -webkit-appearance: button;
    /* for input */
    -webkit-user-select: none;
    /* for button */
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  input::-moz-focus-inner,
  button::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 4.3s ease;
    transform: translateX(-300px);
  }
  .slide-fade-leave-active {
    transition: all 4.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter,
  .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(300px);
    opacity: 0;
  }
</style>
