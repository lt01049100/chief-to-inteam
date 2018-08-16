# module-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
"# test" 

#接口使用说明：

## 获取发送者信息
/api/users/me》》_id、name、avatarUrl


## 发送给最近联系人

### 1、获取最近
/api/rooms/recent-users 》》_id、name、avatarUrl
### 2、获取房间id
/api/rooms/users/5847f1a525d9df8e2b87e87f?_bindToObjectId=0&count=30&page=1》》_id
### 3、提交
/api/rooms/5b51b0d6152d6b0911ee1d5d/activities》》
    attachments:[]
    boundToObjectType:"room"
    content:"XXXXXXXXXXXXXXXXXXX"
    created:""
    mentions:{}
    objectType:"ChatMessage"
    updated:""
    _boundToObjectId:"5b51b0d6152d6b0911ee1d5d" // 接收者id
    _creatorId:"5849021425d9df8e2b87e8e2"  //发送者id


## 发送给私信

### 1、获取组织id
/api/pdmi/orgs》》_id
### 2、获取成员
/api/v2/organizations/5a3d2f99526750e2eb0c6595/members?boundToObjectType=organization&_boundToObjectId=5a3d2f99526750e2eb0c6595&all=true&_organizationId=5a3d2f99526750e2eb0c6595
》》_id、name、avatarUrl
### 3、获取房间id
/api/rooms/users/5847f1a525d9df8e2b87e87f?_bindToObjectId=0&count=30&page=1》》_id
### 4、提交
/api/rooms/5b51b0d6152d6b0911ee1d5d/activities》》
    attachments:[]
    boundToObjectType:"room"
    content:"XXXXXXXXXXXXXXXXXXX"
    created:""
    mentions:{}
    objectType:"ChatMessage"
    updated:""
    _boundToObjectId:"5b51b0d6152d6b0911ee1d5d" // 接收者id
    _creatorId:"5849021425d9df8e2b87e8e2"  //发送者id


## 发送给群聊

### 1、获取群聊id
/api/groups》》 _id、name、logo
### 2、获取房间id
/api/rooms/groups/5b612183ce8e4bbd767f4c3a?_bindToObjectId=0&count=30&page=1》》_id
### 3、提交
/api/rooms/5b612165152d6b0911ee22cc/activities》》
    attachments:[]
    boundToObjectType:"room"
    content:"XXXXXXXXXXXXXXXXXXX"
    created:""
    mentions:{}
    objectType:"ChatMessage"
    updated:""
    _boundToObjectId:"5b612165152d6b0911ee22cc" // 接收者id
    _creatorId:"5849021425d9df8e2b87e8e2"  //发送者id


## 发送给任务组群聊

### 1、获取任务组
/api/projects》_id、name、logo
### 2、获取任务组房间id
/api/rooms/projects/58483c483dfad66d3308a361?_bindToObjectId=0&count=30&page=1》》_id
### 3、提交
/api/rooms/58483c5c87849b042e33a64e/activities
    attachments:[]
    boundToObjectType:"room"
    content:"222"
    created:""
    mentions:{}
    objectType:"ChatMessage"
    updated:""
    _boundToObjectId:"58483c5c87849b042e33a64e" // 接收者id
    _creatorId:"5849021425d9df8e2b87e8e2"  //发送者id


## 发送给任务

### 1、获取任务组
#### 个人任务组
/api/projects》_id、name、logo

#### 机构任务组
/api/organizations》_id、name、logo
/api/organizations/5a3d2f99526750e2eb0c6595（本项目不用）
/api/projects?_organizationId=5a3d2f99526750e2eb0c6595

### 2、获取任务分组
/api/tasklists?_projectId=58483c483dfad66d3308a361》》hasStages._id、name（本项目不用）
/api/tags?_projectId=5899236372546f40da467a78》》_id、name（本项目不用）
/api/tasklists?_projectId=5899236372546f40da467a78》》_id、title、hasStages._id、name

#### 获取阶段
/api/stages?_tasklistId=58992363140ac540b69dc780

### 3、获取任务(未完成）
/api/stages/58483c483dfad66d3308a371/tasks?isDone=false&withInvolves=true&count=20&page=1&_stageId=58483c483dfad66d3308a371（本项目不用）
》》_id、content（本项目不用）
### 4、获取任务(已完成 isLocked:true）
/api/stages/58483c483dfad66d3308a371/tasks?isDone=true&withInvolves=true&count=20&page=1&_stageId=58483c483dfad66d3308a371（本项目不用）
》》_id、content（本项目不用）


### 5、提交
/api/tasks/59deb6e89ca16a3fa5f525bc/activities
    attachments:[]
    content:"XXXXXXXXXXXX"
    mentions:{}

/api/stages/5b74d3edf08a403e48b27db5/tasks?isDone=false&withInvolves=true&count=20&page=1&_stageId=5b74d3edf08a403e48b27db5
/api/stages/5b74d3edf08a403e48b27db6/tasks?isDone=false&withInvolves=true&count=20&page=1&_stageId=5b74d3edf08a403e48b27db6