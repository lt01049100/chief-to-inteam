<template>
  <li :class="[isSelected1||isSelected2? 'select': '', 'selectCell']" @click="select(item)" >
    <div class="listEle">
      <img v-if="item.logo" class="listImg" :src="item.logo" alt="头像">
      <Icon v-else class="iconImg" :type="typeSwitch ==='taskStage'?'ios-arrow-forward':'ios-albums-outline'" />
      <span v-if="item.name||item.title" class="listName" :title="item.name||item.title" >{{item.name||item.title}}</span>
    </div>
  </li>
</template>
<script>
  import { store, bus } from './../../services'

  export default {
    data() {
      return {
        searchKey: '',
        isSelected1: false,
        isSelected2: false,
        // isSelected3: false,
      }
    },
    props: ['typeSwitch', 'item'],
    created() {
      if (this.typeSwitch === 'projectGroup') {
        // console.log('created 任务组')
        bus.$on('select-item1', () => { this.isSelected1 = false })
        store.clearSelectedProjectsGroupsItem()
        store.clearSelectedTasksGroupsItem()
        store.clearSelectedItem()
      } else if (this.typeSwitch === 'taskGroup') {
        // console.log('created 任务分组')
        bus.$on('select-item2', () => { this.isSelected2 = false })
        store.clearSelectedTasksGroupsItem()
        store.clearSelectedItem()
      }
      //  else if (this.typeSwitch === 'taskStage') {
      //   // console.log('created 任务状态')
      //   bus.$on('select-item3', () => { this.isSelected3 = false })
      //   store.clearSelectedItem()
      // }
    },
    methods: {
      select(item) {
        if (this.typeSwitch === 'projectGroup') {
          this.clearProjectsGroupsItem(item)
          // 然后设置当前态
          this.isSelected1 = true
        } else if (this.typeSwitch === 'taskGroup') {
          this.clearTasksGroupsItem(item)
          // 然后设置当前态
          this.isSelected2 = true
        }
        //  else if (this.typeSwitch === 'taskStage') {
        //   this.clearTasksStagesItem(item)
        //   // 然后设置当前态
        //   this.isSelected3 = true
        // }
      },
      clearProjectsGroupsItem(item){
          store.clearSelectedProjectsGroupsItem()
          store.setSelectedProjectsGroupsItem(item._id, item)
          store.clearSelectedTasksGroupsItem()
          store.clearSelectedItem()
          // 同步父组件的状态 
          this.$emit('select')
          // 同步兄弟组价的状态，初始化他们的状态
          bus.$emit('select-item1')
      },
      clearTasksGroupsItem(item){
          store.clearSelectedTasksGroupsItem()
          store.setSelectedTasksGroupsItem(item._id, item)
          store.clearSelectedItem()
          // 同步父组件的状态 
          this.$emit('select')
          // 同步兄弟组价的状态，初始化他们的状态
          bus.$emit('select-item2')
      },
      // clearTasksStagesItem(item) {
      //     store.clearSelectedItem()
      //     // 同步父组件的状态 
      //     this.$emit('select')
      //     // 同步兄弟组价的状态，初始化他们的状态
      //     bus.$emit('select-item3')
      // },
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
    &.select,
    &:hover{
      background: #eee;
    }
    .listEle{
      display: flex;
      .listImg{
        // flex: 1;
        // display: inline-block;
        // vertical-align: middle;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        margin-right: 10px;
        .avatar{
          border-radius: 50%/50%;
        }
      }
      .iconImg{
        flex: 1;
        // text-align: center;
        line-height: 24px;
        font-size: 16px;
        color: #ff6264;
      }
      .listName{
        flex: 6;
        // display: inline-block;
        line-height: 24px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
