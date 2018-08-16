<template>
    <div class="tagChat-view">
        <div class="header-nav">
            <div :class="[isRecent? 'active': '', 'nav-handler']" @click="getRecents" >最近聊天</div>
            <div :class="[isMember? 'active': '', 'nav-handler']" @click="getMembers" >新私信</div>
            <div :class="[isGroupChat ? 'active': '', 'nav-handler']" @click="getGroupsChats" >新群聊</div>
        </div>
        <search :match="match"></search>
        <div v-if="!isOnLoading" class="itemslists">
            <ul class="items-list cont-scrollbar" v-if="isRecent">
                <div v-if="recentsFilter.length">
                    <select-cell v-for="(item, index) in recentsFilter" :key="index" :typeSwitch="'recent'" :item="item" @select="selectItemEvent"></select-cell>
                </div>
                <div v-else>没数据</div>
            </ul>
            <ul class="items-list cont-scrollbar" v-if="isMember">
                <div v-if="membersFilter.length">
                    <select-cell v-for="(item, index) in membersFilter" :key="index" :typeSwitch="'member'" :item="item" @select="selectItemEvent"></select-cell>
                </div>
                <div v-else>没数据</div>
            </ul>
            <ul class="items-list cont-scrollbar" v-if="isGroupChat">
                <div v-if="groupsChatsFilter.length">
                    <select-cell v-for="(item, index) in groupsChatsFilter" :key="index" :typeSwitch="'groupChat'" :item="item" @select="selectItemEvent"></select-cell>
                </div>
                <div v-else>没数据</div>
            </ul>
        </div>
        <div v-else class="itemslists">
            <loading />
        </div>
        <footer @click="postSelectedItems" :class="isAllow? 'allow': ''" >发送</footer>
    </div>
</template>
<script>
import { 
    userAPI,
    recentsAPI,//获取最近列表
    membersAPI,//获取成员列表
    groupsChatsAPI,//获取群聊列表
    chatRoomAPI,//获取聊天房间
    chatMessageAPI,//发送聊天信息
    store,
    bus,
} from "./../../services";

import Loading from "./../common/loading";
import Search from "./../common/search";

// 选中
import SelectCell from "./../common/selectCell";

export default {
    data () {
        return {
            device: 'chatRecent',
            isOnLoading: true,
            isRecent: false,
            isMember: false,
            isGroupChat: false,
            recentsList: [],
            membersList: [],
            groupsChatsList: [],
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
    },
    computed:{
        recentsFilter() {
            let res = new RegExp(this.searchKey)
            return this.recentsList.filter(item =>{
                return item.name.match(res)
            })
        },
        membersFilter() {
            let res = new RegExp(this.searchKey)
            return this.membersList.filter(item =>{
                return item.name.match(res)
            })
        },
        groupsChatsFilter() {
            let res = new RegExp(this.searchKey)
            return this.groupsChatsList.filter(item =>{
                return item.name.match(res)
            })
        },
    },
    mounted() {
    },
    created(){
      this.getRecents()
    },
    methods: {
        init() {
            this.isOnLoading = true
            this.isRecent = false,
            this.isMember = false,
            this.isGroupChat = false,
            this.recentsList = [],
            this.membersList = [],
            this.groupsChatsList = [],
            this.isAllow = false
        },
        match(searchKey) {
            this.searchKey = searchKey
        },
        toggleDevice(state) {
            console.log('toggleDevice: '+state)
            this.device = state
        },
        getRecents() {
            this.init()
            this.isRecent = true
            let that = this
            recentsAPI.getRecents()
            .then(recents => {
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    recents.forEach( item => {
                        if (item._id === user._id) return
                        that.recentsList.push(item)
                    });
                    // console.log('this.recentsList')
                    // console.log(JSON.stringify(that.recentsList))
                    that.isOnLoading = false
                })
            })
        },
        getMembers() {
            this.init()
            this.isMember = true
            membersAPI.getMembers()
            .then(members => {
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    members.forEach( item => {
                        if (item._id === user._id) return
                        this.membersList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        getGroupsChats() {
            this.init()
            this.isGroupChat = true
            groupsChatsAPI.getGroupsChats()
            .then(groupsChats => {
                // console.log('this.groupsChats')
                // console.log(JSON.stringify(groupsChats))
                userAPI.getUser()
                .then(user => {
                    store.state.user = user
                    groupsChats.forEach( item => {
                        if (item._id === user._id) return
                        this.groupsChatsList.push(item)
                    });
                    this.isOnLoading = false
                })
            })
        },
        selectItemEvent() {
            // console.log('store.state.selectedItem1: ')
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
            // console.log('_info: '+_info)
            if (selectedItems.size <= 0) return
            selectedItems.forEach((obj, index) => {
                let chatRoomType = null
                if (this.isRecent) {
                    chatRoomType = chatRoomAPI.getRoomByUser
                    if (obj.avatarUrl) {
                        chatRoomType = chatRoomAPI.getRoomByUser
                    }else {
                        chatRoomType = chatRoomAPI.getRoomByGroupChat
                    }
                } else if(this.isMember) {
                    chatRoomType = chatRoomAPI.getRoomByUser
                } else if(this.isGroupChat) {
                    chatRoomType = chatRoomAPI.getRoomByGroupChat
                }
                // 获取房间id
                // console.log('store.state.user._id: '+store.state.user._id)
                if (this.isAllow) {
                    chatRoomType(obj._id)
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

            })
        },
    }
}
</script>
<style lang="less">
.tagChat-view{
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
        .items-list{
            flex: 1;
            overflow-y: auto;
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
