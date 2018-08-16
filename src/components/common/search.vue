<template>
  <div class="search">
    <!-- <span class="icon icon-search"></span> -->
    <Icon class="searchIcon" type="ios-search" />
    <input type="text" v-model="searchKey" @keyup="match(searchKey)">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchKey: ''
      }
    },
    props: ['match']
  }
</script>
<style lang="less">
  .search {
    height: 40px;
    width: 100%;
    position: relative;
    margin-bottom: 9px;
    .icon {
      position: absolute;
      left: 17px;
      top: 12px;
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
    }
    .searchIcon{
      position: absolute;
      left: 17px;
      top: 12px;
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
    }
    input {
      width: 98%;
      height: 40px;
      font-size: 14px;
      background-color: #F7F7F7;
      color: #AAAAAA;
      border: 1px solid #D8D8D8;
      border-radius: 2px;
      outline: none;
      padding-left: 30px;
    }
  }
</style>
