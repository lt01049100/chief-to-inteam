<template>
  <div class='loading-indicator'>
    <span class='loader-dot' />
    <span class='loader-dot' />
    <span class='loader-dot' />
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  // loading
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
@-moz-keyframes bouncedelay {
  0%, 80%, 100% { -moz-transform: scale(0.0) }
  40% { -moz-transform: scale(1.0) }
}
@-ms-keyframes bouncedelay {
  0%, 80%, 100% { -ms-transform: scale(0.0) }
  40% { -ms-transform: scale(1.0) }
}
@-o-keyframes bouncedelay {
  0%, 80%, 100% { -o-transform: scale(0.0) }
  40% { -o-transform: scale(1.0) }
}
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
  }
}
.loading-indicator{
  margin: 10px auto;
  width: 70px;
  text-align: center;
  z-index: 9999;
  .loader-dot{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #D8D8D8;
    border-radius: 50%;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    -moz-animation: bouncedelay 1.4s infinite ease-in-out;
    -ms-animation: bouncedelay 1.4s infinite ease-in-out;
    -o-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -ms-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
    &:nth-child(1){
      -webkit-animation-delay: -0.32s;
      -moz-animation-delay: -0.32s;
      -ms-animation-delay: -0.32s;
      -o-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    &:nth-child(2){
      -webkit-animation-delay: -0.16s;
      -moz-animation-delay: -0.16s;
      -ms-animation-delay: -0.16s;
      -o-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }
}
</style>
