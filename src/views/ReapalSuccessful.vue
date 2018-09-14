<template>
  <div class="reapal">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">认证支付</div>
	</div>
	
	<div class="max_box">  
		<!-- <form action="/h5/reapal_pay_url.htm" method="post" id="submitFrom"> -->
			<div class="title_box">
			<div class="title_num">金额：{{totalFee}}元</div>
				<div class="order_bank">
					<img class="order_img" :src="bankIcon">
					<span class="order_name">{{bankName}}</span>
					<div class="order_span">尾号{{cardLast}}</div>
				</div>
			</div>
			<div class="user_box">
				<div class="max_sty">
					<div class="sty_left">真实姓名</div>
					<div class="sty_right">{{owner}}</div>
				</div>
				<div class="max_sty" style="border:none">
					<div class="sty_left">身份证号</div>
					<div class="sty_right">{{pid}}</div>
				</div>
			</div>
			<div class="user_box" style="margin-top:8px;">
				<div class="max_sty">
					<div class="sty_left">手机号</div>
					<input type="tel" class="sty_input" v-model="mobile" placeholder="请输入银行预留手机号" maxlength="11">
				</div>
				<div class="max_sty" style="border:none">
					<div class="sty_left">验证码</div>
					<input type="text" class="sty_input" id="checkNo" placeholder="请输入短信验证码" v-model="verifyCode" maxlength="6">
					<a class="hqbox" v-if="timeShow01" @click="getVerifyCode">获取验证码</a>
					<div class="posi_box" v-else><span id="text_nem">{{timeNum}}</span>秒重发</div>
				</div>
			</div>
			<div class="ton_box">同意 <router-link :to="'rongagreement'">《融宝手机支付协议》</router-link> </div>
			<div id="submit" name="submit" @click="submit">提交</div>
		<!-- </form>  -->
	</div>  
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
	  verifyCode:'',
	  timeShow01:true,
	  timeNum:60,
	  content:'',
	  bankName:'',
	  bankIcon:'',
	  bankIcon02:'',
	  mobile:'',
	  memberIp:'',
	  cardNo:'',
	  type:'',
	  pid:'',
	  owner:'',
	  cardLast:'',
	  amount:'',
	  totalFee:'',
	  orderNo:'',
	  merchantId:""
	}
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	getVerifyCode(){
		if(this.mobile == ''){
			this.$toast({
					  message: "请输入手机号",
					  position: 'bottom',
					  duration: 3000
				});
			return;
		}
		if(this.checkMobile(this.mobile) == false){
			this.$toast({
					  message: "手机号格式有误",
					  position: 'bottom',
					  duration: 3000
				});
			return;
		}
		this.VerifyCodeFn();
	},
	VerifyCodeFn(){
		//发送短信接口数据
		  axios.post('/api/mobile_reapal_sms_url.htm', {
			  	orderNo:this.orderNo,
				type:this.type,
				mobile:this.mobile,
				cardNo:this.cardNo,
				totalFee:parseInt(this.totalFee*100),
				memberIp:this.memberIp,
				encodeOwner:this.owner,
				pid:this.pid
		  })
		  .then(res =>{
		  	console.log("发送短信接口数据");
		  	console.log(res);    
		  	if(res.data == "SUCCESS"){
		  		this.$toast({
					  message: "短信验证码发送成功，请注意查收！",
					  position: 'bottom',
					  duration: 3000
				});
				this.timeShow01 = false;
				this.time();
		  	}else{
		  		this.$toast({
					  message: "手机号输入不正确！",
					  position: 'bottom',
					  duration: 3000
				});
		  	}
		  })
		  .catch(res=> {
		  	console.log(res);
		  });
	},
	GetUrlRelativePath(){
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("?");
　　　　var start = arrUrl[1].split("=");
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("=") != -1){
　　　　　　relUrl = relUrl.split("&");	
　　　　}
　　　　return relUrl;
　　},
	submit(){
		if(this.mobile == ''){
			this.$toast({
					  message: "请输入手机号",
					  position: 'bottom',
					  duration: 3000
				});
			return;
		}
		if(this.checkMobile(this.mobile) == false){
			this.$toast({
					  message: "手机号格式有误",
					  position: 'bottom',
					  duration: 3000
				});
			return;
		}
		if(this.verifyCode == ''){
			this.$toast({
					  message: "请输入验证码",
					  position: 'bottom',
					  duration: 3000
				});
			return;
		}
		//提交购买（付款）
		  axios.post('/api/mobile_reapal_pay.htm', {
			  	orderNo:this.orderNo,
			  	content:this.content,
				totalFee:parseFloat(this.totalFee*100),
				amount:this.amount,
				bankName:this.bankName,
				bankIcon:this.bankIcon02,
				cardLast:this.cardLast,
				owner:this.owner,
				pid:this.pid,
				mobile:this.mobile,
				memberIp:this.memberIp,
				cardNo:this.cardNo,
				type:this.type,
				merchantId:this.merchantId,
				checkNo:this.verifyCode
		  })
		  .then(res =>{
		  	console.log("提交购买（付款）");
		  	console.log(res); 
		  	if(res.data.code == "SUCCESS"){
		  		this.$router.push({ path: '/buyingresults?hui=cai'+'&orderid='+this.orderNo+'&shortBankCardNo='+this.cardLast+'&bankIcon='+this.bankIcon02+'&bankName='+this.bankName}) 
		  	}else if(res.data.code == "ERROR"){
		  		this.$toast({
					  message: "购买出错",
					  position: 'bottom',
					  duration: 3000
				});
				return;
		  	}else if(res.data.msg == "验证失败:验证码错误"){
		  		this.$toast({
					  message: "验证码错误",
					  position: 'bottom',
					  duration: 3000
				});
				return;
		  	}else if(res.data.msg == "验证失败:订单重复提交"){
		  		this.$toast({
					  message: "订单重复提交",
					  position: 'bottom',
					  duration: 3000
				});
				return;
		  	}	  
		  })
		  .catch(res=> {
		  	console.log(res);
		  });   	
	},
	time(){
		let timer = setInterval(()=>{
			this.timeNum--;
			if(this.timeNum == 0){
				this.timeShow01 = true;
				this.timeNum = 60;
				clearInterval(timer)
			}
		},1000)
	},
	checkMobile(str) {
		var re = /^1\d{10}$/ 
		if (re.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	dataFn(){
	  
	}
  },
  mounted(){
	console.log(this.GetUrlRelativePath());
	this.content = decodeURI(HC.vueurlFun("content")); 
	this.bankName = decodeURI(this.GetUrlRelativePath()[1].split('=')[1]); 
	this.bankIcon = "https://static.88huicai.com/huicai/image/bank/card/" + this.GetUrlRelativePath()[2].split('=')[1]; 
	this.bankIcon02 = this.GetUrlRelativePath()[2].split('=')[1];
	this.owner = decodeURI(this.GetUrlRelativePath()[3].split('=')[1]); 
	this.orderNo = this.GetUrlRelativePath()[4].split('=')[1]; 
	this.pid = this.GetUrlRelativePath()[5].split('=')[1]; 
	//this.mobile = this.GetUrlRelativePath()[6].split('=')[1]; 
	this.cardNo = this.GetUrlRelativePath()[7].split('=')[1]; 
	this.totalFee = this.GetUrlRelativePath()[8].split('=')[1]; 
	this.cardLast = this.GetUrlRelativePath()[9].split('=')[1];  
	this.merchantId = this.GetUrlRelativePath()[10].split('=')[1];
	this.memberIp = this.GetUrlRelativePath()[11].split('=')[1]; 
	this.amount = this.GetUrlRelativePath()[12].split('=')[1]; 
	this.type = this.GetUrlRelativePath()[13].split('=')[1]; 
	console.log(this.content)
	console.log(this.owner)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reapal{
	background: #f5f5f9;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.top{
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.top .name{
	margin-left: 10%;
	margin-top: 5px;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
  margin-top: 8px;
}
.header{
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 0;
  background: #3ca8ee;
  text-align: center;
  color: #FFF;
  z-index: 2;
}
input{
	outline:none;
	-webkit-user-select:auto;
}
.max_box{
	width:100%;
	overflow:hidden;
	margin-top: 42px;
}
.title_box,.user_box{
	width:100%;
	overflow:hidden;
	background-color:#fff;
}
.title_num{
	width:90%;
	margin:auto;
	font-size:16px;
	margin-top: 20px;
}
.order_bank{
	width:90%;
	margin:10px auto;
	font-size:16px;
}
.order_img{
	width: 20px;
	vertical-align: middle;
}
.order_name{
	margin-left:6px;
	line-height:20px;
}
.order_span{
	color:#acb2b8;
	float:right;
	line-height:20px;
	font-size: 14px;
}
.user_box{
	margin-top:15px;
}
.max_sty{
	width:96%;
	margin-left:4%;
	overflow:hidden;
	height:51px;
	position: relative;
	border-bottom:solid 1px #e5e5e5;
}
.sty_left{
	width:25%;
	float:left;
	line-height:50px;
	padding-left:5px;
	color:#7a8998;
	font-size: 14px;
}
.sty_right{
	width:70%;
	float:left;
	height:50px;
	line-height:50px;
	color:#203542;
	border:none;
	font-size: 14px;
}
.sty_input{
	width:70%;
	float:left;
	height:50px;
	display:block;
	border:none;
	color:#203542;
	-webkit-user-select:auto;
}
.hqbox{
	width:80px;
	height:28px;
	line-height:28px;
	background-color:red;
	position: absolute;
	top:10px;
	right:10px;
	color:#fff;
	text-align:center;
	font-size:12px;
	border-radius:5px;
}
.hqbox:hover{
	color: #fff;
	text-decoration: none;
}
.ton_box{
	font-size: 12px;
	width: 84%;
	margin: auto;
	margin-top: 30px;
	padding-left: 20px;
	background:url("../assets/img/reap01.png") no-repeat left;
	background-size:13px;
}
.ton_box a{
	color:#3ca8ee;
}
.ton_box a:hover{
	color: #3ca8ee;
	text-decoration: none;
}
.posi_box{
	width:80px;
	height:28px;
	line-height:28px;
	background-color:#acacac;
	border-radius:5px;
	position: absolute;
	top:10px;
	right:10px;
	text-align:center;
	font-size:12px;
	color: #fff;
}
#submit{
	width: 90%;
	height: 44px;
	margin: 10px auto;
	display: block;
	border: none;
	border-radius: 8px;
	background-color: #fa612e;
	color: #fff;
	font-size: 18px;
	line-height: 44px;
	text-align: center;
}
</style>
