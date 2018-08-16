const store = {
  debug: false,
  state: {
    selectedItem: new Map(),
    selectedProjectsGroupsItem: new Map(),
    selectedTasksGroupsItem: new Map(),
    user: {},
    info: {},
  },
  // 选中
  setSelectedItem(key, value) {
    this.debug && console.log('setSelectedItem', value)
    if (this.state.selectedItem.has(key)) {
      this.state.selectedItem.delete(key)
    } else {
      this.state.selectedItem.set(key, value)
    }
  },
  getSelectedItem(key) {
    if (!this.state.selectedItem.has(key)) return
    this.debug && console.log('getSelectedItem', key)
    this.state.selectedItem.get(id)
  },
  clearSelectedItem() {
    this.state.selectedItem.clear()
  },
  
  // 选中任务组
  setSelectedProjectsGroupsItem(key, value) {
    this.debug && console.log('setSelectedProjectsGroupsItem', value)
    if (this.state.selectedProjectsGroupsItem.has(key)) {
      this.state.selectedProjectsGroupsItem.delete(key)
    } else {
      this.state.selectedProjectsGroupsItem.set(key, value)
    }
  },
  getSelectedProjectsGroupsItem(key) {
    if (!this.state.selectedProjectsGroupsItem.has(key)) return
    this.debug && console.log('getSelectedProjectsGroupsItem', key)
    this.state.selectedProjectsGroupsItem.get(id)
  },
  clearSelectedProjectsGroupsItem() {
    this.state.selectedProjectsGroupsItem.clear()
  },
  
  // 选中任务分组
  setSelectedTasksGroupsItem(key, value) {
    this.debug && console.log('setSelectedTasksGroupsItem', value)
    if (this.state.selectedTasksGroupsItem.has(key)) {
      this.state.selectedTasksGroupsItem.delete(key)
    } else {
      this.state.selectedTasksGroupsItem.set(key, value)
    }
  },
  getSelectedTasksGroupsItem(key) {
    if (!this.state.selectedTasksGroupsItem.has(key)) return
    this.debug && console.log('getSelectedTasksGroupsItem', key)
    this.state.selectedTasksGroupsItem.get(id)
  },
  clearSelectedTasksGroupsItem() {
    this.state.selectedTasksGroupsItem.clear()
  },


}

export default store