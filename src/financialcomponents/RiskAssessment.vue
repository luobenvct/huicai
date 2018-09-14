<template>
    <div class="coupons">
       <div class="top">
            <div @click="returns" class="returns fl">
                <img src="../assets/img/Back_icon.png" height="18" width="11">
            </div>
            <div class="name fl">风险评估</div>
        </div>
        <div>
            <div class="risk_clear">
                <div class="risk_text">根据借款人申报的借款人基本信息和项目基本信息，经我平台在授权的能力范围内通过第三方公开渠道对借款人涉诉情况和受到行政处罚并可能影响还款情况进行查询，本项目风险评估结果如下：</div>
                <div class="risk_level">
                    <div>资产等级</div>
                    <div class="risk_level_value">优</div>
                    <div>风险较低</div>
                    <div class="risk_tip">适合风险测评结果为<span>保守型</span>、<span>稳健型</span>、<span>进取型</span>用户投资</div>
                </div>
                <div class="risk_tip_two">*根据平台目前质保金余额，出借本项目的本金和利息可能会受到借款人还款情况的影响</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  	name: 'coupons',
  	data () {
	    return {
	        
	    }   
  	},
  	components:{
    
  	},
  	methods:{
	    returns(){
	      this.$router.go(-1);
	    }
  	},
    mounted() { 
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .returns_box{
        position: absolute;
        top: 0;
        left: 0;
        width:40px;
        height:40px;
        background: url(../assets/img/back00.png) no-repeat center;
        background-size: 12px;
    }
    ul,li{
        padding:0;
        margin:0;
        list-style: none;
    }
    .fl{
      float: left;
    }
    .fr{
      float: right;
    }
    .top{
      width: 100%;
      padding: 4px 0;
      overflow: hidden;
      background: #3ca8ee;
      color: #FFF;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
    }
    .top .name{
      font-size: 16px;
      margin-top: 5px;
    }
    .top .returns{
      margin-left: 2%;
      margin-right: 36%;
      margin-top: 8px;
    }
    .risk_clear{
        clear: both;
        padding: 10px;
        color: rgb(172,178,184);
        letter-spacing: 1px;
        padding-top: 70px;
        overflow: hidden;
        background: rgb(244,244,249);
        font-size: 14px;
    }
    .risk_head{
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin-bottom: 12px;
    }
    .risk_text{
        font-size: 14px;
    }
    .risk_level{
        width: 100%;
        text-align: center;
        padding-top: 32px;
        padding-bottom: 12px;
        background: #FFF;
        margin-top: 30px;
        margin-bottom: 20px;
       /* border:1px solid #CCC;*/
    }
    .risk_level_value{
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 30px;
        color: rgb(60,168,238);
    }
    .risk_tip{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .risk_tip span{
        color: rgb(255,108,57);
    }
    .risk_tip_two{
        margin: 10px 0;
        overflow: hidden;
        font-size: 14px;
    }
</style>
