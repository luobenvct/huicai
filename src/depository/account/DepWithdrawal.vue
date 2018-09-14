<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			账户提现
		</div>
		<div class="top">
			<div class="puch_title">
				<div class="puch_name">提现金额</div>
				<input class="puch_input" id="puch_money" type="tel" v-model="losemoney" :placeholder="withdrawNum" :class="{puch_monone:nullShow}">
				<div class="puch_right">元</div>
			</div>
		</div>
		<div class="middle">
			<div class="middle01">可提金额 <span>{{availableBalance}}</span> 元</div>
			<div class="middle02">注;当日充值,次日方可提现;提现T+0到账(具体到账时间视银行而定)</div>
		</div>
		<!--银行卡-->
		<div class="choice_title">选择银行卡</div>
		<div class="choice_sty" v-for="(item, index) in items">
			<img class="choice_img" v-bind:src="item.src">
			<div class="choice_name">{{item.bankName}}<span class="choice_span">（尾号 {{item.tailnum}}）</span></div>
			<div class="choice_tu choice_tuone"></div>
		</div>
		<a class="bind_but"  v-if="items.length==0" @click="addBank">添加银行卡</a>
		<div class="posi_box">
			<div class="food_but" @click="purchaseClick">提现</div>
		</div>
		  
		<div id="runingLayout" v-show="runingLayout">提现中,请稍等...</div>


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
		nullShow : false,  //金额字体大小
		items:[],
		availableBalance : 0, //提现金额
		dealPassword : '',     //交易密码
		businessBox : false,
		passageway :[
			{
				name : "银联通道",
				type : "UNINONPAY"
			},
			{
				name : "人行通道",
				type : "PBC"
			}
		],
		passagType : "UNINONPAY",  //通道type
		nextnum : 1,
		failUrl : '',
		withdrawNum : '',
		withNum:0,
		token:'',
		businessShow:false,
		runingLayout:false,
		hasBank : true
	}   
  },
	watch:{
	   losemoney(val){
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
		
		}
	},
	components:{

	},
	methods:{
		returns(){
		  this.$router.push({ path: '/mywealth' })
		},
		addBank(){
			HC.setStorage("bankUrl","/depwithdrawal");
			this.$router.push({ path: '/bindcard' })
		},
	    /*提交*/
	    sunFun(){
	    	
	    },
		newnotice (){
			/*最低提现额度*/
			axios.post('/api/v2/account/depository/get/withdraw_minimum_amount',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.withdrawNum = "最低"+res.data.withdrawMinimumAmount +"起";
					this.withNum = res.data.withdrawMinimumAmount;
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg);
				}
			})
			/*银行卡*/
			axios.post('/api/v2/account/depository/bank_card/list',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.hasBank = res.data.hasAccount;
					res.data.result.forEach((item)=>{
						item.src = "https://static.88huicai.com/huicai/image/bank/"+ HC.imgFun(item.bankName);
						item.tailnum = item.bankCardNo.substring(item.bankCardNo.length-4,item.bankCardNo.length);
					})
					this.items = res.data.result;
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg);
				}
			})
			/*钱包*/
			axios.post('/api/v2/assets/depository/total/user',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code == "SUCCESS"){
					if(res.data.result.canAvailableBalance!=''&& res.data.result.canAvailableBalance!=null){
						this.availableBalance = HC.decimalFun(res.data.result.canAvailableBalance);
					}else{
						this.availableBalance = 0 ;
					}
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg);
				}
			})

		},
		
		purchaseClick(){
			if(!this.hasBank){
				this.$toast("请先绑定银行卡")
				return;
			}
			if(this.items.length==0){
				this.$toast('请先绑定银行卡！');
				return;
			}
			if(this.losemoney<Number(this.withNum)){
				this.$toast("最低提现"+this.withNum+"元")
				return;
			}
			this.runingLayout = true;
			let hrefUrl = window.location.href.split("#/")[0]
			let successUrl = hrefUrl + "#/withdrawalsucceed";
			axios.post('/api/v2/account/depository/withdraw',{
				app_token : this.token,
				amount : this.losemoney,
				failUrl :  this.failUrl,
        		successUrl : successUrl,
        		instance : "WEIXIN"
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.runingLayout = false;
					window.location.href = res.data.result.url;
					// 成功后跳转地址 /rechargesucceed
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
   input{
	outline:none;
	-webkit-user-select:auto;  
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


.top{
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid #ccc;
	margin-top: 40px;
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
	line-height: 40px;
}
.puch_input{
	border: none;
	float: left;
	width: 58%;
	padding-left: 10px;
	height: 40px;
	font-size: 12px;
	margin-bottom: 10px;
}
.puch_right{
	float: left;
	width: 10%;
	line-height: 40px;
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
.choice_title{
	width: 100%;
	line-height: 50px;
	border-top: solid 2px #ccc;
	margin-top: 20px;
	padding-left: 39px;
	color: #6e7375;
	background: url("../../assets/deposits_img/puch06.png") no-repeat 15px;
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
	background: url(../../assets/deposits_img/xuan02.png) no-repeat center;
	background-size: 100% 100%;
}
.choice_sty:hover, .option_sty:hover {
	background-color: #eee;
}
.choice_tuone,.dis_tuone{
	background-image: url("../../assets/deposits_img/xuan01.png");
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
	max-height:36px;
	overflow: hidden;
	margin-bottom: 6px;
}

</style>
