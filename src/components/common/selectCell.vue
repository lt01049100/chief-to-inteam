<template>
  <li :class="[isSelected? 'select': '', 'selectCell']" @click="select(item)" >
    <div class="listEle">
      <img v-if="typeSwitch!=='task'" class="listImg" :class="{avatar:typeSwitch==='recent'||typeSwitch==='member'}" :src="item.avatarUrl||item.logo" alt="头像">
      <span v-if="item.name" class="listName" :title="item.name" >{{item.name}}</span>
      <span v-if="item.content" class="listName content" :title="item.content" >{{item.content}}</span>
    </div>
  </li>
</template>
<script>
  import { store, bus } from './../../services'

  export default {
    data() {
      return {
        searchKey: '',
        isSelected: false
      }
    },
    props: ['typeSwitch', 'item'],
    created() {
      bus.$on('select-item', () => { this.isSelected = false })
      store.clearSelectedItem()
    },
    methods: {
      select(item) {
        store.clearSelectedItem()
        store.setSelectedItem(item._id, item)
        // 同步父组件的状态 
        this.$emit('select')
        // 同步兄弟组价的状态，初始化他们的状态
        bus.$emit('select-item')
        // 然后设置当前态
        this.isSelected = true
      }
    }
  }
</script>
<style lang="less">
  .selectCell{
    display: block;
    position: relative;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    text-align: left;
    &.select,
    &:hover{
      background: #eee;
    }
    .listImg{
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      margin-right: 10px;
      .avatar{
        border-radius: 50%/50%;
      }
    }
    .listName{
      display: inline-block;
    }
  }
</style>
