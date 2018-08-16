<template>
<div ref="hintsuccess" class="hintdiv hintsuccess show" :class="{'show':showhint}">
  <div class="sub post-success-view">
    <Row type="flex" align="middle">
      <Col span="4"><div class="marks"><Icon class="icon-view" type="checkmark"></Icon></div></Col>
      <Col span="20">
        <div class="title">分享成功</div><div class="describe" v-show="target" >已分享至 {{target}}</div>
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
        target:'',
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
        store.state.selectedItem.forEach((obj, index) =>{
          console.log(obj.name,obj.content, obj._id)
          this.target = obj.name||obj.content
        })
        // this.target = store.state.targetName
        // this.$refs.hintsuccess.className="hintsuccess show";
        setTimeout(() => {
          this.hideModal()
        }, this.duration);
      },
      hideModal() {
        bus.$emit('successful', false)
      }
    }
  }

</script>
<style lang="less">
.hintdiv.hintsuccess{
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
    // right: 2%;
    opacity: 1;
  }
  .post-success-view{
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
      
      background: greenyellow;
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
