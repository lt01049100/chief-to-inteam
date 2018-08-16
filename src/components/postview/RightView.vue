<template>
    <div class="right-view">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data () {
        return {

        }
    },
}
</script>
<style lang="less">
  .right-view {
    // position: absolute;
    // right: 0;
    // width: 600px;
    width: 100%;
    height: 100%;
    background-size: 138px 109px;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>