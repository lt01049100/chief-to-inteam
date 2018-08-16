<template>
    <div class="tagProject-view">
        <div class="header-nav">
            <div :class="[isProjectsChats? 'active': '', 'nav-handler']" @click="getProjectsChats" >群聊</div>
            <div :class="[isProjectsGroups? 'active': '', 'nav-handler']" @click="getProjectsGroups" >评论</div>
        </div>
        
        <search :match="match"></search>
        <div v-show="!isOnLoading"  class="itemslists">
            <ul class="items-list cont-scrollbar" v-if="isProjectsChats">
                <div v-if="projectsChatsFilter.length">
                    <select-cell v-for="(item, index) in projectsChatsFilter" :key="index" :typeSwitch="'projectChat'" :item="item" @select="selectItemEvent"></select-cell>
                </div>
                <div v-else>没数据</div>
            </ul>
            <Row class="thrRow" type="flex" v-if="isProjectsGroups" >
                <Col class="thrCol" span="6">
                    <div class="tit-div">任务组</div>
                    <ul class="items-list cont-scrollbar borderright">
                        <div v-if="projectsGroupsFilter.length">
                            <item-group v-for="(item, index) in projectsGroupsFilter" 
                                :key="index" 
                                :typeSwitch="'projectGroup'" 
                                :item="item" 
                                @select="getTasksGroups(item._id)"></item-group>
                        </div>
                        <div v-else>没数据</div>
                    </ul>
                </Col>
                <Col class="thrCol" span="6">
                    <div class="tit-div">任务分组</div>
                    <ul class="items-list cont-scrollbar borderright">
                        <div v-if="tasksGroupsFilter.length">
                            <item-group v-for="(item, index) in tasksGroupsFilter" 
                                :key="index" 
                                :typeSwitch="'taskGroup'" 
                                :item="item" 
                                @select="getTasksStages(item._id)"></item-group>
                        </div>
                        <div v-else>没数据</div>
                    </ul>
                </Col>
                <Col class="thrCol" span="6">
                    <div class="tit-div">任务状态</div>
                    <ul class="items-list cont-scrollbar borderright">
                        <div v-if="tasksStagesList.length">
                            <item-group v-for="(item, index) in tasksStagesList" 
                                :key="index" 
                                :typeSwitch="'taskStage'" 
                                :item="item" 
                                @select="getTasks(item._id)"></item-group>
                        </div>
                        <div v-else>没数据</div>
                    </ul>
                </Col>
                <Col class="thrCol" span="6">
                    <div class="tit-div">任务</div>
                    <ul class="items-list cont-scrollbar">
                        <div v-if="tasksFilter.length">
                            <select-cell v-for="(item, index) in tasksFilter" 
                                :key="index" 
                                :typeSwitch="'task'" 
                                :item="item" 
                                @select="selectItemEvent"></select-cell>
                        </div>
                        <div v-else>没数据</div>
                    </ul>
                </Col>
            </Row>
        </div>
        <div v-show="isOnLoading" class="itemslists">
            <loading />
        </div>
        <footer @click="postSelectedItems" :class="isAllow? 'allow': ''" >发送</footer>
    </div>
</template>
<script>
import { 
    userAPI,
    organizationAPI,
    projectsChatsAPI,//获取任务组群聊列表
    projectsGroupsAPI,//获取任务组列表
    tasksGroupsAPI,//获取任务分组列表
    tasksAPI,//获取任务列表
    chatRoomAPI,//获取聊天房间
    chatMessageAPI,//发送聊天信息
    store,
    bus,
} from "./../../services";

import Loading from "./../common/loading";
import Search from "./../common/search";

// 选中
import SelectCell from "./../common/selectCell";
// 三级联动
import ItemGroup from "./../common/itemGroup";

export default {
    data () {
        return {
            device: 'chatProjectsChats',
            isOnLoading: true,
            isProjectsChats: false,
            isProjectsGroups: false,
            organizationId:'',
            projectsChatsList: [],
            projectsGroupsList: [],
            tasksGroupsList: [],
            tasksList: [],
            curTaskListId: '',
            isAllow: false,
            searchKey: '',
            selectedItems: new Map(),
            isPosting: false,
        }
    },
    components: {
      Loading,
      Search,
      SelectCell,
      ItemGroup,
    },
    computed:{
        projectsChatsFilter() {
            let res = new RegExp(this.searchKey)
            return this.projectsChatsList.filter(item =>{
                return item.name.match(res)
            })
        },
        projectsGroupsFilter() {
            let res = new RegExp(this.searchKey)
            return this.projectsGroupsList.filter(item =>{
                return item.name.match(res)
            })
        },
        tasksGroupsFilter() {
            let res = new RegExp(this.searchKey)
            return this.tasksGroupsList.filter(item =>{
                return item.title.match(res)
            })
        },
        // tasksStagesFilter() {
        //     let res = new RegExp(this.searchKey)
        //     return this.tasksStagesList.filter(item =>{
        //         return item.name.match(res)
        //     })
        // },
        tasksFilter() {
            let res = new RegExp(this.searchKey)
            return this.tasksList.filter(item =>{
                return item.content.match(res)
            })
        },
    },
    mounted() {
    },
    created(){
        console.log(this.$route.path)
        console.log(this.$route.path ==='/tagOrganizationProject')
        if (this.$route.path ==='/tagOrganizationProject') {
            this.getOrganization()
        } else {
            this.organizationId = ''
            this.getProjectsChats()
        }
    },
    methods: {
        init() {
            this.isOnLoading = true
            this.isProjectsChats = false,
            this.isProjectsGroups = false,
            this.projectsChatsList = [],
            this.projectsGroupsList = [],
            this.tasksGroupsList = [],
            this.tasksStagesList = [],
            this.tasksList = [],
            this.isAllow = false
        },
        match(searchKey) {
            this.searchKey = searchKey
        },
        toggleDevice(state) {
            console.log('toggleDevice: '+state)
            this.device = state
        },
        // 获取机构
        getOrganization() {
            this.init()
            this.organizationId = ''
            organizationAPI.getOrganization()
            .then(organization => {
                this.organizationId = organization[0]._id
                this.getProjectsChats()
            })
        },
        // 任务组群聊
        getProjectsChats() {
            this.init()
            this.isProjectsChats = true
            
            if (this.$route.path ==='/tagPersonalProject') {
                this.organizationId = ''
            }
            projectsChatsAPI.getProjectsChats(this.organizationId)
            .then(projectsChats => {
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    projectsChats.forEach( item => {
                        if (item._id === user._id) return
                        this.projectsChatsList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        // 任务组
        getProjectsGroups() {
            this.init()
            this.isProjectsGroups = true
            this.tasksGroupsList = []
            this.tasksStagesList = []
            this.tasksList = []

            if (this.$route.path ==='/tagPersonalProject') {
                this.organizationId = ''
            }
            projectsGroupsAPI.getProjectsGroups(this.organizationId)
            .then(projectsGroups => {
                // console.log('projectsGroups')
                // console.log(JSON.stringify(projectsGroups))
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    projectsGroups.forEach( item => {
                        if (item._id === user._id) return
                        this.projectsGroupsList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        // 任务分组
        getTasksGroups(id) {
            this.isOnLoading = true
            this.tasksGroupsList = []
            this.tasksStagesList = []
            this.tasksList = []
            
            this.selectItemEvent()

            tasksGroupsAPI.getTasksGroups(id)
            .then(tasksGroups => {
                // console.log('tasksGroups')
                // console.log(JSON.stringify(tasksGroups[0].hasStages))
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    tasksGroups.forEach( item => {
                        if (item._id === user._id) return
                        this.tasksGroupsList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        // 任务状态
        getTasksStages(id) {
            this.tasksStagesList = []
            this.tasksList = []
            this.curTaskListId = id

            this.selectItemEvent()
            
            this.tasksGroupsFilter.forEach(item =>{
                if ( item._id === this.curTaskListId ) {
                    this.tasksStagesList = item.hasStages
                }
            })
        },
        // 任务
        getTasks(id) {
            this.isOnLoading = true
            this.tasksList = []

            this.selectItemEvent()

            tasksAPI.getTasks(id)
            .then(tasks => {
                // console.log('tasks')
                // console.log(JSON.stringify(tasks))
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    tasks.forEach( item => {
                        if (item._id === user._id) return
                        this.tasksList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        selectItemEvent() {
            // console.log('store.state.selectedItem2: ')
            // console.log(store.state.selectedItem.size > 0)
            // store.state.selectedItem.forEach((obj, index) =>{
            //     console.log(obj.name, obj._id)
            // })
            this.isAllow = (store.state.selectedItem.size > 0) // 判断是否有选中
        },
        postSelectedItems() {
            if (this.isPosting) return
            this.isPosting = true
            const selectedItems = store.state.selectedItem
            let _info = store.state.info.title +' '
                    + store.state.info.url +' '
                    + store.state.info.describe
            // console.log('store.state.info: '+JSON.stringify(store.state.info))
            // console.log('_info: '+_info)
            if (selectedItems.size <= 0) return
            selectedItems.forEach((obj, index) => {
                let chatRoomType = null
                // 获取房间id
                // console.log('store.state.user._id: '+store.state.user._id)
                if (this.isProjectsChats) {
                    if (this.isAllow) {
                        chatRoomAPI.getRoomByProjectGroupChat(obj._id)
                        .then(chatRoom =>{
                            let roomId = chatRoom._id
                            let body = {
                                'attachments': [],
                                'boundToObjectType':"room",
                                'content':_info,
                                'created':"",
                                'mentions':{},
                                'objectType': 'ChatMessage',
                                'updated':"",
                                '_boundToObjectId': roomId,
                                '_creatorId': store.state.user._id
                            }
                            chatMessageAPI.postMessage(roomId, body)
                            .then(() => {
                                bus.$emit('successful', true)
                                this.isPosting = false
                            })
                            .catch(err => {
                                console.error(err)
                                bus.$emit('fail', true)
                                this.isPosting = false
                            })
                        })
                    }
                } else if(this.isProjectsGroups) {
                    if (this.isAllow) {
                        let taskId = obj._id
                        let _info = store.state.info.title +' '
                                + store.state.info.url +' '
                                + store.state.info.describe
                        let body = {
                            'objectType': 'ChatMessage',
                            'content':_info,
                            'mentions':{}
                        }
                        chatMessageAPI.postTaskMessage(taskId, body)
                        .then(() => {
                            bus.$emit('successful', true)
                            this.isPosting = false
                        })
                        .catch(err => {
                            console.error(err)
                            bus.$emit('fail', true)
                            this.isPosting = false
                        })
                    }
                }

            })
        }

    }
}
</script>
<style lang="less">
.tagProject-view{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header-nav{
        position: relative;
        height: 46px;
        margin: 0 20px 10px 20px;
        border-bottom: 1px solid #e5e5e5;
        text-align: left;
        .nav-handler{
            position: relative;
            display: inline-block;
            font-size: 14px;
            height: 100%;
            color: #333333;
            padding: 15px 5px 9px 5px;
            margin: 0 15px 0 5px;
            // float: left;
            &:hover,
            &.active{
                cursor: pointer;
                &::before{
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    content: '';
                    height: 3px;
                    border-bottom: 1px solid #FF8486;
                }
            }
        }
    }
    .itemslists{
        flex: 1;
        display: flex;
        flex-direction: column;
        .thrRow{
            width: 100%;
            height: 100%;
            .thrCol{
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                .tit-div{
                    padding: 5px;
                    border-bottom: 1px solid #E5E5E5;
                }
            }
        }
        .items-list{
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            &.borderright{
                border-right: 1px solid #E5E5E5;
            }
            &.cont-scrollbar{
                overflow-y: auto;
                &::-webkit-scrollbar{
                    width: 10px;
                    height: 1px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 5px;
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    background: #d3d3d3;
                }
                &::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 5px;
                    background: #EDEDED;
                }
            }
        }
    }
    footer{
        width: 100%;
        height: 52px;
        // line-height: 20px;
        font-size: 14px;
        color: #F95759;
        padding-top: 16px;
        border-top: 1px solid #E5E5E5;
        cursor: pointer;
        &.allow{
            // color: #aaaaaa;
            // cursor: default;
            
            color: white;
            background: #ff6264;
            cursor: pointer;
        }
    }
}
</style>
