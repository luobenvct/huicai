<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			账户充值
		</div>
		<div class="puch_title">
			<div class="puch_name">充值金额</div>
			<input class="puch_input" id="puch_money" type="tel" v-model="losemoney" :placeholder="rechargeNum" :class="{puch_monone:nullShow}">
			<div class="puch_right">元</div>
		</div>
		<div class="app_into">注;当日充值,次日方可提现;提现T+0到账(具体到账时间视银行而定)</div>
		<div class="choice_title">选择银行卡</div>
		<div class="choice_sty" v-for="(item, index) in items" >
			<img class="choice_img" v-bind:src="item.src">
			<div class="choice_name">{{item.bankName}}<span class="choice_span">（尾号 {{item.tailnum}}）</span></div>
			<div class="choice_tu" :class="{choice_tuone:selectId==item.bankCardNo}"></div>
			<div class="dayClass">(单笔{{item.limit | money}}万,单日{{item.dayLimit | money}}万,<span v-if="item.monthLimit!=''">单月{{item.monthLimit | money}}万</span><span v-else>单月不限</span>)</div>
		</div>
		<a class="bind_but"  v-if="items.length==0" @click="addBank">添加银行卡</a>
		<div class="posi_box">
			<div class="food_but" @click="purchaseClick">充值</div>
			<!-- <div class="disne_ei"><span>点击提交订单即代表您已同意签署</span><a id="text_box" @click="agreementClick">《惠财投资协议》</a></div>  -->
		</div> 
		
		<div id="runingLayout" v-show="runingLayout">充值中,请稍等...</div>


	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
  name: 'coupons',
  data () {
		return {
			losemoney:'',     // 金额
			selectId:'',
			selectJson : {},
			failUrl:'',
			items:[],
			nullShow : false,  //金额字体大小
			dealPassword : '',     //交易密码
			businessBox : false,
			id:'001',
			nextnum: 1,
			rechargeNum : '',
			recharnum:0,
			token: '',
			businessShow : false,
			runingLayout : false
		}   
	},
	watch:{
		losemoney : function(val){
			if(val!==''){
				this.nullShow = true;
				
				//先把非数字的都替换掉，除了数字和. 
				var textval = val.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				//console.log(textval)
				if(textval==0){
					textval = ''
				}
				this.losemoney = textval;
				
				
			}else{
				this.nullShow = false;
			}
		
		}
	   
	},
	
	components:{

	},
	methods:{
		returns(){
		  this.$router.push({ path: '/mywealth' })
		},
		addBank(){
			HC.setStorage("bankUrl","/deprecharge");
			this.$router.push({ path: '/bindcard' })
		},
		/*提交按钮*/
		sunFu(){
			

		},
		newnotice(){
			/*最低充值额度*/
			axios.post('/api/v2/account/depository/get/recharge_minimum_amount',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.rechargeNum = "最低"+res.data.rechargeMinimumAmount +"起";
					this.recharnum = res.data.rechargeMinimumAmount;
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg)
				}
			})
			/*银行卡*/
			axios.post('/api/v2/account/depository/bank_card/list',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					if(res.data.result.length>0){
						res.data.result.forEach(function(item){
							item.src = "https://static.88huicai.com/huicai/image/bank/"+ HC.imgFun(item.bankName);
							item.tailnum = item.bankCardNo.substring(item.bankCardNo.length-4,item.bankCardNo.length);
						})
						this.items = res.data.result;
						this.selectJson = res.data.result[0];
						this.selectId = res.data.result[0].bankCardNo;
					}else{
						this.items =[];
					}

					
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg)
				}
			})
		},
		
		agreementClick (){
			//window.location.href='../../../h5/financial_agreement.jsp'
		},
		/*充值*/
		purchaseClick (){
			if(this.items.length==0){
				this.$toast('请先绑定银行卡！');
				return;
			}
			if(this.selectJson.limit==0){
				this.$toast('暂不支持该银行');
				return;
			}
			if(this.losemoney<Number(this.recharnum)){
				this.$toast("最低充值"+this.recharnum+"元")
				return;
			}
			if(Number(this.losemoney)>this.selectJson.limit){
				this.$toast("单笔限额"+this.selectJson.limit+"元");
				this.losemoney = this.selectJson.limit
				return;
			}
			let hrefUrl = window.location.href.split("#/")[0]
			let successUrl = hrefUrl + "#/rechargesucceed";
			this.runingLayout = true;
			axios.post('/api/v2/account/depository/recharge',{
				app_token : this.token,
				amount : this.losemoney,
				bankCardNo : this.selectJson.bankCardNo,
				failUrl : this.failUrl,
				successUrl : successUrl,
				instance : "WEIXIN"
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.runingLayout = false;
					window.location.href = res.data.result.url;
				}else if(res.data.code=="TOKEN_ERROR"){
					this.runingLayout = false;
					this.$toast('用户信息失效')
				}else{
					this.runingLayout = false;
					this.$toast(res.data.msg)
				}
			})
			
		},
		
		
	},
	filters :{
		money (val){
			var moneynum = val/10000;
			return moneynum;
		}
	},
	created: function () { 

	},
	mounted(){
		this.failUrl = window.location.href;
		this.token = HC.getStorage('sessionToken');
		this.newnotice();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
	width: 100%;
	overflow: hidden;
	font-size: 14px;
	
}
.nav_box{
	width: 100%;
	position: fixed;
	top: 0;
	left:0;
	height:40px;
	line-height: 40px;
	background-color:#42a2f1;
	text-align: center;
	color: #fff; 
	z-index: 100;
}
.returns_box{
	position: absolute;
	top: 0;
	left: 0;
	width:40px;
	height:40px;
	background: url(../../assets/img/back00.png) no-repeat center;
	background-size: 12px;
}
*{   
	-webkit-touch-callout:none;   
	-webkit-user-select:none; 
	-khtml-user-select:none;    
	-moz-user-select:none;  
	-ms-user-select:none;  
	user-select:none;   
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
input{
	outline:none;
	-webkit-user-select:auto;  
}
.puch_title{
	width: 100%;
	font-size: 16px;
	color:#3e484f;
	margin-top: 60px;
	overflow:hidden;
}
.puch_name{
	width:25%;
	float: left;
	padding-left: 4%;
	line-height: 40px;
	font-size: 16px;
}
.puch_input{
	border: none;
	float: left;
	width: 57%;
	padding-left: 10px;
	height: 40px;
	font-size: 14px;
	margin-bottom: 10px;
}
.puch_right{
	float: left;
	width: 10%;
	line-height: 40px;
}
.app_into{
	width: 96%;
	margin: auto;
	font-size:12px;
	line-height:40px;
	border-top:solid 1px #eee;
	border-bottom:solid 1px #eee;
}
  .choice_title{
	width: 100%;
	line-height: 50px;
	border-top: solid 12px #f5f5f9;
	padding-left: 39px;
	color: #6e7375;
	background: url("../../assets/deposits_img/puch06.png") no-repeat 15px;
	background-size: 17px 13px;
}
.choice_sty,.option_sty{
	width: 100%;
	overflow: hidden;
	line-height: 50px;
	position: relative;
}
.choice_sty:hover,.option_sty:hover{
	background-color:#eee;
}
.dayClass{
	position: absolute;
	bottom: 0;
	left:40px;
	font-size: 12px;
	color:#acb2b8;
	line-height: 12px;
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
	background: url("../../assets/deposits_img/xuan02.png") no-repeat center;
	background-size: 100% 100%;
}

.choice_tuone,.dis_tuone,.option_tuone{
	background-image: url("../../assets/deposits_img/xuan01.png");
}
.bind_but{
	display: block;
	width:100%;
	line-height: 44px;
	color:#ff6c39;
	font-size: 15px;
	margin:0 auto 15px;
	background: url('../../assets/deposits_img/puch12.png') no-repeat 15px center,url('../../assets/deposits_img/puch03.png') no-repeat 93% center;
	background-size: 18px 18px,7px 12px;
	padding-left: 40px;
	background-color: #f5f5f9;
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
	padding: 15px 0;
	border-top: solid 1px #e5e5e5;
		background-color: #fff;
}
.puch_monone{
	font-size: 18px;
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
.disne_ei{
	width: 100%;
	text-align: center;
	font-size: 12px;
	color: #acb2b8;
	line-height: 34px;
}
#text_box{
	color:#3ca8ee;
}
#text_box:hover{
	color:#3ca8ee;
	text-decoration: none;
}

/*交易密码
*/
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
	background: url(../../assets/deposits_img/jiaoyi.png) no-repeat center;
	background-size: 100% 100%;
	margin: 25px auto 0;
	display: block;
	border:none;
	font-size: 24px;
	padding-left: 15px;
	letter-spacing: 29px;
	line-height: 50px;
}
.dealpwd{
	width:0;
	height:0;
	border: none;
}
.forget_box{
	font-size: 12px;
	width: 260px;
	margin:auto;
	text-align: right;
	color: #1776f3;
}
.mint-toast{
	max-width: 90%;
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

#error_tip{
	width:90%;
	margin:auto;
	font-size: 12px;
	line-height: 18px;
	color:#ff6c39;
	max-height:36px;
	overflow: hidden;
	margin-bottom: 6px;
}














</style>
