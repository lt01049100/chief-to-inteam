import Vue from 'vue'
import Router from 'vue-router'
import { TagChatView, TagProjectView, TagOrganizationView } from './components'

// children view
// import RecentList from './components/common/recentList' //最近列表
// import MembersList from './components/common/membersList' //成员列表
// import GroupsChatsList from './components/common/groupsChatsList' //群聊列表
// import ProjectsChatsList from './components/common/projectsChatsList' //任务组群聊列表
// import ProjectsGroupsList from './components/common/projectsGroupsList' //任务组列表
// import TasksGroupsList from './components/common/tasksGroupsList' //任务分组列表
// import TasksList from './components/common/tasksList' //任务列表

Vue.use(Router)

const routes = [
  {
    path: '/tagChat',
    name: 'tagChat-view',
    meta: {
        title: '分享到聊天',
        // requireAuth: false,
    },
    component: TagChatView
  },
  {
    path: '/tagProject',
    name: 'personal-view',
    meta: {
        title: '分享到任务组',
    },
    component: TagProjectView,
  },
  // {
  //   path: '/tagOrganizationProject',
  //   name: 'organization-view',
  //   meta: {
  //       title: '分享到机构任务组',
  //   },
  //   component: TagOrganizationView,
  // },
  {
    path: '*',
    redirect: { path: '/tagChat' }
  }
]

const router = new Router({
  history: true,
  root: '/',
  saveScrollPosition: true,
  routes
});

export default router