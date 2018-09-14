<template>
	<div class="my_wealth">
		<div class="swiper-container account_box">
		    <div class="swiper-wrapper">
		    	<!-- 总资产 -->
		        <div class="swiper-slide account_bj">
		        	<div class="account_title">
		        		<div class="title_name">总资产</div>
		        		<div class="member_box"><img class="member_img" src="../assets/img/huiyuan002.png">{{memberName}}会员</div>
		        	</div>
		        	<div class="account_money">
		        		<div class="account_money_num" @click="totalAssatFum" v-if="money_reveal">{{assetList.totalAsset | num}}</div>
		        		<div class="account_money_num" @click="totalAssatFum" v-else>{{NoInvestmentNum}}</div>
		        		<div class="accound_money_but" v-if="money_reveal" @click="revealFun"></div>
		        		<div class="accound_money_but_a" v-else @click="revealFun"></div>
		        	</div>
		        	<div class="earnings_box">
		        		<div class="earnings_left">
		        			<div class="earnings_name">今日总收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{assetList.dayProfit | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        		<div class="earnings_right">
		        			<div class="earnings_name">累计收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{assetList.accumulatedIncome | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        	</div>
		        </div>
		        <!-- 普通账户 -->
		        <div class="swiper-slide account_bj">
		        	<div class="account_title">
		        		<div class="title_name">普通账户</div>
		        		<div class="member_box"><img class="member_img" src="../assets/img/huiyuan002.png">{{memberName}}会员</div>
		        	</div>
		        	<div class="account_money">
		        		<div class="account_money_num" @click="totalAssatFum" v-if="money_reveal">{{commonList.totalAsset | num}}</div>
		        		<div class="account_money_num" @click="totalAssatFum" v-else>{{NoInvestmentNum}}</div>
		        		<div class="accound_money_but" v-if="money_reveal" @click="revealFun"></div>
		        		<div class="accound_money_but_a" v-else @click="revealFun"></div>
		        	</div>
		        	<div class="earnings_box">
		        		<div class="earnings_left">
		        			<div class="earnings_name">今日收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{commonList.dayIncome | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        		<div class="earnings_right">
		        			<div class="earnings_name">待收收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{commonList.totalIncome | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        	</div>
		        </div>
		        <!-- 存管账户 -->
		        <div class="swiper-slide account_bj" >
		        	<div class="account_title" style="margin-bottom:0;">
		        		<div class="title_name">存管账户</div>
		        		<div class="member_box"><img class="member_img" src="../assets/img/huiyuan002.png">{{memberName}}会员</div>
		        	</div>
		        	<div class="account_money">
		        		<div v-if="deposithave">
		        			<div class="account_money_num" @click="totalAssatFum" v-if="money_reveal">{{depositList.totalAsset | num}}</div>
		        			<div class="account_money_num" @click="totalAssatFum" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        		<div class="account_money_num" @click="openDeposit" style="font-size:18px;" v-else>请先开通存管账户 ></div>
		        		<div class="accound_money_but" v-if="money_reveal" @click="revealFun"></div>
		        		<div class="accound_money_but_a" v-else @click="revealFun"></div>
		        	</div>
		        	<div class="earnings_box" style="margin-top:10px;">
		        		<div class="earnings_left">
		        			<div class="earnings_name">今日收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{depositList.dayProfit | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        		<div class="earnings_right">
		        			<div class="earnings_name">待收收益</div>
		        			<div class="earnings_money" v-if="money_reveal">{{depositList.totalIncome | num}}</div>
		        			<div class="earnings_money" v-else>{{NoInvestmentNum}}</div>
		        		</div>
		        	</div>
		        	<div class="account_depository_but" v-if="deposithave">
		        		<div class="account_but" @click="depositRecharge">充值</div>
		        		<div class="account_but account_depository_left" @click="depositWithdraw">提现<span class="account_but_span">(可提<span v-if="money_reveal">{{depositList.canAvailableBalance | num}}</span><span v-else>{{NoInvestmentNum}}</span>元)</span></div>
		        	</div>
		        </div>
		    </div>
		    <div class="swiper-pagination"></div>
		    <div class="swiper_hint" v-show="swiperHintShow">滑动可查看更多哦！</div>
		</div>
		
		<!-- 奖励账户 -->
		<div class="award_account_box" @click="awardWithdraw">
			<div class="award_name">奖励账户余额  </div>
			<div class="award_money" v-if="money_reveal">可提{{awardList.availableBalance | num}}  </div>
			<div class="award_money" v-else>可提{{NoInvestmentNum}}  </div>
		</div>
		<!-- 按钮 -->
		<div class="function_box">
			<div class="function_sty" >
				<div class="function_but" @click="calendarFum">
					<img class="function_but_left" src="../assets/img/account0001.png">
					<div class="function_but_rihgt">
						<div class="funbut_name">到账日历</div>
						<div class="funbut_hint" v-if="dueCount>0">下笔标的到账<br>{{dueTime}}</div>
					</div>
				</div>
				<div class="funbut_but" @click="investRecordFun">
					<img class="function_but_left" src="../assets/img/account0002.png">
					<div class="function_but_rihgt">
						<div class="funbut_name">投资记录</div>
						<div class="funbut_hint">收/支资金记录</div>
					</div>
				</div>
			</div>
			<div class="function_sty">
				<div class="function_but" @click="fundDetailFun	">
					<img class="function_but_left" src="../assets/img/account0003.png">
					<div class="function_but_rihgt">
						<div class="funbut_name">资金明细</div>
						<div class="funbut_hint">交易记录明细</div>
					</div>
				</div>
				<div class="funbut_but" @click="collectDetailFun">
					<img class="function_but_left" src="../assets/img/account0004.png">
					<div class="function_but_rihgt">
						<div class="funbut_name">待收明细</div>
						<div class="funbut_hint">待收资产详情</div>
					</div>
				</div>
			</div>
		</div>
		<!-- border -->
		<div class="border_box" style="margin-top:12px;"></div>
		<div class="wealth_sty" @click="couponUrlFun">优惠券</div>
		<div class="wealth_sty wealth_sty_one" @click="bankUrl">银行卡</div>
		<div class="wealth_sty wealth_sty_two" @click="accountUrlFun">账户安全</div>
		<div class="border_box"></div>
		<div class="award_account" style="border:none;">
			<div class="award_name">我的VIP等级  </div>
			<div class="grade_box"><img class="member_img" src="../assets/img/huiyuan002.png">{{memberName}}会员</div>
		</div>
		<div class="border_box"></div>
		<!-- 是否登录 -->
		<div class="black" v-show="!loginUser"></div>
		<div class="login" v-show="!loginUser">
			<div class="login_img">
				<img class="logo_img" src="../assets/img/found_logo.png" width="90" height="34">
				<div class="login_text">安全·放心·透明</div>
			</div>
			<div>
				<div class="fl login01" @click="changelogin">登录</div>
				<div class="fr register01" @click="changeregister">注册</div>
			</div>
		</div> 
		<V_Footer></V_Footer>
		<div class="blackBack" style="line-height:600px;text-align:center;color:#fff;font-size: 14px;" v-show="dredgeShow">开户中...</div>
	</div>
</template>
<script>
	import V_Footer from '../components/Footer.vue'
	import V_Loading from '../components/Loading.vue'
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'my_wealth',
		data () {
			return {
				dredgeShow:false, //
				deposithave:false, //
				loginUser:false, //是否登录
				swiperHintShow:true, //
				money_reveal:true, //金额是否显示
				failUrl : '',    //存管失败地址
				assetList : [],    //总资产
				commonList : [],    //普通账户
				depositList : [],    //存管账户
				awardList : [],    //奖励账户
				NoInvestmentNum:'0.00',  //未投资
				memberName : "1",
				dueCount :0,
				dueTime:''

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
		methods:{
			/*to开通存管账户*/
			openDeposit(){
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
						this.$toast(res.data.msg.replace("业务处理错误:",""))
					}
				})
				//this.$router.push({ path: '/bindcard' })
			},
			/*到登录页面--事件*/
			changelogin(){
				this.$router.push({ path: '/login' })
			},
			/*账户安全--事件*/
			accountUrlFun(){
				this.$router.push({ path: '/accountsecurity' })
			},
			/*到账日历*/
			calendarFum(){
				HC.setStorage("skipUrl",window.location.href.split("#/")[0]);
				window.location.href = this.Https + "/mobile/depository/my_financing/account_calendar.html?app_token="+this.token+"&weixin=weixin";
			},
			/*投资记录*/
			investRecordFun(){
				HC.setStorage("skipUrl",window.location.href.split("#/")[0]);
				window.location.href = this.Https + "/mobile/depository/my_financing/financing/invest_record.html?app_token="+this.token+"&weixin=weixin";
				/*this.$router.push({ path: '/fixedinvestmentrecord' })*/
				/*window.location.href = this.Https + "/mobile/depository/my_financing/account_calendar.html?app_token="+this.token+"&weixin=weixin";*/
			},
			/*待收明细*/
			collectDetailFun(){
				HC.setStorage("skipUrl",window.location.href.split("#/")[0]);
				window.location.href = this.Https + "/mobile/depository/my_financing/collect_detail.html?app_token="+this.token+"&weixin=weixin";
			},
			/*资金明细*/
			fundDetailFun(){
				window.location.href = this.Https + "/mobile/depository/my_financing/fund_detail.html?app_token="+this.token+"&weixin=weixin";
			},
			/*总资产*/
			totalAssatFum(){
				window.location.href = this.Https + "/mobile/depository/my_financing/total_assets.html?app_token="+this.token+"&weixin=weixin";
			},
			/*银行卡跳转*/
			bankUrl(){
				this.$router.push({ path: '/bank' })
			},
			/*调到APP优惠券页面*/
			couponUrlFun(){
				window.location.href = this.Https + "/mobile/my_financing/coupon.html?app_token="+this.token+"&weixin=weixin";
			},
			/*奖励账户*/
			awardWithdraw(){
				if (this.awardList.availableBalance == 0) {
					this.$toast("无可提现金额")
				}else{
					window.location.href = this.Https +"/mobile/depository/my_financing/award_account.html?weixin=weixin&app_token="+this.token+"&skipUrl="+window.location.href.split("#/")[0]
					/*this.$router.push({ path: '#/withdrawal' })*/
				}
			},
			/*存管充值*/
			depositRecharge(){
				this.$router.push({ path: '/deprecharge' })
			},
			/*存管提现*/
			depositWithdraw(){
				if (this.depositList.canAvailableBalance == 0) {
					this.$toast("无可提现金额")
				}else{
					this.$router.push({ path: '/depwithdrawal' })
				}
			},
			/*到注册页面--事件*/
			changeregister(){
				this.$router.push({ path: '/register' })
			},
			/*金额是否显示*/
			revealFun(){
				this.NoInvestmentNum = "***";
				this.money_reveal = !this.money_reveal;
			},
			/*没有到期数据时*/
			noDue(){
				this.$toast({
					message: '暂无标的到期，赶快投资吧！',
					position: 'bottom',
					duration: 2000
				})
			},
			/*获取基本数据*/
			dataFun(){
				//总资产
				axios.post(this.rootBase+'/assets/combine/total/user', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
						this.loginUser = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		this.assetList = res.data.result;
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//会员的等级
				axios.post(this.rootBase+'/member/user/grade', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
						this.loginUser = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		if(res.data.result.name=="V2"){
				  			this.memberName = 2;
				  		}else if(res.data.result.name=="V3"){
				  			this.memberName = 3;
				  		}else if(res.data.result.name=="V4"){
				  			this.memberName = 4;
				  		}else {
				  			this.memberName = 1	;
				  		}
				  		
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//普通账户 /assets/combine/total/ondemand
				axios.post(this.rootBase+'/assets/combine/fixed', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
						this.loginUser = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		this.commonList = res.data.result;
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//存管账户
				axios.post(this.rootBase+'/assets/depository/total/user', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
						this.loginUser = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		this.depositList = res.data.result;
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//奖励账户余额
				axios.post(this.rootBase+'/assets/combine/total/ondemand', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		this.awardList = res.data.result;
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//是否有到账日历
				axios.post(this.rootBase+'/financing_project_bid/due_bid_hint', {
				  	app_token:this.token
				})
				.then((res)=>{
					if(res.data.code == "TOKEN_ERROR"){
				  		this.NoInvestmentNum = "0.00";
						this.money_reveal = false;
						this.loginUser = false;
				  	}else if(res.data.code == "SUCCESS"){
				  		if(res.data.result.count > 0){
							this.dueCount = res.data.result.count;
							this.dueTime = (res.data.result.dueDate).split(' ')[0];
						}
				  	}else{
				  		this.$toast(res.data.msg)
				  	}
				})
				//是否开通存管账户
			  	axios.post(this.rootBase+'/account/depository/is_has', {
		  			app_token:this.token 
				})
				.then(res =>{
				  	if(res.data.result === true){
				  		this.deposithave = true;
				  	}else{
				  		this.deposithave = false;
				  	}
				})



			}
			
		},
		components:{
			V_Footer,
			V_Loading
		},
		mounted(){ 
			/*this.token = this.getCookie('sessionToken');*/
			this.failUrl = window.location.href;
			this.token = HC.getStorage('sessionToken');
			if(this.token == "" || this.token == null){
			  this.loginUser = false;
			}else{
			  this.loginUser = true;
			}
			setTimeout(()=>{
				this.swiperHintShow = false;
			},2500)
			this.dataFun();
			var mySwiper = new Swiper('.swiper-container', {
				autoplay :false,
				mousewheel: true,
				spaceBetween : 10,
				pagination: {
					el: '.swiper-pagination',
				},
			})
		}
	}
</script>
<style>
	.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
	    bottom: 4px;
	}
	.swiper-pagination-bullet{
		width: 10px;
	    height: 3px;
	    background: #99ddff;
	    opacity: 0.4;
	    border-radius: 0;
	}
	.swiper-pagination-bullet-active{
		width:20px;
	    background: #1aabff ;
	    opacity: 1
	}
</style>
<!-- -->
<style scoped>
	.my_wealth{
		width: 100%;
		margin-bottom: 49px;
		overflow: auto;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	/*黑色遮罩*/
	.blackBack{
	   position: fixed;
	   top : 0;
	   left : 0;
	   width: 100%;
	   height: 100%;
	   background-color: #010101;
	   opacity: 0.4;
	   z-index: 100000;
	}
	.black{
		width: 100%;
		height: 90%;
		background: #000;
		position: fixed;
		top: 0;
		z-index: 5;
		opacity: 0.4;
	}
	.login{
		width: 100%;
		background: #FFF;
		position: fixed;
		z-index: 6;
		bottom: 49px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f5f5f5;
	}
	.login .logo_img{
		margin-left: 35%;
		margin-top: 20px;
	}
	.login .login_text{
		width: 90px;
		margin-left: 36%;
		text-align: center;
		height: 20px;
		line-height: 20px;
		border: 1px solid #CCC;
		border-radius: 10px;
		font-size: 12px;
		color: #999;
		margin-top: 8px;
		margin-bottom: 10px;
	}
	.login .login01{
		width: 40%;
		height: 30px;
		line-height: 30px;
		background: #ff6c39;
		color: #FFF;
		text-align: center;
		border-radius: 5px;
		margin-left: 5%;
		margin-top: 10px;
		margin-bottom: 10px;
	} 
	.login .register01{
		width: 40%;
		height: 30px;
		line-height: 30px;
		color: #ff6c39;
		text-align: center;
		border-radius: 5px;
		margin-left: 5%;
		margin-top: 10px;
		border: 1px solid #ff6c39;
		margin-right: 5%;
		margin-bottom: 10px;
	} 
	.header{
		position: fixed;
		top: 0;
		width: 100%;
		padding: 11px 0;
		background: #3ca8ee;
		text-align: center;
		color: #FFF;
		z-index: 4;
	}
	/*头部*/
	.account_box{
	    width: 92%;
	    margin:8px auto;
	    height: 200px;
	    position: relative;
	}
	.account_bj{
		height: 174px;
		background:url(../assets/img/account001.png) no-repeat center;
	    background-size: 100% 100%;
	}
	.account_title{
		width:100%;
		overflow: hidden;
		height: 20px;
		line-height: 20px;
		margin: 15px 0;
		color:#fff;
	}
	.title_name{
		float: left;
		font-size: 14px;
		padding-left: 12px;
		letter-spacing:2px;
	}
	.member_box{
		float: left;
		margin-left: 4px;
		font-size: 10px;
		height: 16px;
		line-height: 16px;
		margin-top: 2px;
		padding:0 6px;
		background:url("../assets/img/huiyuan001.png") no-repeat center;
		background-size:100% 100%; 
		color: #000;
	}
	.account_depository_but{
	    width: 100%;
	    overflow: hidden;
	    margin-top: 6px;
	}
	.account_but{
		float: right;
		margin-right: 10px;
		height: 24px;
		line-height: 22px;
		font-size: 12px;
		color: #fff;
		background-color: #0384ff;
		text-align: center;
		padding:0 8px;
		border-radius: 10px;
	}
	.account_but_span{
		font-size: 10px;
		color: #b3d1ff;
	}
	.account_depository_left{
		margin-right:4px;
		float:left;
		margin-left:10px;
	}
	.swiper_hint{
		width: 130px;
		text-align: center;
		color: #fff;
		border-radius: 10px;
		line-height: 21px;
		height:22px;
		font-size: 12px;
		background-color: #d9d9d9;
		position: absolute;
		bottom: 0;
		left:50%;
		z-index: 100;
		margin-left: -65px;
	}
	.grade_box{
		float: right;
	    margin-left: 4px;
	    font-size: 10px;
	    height: 20px;
	    line-height: 18px;
	    margin-top: 18px;
	    padding: 0 6px;
	    background: url("../assets/img/huiyuan001.png") no-repeat center;
	    background-size: 100% 100%;
	    color: #000;
	    margin-right:10%;
	}
	.member_img{
		width:10px;
		height:10px;
	}
	.account_money{
		width: 100%;
		overflow: hidden;
		color: #fff;
		height:50px;
	}
	.account_money_num{
		width:80%;
		padding-left: 12px;
		font-size: 34px;
		line-height: 50px;
		float: left;
	}
	.accound_money_but{
		width:24px;
		height: 24px;
		float: left;
		background: url("../assets/img/moeny_show.png") no-repeat center;
		background-size: 100% 100%;
	    margin: 12px 0;
	}
	.accound_money_but_a{
		width:24px;
		height: 24px;
		float: left;
		background: url("../assets/img/money_hide.png") no-repeat center;
		background-size: 100% 100%;
	    margin: 12px 0;
	}
	.earnings_box{
		width: 100%;
		overflow: hidden;
		margin-top: 20px;
	}
	.earnings_left{
		float: left;
		margin-left: 12px;
	}
	.earnings_right{
		float: right;
		margin-right: 12px;
	}
	.earnings_name{
		font-size: 12px;
		color:#aad9ff;
		letter-spacing:1px;
	}
	.earnings_money{
		color:#fff;
		font-size: 14px;
	}
	.award_account{
		width:94%;
		box-sizing: border-box;
		margin-left: 6%;
		overflow:hidden;
		height: 56px;
		border-bottom:solid 1px #dcdce0;
		line-height: 56px;
		background:url("../assets/img/account0008.png") no-repeat left center,url("../assets/img/my_right.png") no-repeat 95% center;
		background-size:20px, 8px 14px;
		padding-left: 30px;
	} 
	.award_account_box{
		width:94%;
		box-sizing: border-box;
		margin-left: 6%;
		overflow:hidden;
		height: 56px;
		border-bottom:solid 1px #dcdce0;
		line-height: 56px;
		background:url("../assets/img/my_right.png") no-repeat 95% center;
		background-size: 8px 14px;
	} 
	.award_name{
		float: left;
		font-size: 15px;
		color: #203542;
	}
	.award_money{
		color:#333333;
		float: right;
		font-size: 14px;
		margin-right:40px;
	}
	.function_box{
		width:100%;
		overflow: hidden;
		border-top: solid 7px #f5f5f9;
	}
	.function_sty{
		width:94%;
		margin:auto;
		overflow: hidden;
		padding-top: 12px;
		box-sizing:border-box;
	}
	.function_but{
		width:49%;
		float: left;
		overflow: hidden;
		min-height: 62px;
		height: 74px;
		border-radius: 4px;
		box-sizing:border-box;
		border:solid 1px #f3f3f3;
		box-shadow: 0px 0px 1px #e0e0e0;
	}
	.funbut_but{
		width:49%;
		float: left;
		overflow: hidden;
		min-height: 62px;
		margin-left: 2%;
		height: 74px;
		border-radius: 4px;
		box-sizing:border-box;
		border:solid 1px #f3f3f3;
		box-shadow: 0px 0px 1px #e0e0e0;
	}
	.function_but_left{
	    float: left;
	    width: 46px;
	    display: block;
	    margin-left: 6px;
	    margin-top: 14px;
	}
	.function_but_rihgt{
		float: left;
		margin-left: 6px;

	}
	.funbut_name{
		font-size: 15px;
		color: #203542;
		margin-bottom: 4px;
		margin-top: 12px;
	}
	.funbut_hint{
		font-size: 12px;
		color: #646464;
	}
	.border_box{
		width:100%;
		height:7px;
		background-color: #f6f5fa;
	}
	.wealth_sty{
		width:94%;
		overflow:hidden;
		height: 60px;
		border-bottom:solid 1px #f5f4f9;
		line-height: 60px;
		background:url("../assets/img/account0005.png") no-repeat left center,url("../assets/img/my_right.png") no-repeat 95% center;
		background-size:20px, 8px 14px;
		font-size: 16px;
		margin-left: 6%;
		box-sizing: border-box;
		padding-left: 30px;
	}
	.wealth_sty_one{
		background:url("../assets/img/account0006.png") no-repeat left center,url("../assets/img/my_right.png") no-repeat 95% center;
		background-size:20px, 8px 14px;
	}
	.wealth_sty_two{
		background:url("../assets/img/account0007.png") no-repeat left center,url("../assets/img/my_right.png") no-repeat 95% center;
		background-size:20px, 8px 14px;
	}


</style>
