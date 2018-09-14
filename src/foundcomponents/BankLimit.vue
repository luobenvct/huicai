<template>
    <div class="coupons">
        <div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            支持银行及限额
        </div>
        <div class="into_box">仅支持储蓄卡，暂不支持信用卡<br>具体金额以实际限额为准</div>
        <div class="supp_sty" v-for="item in items" v-show="item.way!='closed'">
            <img class="sty_img" :src="item.src">
            <div class="sty_name" v-text="item.name">工商银行</div>
            <div class="sty_into">(单笔{{item.fuiou_s | money}},单日{{item.fuiou_d | money}},单月{{item.fuiou_m | money}})
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'

export default {
  name: 'coupons',
  data () {
    return {
        items : []
    }   
  },
  computed: {
    rootBase(){
      return store.getters.getRootBase;
    }
  },
  components:{
    
  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    bankFun (){
        var _self = this;
        axios.post(this.rootBase+'/account/operation_resource/common/bank_limit')
        .then(res =>{
            console.log("v2获取银行卡限额")
            console.log(res.data.result)
            res.data.result.forEach(function(item){
                item.src="https://static.88huicai.com/huicai/image/bank/"+item.icon
            })
             _self.items = res.data.result;
        })
        .catch(res =>{
            console.log(res);
        })
        
    }
  },
  filters :{
    money (val){
       var moneynum;
      if (val == "") {
        moneynum = "不限"
        return moneynum
      }else{
         moneynum = val/10000;
        return moneynum+"万";
      }
    }
  },
  created: function () { 
    this.bankFun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
  width: 100%;
  overflow: hidden;
}
.nav_box{
    width: 100%;
    position: fixed;
    top: 0;
    left:0;
    height:40px;
    line-height: 40px;
    background-color:#fff;
    text-align: center;
    color: #000; 
    z-index: 100;
    border-bottom: solid 1px #eee;
}

.returns_box{
    position: absolute;
    top: 0;
    left: 0;
    width:40px;
    height:40px;
    background: url(../assets/img/Back_icon.png) no-repeat center;
    background-size: 18px;
}
.into_box{
    width:100%;
    padding: 15px 30px;
    border-bottom: solid 1px #e5e5e5;
    color:#acb2b8;
    font-size: 12px !important;
    line-height: 20px;
    background: url(../assets/img/buyin02.png) no-repeat 20px 22px;
    background-size: 6px;
    margin-top: 40px;
}
.supp_sty{
    width:100%;
    line-height: 50px;
    border-bottom: solid 0.5px #e5e5e5;
    overflow: hidden;
}
.sty_img{
    margin-left: 15px;
    width: 20px;
    display: inline-block;
    vertical-align: middle;
}
.sty_name{
    display: inline-block;
    margin-left: 5px;
    font-size: 15px;
    position: relative;
    color: #203542;
}
.sty_into{
    line-height: 22px;
    margin-left: 15px;
    margin-top: -14px;
    margin-bottom: 5px;
    font-size: 12px;
    color: #bec3c7;
}
.sty_span{
    width: 100%;
  font-size: 12px;
  color: #bec3c7;
  line-height: 16px;
  margin-bottom: 10px;
  overflow:hidden;
  clear:both;
}
.left_one{
float:left; 
margin-left:15px;   
}
.left_two{
  float:right;
  margin-right:15px;
}
   
    


</style>
