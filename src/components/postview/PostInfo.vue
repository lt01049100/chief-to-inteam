<template>
    <div class="post-info">
        <Row>
        <Col span="4">
            <div class="Icon">
                <Icon class="img" type="ios-paper"></Icon>
                <!-- <Icon class="img" type="ios-document-outline"></Icon> -->
            </div>
        </Col>
        <Col span="20">
            <div class="title">{{info.content}}</div>
            <div class="url">{{info.link}}</div>
        </Col>
        </Row>
        <Row>
        <Col span="24">
            <Input style="margin-top:10px;" v-model="valueDescribe" type="textarea" :rows="3" placeholder="描述信息..." @on-change="changeDescribe" />
        </Col>
        </Row>
    </div>
</template>

<script>
import { store } from './../../services'
import config from './../../config'

export default {
    data () {
        return {
            info: {},
            valueDescribe: '',
        }
    },
    mounted() {
    },
    created(){
      this.getInfo()
    },
    methods: {
        getInfo() {
            // console.log('getInfo:')
            // console.log(this.$route.query)
            // setTimeout(()=>{
                if (this.$route.query.content&&this.$route.query.link&&this.$route.query.client_id) {
                    let _link = this.$route.query.link.replace(/(\"|\')/g,"")
                    this.info = {
                        'content': this.$route.query.content.replace(/(\"|\')/g,""),
                        'link': _link,
                        'authUrl': `${config.host}/pdmi/app/authorize?next_url=${encodeURIComponent(_link)}`,
                        'client_id': this.$route.query.client_id.replace(/(\"|\')/g,""),
                    }
                } else {
                    this.info = {
                        'content': "获取待发送的信息",
                        'link': "https://inteam.hubpd.com/",
                        'authUrl': `${config.host}/pdmi/app/authorize?next_url=${encodeURIComponent("https://inteam.hubpd.com/")}`,
                        'client_id': '666',
                    }
                }
                // this.info = {
                //     title: "获取待发送的信息",
                //     url: "https://inteam.hubpd.com/"
                // }
                // this.$http.get('/api/info/', {
                // }).then((response) => {
                    // this.datavalue = response.data
                // }, (error) => {
                //   // this.$Notice.error({
                //   //   title: error.data.message||'图片上传错误',
                //   //   desc: false
                //   // })
                // })
                // this.$emit('valueDescribe',this.info);
                // console.log("获取待发送的信息: "+ JSON.stringify( this.datavalue))
                this.changeDescribe()
            // },500)
        },
        changeDescribe() {
            // console.log('changeDescribe:'+JSON.stringify(value))
            this.info = Object.assign({},this.info,{"describe":this.valueDescribe})
            // this.$emit('describe',value)
            store.state.info = this.info

        }
    }
}
</script>

<style lang="less">
.post-info{
    padding: 20px 10px;
    border-bottom: 1px solid #e5e5e5;
    .Icon{
        padding-left: 0px;
        text-align: center;
        .img{
            font-size: 32px;
            color: #ff6264;
            margin-left: -10px;
        }
    }
    .title{
        text-align: left;
        font-size: 14px;
        word-wrap : break-word;
        word-break: break-all;
    }
    .url{
        text-align: left;
        font-size: 12px;
        word-wrap : break-word;
        word-break: break-all;
    }
}
</style>
