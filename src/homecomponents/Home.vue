<template>
  <div class="home">
	<div class="header_box" v-if="loginUser">
		<div class="head_item_money fl">
			<span class="span01">累计收益</span>
			<span class="span02">{{totalEarnings}}元</span>
		</div>
		<div class="head_item_xiao fr" @click="MessageCenter">
			<div class="topred" v-if="totalNews > 0">
				<span></span>
			</div>
		</div>
	</div>
	<div class="header_box" v-else>
		<div class="head_item_left" @click="changeRouterLogin"></div>
		<!-- <div class="head_item_right" @click="changeRouterLogin"></div> -->
		<div class="head_item_xiao fr" @click="MessageCenter">
			<div class="topred" v-if="totalNews > 0">
				<span></span>
			</div>
		</div>
	</div>

	<div class="swipe">
		<mt-swipe :auto="4000" >
		<mt-swipe-item v-for="item in bannerData">
		  <div @click="change(item)">
		  	<img :src="item.imageUrl" class="swipe_img">
		  </div>
		</mt-swipe-item>
		</mt-swipe>
	</div>
	<div @click='test'>jjjjjjjjjjjjjj</div>
	<div class="affiche_box" v-if="taget_summery_show">
		<div class="item_max">
    		<div class="item_box">
        		<div class="item_inte">{{taget_summery.content}}</div>
        		<div class="item_inte">{{taget_summery.content}}</div>
        	</div>
    	</div>
    	<div class="affiche_close" v-if="taget_summery_colse" @click="tagetSummeryColseFun"></div>
	</div>
	<div class="nav_box">
		<a @click="disclosure" class="item_nav">
			<div><img src="../assets/img/profile.png" height="40" width="40"></div>
			<div>信息披露</div>
		</a>
		<a @click="raffleFun" class="item_nav" v-if="loginUser">
			<div><img src="../assets/img/raffle.png" height="40" width="40"></div>
			<div>会员积分</div>
			<div class="topred" v-show="shareTrue">
			</div>
		</a>
		<a @click="changeRouterLogin" class="item_nav" v-else>
			<div><img src="../assets/img/raffle.png" height="40" width="40"></div>
			<div>会员积分</div>
			<div class="topred" v-show="shareTrue">
			</div>
		</a>

		<a @click="invitefriendsFun" class="item_nav" v-if="loginUser">
			<div><img src="../assets/img/invite.png" height="40" width="40"></div>
			<div>邀请好友</div>
			<div class="topred" v-show="shareTrue">
			</div>
			
		</a>
		<a @click="changeRouterLogin" class="item_nav" v-else>
			<div><img src="../assets/img/invite.png" height="40" width="40"></div>
			<div>邀请好友</div>
			<div class="topred"></div>
		</a>
		<router-link to="/helpfeedback" class="item_nav">
			<div><img src="../assets/img/help_back.png" height="40" width="40"></div>
			<div>帮助反馈</div>
			<div class="topred" v-show="serviceTrue">
			</div>
		</router-link>
	</div>
	<!-- 累计注册 -->
	<div class="accumulative_box">累计注册<span class="accumulative_box_span">{{totalObj.registerUserNum}}万人</span>，累计交易<span class="accumulative_box_span">{{totalObj.amount}}亿元</span></div>

	<div class="main_box" v-if="newUser">
		<div  @click="toDetails(homeMark)">
			<div class="main_name">{{homeMark.name}}</div>
			<div class="main_rating01">预期年化</div>
			<div class="main_rating02">{{homeMark.annualizedRates}}<span>%</span></div>
			<div class="newPerson">新用户注册即送888元现金红包</div>
			<ul class="main_ul">
				<li>本息保障</li>
				<li><span>{{homeMark.minAmount}}</span>元起投</li>
				<li><span>{{homeMark.period}}</span>天定期</li>
			</ul>
		</div>
		<div class="main_btn">
			<div v-if="loginUser" @click="purchase">立即投资</div>
			<router-link to="/login" v-else>立即投资</router-link>
		</div>
	</div>

	<div class="main_box" v-else>
		<div @click="toDetails(homeMark)">
			<div class="main_name">{{homeMark.name}}</div>
			  <div class="main_rating01">预期年化</div>
			  <div class="main_rating02">{{homeMark.annualizedRates}}<span>%</span></div>
			  <div class="main_title02 clear" style="margin-bottom: 10px;">各种优惠券等你拿</div>
			  <ul class="main_ul">
				<li v-if="homeMark.annualizedRatePlus == 0">本息保障</li>
				<li v-else>额外加息<span>{{homeMark.annualizedRatePlus}}%</span></li>
				<li>稳定收益</li>
				<li>{{homeMark.period}}天定期</li>
			  </ul>
		</div>
		<div class="main_btn">
		  	<div v-if="loginUser && RiskWarningShowBtn && RiskWarningShowBtnTwo"  @click="goWarning">立即投资</div>	
		  	<div v-else-if="loginUser && !RiskWarningShowBtn && RiskWarningShowBtnTwo" @click="purchase">立即投资</div>
			<div v-else-if="loginUser && !RiskWarningShowBtnTwo" @click="purchase">立即投资</div>
			<router-link v-else to="/login" >立即投资</router-link>
		</div>
	</div>
  	<div class="footer">
  		<ul>
  			<li class="item_footer">
  				<router-link to="/home" class="item_nav router-link-active">
  					<div class="bg01"></div>
  					<div>首页</div>
  				</router-link>
  			</li>
  			<li class="item_footer">
  				<router-link to="/financial" class="item_nav">
  					<div class="bg02"></div>
  					<div>理财</div>
  				</router-link>
  			</li>
  			<li class="item_footer">
  				<router-link to="/mywealth" class="item_nav">
  					<div class="bg03"></div>
  					<div>我的财富</div>
  				</router-link>
  			</li>
  			<li class="item_footer">
  				<router-link to="/found" class="item_nav">
  					<div class="bg04"></div>
  					<div>发现</div>
  				</router-link>
  			</li>
  		</ul>
  	</div>

  	<!-- 测评 -->
	<div class="black_two" v-show="riskShow" @click="closeRisk"></div>
	<div class="wapper_risk" v-show="riskShow">
		<div class="close_btn" @click="closeRisk">
			<img src="../assets/deposits_img/puch11.png" height="16" width="16">
		</div>
		<div class="text text_tip">您还没有进行过风险测评，做好风险测评，了解自己的风险承受能力，选择合适的理财产品</div>
		<div class="text text_tip">我是:</div>
		<div class="risk_btn" v-for="item in measurementList">
			<div class="risk_btn_one" @click="conservative(item)">{{item.grade}}</div>
			<div class="risk_tip">投资建议:0-{{item.amountLimit/10000}}万</div>
		</div>
		<div class="line_one"></div>
		<div class="risk_btn_two" @click="goRiskAssessment">自主测评(进入测评答题系统)</div>
	</div>
	<!-- 风险提示 -->
	<div class="black_three" v-show="!RiskWarningShow" @click="closekWarning"></div>
	<div class="warning" v-show="!RiskWarningShow">
		<div class="close_btn" @click="closekWarning">
			<img src="../assets/deposits_img/puch11.png" height="16" width="16">
		</div>
		<div class="warning_head">投资建议</div>
		<div class="warning_tip">所购买的标的已超出您的风险承受能力，请谨慎选择哦！</div>
		<div class="warning_btn" @click="purchase">知道了，就要买</div>
	</div>
  </div>

</template>

<script>

import {
    mapGetters,
    mapActions
 } from "vuex";


import V_Footer from '../components/Footer.vue'
import store from '../vuex/store.js'
import axios from 'axios'

 
export default {
  name: 'home',
  data () {
	return {
	  totalObj:{},
	  taget_summery:{},
	  bannerData:'',
	  newUser:true,
	  homeMark:[],       //首页标的数据
	  token:'',
	  targetId:'',       //标的ID
	  targetName:'',	 //标的名称
	  totalEarnings:'',
	  totalNews:'',
	  taget_summery_show:false,
	  taget_summery_colse:false,
	  loginUser:false,
	  serviceTrue:false,
	  shareTrue:false,     //分享红点
	  shareTrueOne:false,
	  shareTrueTwo:false,
	  risk:false,              //是否测评
	  riskShow:false,           //显示测评弹框
	  measurementList:[],		  //测评类型以及数据
	  borrowerInfo:'',          //实地考察数据
	  RiskWarningShow:true,     //是否向用户有过风险提示
	  RiskWarningShowBtn:false, //是否向用户有过风险提示按钮
	  RiskWarningShowBtnTwo:false, //是否向用户有过风险提示按钮
	  alreadyMoney:0,           //已投总金额
	  riskname:'',              //投资风险类型
	  limitMoney: 0,            //投资风险类型--对应的限额
	  inspectionShow:false    //是否显示实地考察判断字段
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
	V_Footer
  },
  methods:{
  	...mapActions({
	  test: 'test'
	}),
  	// ...mapActions(['test']),
  	/*关闭公告*/
  	tagetSummeryColseFun(){
  		this.taget_summery_show = false;
  		 HC.setStorage("tagetSummeryColse",this.taget_summery.uuid);
  	},
  	/*首页banner到活动页面--事件*/
  	change(item){
		if(item.action=="token_h5"){
			if(this.token==''){
				this.$router.push({ path: '/login' })
			}else{
				if (item.linkUrl.contains("?")){
                    window.location.href = item.linkUrl+"&app_token="+this.token+"&weixin="+'weixin';
				}else {
                    window.location.href = item.linkUrl+"?app_token="+this.token+"&weixin="+'weixin';
                }
			}
		}else if(item.action=="h5"){
			window.location.href = item.linkUrl;
		}
	},
	closeRisk(){
		this.riskShow = false;
	},
	/*到测评页面进行测评*/
	goRiskAssessment(){
		this.$router.push({ name: 'RiskAssessment', params: { userId: this.targetId,bidtype:'common'}})
	},
	/*选择你的理财类型*/
	conservative(item){
		axios.post('/api/v2/risk_preference_assessment/save_risk_type',{
			app_token : this.token,
			riskType: item.type
		})
		.then((res)=>{
			if(res.data.code=="SUCCESS"){
				this.$router.push({ name: 'MeasurementResults', params: { userId: this.userId,bidtype:'common'}})		
			}
		})
	},
	/*到信息披露页面--事件*/
	disclosure(){
		window.location.href = this.Https+"/mobile/info_disclosure/info_company_profile.html?weixin="+'weixin';
	},
	/*到积分商城--事件*/
	raffleFun(){
		this.pointsFun()
		window.location.href = this.Https+"/mobile/integral_store/integral_index.html?weixin="+'weixin';
	},
	/*到邀请好友*/
	invitefriendsFun(){
		window.location.href = this.Https+"/mobile/activity/invitefriends/new_invite_friends.html?weixin="+'weixin';
	},
	/*修改抽奖次数提示+修改积分提醒--事件*/
	pointsFun(){
		//修改抽奖次数提示
		axios.post(this.rootBase+'/lottery/points/modify_reminder', {
			token: this.token
		})
		.then(res =>{
		  	console.log("修改抽奖次数提示");
		})
		.catch(res=> {
			console.log(res);
		});
		//修改积分提醒
		axios.post(this.rootBase+'/point/account/modify_reminder', {
			token: this.token
		})
		.then(res =>{
		  	console.log("修改积分提醒");
		})
		.catch(res=> {
			console.log(res);
		});
	},
	/*到登录模块--事件*/
	changeRouterLogin(){
		this.$router.push({ path: '/login' })
	},
	/*到消息中心--事件*/
	MessageCenter(){
	  /*this.$router.push({ path: '/messagecenter' })*/
		HC.setStorage("skipUrl",window.location.href.split("#/")[0]);
		window.location.href = this.Https + "/mobile/notice/notice.html?app_token="+this.token+"&weixin=weixin";
	},
	/*风险提示*/
	goWarning(){
		this.RiskWarningShow = false;
	},
	/*关闭风险提示*/
	closekWarning(){
		this.RiskWarningShow = true;
	},
	riskFun(){
		if(this.token!=''){
			/* 获取用户单个标的总投资*/
		    axios.post('/api/v2/financing_project_bid/user/bid_amount/'+this.targetId, {
		        app_token:this.token,
		        isDepository:false
		    })
		    .then(res =>{
		      	console.log("获取用户单个标的总投资")
		        console.log(res)
		        this.alreadyMoney = +res.data.result;
		    })
		    .catch(res=> {
		        console.log(res);
		    });
			/*风险类型结果*/
			axios.post('/api/v2/risk_preference_assessment/result',{
				app_token : this.token
			})
			.then((res)=>{
				console.log("v2风险偏好结果")
				console.log(res)
				if(res.data.code == "SUCCESS"){
					if(res.data.result.length==2){
						this.risk = true;
						this.riskname = res.data.result[1].grade;
						/*购买限额list*/
					    axios.post('/api/v2/pub/register/open_auth/risk_remind_amount_limit', {
					        
					    })
					    .then(res =>{
					        console.log("购买限额list")
					        console.log(res)
					        res.data.result.forEach((item)=>{
					        	if(this.riskname == item.grade){
					        		this.limitMoney = item.amountLimit;
					        		if(this.alreadyMoney-this.limitMoney<0){
					        			this.RiskWarningShowBtnTwo = false;
					        		}else{
					        			this.RiskWarningShowBtnTwo = true;
					        		}
					        	}
					        })
					    })
					    .catch(res=> {
					        console.log(res);
					    });
					}else{
						this.risk = false;
						this.riskname = "";
					}
				}
				if(res.data.code == "TOKEN_ERROR"){
				  	this.loginUser = false; 
				}
			})
			
		}else{
			
		}
		
	},
	/*到购买页面--事件*/
	purchase(){
		/*if(this.newUser == false && this.newInvestor == true){
			this.$messagebox('提示',"此标的为新人惠标的，您已购买，请继续购买其他理财产品。");
			return;
		}else if(this.risk == false){
			this.riskShow = true;
			return;
		}else{
			this.$router.push({ name: 'Purchase', params: { userId: this.userId}})
		}*/
		if(this.RiskWarningShow == false){
		    axios.post('/api/v2/user_reminder/invest_amount_risk/remind', {
		        app_token:this.token,
		        projectUuid:this.targetId
		    })
		    .then(res =>{
		      	console.log("当前标的投资金额风险是否已提示过")
		        console.log(res)
		    })
		    .catch(res=> {
		        console.log(res);
		    });
	    }
		if(this.risk == false){
			this.riskShow = true;
			return;
		}else{
			this.$router.push({ name: 'Purchase', params: { userId: this.targetId,userName: this.targetName}})
		}
	},
	/*到详情页面--事件*/
	toDetails(homeMark){
		this.$router.push({ path: '/investdetail/'+homeMark.uuid })
	},
	/*进页面就要执行的方法--Two*/
	dataTwoFn(){
		//home标的
		axios.post(this.rootBase+'/open_auth/financing_project/position/HOME/list', {

		})
		.then(res =>{
		  	console.log("v2"+"home标的的数据");
			console.log(res)
			if(this.newUser == false){
				var arr=[];
				res.data.result.forEach((item,index)=>{
					if(item.newInvestor == false){
						arr.push(index);
						this.homeMark = res.data.result[arr[0]];
						this.homeMark.annualizedRates = HC.decimalFun(this.homeMark.annualizedRates,2);
						this.targetId = this.homeMark.uuid;
						this.targetName = this.homeMark.name;
					}
				})
				this.riskFun();
			}
			if(this.newUser == true){
				let newUserNum = 0;
				res.data.result.forEach((item,index)=>{
					if(item.newInvestor == true){
						console.log(index);
						newUserNum = index;
					}
					this.homeMark = res.data.result[newUserNum];
					this.homeMark.annualizedRates = HC.decimalFun(this.homeMark.annualizedRates,2);
					this.targetId = this.homeMark.uuid;
					this.targetName = this.homeMark.name;
				})
				this.riskFun();
			}
			/* 当前标的投资金额风险是否已提示过*/
		    axios.post('/api/v2/user_reminder/invest_amount_risk/is_remind', {
		        app_token:this.token,
		        projectUuid:this.targetId
		    })
		    .then(res =>{
		        if(res.data.result == false){
		        	this.RiskWarningShowBtn = true;
		        }else{
		        	this.RiskWarningShowBtn = false;
		        }
		    })
		    .catch(res=> {
		        console.log(res);
		    });  
			})
			.catch(res=> {
				console.log(res);
			});
	},
	/*进页面就要执行的方法--One*/
	dataFn(){
		//轮播图数据
		axios.post(this.rootBase+'/pub/banner/open_auth/list/APP_HOME', {
		})
		.then(res =>{
			this.bannerData = eval(res.data.result);
		})
		.catch(res=> {
			console.log(res);
		});

		  /*新人惠购买 是否是新人*/
		axios.post(this.rootBase+'/user/is_new_investor', {
			token: this.token
		})
		.then(res =>{
			if (res.data.code == "TOKEN_ERROR") {
				this.newUser = true;
			}
			if(res.data.result == false){
				this.newUser = false;
			}
			if(res.data.result == true){
				this.newUser = true;
			}
			this.$nextTick(() => {
				this.dataTwoFn();
			})

		})
		.catch(res=> {
			console.log(res);
		});
		  //累计收益
		axios.post(this.rootBase+'/assets/combine/total/user', {
			token: this.token
		})
		.then(res =>{
			if(res.data.code == "TOKEN_ERROR" && this.loginUser){
				HC.delStorage("sessionToken");
				this.$router.push({ path: '/login' })
			}
			if(res.data.code == "SUCCESS"){
				this.totalEarnings = HC.decimalFun(res.data.result.accumulatedIncome);
			}
		})
		.catch(res=> {
			console.log(res);
		});
		  //消息条数
		axios.post(this.rootBase+'/notice/type/unread_count', {
			app_token: this.token
		})
		.then(res =>{
			this.totalNews = res.data.result.activityCount+res.data.result.announcementCount+res.data.result.personalCount+res.data.result.systemCount;
		})
		.catch(res=> {
			console.log(res);
		});
		  //客服回馈
		axios.post(this.rootBase+'/feed_back/answer_status', {
			token: this.token
		})
		.then(res =>{
			if(res.data.result.status == 2){
				this.serviceTrue = true;
			}
		})
		.catch(res=> {
			console.log(res);
		});
		  //积分商城红点提示two
		axios.post(this.rootBase+'/point/account/user', {
			token: this.token
		})
		.then(res =>{
	  		if(res.data.result.reminder === false){
				this.shareTrueTwo = false;
			}else{
				this.shareTrueTwo = true;
			}
		  	/**/
		  	//积分商城红点提示one
			axios.post(this.rootBase+'/lottery/points/user_lottery_times', {
				token: this.token
			})
			.then(resd =>{
				if(resd.data.result.newAddReminder == false){
					this.shareTrueOne = false;
				}else{
					this.shareTrueOne = true;
				}
				if(this.shareTrueOne == true || this.shareTrueTwo == true){
					//alert(this.shareTrueOne)
					//alert(this.shareTrueTwo)
					this.shareTrue = true;
				}else{
					this.shareTrue = false;
				}
			})
			.catch(res=> {
				console.log(res);
			});
		  	/**/
				
				
		})
		.catch(res=> {
			console.log(res);
		});
	    /*购买限额list*/
	  	axios.post('/api/v2/pub/register/open_auth/risk_remind_amount_limit', {
	        
	    })
	    .then(res =>{
	        this.measurementList = res.data.result;
	    })
	    .catch(res=> {
	        console.log(res);
	    });
	    /*公告*/
	  	axios.post('/api/v2/notice/open_auth/grave_notice', {
	        
	    })
	    .then(res =>{
			if(res.data.result==""||res.data.result==null||JSON.stringify(res.data.result) == "{}"){
				this.taget_summery = {}
				this.taget_summery_show = false;
			}else{
				this.taget_summery_show = true;
				var taget_uuid = HC.getStorage('tagetSummeryColse') || '';
				if(taget_uuid==''||taget_uuid==res.data.result.uuid){
					this.taget_summery_show = false;
				}
				this.taget_summery = res.data.result;
				var dayTime = new Date();
				var dayNum = Date.daysBetween(this.taget_summery.gmtCreate.replace("-","/"),dayTime);
				if(dayNum>0){
					this.taget_summery_colse = true;
				}else{
					this.taget_summery_colse = false;
				}

			}
	    })
	    .catch(res=> {
	        console.log(res);
	    });
	     /*累计注册*/
	  	axios.post('/api/v2/info_disclosure/operation_data/total', {
	    })
	    .then(res =>{
	    	res.data.result.registerUserNum = parseInt(res.data.result.registerUserNum/10000);
	    	res.data.result.amount = HC.decimalFun(res.data.result.amount/100000000);
	        this.totalObj = res.data.result;
	    })
	    .catch(res=> {
	        console.log(res);
	    });
	}
  },
  mounted(){
  	console.info(123,this.getRootBase)

	this.token = HC.getStorage('sessionToken')||"";
	console.log(this.token);
	if(this.token == "" || this.token == null){
	  this.loginUser = false;
	}else{
	  this.loginUser = true;
	}
	//this.riskFun();
	this.dataFn();
	
  },
  created(){
	setInterval(()=>{
		var itenheight =  $(".item_inte").width();
		$(".item_box").animate({marginLeft:-itenheight-20},10000,function(){
			$(".item_box .item_inte:last").after($(".item_box .item_inte:first"));
			$(".item_box .item_inte:last").css("margin-left","0")
			$(".item_box").css({marginLeft:0})
		})
	},10000);
		
  },
  filters: {

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
	.home{
		background: #f5f5f9;
	}
	.header_box{
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		position: fixed;
		top:0;
		left: 0;
		z-index: 1000;
	}
	.header_box .head_item_left{
		float: left;
		margin-left:3%;
		width: 20px;
		height: 20px;
		background: url('../assets/img/login.png') no-repeat;
		background-size: 100% 100%;
	}
	.header_box .head_item_right{
		float: right;
		margin-right: 3%;
		width: 22px;
		height: 21px;
		background: url('../assets/img/msg.png') no-repeat;
		background-size: 100% 100%;
	}
	.header_box .head_item_money{
		float: left;
		margin-left: 2%;
		height: 20px;
		color: #FFF;
		padding:3px 10px;
		background-color: #000;
		border-radius: 12px;
		opacity: 0.7;
	}
	.header_box .head_item_money .span01{
		font-size: 12px;
	}
	.header_box .head_item_money .span02{
		color:red;
	}
	.header_box .head_item_xiao{
		float: right;
		margin-right: 5%;
		width: 22px;
		height: 21px;
		background: url('../assets/img/msg.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.header_box .head_item_xiao .topred{
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: red;
		right: -4px;
		bottom: 12px;
		text-align: center;
		line-height: 15px;
		color: #FFF;
		font-size: 12px;
	}
	.swipe .swipe_img{
		width: 100%;
		height: 150px;
	}
	@media(min-width:320px){
		.swipe{
			width:100%;
			height:150px;
			text-align: center;
		}
	}
	@media(min-width:360px){
		.swipe{
			width:100%;
			height:178px;
			text-align: center;
		}
		.swipe .swipe_img{
			height: 178px;
		}
	}
	@media(min-width:400px){
		.swipe{
			width:100%;
			height:188px;
			text-align: center;
		}
		.swipe .swipe_img{
			height: 188px;
		}
	}
	.affiche_box{
		width: 100%;
		background: #fff url("../assets/img/home0001.png") no-repeat 12px center;
		background-size:  14px;
		height: 30px;
	}
	.item_max{
		width:76%;
		overflow:hidden;
		margin-left: 30px;
		float: left;
	}
	.item_box{
		width:500%;
		overflow:hidden;
		height: 30px;
		line-height: 30px;
	}
	.item_inte{
		float:left;
		font-size: 12px;
		height: 14px;
		padding-left: 20px;
		color:#999999;
	}
	.affiche_close{
		width: 12%;
		height: 24px;
		float: left;
		border-left: solid 1px #e5e5e5;
		margin-top: 3px;
		margin-left: 2%;
		background: url("../assets/img/home0002.png") no-repeat center;
		background-size:8px;
	}
	
	.nav_box{
		background: #FFF;
		width: 100%;
		overflow: hidden;
		padding-top: 12px;
		padding-bottom: 14px;
		border-bottom: solid 1px #e5e5e5;
		margin-top: 7px;
	}
	.nav_box .item_nav{
		display: block;
		float: left;
		width: 25%;
		text-align: center;
		font-size: 12px;
		color: #acb2b8;
		position: relative;
	}
	.nav_box .item_nav .topred{
		position: absolute;
	    width: 6px;
	    height: 6px;
	    border-radius: 50%;
	    background: red;
	    right: 18px;
	    top: 6px;
	    text-align: center;
	    line-height: 15px;
	    color: #FFF;
    	font-size: 12px;
	}
	.nav_box .item_nav img{
		margin: 4px 0;
	}
	.main_box{
		width: 100%;
		background: #FFF;
		text-align: center;
		font-size: 12px;
		padding-top: 24px;
		padding-bottom: 80px;
	}
	.main_box .main_name{
		font-size: 16px;
		color: #203542;
		font-weight: 700;
		margin-bottom: 6px;
	}
	.main_box .main_rating01{
		font-size: 12px;
		color: #acb2b8;
	}
	.main_box .main_rating02{
		font-size: 40px;
		color: #ff6c39;
		font-weight: 700;
		margin-bottom:6px;
	}
	.main_box .main_rating02 span{
		font-size: 14px;
		font-weight: 700;
	}
	.main_box .main_ul{
		margin-left: 20%;
		color: #acb2b8;
		margin-bottom: 20px;
	}
	.main_box .main_ul li{
		float: left;
	}
	.main_box .main_ul li span{
		color: #ff6c39;
	}
	.main_box .main_ul li:nth-child(1){
		border-right: 1px solid #CCC;
		padding-right: 16px;
	}
	.main_box .main_ul li:nth-child(2){
		border-right: 1px solid #CCC;
		padding-right: 16px;
		padding-left: 16px;
	}
	.main_box .main_ul li:nth-child(3){
		padding-left: 16px;
	}
	.main_box .newPerson{
		clear: both;
		color: #acb2b8;
		margin: auto;
		margin-bottom: 10px;
		border:solid 1px #a7e7fe;
		font-size: 12px;
		color:#a7e7fe;
		height: 20px;
		line-height: 18px;
		border-radius: 10px;
		width:190px; 
		text-align: center;

	}
	.main_box .newPerson span{
		color: #ff6c39;
	}
	.main_box .main_title{
		width: 154px;
		margin: 0 auto;
		height: 19px;
		line-height: 19px;
		margin-top: 20px;
		border-radius: 10px;
		border: 1px solid #3ca8ee;
		color: #3c98ee;
		margin-bottom: 20px;
	}
	.main_box .main_title02{
		width: 154px;
		margin: 0 auto;
		height: 19px;
		line-height: 19px;
		border-radius: 10px;
		border: 1px solid #3c98ee;
		color: #63b9f1;
	}
	.main_box .main_btn{
		width: 80%;
		height: 39px;
		margin: 40px auto 0;
		line-height: 39px;
		background: #17b9ff;
		border-radius: 20px;
		font-size: 16px;
		color: #fff;
		clear: both;
	}
	.main_box .main_btn a{
		display: block;
		width: 100%;
		color: #FFF;
		font-size: 16px;
	}
	.main_box .main_btn div{
		display: block;
		width: 100%;
		color: #FFF;
		font-size: 16px;
	}


	.footer{
		position: fixed;
		bottom: 0;
		background: #FFF;
		width: 100%;
		border-top: 1px solid #f5f5f5;
		padding-top: 10px;
		padding-bottom: 2px;
	}
	.footer .item_footer{
		display: block;
		float: left;
		width: 25%;
		text-align: center;
	}
	.footer .item_footer a{
		font-size: 12px;
		color: #CCC;
		text-decoration:none;
	}
	.footer .item_footer a .bg01{
		width: 20px;
		height: 20px;
		background: url('../assets/img/home.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
	}
	.footer .item_footer .router-link-active{
		color:#00a0e9;
	}
	.footer .item_footer .router-link-active .bg01{
		width: 20px;
		height: 20px;
		background: url('../assets/img/home_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left:38%;
	}
	.footer .item_footer a .bg02{
		width: 20px;
		height: 18px;
		background: url('../assets/img/licai.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
		margin-bottom: 2px;
	}
	.footer .item_footer .router-link-active .bg02{
		width: 20px;
		height: 18px;
		background: url('../assets/img/licai_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
		margin-bottom: 2px;
	}
	.footer .item_footer a .bg03{
		width: 19px;
		height: 20px;
		background: url('../assets/img/mymoney.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer .item_footer .router-link-active .bg03{
		width: 19px;
		height: 20px;
		background: url('../assets/img/mymoney_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer .item_footer a .bg04{
		width: 20px;
		height: 20px;
		background: url('../assets/img/found.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer .item_footer .router-link-active .bg04{
		width: 20px;
		height: 20px;
		background: url('../assets/img/found_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}

	/*v2*/
	.bannerA{
		display: inline-block;
	}
	/*新手引导*/
	.black{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		z-index: 2;
	}
	.newNovice{
		position: fixed;
		z-index: 3;
		top: 0;
		left: 2%;
	}
	.header_new{
		width: 108%;
		padding: 11px 0;
		overflow: hidden;
		/*background: #3ca8ee;*/
	}
	.header_new .head_item01{
		float: left;
		margin-left: 2%;
		width: 22px;
		height: 20px;
		background: url('../assets/img/login.png') no-repeat;
		background-size: 100% 100%;
	}
	/*news邀请好友*/
	.news{
		position: absolute;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		/*background: red;*/
		left: 10px;
		bottom: 42px;
		text-align: center;
		line-height: 15px;
		color: #FFF;
		font-size: 12px;
	}
	/*测评*/
	.black_two{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.4;
		position: fixed;
		top: 0;
		z-index: 5;
	}
	.wapper_risk{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 6;
		background: #FFF;
	}
	.close_btn{
		margin-top: 12px;
		width: 40px;
		height: 26px;
		text-align: center;
		float: right;
		border-radius: 5px;
		margin-bottom: 8px;
	}
	.text{
		clear: both;
		font-size: 12px;
		margin-left: 12px;
		margin-right: 10px;
		color: #acb2b8;
	}
	.text_tip{
		font-size: 14px;
		color: rgb(32,53,66);
		margin-bottom: 30px;
	}
	.risk_btn{
		width: 24%;
		float: left;
		text-align: center;
		margin-left: 8%;
		margin-bottom: 16px;
	}
	.risk_btn_one{
		width: 100%;
		padding: 6px 0;
		border: 1px solid #CCC;
		border-radius: 6px;
		border:1px solid rgb(60,168,238);
		font-size: 15px;
		color: rgb(60,168,238);
	}
	.risk_btn_two{
		clear: both;
		width: 88%;
		text-align: center;
		padding: 10px 0;
		margin-left: 6%;
		margin-top: 26px;
		margin-bottom: 20px;
		background: rgb(255,108,57);
		color: #FFF;
		border-radius: 6px;
	}
	.risk_tip{
		font-size: 12px;
		color: rgb(172,178,184);
		margin-top: 6px;
	}
	.line_one{
		clear: both;
		float: left;
		width: 100%;
		height: 10px;
		background: #f5f5f9;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	/*风险提示*/
	.black_three{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.4;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
	}
	.warning{
		width: 100%;
		background: #FFF;
		position: fixed;
		bottom: 0%;
		left: 0%;
		z-index: 6;
	}
	.warning_head{
		clear: both;
		width: 100%;
		text-align: center;
		font-size: 16px;
		color: rgb(32,53,66);
		margin-bottom: 20px;
	}
	.warning_tip{
		width: 90%;
		margin-left: 5%;
		font-size: 14px;
		color: #959598;
	}
	.warning_btn{
		width: 90%;
		height: 40px;
		line-height: 40px;
		background: #ff6c39;
		border-radius: 5px;
		text-align: center;
		font-size: 14px;
		color: #FFF;
		margin: 16px 0;
		margin-left: 5%;
	}
	.accumulative_box{
		width: 100%;
		line-height: 40px;
		height: 40px;
		overflow: hidden;
		background: #fff url("../assets/img/home0003.png") no-repeat 15px center;
		background-size: 54px;
		padding-left: 80px;
		margin-bottom: 7px;
		font-size: 12px;
		color: #999999;
	}
	.accumulative_box_span{
		color:#000;
	}

</style>
