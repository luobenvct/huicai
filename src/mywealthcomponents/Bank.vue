<template>
	<div class="bank" style="margin-top: 60px;">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			银行卡
		</div>
		<div class="title_box">普通账户绑定银行卡</div>
		<div class="bj_bank" v-if="items.length == 0" @click="rechargeBtn">请先购买标的 ></div><!-- 请先充值 > -->
		<div class="bank_sty" v-else :class="item.className" v-for="item in items">
			<div class="unbind_bank" v-if="item.unbindSty=='one'" @click="unbindCommonFun(item)">解绑</div>
			<div class="unbind_bank" v-if="item.unbindSty=='two'" @click="auditCommonFun(item)">审核中</div>
			<div class="unbind_bank" v-if="item.unbindSty=='three'" @click="unbindCommonFun(item)">审核失败,请重新审核</div>
			<img class="bank_left" :src="item.imgSrc">
			<div class="bank_right">
				<div class="bank_name" v-text="item.bankName">招商银行</div>
				<div class="bank_save">储蓄卡</div>
				<div class="bank_num" v-text="item.banknum">***********2022</div>
			</div>
		</div>
		<div class="bank_amount" @click="bankJumpBtn">银行及额度查询</div> 
		<div class="title_unbind_bank">
			<div class="desTitle_box">存管账户绑定银行卡</div>
		</div>
		<div class="desBj_bank" v-if="desBjShow">内测中暂不对外</div>
		<div class="desBj_bank" v-else-if="desItems.length == 0" @click="desAccountBatn">{{desText}}</div>
		<div class="disBank_sty" v-else :class="item.className" v-for="item in desItems">
			<div class="unbind_bank" v-show="desShow" @click="unbindButton">解绑</div>
			<img class="disBank_left" :src="item.imgSrc">
			<div class="desBank_right">
				<div class="desBank_name" v-text="item.bankName">招商银行</div>
				<div class="desBank_save">储蓄卡</div>
				<div class="desBank_num" v-text="item.bankCardNotwo">***********2022</div>
			</div>
		</div>
		<div class="desBank_amount" @click="desbankBtn">银行及额度查询</div> 

		 <!-- 黑色遮罩层 -->
		<div class="blackBack" v-show="blackne"></div>
		<div class="bank_unbind_Process" v-show="blackne">
			<div class="title_bind">解绑存管账户银行卡</div>
			<div class="code_show" v-show="codeShow">短信验证码已发至手机号 <span>{{userMobile}}</span></div>
			<div class="input_wrapper">
				<input type="text" placeholder="请输入短信验证码" class="inut_bind" maxlength="6" v-model="verifyCode">
				<div class="time" v-if="timeTrue"><span>{{num}}</span>秒</div>
				<div class="time" v-else @click="VerifyCodeFun">获取验证码</div>
			</div>
			<div class="bank_sty_text">存管账户银行卡解绑之后,存管账户将不能充值、提现。</div>
			<div class="bank_sty_text">存管账户银行卡解绑之后,存管账户的标的投资和回款不受影响。</div>
			<div class="bank_sty_text">存管账户银行卡解绑不影响普通账户所绑定银行卡及投资。</div>
			<div class="but_box">
				<div class="but_sty but_left" @click="colseFun">取消</div>
				<div class="but_sty but_right" @click="UnbundlingFun">解绑</div>
			</div>

		</div>
		<div class="blackBack" style="line-height:600px;text-align:center;color:#fff;font-size: 14px;" v-show="dredgeShow">开户中...</div>
	</div>
</template>

<script>

import store from '../vuex/store.js'

import axios from 'axios'
export default {
  name: 'bank',
  data () {
	return {
		items:[],
		desItems:[],
		homeMark:[],       //首页标的数据
		token: "",
		dataUuid: "",
		failUrl: "",
		blackShow : false,
		dredgeShow : false,
		desText :'请先开通存管账户 >',
		desShow:false,
		nextnum:1,
		blackne : false,
		timeTrue:false,
		num:60,
		desBjShow :false,
		verifyCode:'',          //短信验证码
		bankCardNum:'',         //点击选中解绑的那张银行卡的卡号
		depCount:false,         //判断是否是存管账户
		userMobile:'',          //用户平台注册手机号
		codeShow:false,         //短信验证码提示语是否显示字段

	}
  },
  computed: {
	rootBase(){
	  return store.getters.getRootBase
	},
	Https(){
		return store.getters.getHttps
	}
  },
  components:{

  },
  methods:{
  	/*普通银行卡解绑*/
  	unbindCommonFun(item){
  		HC.setStorage("skipUrl",window.location.href.split("#/")[0]);
  		window.location.href =  this.Https + "/mobile/depository/my_financing/untie_bank.html?weixin=weixin&app_token="+this.token+"&cardNo="+item.bankCardNo;
  	},
  	auditCommonFun(item){
  		window.location.href = this.Https +"/mobile/depository/my_financing/untie_bank_audit.html?weixin=weixin&app_token="+this.token+"&cardNo="+item.bankCardNo;
  	},
	/*判断用户是否是存账户*/
	depCountFun : function(){
		axios.post(this.rootBase+'/account/depository/is_has',{
			app_token: this.token
		})
		.then(res=>{
			if(res.data.code == "SUCCESS"){
				if (res.data.result == false) {
					this.depCount = false;
				}else{
					this.depCount = true;
				}
		  	}else{
		  		this.$toast(res.data.msg)
		  	}
		})
	},
	/*获取短信验证码*/
	VerifyCodeFun(){
		axios.post(this.rootBase+'/verify_code/open_auth/depository',{
			app_token: this.token,
			type: 'UNBIND_CARD'
		})
		.then(res=>{
			if(res.data.code == "SUCCESS"){
				this.$toast('验证码发送成功')
				this.timeTrue = true;
				this.codeShow = true;
				var timer = setInterval(()=>{
					this.num --;
					if(this.num == 0){
						this.num = 60;
						this.timeTrue = false;
						this.codeShow = false;
						clearInterval(timer)
					}
				},1000)
			}else{
				this.$toast(res.data.msg)
			}
		})
	},
	colseFun(){
		this.blackne = false;
	},
	UnbundlingFun(){
		if(this.verifyCode == ""){
			this.$toast('请先输入短信验证码')
			return;
		}
		axios.post(this.rootBase+'/account/depository/bank_card/unbind',{
			app_token: this.token,
			bankCardNo:this.bankCardNum,
			smsCode:this.verifyCode
		})
		.then(res=>{
			if(res.data.code == "SUCCESS"){
				this.$toast("账户解绑银行卡成功");
				this.blackne = false;
				this.despositionDataFun();
			}else{
				this.$toast(res.data.msg)
			}
		})
		
	},
	returns(){
	  this.$router.push({path:'/mywealth'});
	},
	/*普通银行卡*/
	cardFun (){
		axios.post(this.rootBase+'/account/common/bank_card/list',{
			app_token: this.token
		})
		.then(res=>{
			if(res.data.code=="SUCCESS"){
				if(res.data.result.length==0){
					this.items=[]
				}else{
					res.data.result.forEach((item)=> {
						var cardlength = item.bankCardNo.length;
						var bankCardNos =item.bankCardNo.substring(item.bankCardNo.length-4);
						item.banknum = bankCardNos.leftPad('*',cardlength);
						item.banknum = item.banknum.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
						item.imgSrc = "https://static.88huicai.com/huicai/image/bank/card/" + HC.imgFun(item.bankName);
						item.className = this.colorClass(item.bankName);
						/*判断是否提交审核*/
						if(item.unbindAuditStatus=="AUDITING"){
							item.unbindSty = 'two';
						}else if(item.unbindAuditStatus=="REFUSE"){
							item.unbindSty = 'three';
						}else{
							item.unbindSty ='one';
						}
						//console.log(item.className);
					})
					this.items = res.data.result;
				}
				
				
			}else{
				this.$toast(res.data.msg)
			}
			
		})
	},
	despositionQuali(){
		axios.post('/api/v2/user/is_depos_fun_open',{
			app_token: this.token
		})
		.then(res=>{
			if(res.data.result){
				this.despositionDataFun();
			}else{
				this.desBjShow = true;
			}
		})
	},
	despositionDataFun(){
		axios.post(this.rootBase+'/account/depository/bank_card/list',{
			app_token:this.token
		})
		.then(res=>{
			if (res.data.code == "SUCCESS") {
				if(res.data.hasAccount==false){
					this.desItems = [];
					this.desText = '请先开通存管账户 >';
					this.desShow = false;
				}else{
					if(res.data.result != null && res.data.result.length>0){
						res.data.result.forEach((item)=>{
							var cardlength = item.bankCardNo.length;
							var bankCardNos =item.bankCardNo.substring(item.bankCardNo.length-4);
							item.bankCardNonume = bankCardNos.leftPad('*',cardlength);
							
							item.bankCardNotwo = item.bankCardNonume.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");

							item.imgSrc = "https://static.88huicai.com/huicai/image/bank/card/" + HC.imgFun(item.bankName);
							item.className = this.colorClass(item.bankName);
							//console.log(item.className);

						})
						this.desItems = res.data.result;
						this.desShow = true;
					}else{
						this.desItems = [];
						this.desText = '请绑定银行卡 >';
						this.desShow = false;
					}
				}
				
				console.log(this.desShow)
			}else{
				this.$toast(res.data.msg)
			}
		})
		
	},
	colorClass (name){
		var bankname = ["工商银行","农业银行","中国银行","建设银行","邮政储蓄银行","中信银行","光大银行","平安银行","交通银行","兴业银行","民生银行","浦发银行","广发银行","华夏银行","招商银行"];
		var banksrc = ["gradientone","gradientfive","gradientseven","gradientfour","gradientfive","gradientsix","gradienttwo","gradientseven","gradientshree","gradientshree","gradientshree","gradientshree","gradientsix","gradientseven","gradientone"];
		var num = bankname.indexOf(name);
		return banksrc[num];
	},
	//获取惠活宝标的id接口
	getIDClass(){
		axios.post(this.rootBase+'/open_auth/financing_project/position/ONDEMAND/list',{
			app_token: this.token
		})
		.then(res=>{
			if (res.data.result.length == 0) {
				this.dataUuid = '';
			}else{
				this.dataUuid =  res.data.result[0].uuid;
			}
		})

	},
	//获取新人惠标的id接口
   /* getIDClass(){
		axios.post(this.rootBase+'/open_auth/financing_project/newcommer',{
			
		})
		.then(res=>{
			this.dataUuid =  res.data.result.uuid;
		})
	},*/
	desAccountBatn (){
		/*this.$toast({
			  message: "内测期间暂不支持存管标的操作，请下载惠财APP，敬请谅解 ！",
			  position: 'bottom',
			  duration: 4000
		});
		return;*/
		if(this.depCount == false){
			this.dredgeShow =true;
			axios.post(this.rootBase+'/account/depository/open_account',{
				app_token: this.token,
        		failUrl:this.failUrl,
        		successUrl : this.failUrl,
        		instance : "WEIXIN"
			})
			.then(res=>{
				if(res.data.code == "SUCCESS"){
					this.dredgeShow =false;
					window.location.href = res.data.result.url;
				}else{
					this.dredgeShow =false;
					this.$toast(res.data.msg)
				}
			})
		}else{
			HC.setStorage("bankUrl",'/bank');
			this.$router.push({path:'/bindcard'})
		}
	},
	//普通银行限额界面跳转
	bankJumpBtn (){
		this.$router.push({path:'/banklimit'})
	},
	//存管账户	
	desbankBtn (){
		this.$router.push({path:'/banklimitdepository'})
	},
	//充值界面跳转
	rechargeBtn (){
		//this.$router.push({path:'/purchase/'+this.dataUuid})
		this.$router.push({path:'/financial'})
	},
	/*获取用户基本信息*/
	userProfile(){
		axios.post(this.rootBase+'/user/profile',{
			app_token: this.token
		})
		.then(res=>{
			if(res.data.code=="SUCCESS"){
				this.userMobile =res.data.result.mobile;
			}else{
				this.$toast(res.data.msg)
			}
			
		})
	},
	//解绑功能
	unbindButton (){
		this.blackne = true;
		this.bankCardNum = this.desItems[0].bankCardNo;
		this.userProfile();
	}


  },
  created () {
	
  },
  mounted(){
	//this.token = this.getCookie('sessionToken');
	this.failUrl = window.location.href;
	this.token = HC.getStorage('sessionToken')
	this.cardFun();
	this.despositionQuali();
	this.getIDClass();
	this.depCountFun();
  }
}
</script>

<style>
	.gradientone{
	   background: url("../assets/img/gongshang.png") no-repeat center;
	}
	.gradienttwo{
		 background: url("../assets/img/guanda.png") no-repeat center;
	}
	.gradientshree{
		background: url("../assets/img/jianse.png") no-repeat center;
	}
	.gradientfour{
		 background: url("../assets/img/jianse.png") no-repeat center;
	}
	.gradientfive{
	   background: url("../assets/img/nongye.png") no-repeat center;
	}
	.gradientsix{
		background: url("../assets/img/zhongguo.png") no-repeat center;
	}
	.gradientseven{
		background: url("../assets/img/zhongguo.png") no-repeat center;
	}
	.gradientseven01{
		background: url("../assets/img/pinan.png") no-repeat center;
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title_box{
		width:90%;
		margin:auto;
		font-size:14px;
		padding-left:10px;
		color: #acb2b8;
		border-left: solid 4px #acb2b8;
		height: 18px;
		margin: 20px auto;
		line-height: 18px;
		font-family: PingFangSC-Medium, sans-serif;
	}
	.title_unbind_bank{
		overflow: hidden;
		height: 20px;
		width: 100%;
		margin: 20px auto;
		position: relative;
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
	.desTitle_box{
		width:70%;
		font-size:14px;
		padding-left:10px;
		color: #acb2b8;
		border-left: solid 4px #acb2b8;
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Medium, sans-serif;
		float: left;
		margin-left: 10px;
		margin-bottom: 20px;

	}
	/*解绑按钮*/
	.unbind_bank{
		height: 18px;
		line-height: 16px;
		color: #fff;
		padding: 0 6px;
		float: right;
		border: solid 1px #fff;
		text-align: center;
		font-size: 12px;
		border-radius: 8px;
		position: absolute;
		top:10px;
		right: 8px;
	}
	/*黑色遮罩*/
	.blackBack{
	   position: fixed;
	   top : 0;
	   left : 0;
	   width: 100%;
	   height: 100%;
	   background-color: #010101;
	   opacity: 0.5;
	}
	/*解绑流程*/
	.bank_unbind_Process{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 60%;
		background-color: #FFFFFF;
		overflow: hidden;
		overflow-y: scroll;
	}
	.title_bind{
		width: 100%;
		height: 20px;
		text-align: center;
		font-size: 16px;
		color: #203542;
		font-family: PingFang-SC-Medium;
		margin-top: 14px;
	}
	.inut_bind {
		height: 46px;
		width: 60%;
		border:none;
		text-align: left;
		margin-left: 5%;
		padding-left: 15px;
		font-size: 14px;
		color: #acb2b8;
		font-family: PingFang-SC-Medium;
		margin-bottom: 32px;
	}
	.forgetPwd{
		width: 100%;
		height: 15px;
		font-size: 12px;
		color: #203542;
		font-family:  PingFang-SC-Regular;
		text-align: right;
		margin: 15px auto;
		padding-right: 5%;
		text-decoration: underline;
	}
	.detail_bind{
		margin-top: 25px;
	}
	li{
		color: #acb2b8;	
		width: 85%;
		font-size: 12px;
		font-family: PingFang-SC-Medium;
		text-align: left;
		margin-left: 5%;
		margin-top: 5px;
	}
	.bank_sty{
		width:90%;
		margin:10px auto 0;
		overflow:hidden;
		border-radius:15px;
		min-height:120px;
		background-color:#d46473;
		position: relative;
	}
	.disBank_sty{
		width:90%;
		margin:10px auto 0;
		overflow:hidden;
		border-radius:15px;
		min-height:120px;
		background-color:#d46473;
		position: relative;
	}
	.bank_left{
		float:left;
		margin:10px 15px;
		display:block;
		width: 60px;
	}
	.disBank_left{
		float:left;
		margin:10px 15px;
		display:block;
		width: 60px;
	}
	.bank_right{
		float:left;
		margin-top:15px;
		width: 64%;
	}
	.desBank_right{
		float:left;
		margin-top:15px;
		width: 64%;
	}
	.bank_name{
		font-size:18px;
		color:#fff;
		font-family: PingFangSC-Medium, sans-serif;
		margin-top: 10px;
	}
	.bank_save{
		font-size:14px;
		color:#fff;
		font-family: PingFangSC-Regular, sans-serif;
		margin-top: 5px;
	}
	.bank_num{
		font-size:17px;
		color:#fff;
		margin-top:18px;
		font-family: PingFangSC-Regular, sans-serif;
	}
	.desBank_name{
		font-size:18px;
		color:#fff;
		font-family: PingFangSC-Regular, sans-serif;
		margin-top: 10px;
	}
	.desBank_save{
		font-size:14px;
		color:#fff;
		font-family: PingFangSC-Regular, sans-serif;
		margin-top: 5px;
	}
	.desBank_num{
		font-size:17px;
		color:#fff;
		margin-top:18px;
		font-family: PingFangSC-Regular, sans-serif;
	}
	.desBank_amount{
		box-sizing:border-box;
		font-size: 14px;
		margin: 10px auto;
		width: 90%;
		text-align: right;
		color: #3ca8ee;
		font-family:PingFangSC-Regular, sans-serif;
		padding-right: 8%;
		padding-top: 6px;
		background: url("../assets/img/yinhang001.png") no-repeat 97% 8px;
		background-size: 18px 18px;
	}
	.bank_amount{
		box-sizing:border-box;
		padding-right: 8%;
		font-size: 14px;
		margin: 10px auto;
		width: 90%;
		text-align: right;
		color: #3ca8ee;
		font-family: PingFangSC-Regular, sans-serif;
		border-bottom: solid 0.5px #acb2b8;
		padding-bottom: 20px;
		padding-top: 6px;
		background: url("../assets/img/yinhang001.png") no-repeat 97% 8px;
		background-size: 18px 18px;
	}
	.gradientone{
		background: -moz-linear-gradient(left, #d56574, #cc5781);
		background: -webkit-gradient(linear,left,from(#d56574),right(#cc5781));
		background: -webkit-linear-gradient(left, #d56574, #cc5781);
		background: -o-linear-gradient(left, #d56574, #cc5781);
	}
	.gradienttwo{
		background: -moz-linear-gradient(left, #8e4980, #723a7b);
		background: -webkit-gradient(linear,left,from(#8e4980),right(#723a7b));
		background: -webkit-linear-gradient(left, #8e4980, #723a7b);
		background: -o-linear-gradient(left, #8e4980, #723a7b);
	}
	.gradientshree{
		background: -moz-linear-gradient(left, #546384, #414d74);
		background: -webkit-gradient(linear,left,from(#546384),right(#414d74));
		background: -webkit-linear-gradient(left, #546384, #414d74);
		background: -o-linear-gradient(left, #546384, #414d74);
	}
	.gradientfour{
		background: -moz-linear-gradient(left, #5b7ab4, #55639e);
		background: -webkit-gradient(linear,left,from(#5b7ab4),right(#55639e));
		background: -webkit-linear-gradient(left, #5b7ab4, #55639e);
		background: -o-linear-gradient(left, #5b7ab4, #55639e);
	}
	.gradientfive{
		background: -moz-linear-gradient(left, #66ad9e, #4c9e8e);
		background: -webkit-gradient(linear,left,from(#66ad9e),right(#4c9e8e));
		background: -webkit-linear-gradient(left, #66ad9e, #4c9e8e);
		background: -o-linear-gradient(left, #66ad9e, #4c9e8e);
	}
	.gradientsix{
		background: -moz-linear-gradient(left, #df737d, #d05050);
		background: -webkit-gradient(linear,left,from(#df737d),right(#d05050));
		background: -webkit-linear-gradient(left, #df737d, #d05050);
		background: -o-linear-gradient(left, #df737d, #d05050);
	}
	.gradientseven{
		background: -moz-linear-gradient(left, #dd6f87, #b14a58);
		background: -webkit-gradient(linear,left,from(#dd6f87),right(#b14a58));
		background: -webkit-linear-gradient(left, #dd6f87, #b14a58);
		background: -o-linear-gradient(left, #dd6f87, #b14a58);
	}
	.bj_bank{
		width: 100%;
		overflow:hidden;
		background:url(../assets/img/yinhang002.png) no-repeat center;
		background-size:90% 100%;
		font-size: 17px;
		text-align: center;
		vertical-align: middle;
		min-height: 120px;
		line-height: 120px;
		font-family: PingFangSC-Medium, sans-serif;
		color: #000;
	}
	.desBj_bank{
		width: 100%;
		overflow:hidden;
		background:url(../assets/img/yinhang002.png) no-repeat center;
		background-size:90% 100%;
		font-size: 17px;
		text-align: center;
		vertical-align: middle;
		min-height: 120px;
		line-height: 120px;
		font-family: PingFangSC-Medium, sans-serif;
		color: #000;
	}
	.but_box{
		width:90%;
		margin:25px auto ;
		overflow: hidden;
	}
	.but_sty{
		width:40%;
		line-height: 40px;
		color:#fff;
		font-size: 16px;
		text-align: center;
		background-color: #ff6c39;
		float: left;
		border-radius: 5px;
		margin-left: 6.5%;
	}
	.but_right{
		float: right;
		margin-left: 0;
		margin-right: 6.5%;
		background-color: #3ca8ee;
	}
	.bank_sty_text{
		width:90%;
		margin: auto;
		line-height: 22px;
		font-size: 12px;
		color:#acb2b8;
		background:url(../assets/deposits_img/yuan.png) no-repeat left 10px;
		background-size: 5px 5px;
		padding-left: 12px;
	}
	/*上海银行--css*/
	.input_wrapper{
		height: 48px;
		width: 90%;
		border: solid 1px #b3b3b3; 
		text-align: left;
		margin-top: 25px;
		margin-left: 5%;
		font-size: 14px;
		color: #acb2b8;
		font-family: PingFang-SC-Medium;
		margin-bottom: 32px;
	}
	.time{
		width: 26%;
		text-align: center;
		height: 32px;
		line-height: 32px;
		color: #ff6c39;
		font-size: 12px;
		float: right;
		/*border: solid 1px #b3b3b3; */
		border-radius: 6px;
		margin-right: 2%;
		margin-top: 7px;
	}
	.code_show{
		font-size: 12px;
		margin-left: 5%;
		margin-top: 12px;
		margin-bottom: -6px;
		color: #acb2b8;
	}
	.code_show span{
		color: #000;
	}
</style>
