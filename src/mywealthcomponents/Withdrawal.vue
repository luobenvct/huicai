<template>
	<div>
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="18">
			</div>
			<div class="name fl">提现</div>
		</div>
		<div class="main">
			<div class="topbox">
				<div class="puch_title">
					<div class="puch_name">提现金额</div>
					<input class="puch_input" id="puch_money" type="text" v-model="losemoney" placeholder="最低1元起" :class="{puch_monone:nullShow}">
					<div class="puch_right">元</div>
				</div>
			</div>
			<div class="middle">
				<div class="middle01">可提金额 <span>{{availableBalance}}</span> 元</div>
				<div class="middle02"><!-- 注;当日充值,次日方可提现; -->提现T+1到账(节假日顺延)</div>
			</div>
			<!--银行卡-->
			<div class="choice_title">选择银行卡</div>
			<div class="choice_sty" v-for="item in items" @click="oncelse(item)">
				<img class="choice_img" v-bind:src="item.src">
				<div class="choice_name">{{item.bankName}}<span class="choice_span">（尾号 {{item.tailnum}}）</span></div>
				<div class="choice_tu" :class="{choice_tuone:chioceid ==item.id}"></div>
			</div>
			<div class="posi_box">
				<div class="food_but" @click="purchaseClick">提现</div>
			</div>
			
			<div id="runingLayout" v-show="runingLayout">提现中,请稍等...</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
	return {
		losemoney:'',     			// 金额
		nullShow : false,  			//金额字体大小
		items:[],
		availableBalance : 0, 		//提现金额
		dealPassword : '',     		//交易密码
		businessBox : false,
		passagType : "UNINONPAY",   //通道type
		nextnum : 1,
		chioceid : '',				//选择之后银行卡id字段
		selectlist: {},
		runingLayout:false,      	//显示提现中，请等待字段
		token :''
	}
  },
  watch:{
	losemoney (val){
		if(val!==''){
			this.nullShow = true;
			//先把非数字的都替换掉，除了数字和. 
			var textval = val.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			//console.log(textval)
			if(textval==0){
				textval = ''
			}
			this.losemoney = textval;
			if(this.losemoney>Number(this.availableBalance)){
				this.$toast('最多可提现'+this.availableBalance+'元')
				this.losemoney = this.availableBalance.toString();
				return;
			}
		}else{
			this.nullShow = false;
		}
	},	
  },
  methods:{
  	/*返回--事件*/
	returns(){
	  this.$router.go(-1);
	},
	/*选择银行卡*/
	oncelse (item){
		console.log(item);
		this.chioceid = item.id;
		this.selectlist = item;
	},
	/*获取银行卡列表--事件*/
	newnotice (){
		/*银行卡*/
		axios.post('/api/get_my_bank_card.htm',{
			app_token : this.token ||''
		})
		.then(res=>{
			if(res.data.code=="TOKEN_ERROR"){
				this.$toast('用户信息失效');
				return;
			}
			if(res.data.length==0){
				this.$toast('请先绑定银行卡！')
				return;
			}
			res.data.forEach((item)=>{
					item.src = "https://static.88huicai.com/huicai/image/bank/"+ HC.imgFun(item.bankName);
					item.tailnum = item.bankCardNo.substring(item.bankCardNo.length-4,item.bankCardNo.length);
				})
			this.items = res.data;
			this.chioceid = res.data[0].id;
			this.selectlist = res.data[0];
		})
		
		/*钱包*/
		axios.post('/api/financing_target_bid/withdraw_able_amount.htm',{
			app_token : this.token ||''
		})
		.then(res=>{
			if(res.data.code == "SUCCESS"){
				this.availableBalance = (Number(res.data.principal) + Number(res.data.totalProfit)).toFixed(2);
			}else if(res.data.code=="TOKEN_ERROR"){
				this.$toast('用户信息失效')
			}else{
				this.$toast(res.data.msg)
			}
			
		})
	},
	/*惠活宝提现--事件*/
	purchaseClick (){
		if(this.losemoney==''){
			this.$toast("请输入提现金额")
			return;
		}
		if(this.losemoney<1){
			this.$toast("最低提现1元")
			return;
		}
		this.runingLayout = true;
		axios.post('/api/sui_cun_bao_withdraw.htm',{
			t : new Date(),
			withdrawAmount : this.losemoney,
			isTry : false,
			userBankId : this.selectlist.id,
			app_token : this.token
		})
		.then(res=>{
			this.runingLayout = false;
			if(res.data.code == "SUCCESS"){				
				this.$router.push({path:'/withdrawalsuccessful'})
			}else if(res.data.code=="TOKEN_ERROR"){
				this.$toast('用户信息失效')
			}else if (res.data.code == "AMOUNT_ERROR") {
				this.$toast('请最少提现1元')
			} else if (res.data.code == "NOT_HAS_ENOUGH_MONEY") {
				this.$toast('金额不足')
			} else {
				this.$toast(res.data.code)
			}
		})
	}   
  },
  components:{
	
  },
  computed: {
	
  },
  mounted(){
  	this.token = HC.getStorage('sessionToken')
	this.newnotice();
  },
  filters:{
	
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
.clear{
	clear: both;
}
.color01{
	color: red;
}
.color02{
	color: #ff6c39;
	margin-right: 10px;
}
.top{
	width: 100%;
	padding: 10px 0;
	overflow: hidden;
	background: #fff;
	color: #000;
	border-bottom: solid 1px #eee;
}
.top .name{
	margin-left: 10%;
}
.top .returns{
	margin-left: 2%;
	margin-right: 30%;
}
input{
  outline:none;
  -webkit-user-select:auto;  
}
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
    font-size: 14px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999;
    font-size: 14px;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999;
    font-size: 14px;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999;
    font-size: 14px;
}
.fl{
	float:left;
} 
.fr{
	float:right;
} 
.clear{
	clear:both;
	height:0;
}


.topbox{
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid #ccc;

}
.puch_title{
	width: 100%;
	position: relative;
	font-size: 16px;
	color:#3e484f;
	margin: 20px 0;
}
.puch_name{
	width:24%;
	float: left;
	padding-left: 4%;
	line-height: 44px;
}
.puch_input{
	border: none;
	float: left;
	width: 58%;
	padding-left: 10px;
	height: 44px;
	line-height: 44px;
	font-size: 12px;
	margin-bottom: 10px;
}
.puch_right{
	float: left;
	width: 10%;
	line-height: 44px;
}
.middle{
	overflow: hidden;
}
.middle01{
	margin-left: 5%;
	margin-top: 10px;
	margin-bottom: 15px;
}
.middle02{
	margin-left: 5%;
	font-size: 13px;
	color: #ccc;
}
.main{
	overflow: hidden;
}
.choice_title{
	width: 100%;
	line-height: 50px;
	border-top: solid 2px #ccc;
	margin-top: 20px;
	padding-left: 39px;
	color: #6e7375;
	background: url("../assets/img/puch06.png") no-repeat 15px;
	background-size: 17px 13px;
}
.choice_sty{
	width: 100%;
	overflow: hidden;
	line-height: 50px;
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
.choice_tu,.dis_tu{
	float: right;
	margin-right: 15px;
	width: 20px;
	height: 20px;
	margin-top: 15px;
	background: url(../assets/img/xuan02.png) no-repeat center;
	background-size: 100% 100%;
}
.choice_sty:hover, .option_sty:hover {
	background-color: #eee;
}
.choice_tuone,.dis_tuone{
	background-image: url("../assets/img/xuan01.png");
}

.footer{
	width: 100%;
	overflow: hidden;
	position: absolute;
	bottom: 5%;
}
.footer .btn{
	width: 80%;
	margin-left: 9%;
	border-radius: 4px;
	font-size: 18px;
	line-height: 40px;
	color: #ffffff;
	background-color: #ff6c39;
	position: fixed;
	bottom: 4%;
}
 .posi_box{
	width:100%;
	overflow: hidden;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px 0;
	border-top: solid 1px #e5e5e5;
		background-color: #fff;
}
.food_but{
	width: 90%;
	text-align: center;
	color: #ffffff;
	background-color: #ff6c39;
	font-size: 18px;
	line-height: 46px;
	margin:auto;
	border-radius:8px;
}
.puch_monone{
	font-size: 18px;
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
.business_box{
	width:90%;
	min-height:212px;
	position: fixed;
	top:50%;
	left:5%;
	background-color: #fff;
	border-radius: 5px;
	margin-top:-120px;
}
.business_title{
	width:100%;
	overflow: hidden;
	text-align: center;
	font-size: 16px;
	border-bottom: solid 1px #e7e7e7;
	line-height: 50px;
}
.business_input{
	width:260px;
	height:50px;
	overflow: hidden;
	
}
.dealpwd{
	width:0;
	height:0;
	border: none;
}
.forget_box{
	font-size: 12px;
	width: 260px;
	margin: auto;
	text-align: right;
	color: #1776f3;
}
.mint-toast{
	max-width: 90%;
}
[v-cloak]{
	display:none;
}
.deal_password{
	width: 90%;
	display: block;
	margin: 20px auto 5px;
	height: 40px;
	padding-left: 10px;
	border-radius: 5px;
	border: none;
	letter-spacing: 4px;
	background-color: RGB(247,247,247);
}
.sun_but{
	 width: 90%;
    line-height: 40px;
    margin:10px auto 6px;
    text-align: center;
    background-color: #ff6c39;
    color: #fff;
    border-radius: 6px;
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
}
#error_tip{
	width:90%;
	margin:auto;
	font-size: 12px;
	line-height: 18px;
	color:#ff6c39;
	max-height:100px;
	overflow: hidden;
	margin-bottom: 6px;
}
</style>
