<template>
<div ref="hintfail" class="hintdiv hintfail" :class="{'show':isShow}">
  <div class="post-fail-view">
    <Row type="flex" align="middle">
      <Col span="4"><div class="marks"><Icon class="icon-view" type="close"></Icon></div></Col>
      <Col span="20">
        <div class="title">分享失败</div>
      </Col>
    </Row>
    <span class="cancel" @click='hideModal'><Icon class="iconcancel" type="close"></Icon></span>
  </div>
</div>
</template>
<script>
  import { bus, store } from './../../services'

  export default {
    props: {
      isShow:{
        type: Boolean,
        default: false
      },
      duration:{
        type: Number,
        default: 2000
      },
    },
    data() {
      return {
        logo: require('./../../assets/placeholder.png'),
        showhint:false,
      }
    },
    watch: {},
    created(){
      this.init()
    },
    beforeDestroy() {},
    methods: {
      init() {
        this.showhint = this.isShow
        // this.target = store.state.targetName
        // this.$refs.hintsuccess.className="hintsuccess show";
        setTimeout(() => {
          this.hideModal()
        }, this.duration);
      },
      hideModal() {
        bus.$emit('fail', false)
      }
    }
  }

</script>
<style lang="less">
.hintdiv.hintfail{
  display: block;
  position: absolute;
  bottom: 10%;
  right: -300px;
  background: #383838;
  border-radius: 4px;
  box-shadow: 0px 4px 10px #383838;
  transition: all 0.5s ease 0s;
  opacity: 0;
  &.show{
    display: block;
    right: 2%;
    opacity: 1;
  }
  .post-fail-view{
    position: relative;
    width: 300px;
    padding: 10px;
    text-align: left;
    .marks{
      width: 34px;
      height: 34px;
      line-height: 38px;
      border-radius: 100%;
      text-align: center;
      
      background: #ff6264;
      color: white;
      .icon-view{
        width: 20px;
        height: 20px;
        color: white;
        font-size: 18px;

      }
    }
    .title{
      color: white;
      font-size: 16px;
    }
    .describe{
      color: #cfcfcf;
      font-size: 12px;
    }
    .cancel{
      position: absolute;
      right: 10px;
      top: 5px;
      width: 10px;
      height: 10px;
      cursor: pointer;
      .iconcancel{
        color: white;
      }
    }
  }
}
</style>
<script>
  import { bus } from './../../services'

  export default{
    data(){
      return{
        msg:'hello vue'
      }
    },
    components:{
    },
    methods: {
      hideModal() {
        bus.$emit('fail', false)
      }
    }
  }

</script>
