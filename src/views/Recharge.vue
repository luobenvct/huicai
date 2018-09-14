<template>
  <div class="purchase">
    <div class="top">
      <div @click="returns" class="returns fl">
        <img src="../assets/img/Back_icon.png" height="18" width="11">
      </div>
      <div class="name fl">购买</div>
    </div>
    <div class="purchase01">购买金额
      <input type="text" placeholder="最低1元起" v-model='money' data-in="/^\d*$/" maxlength="10" value="5000"
  onkeyup="value=value.replace(/[^\d]/g,'')">元
    </div>
    <div onclick="activityFun()" class="time_sbox">     
      4 .29-5.7，90天以上产品满额返现以实际支付本金为准，不含使用的现金券金额,详细见活动。
    </div>
    <div class="share_box">
        <div class="share_left">可购份额 <span id="canbuy"></span>元</div>
        <div class="share_right">限额<span id="limit_amount"></span>元</div>
    </div>
    <div class="coupons_box" v-if="has">
        <div class="coupons_left">可使用的现金券</div>
        <div class="coupons_right" @click="fnMore">更多</div>
    </div>
    <div class="coupons_box" v-else>
        <div class="coupons_left">可使用的现金券</div>
        <div class="coupon_sty">多参加活动，多得优惠券</div>
    </div>
     <!--银行卡-->
    <div class="choice_title">选择银行卡</div>
    <div class="choice_sty" id="hhbscb">
        <img class="choice_img" src="../assets/img/puch07.png">
        <div class="choice_name">惠活宝<span class="choice_span">（可用金额<span id="hhbMoney"></span>元）</span></div>
        <div class="choice_tu" :class="{choice_tuone:one}" id="hhbid" text="scb" bank="scb" @click="changeClass01"></div>
    </div>
    <div class="choice_sty" id="hhbscb">
        <img class="choice_img" src="../assets/img/puch07.png">
        <div class="choice_name">惠活宝<span class="choice_span">（可用金额<span id="hhbMoney"></span>元）</span></div>
        <div class="choice_tu" :class="{choice_tuone:two}" id="hhbid" text="scb" bank="scb" @click="changeClass02"></div>
    </div>
    <a class="bind_but">添加银行卡</a>
    <div class="notes_box">注：绑定民生、中信、光大等高额度银行卡收益更高哦！</div>

    
    <div @click="purchase" style="clear:both; width:100%; background:red;">提交订单</div>

    <!--其他优惠劵-->
    <div class="black" v-show="isShow"></div>
    <div class="discount_box" v-show="isShow">
        <div class="discount_title">
              其它优惠券
             <img class="close_img" @click="close_img" src="../assets/img/puch11.png">
        </div>
        <div class="discou_cont" id="discouBox">
        
        </div>
        <div class="confirm_but">确认选择</div>
    </div>
    <div class="Prompt_box">
      <div class="Prompt_title">温馨提示</div>
      <div class="Prompt_cont">您惠活宝中的金额不够，请先购买惠活宝！</div>
      <div class="Prompt_but">
        <div class="Prompt_left">取消</div>
        <div class="Prompt_right">购买惠活宝</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'purchase',
  data () {
    return {
      money:"",
      isTrue:"",
      has:true,
      isShow:false,
      two:false,
      one:true
    }
  },
  components:{

  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    purchase(){
      if(this.money <1000){
        alert("1000元起投")
      }else{
        alert("进入到支付界面")
      }
    },
    close_img(){
      this.isShow = false
    },
    fnMore(){
      this.isShow = true
    },
    changeClass01(){
      this.one = true;
      this.two = false
    },
    changeClass02(){
      this.two = true;
      this.one = false
    }
  },
  mounted(){
    
  }, 
  computed:{

  },
  watch:{
    money(curVal,oldVal){
      if(curVal < 1000){
        setTimeout(()=>{
            
        },500)
      }
      //console.log(curVal,oldVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl{
  float: left;
}
.fr{
  float: right;
}
input{
  border: none;
}
.login{
  width: 100%;
  background: #CCC;
  padding-bottom: 460px;
}
.top{
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
}
.top .returns{
  margin-left: 2%;
  margin-right: 40%;
}
.purchase01{
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  font-size: 12px;
}
.purchase01 input{
  margin-left: 10px;
  width:66%;
}
.time_sbox {
  width: 100%;
  overflow: hidden;
  padding: 10px 15px 0 36px;
  color: #3ca8ee;
  font-size: 12px;
  background: #f5f5f9 url(../assets/img/puch15.png) no-repeat 15px 12px;
  background-size: 15px;
}
.share_box{
  width:100%;
  overflow: hidden;
  height: 28px;
  line-height: 28px;
  background-color: #f5f5f9;
  font-size: 12px;
}
.share_left{
  float:left;
  margin-left: 15px;
  color:#acb2b8;
}
.share_right{
  float:right;
  margin-right: 15px;
  color:#acb2b8;
}
.coupons_box{
    width: 100%;
    overflow: hidden;
    color:#6e7375;
    line-height: 40px;
    margin-top: 10px;
}
.coupons_left{
    float: left;
    margin-left:15px;
    padding-left: 22px;
    background: url("../assets/img/puch02.png") no-repeat left;
    background-size: 15px 14px;
}
.coupons_right{
    margin-right:15px;
    float: right;
    padding-right: 12px;
    background: url("../assets/img/puch03.png") no-repeat right;
    background-size: 7px 12px;
}
.coupon_box{
    width:90%;
    margin-left: 6%;
    overflow: hidden;
}
.coupon_sty{
    clear: both;
    float: left;
    width: 60%;
    margin-left: 20%;
    height: 66px;
    background: url("../assets/img/puch14.png") no-repeat right;
    background-size: 100% 100%;
    margin-top: 15px;
    color:#d8dadb;
    overflow:hidden;
}
.black{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.4;
}
.discount_box{
  width:90%;
  height: 400px;
  background-color: #ffffff;
  overflow: hidden;
  position: fixed;
  top:50%;
  left: 5%;
  margin-top: -200px;
  border-radius: 5px;
}
.discount_title{
  width:100%;
  text-align: center;
  color:#203542;
  font-size: 16px;
  line-height: 40px;
  position: relative;
  border-bottom: solid 1px #e5e5e5;
}
.close_img{
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  top:12px;
}
.discou_cont{
  width:100%;
  overflow: hidden;
  height: 290px;
  padding-top: 10px;
  overflow-y: scroll;
}
.confirm_but{
  width: 80%;
  line-height: 40px;
  color:#ffffff;
  font-size: 18px;
  text-align: center;
  background-color: #ff6c39;
  margin: auto;
  border-radius: 5px;
  margin-top: 15px;
}
.dis_sty{
  width:100%;
  overflow: hidden;
  line-height: 50px;
}
.dis_cont{
  float: left;
  margin-left: 15px;
  color:#ff6c39;

}
.dis_num{
  font-size: 24px;
}
.dis_unit{
  font-size: 15px;
}
.dis_zhu,.dis_no{
  font-size: 12px;
  color:#203542;
}

.tip_into{
  width:86%;
  height: 56px;
  position: fixed;
  bottom: 40%;
  left: 7%;
  border-radius: 6px;
  text-align: center;
  line-height: 56px;
  color: #ffffff;
  font-size: 14px;
  display:none;
  z-index:99999;
}
.tip_posi{
  opacity: 0.5;
  background-color: #000000;
}
.option_box{
  width:100%;
  overflow:hidden;
  border-top: 12px solid #f5f5f9;
  padding:10px 0;
}
#runingLayout {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  color: white;
  text-align: center;
  line-height: 300px;
  display: none;
}
.Prompt_box{
  position:fixed;
  top:50%;
  left:10%;
  width:80%;
  background-color:#fff;
  border-radius:8px;
  margin-top:-75px;
  overflow:hidden;
  height:149px;
  display:none;
}
.Prompt_title{
  width:100%;
  line-height:44px;
  text-align:center;
  font-size: 16px;
  font-weight:bold;
}
.Prompt_cont{
  width: 80%;
  margin: auto;
  line-height: 22px;
  text-align: center;
  height: 64px;
}
.Prompt_but{
  width:100%;
  overflow:hidden;
  border-top:solid 1px #ebecec;
  line-height:40px;
}
.Prompt_left{
  width:50%;
  float:left;
  text-align:center;
  color: #5fb7f2;
}
.Prompt_right{
  width:50%;
  float:left;
  text-align:center;
  color: #5fb7f2;
  border-left: solid 1px #ebecec;
}
.choice_title{
  width: 100%;
  line-height: 50px;
  border-top: solid 12px #f5f5f9;
  margin-top: 20px;
  padding-left: 39px;
  color: #6e7375;
  background: url("../assets/img/puch06.png") no-repeat 15px;
  background-size: 17px 13px;
}
.choice_sty,.option_sty{
  width: 100%;
  overflow: hidden;
  line-height: 50px;
}
.choice_sty:hover,.option_sty:hover{
  background-color:#eee;
}
.choice_img{
  width: 18px;
  float: left;
  margin-left: 15px;
  margin-top: 16px;
}
.choice_name{
  float: left;
  margin-left: 10px;
  font-size: 16px;
  color:#41404a;
}
.choice_span{
  color:#acb2b8;
  font-size: 12px;
}
.choice_tu,.dis_tu,.option_tu{
  float: right;
  margin-right: 15px;
  width: 20px;
  height: 20px;
  margin-top: 15px;
  background: url("../assets/img/xuan02.png") no-repeat center;
  background-size: 100% 100%;
}

.choice_tuone,.dis_tuone,.option_tuone{
  background-image: url("../assets/img/xuan01.png");
}
.bind_but{
  display: block;
  width: 100%;
  line-height: 44px;
  color: #ff6c39;
  font-size: 15px;
  margin: 15px auto 4px;
  background: url(../assets/img/puch12.png) no-repeat 15px center,url(../assets/img/puch03.png) no-repeat 93% center;
  background-size: 18px 18px,7px 12px;
  padding-left: 40px;
  border-top: 12px solid #f5f5f9;
}
.bind_but:hover{
  color:#ff6c39;
  text-decoration:none;
}
.notes_box{
  font-size: 12px;
  color:#b6b5b5;
  width: 100%;
  text-align: center;
  padding-bottom: 30px;

}
.posi_box{
  width:100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 15px;
  border-top: solid 1px #e5e5e5;
  background-color: #fff;
}
</style>
