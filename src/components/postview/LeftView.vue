<template>
    <div class="left-view">
        <div class="tab-list">
            <router-link v-for="(item, index) in items" :key="index"  class="tab-cell" :to="item.path" >
                <!-- <span :class="['icon', item.icon]"></span> -->
                <Icon class="post-icon" :type="item.icon" />
                <span class="post-type">{{item.type}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            items: [
                { type: '分享给聊天', icon: 'ios-chatboxes-outline', path: '/tagChat' },
                { type: '分享给任务组', icon: 'ios-browsers-outline', path: '/tagProject' },
                // { type: '分享给机构任务组', icon: 'ios-browsers-outline', path: '/tagOrganizationProject' },
            ]
        }
    }
}
</script>

<style lang="less">
.left-view{
    flex: 1;
    // height: 100%;
    color: #888888;
    
    // 定义一个变量
    .align {
      top: 0;
      bottom: 0;
      margin: auto 0;
    }

    .tab-list {
        // position: absolute;
        // top: 0;
        // left: 0;
        // width: 200px;
        width: 100%;
        // height: 100%;
        // border-right: 1px solid #e5e5e5;

        padding: 0;
        margin: 0;
        .tab-cell {
            display: block;
            position: relative;
            color: #808080;
            font-size: 14px;
            line-height: 58px;
            width: 100%;
            height: 58px;
            border-bottom: 1px solid #f7f7f7;
            text-align: left;
            .post-icon {
                // position: absolute;
                // height: 20px;
                // left: 20px;
                // .align()
                display: inline-block;
                vertical-align: middle;
                font-size: 20px;
                padding-left: 20px;
            }
            .post-type {
                // position: absolute;
                // height: 20px;
                // left: 50px;
                // .align()
                display: inline-block;
                vertical-align: middle;
            }
            &:hover {
                color: #F95759;
            }
            &.router-link-active {
                color: #F95759;
                background-color: #f7f7f7;
                cursor: pointer;
                &::before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    content: '';
                    width: 3px;
                    border-left: 3px solid #ff8486;
                }
            }
        }
    }
}
</style>
