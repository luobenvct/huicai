<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			购买
		</div>
		<div class="max_box">
			<div class="puch_title">
					<div class="puch_name">购买金额</div>
					<input class="puch_input" id="puch_money" type="text" v-model="losemoney" :placeholder="financingtargeinfo.placeholders" :class="{puch_monone:nullShow}">
					<div class="puch_right">元</div>
					<div class="puch_posi" v-show="pushPosi">预计每日收益<span id="puch_num">{{answer}}</span>元</div>
			</div>
			<!-- <div class="time_sbox">即日起-6月31日，迎存管·购年标，认准"送豪华夏礼"标，满额即送最高苹果笔记本+千元现金哟~</div> -->
			<div class="share_box">
					<div class="share_left">可购份额 <span id="canbuy">{{financingtargeinfo.canbuys}}</span>元</div>
					<div class="share_right">限额<span id="limit_amount">{{financingtargeinfo.limitAmount}}</span>元</div>
			</div>
			<div class="coupons_box" @click="electFun" v-show="conpunno">
				<div class="coupons_left">使用的优惠券</div>
				<div class="coupons_right">
					<span style="color: #ff6c39;" v-if="couponList.length!=0">{{eatnname}}</span>
					<span v-else>暂无优惠券</span>
				</div>
			</div>
			<div class="coupons_box"  v-show="!conpunno">
				<div class="coupons_left">使用的优惠券</div>
				<div class="coupons_right">
					<span style="color: #ff6c39;font-size: 12px;">本标的暂不能使用优惠券</span>
				</div>
			</div>
			<div class="earning_box">
				<div class="earn_left">
					<div class="earn_name">标的收益</div>
					<div class="earn_num">{{answer}} 元</div>
				</div>
				<div class="earn_jia">+</div>
				<div class="earn_left">
					<div class="earn_name">奖励收益</div>
					<div class="earn_num">{{couponnum}} 元</div>
				</div>
				<div class="earn_jia">=</div>
				<div class="earn_left earn_width">
					<div class="earn_name">预计总收益</div>
					<div class="earn_num">{{total_money}} 元</div>
				</div>
			</div>
			
			<!--银行卡-->
			<div class="choice_title">选择支付方式</div>
			<div class="choice_sty" id="hhbscb">
					<img class="choice_img" src="../../assets/deposits_img/puch07.png">
					<div class="choice_name">存管账户<span class="choice_span">（可用金额<span id="hhbMoney"> {{availableBalance}} </span>元）</span></div>
					<div class="choice_tu choice_tuone" id="hhbid" text="scb" bank="scb"></div>
			</div>
			<div id="choiceBox"></div>
			<div class="tip_into tip_posi"></div>
			<div class="tip_into">使用现金劵有便宜可赚哦！</div>
			
			<div class="posi_box">
				<div class="food_but" @click="confirmBid">提交订单</div>
				<div class="disne_ei"><span>点击提交订单即代表您已同意签署</span><a class="text_box" @click="agreementText">《惠财投资协议》</a>和
			<a class="text_box" @click="promiseFun">《风险揭示及承诺书》</a></div>
			</div>
			<!--优惠券 -->
			<div class="black" v-show="privilege" @click="blackFun"></div>
			<div class="conpun_box" v-show="privilege">
				<div v-show="couponcond>0">
					<div class="conpun_title">红包</div>
					<div class="conpun_sty" v-for="item in couponList" v-show="item.couponType=='CASH_COUPON'" @click="allClickFun(item)">
						<img class="conpun_left" src="../../assets/deposits_img/bid001.png">
						<div class="conpun_center">
							<div class="conpun_name">{{item.amount}}元，期限≥{{item.period}}天  金额≥{{item.minInvestAmount}}</div>
							<div class="conpun_text">有效期至：{{item.endTime}} <span v-show="item.summary">来源：{{item.summary}}</span></div>
							<div class="conpun_hint_text" v-if="item.blocked">该券已被锁定(正在订单购买中)，请等待5~15分钟后再重试</div>
						</div>
						<div class="conpun_yuan" :class="{conpun_back:couponcolor==item.uuid}" v-if="!item.blocked"></div>
						<div class="conpun_hint" v-else>使用中</div>
					</div>
				</div>
				<div v-show="addcond>0">
					<div class="conpun_title" style="border-top: solid 1px #e5e5e5;padding-top: 15px;">加息券</div>
					<div class="conpun_sty" v-for="item in couponList" v-show="item.couponType=='ADD_INTEREST'" @click="allClickFun(item)">
						<img class="conpun_left" src="../../assets/deposits_img/bid002.png">
						<div class="conpun_center">
							<div class="conpun_name">{{item.amount}}%，期限≥{{item.period}}天  金额≥{{item.minInvestAmount}}</div>
							<div class="conpun_text">有效期至：{{item.endTime}} <span v-show="item.summary">来源：{{item.summary}}</span></div>
							<div class="conpun_hint_text" v-if="item.blocked">该券已被锁定(正在订单购买中)，请等待5~15分钟后再重试</div>
						</div>
						<div class="conpun_yuan" :class="{conpun_back:couponcolor==item.uuid}" v-if="!item.blocked"></div>
						<div class="conpun_hint" v-else>使用中</div>
					</div>
				</div>
				<div class="conpun_post" @click="noFun" :class="{conpun_back: couponcolor == 'nofun'}">暂不使用优惠券</div>
			</div>
		</div>
		<div id="runingLayout" v-show="runingLayout">下单中,请稍等...</div>
	

	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
  name: 'coupons',
  data () {
	return {
		token:'',
		losemoney:'',     // 金额
		nullShow : false,  //金额字体大小
		financingtargeinfo : {}, // 标的信息
		couponData :{
			app_token :'' ,
			canAddInterest :'',
			canCashCoupon :'',
			amount : '',
			period :'',
			status : 1 
		},
		couponList:[],  //红包
		discountshow : false , // 更多优惠券
		pushPosi : false ,   // 预计收益状态
		answer:0,        // 预计金额
		couponelect: {},    // 选中优惠券
		couponcolor : '' ,   // 选中颜色
		addcouponobj:[],
		moneynum : 0 ,
		businessBox : false,
		availableBalance : 0,  //钱包金额
		failUrl : '',    
		couponnum:0,
		total_money : 0,
		addcond: 0,
		couponcond : 0,
		privilege :false,
		eatnname : '',
		conpunno:true,
		nextnum : 1,
		tokennum : 1,
		firtnum :1 ,
		buyId : '',
		runingLayout : false,
		busShow : false
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
				if(this.losemoney>this.financingtargeinfo.limitAmount){
					this.$toast('限额'+this.financingtargeinfo.limitAmount+'元')
					this.losemoney = this.financingtargeinfo.limitAmount.toString();
					return;
				}
				
				
			}else{
				this.nullShow = false;
			}
			this.debounceFun();
		}
		
	},
	
	components:{

	},
	methods:{
		promiseFun(){
			HC.setStorage("tokenid",this.token + this.buyId);
			HC.setStorage("losemoney",this.losemoney);
			HC.setStorage("couponcolor",this.couponcolor);
			this.$router.push({path:"/riskreveal"})
		},
		returns(){
		  this.$router.go(-1);
		},
		
		/*选择优惠券*/
		electFun(){
			if(this.losemoney==''){
				this.$toast("请输入购买金额")
				return;
			}
			if(this.couponList.length==0){
				this.$toast("暂无优惠券！")
			}else{
				if(this.losemoney==''){
					this.$toast("请输入购买金额！")
				}else{
					this.moneynum++;
					this.privilege = true;
					/*this.couponcolor = 'nofun';*/

				}
			}
		},
		/*获取信息*/
		purchaseFun(){
			/*标的信息*/
			axios.post('/api/v2/open_auth/financing_project/invest/view/'+this.buyId)
			.then(res=>{
				if(res.data.code == "SUCCESS"){
					res.data.result.placeholders = "最低" + res.data.result.minAmount+"元起";
					res.data.result.canbuys = HC.decimalFun((res.data.result.collectAmount-res.data.result.finishAmount));
					if(res.data.result.canAddInterest==false&& res.data.result.canCashCoupon==false){
						this.conpunno =  false;
					}else{
						this.conpunno =  true;
					}
					this.financingtargeinfo = res.data.result;
					var tokenid = HC.getStorage("tokenid");
					var lenmoney = HC.getStorage("losemoney");
					var couponcolor = HC.getStorage("couponcolor");
					if(this.tokennum==1){
						this.tokennum++;
						if(tokenid!=null&&tokenid==this.token+ this.buyId){
							this.losemoney = lenmoney;
						}
					}
					/*if(tokenid!=this.token+ this.buyId){
						this.couponFun();
					}*/
					

				}else{
					this.$toast(res.data.msg)
				}
			})
			/*钱包*/
			axios.post('/api/v2/assets/depository/total/user',{
				app_token : this.token
			})
			.then(res=>{
				if(res.data.code == "SUCCESS"){
					if(res.data.result.availableBalance!=''&& res.data.result.availableBalance!=null){
						this.availableBalance = HC.decimalFun(res.data.result.availableBalance);
					}
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast('用户信息失效')
				}else{
					this.$toast(res.data.msg)
				}
			})
			



		},
		/*优惠券*/
		couponFun(){
			if(this.losemoney==''||this.losemoney==0){
				this.couponcolor = '';
				this.couponelect = {};
				this.eatnname ='';
				this.couponList = [];
				this.answer = 0 ;
				this.couponnum = 0 ;
				this.total_money = 0 ;
				return;
			}
			this.couponData.canAddInterest = this.financingtargeinfo.canAddInterest;
			this.couponData.canCashCoupon = this.financingtargeinfo.canCashCoupon;
			this.couponData.period = this.financingtargeinfo.period;
			this.couponData.amount = this.losemoney;
			this.couponData.app_token = this.token;
			axios.post('/api/v2/coupon/cash/list_buy_bid',this.couponData)
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.couponcond = 0;
					this.addcond = 0;
					var couponSelectList = [];
					res.data.result.forEach((item)=>{
						if (item.couponType=='CASH_COUPON') {
							item.conpuntype = "cashCoupon" ;
							this.couponcond++;
						}else if(item.couponType=='ADD_INTEREST'){
							item.conpuntype = "addInterest" ;
							this.addcond++;
						}
						if(!item.blocked){
							couponSelectList.push(item);
						}
					})
					this.couponList = res.data.result;
					if(couponSelectList.length !=0){
						this.couponelect = couponSelectList[0];
						this.eatnname = couponSelectList[0].name;
						this.couponcolor = couponSelectList[0].uuid;
						console.log(couponSelectList,1)
					}else{
						this.couponcolor = '';
						this.couponelect = {};
						this.eatnname ='暂无可用优惠券';
					}
					/* 获取缓存 */
					var tokenid = HC.getStorage("tokenid");
					var lenmoney = HC.getStorage("losemoney");
					var couponcolor = HC.getStorage("couponcolor");
					console.log(this.firtnum)
					if(this.firtnum==1){
						this.firtnum++;
						if(tokenid!=null&&tokenid==this.token+ this.buyId){
							if(couponcolor!==''){
								if(couponcolor=='nofun'){
									this.couponelect = {};
									this.eatnname = '不使用优惠券';
								}else{
									this.couponList.forEach((item)=>{
										if(item.id==couponcolor){
											this.couponelect = item;
											this.eatnname = item.name;
											this.couponcolor = item.uuid;
										}
									})
								}
								
							}
						}
					}

					/*收益计算*/
					if(this.losemoney==''){
						this.answer = 0;
						this.couponnum = 0 ;
					}else{
						if(this.couponelect.couponType=='CASH_COUPON'){
							this.couponnum = this.couponelect.amount;
						}else if(this.couponelect.couponType=='ADD_INTEREST'){
							this.couponnum =(this.losemoney/365*this.financingtargeinfo.period*this.couponelect.amount/100).toFixed(2);
						}else{
							this.couponnum = 0 ;
						}
						var nummon = (this.losemoney/365*this.financingtargeinfo.period*this.financingtargeinfo.annualizedRates/100).toFixed(2);
						this.answer = nummon;
					}
					this.total_money = (Number(this.couponnum) + Number(this.answer)).toFixed(2);

				}else{
					this.$toast(res.data.msg)
				}
			})

		},
		debounceFun : debounce(function(){
			this.couponFun();
		},500),
		/*选择优惠券
		*/
		allClickFun(item){
			if(item.blocked){
				return;
			}
			this.couponcolor = item.uuid;
			this.couponelect =item;
			this.eatnname = item.name
			this.privilege = false;
			if(item.couponType=='CASH_COUPON'){
				this.couponnum =  item.amount;
			}else if(item.couponType=='ADD_INTEREST'){
				this.couponnum =(this.losemoney/365*this.financingtargeinfo.period*item.amount/100).toFixed(2);
			}else{
				_self.couponnum = 0 ;
			}
			this.total_money = (Number(this.couponnum) + Number(this.answer)).toFixed(2);
		},
		noFun(){
			this.couponcolor = 'nofun';
			this.couponelect ={};
			this.eatnname = '不使用优惠券'
			this.privilege = false;
			this.couponnum =  0;
			this.total_money = (Number(this.couponnum) + Number(this.answer)).toFixed(2);
		},
		blackFun(){
			this.privilege = false;
		},
		/*提交订单*/
		confirmBid(){
			
			if(this.losemoney==''){
				this.$toast('请输入金额')
				return;
			}
			if(this.losemoney<this.financingtargeinfo.minAmount){
				this.$toast('投资额至少大于'+this.financingtargeinfo.minAmount+'元')
				return;
			}
			if(this.losemoney>Number(this.financingtargeinfo.canbuys)){
				this.$toast('可购额份不足！')
				return;
			}
			if(this.losemoney>Number(this.availableBalance)){
				this.$toast('账户金额不足，请先充值')
				return;
			}
			let addInterestUuid='';
			let cashCouponUuid='';
			let hrefUrl = window.location.href.split("#/")[0]
			let successUrl = hrefUrl + "#/buysucceed";
			if(this.couponelect.couponType=="CASH_COUPON"){
				cashCouponUuid = this.couponelect.uuid;
				addInterestUuid = '';
			}else if(this.couponelect.couponType=="ADD_INTEREST"){
				addInterestUuid = this.couponelect.uuid;
				cashCouponUuid = '';
			}
			this.runingLayout = true;
			axios.post('/api/v2/financing_project_bid/invest',{
				app_token : this.token,
				addInterestUuid : addInterestUuid,
				cashCouponUuid :cashCouponUuid,
				buyAmount : this.losemoney,
				channel : '',
				failUrl : this.failUrl,
				financingProjectUuid : this.buyId,
				instance : 'WEIXIN',
				successUrl : successUrl
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.runingLayout = false;
					window.location.href = res.data.url;
				}else if(res.data.code=="TOKEN_ERROR"){
					this.runingLayout = false;
					this.$toast('用户信息失效')
				}else{
					this.runingLayout = false;
					this.$toast(res.data.msg)
				}
			})
			
			
		},
		/*投资协议*/
		agreementText : function(){
			if(this.losemoney==''){
				this.$toast("请输入购买金额");
				return;
			}
			HC.setStorage("tokenid",this.token + this.buyId);
			HC.setStorage("losemoney",this.losemoney);
			HC.setStorage("couponcolor",this.couponcolor);
			this.$router.push({path:"/agreementsignature?app_token="+this.token +"&buyAmount=" + this.losemoney + "&financingTargetId=" + this.buyId  +"&depository=true" })
		},
		
		
		
	},
	mounted(){
		this.failUrl = window.location.href;
		this.token = HC.getStorage('sessionToken');
		this.buyId = this.$route.params.userId;
		/*this.buyId = '32d3def4-ec5a-44fa-8587-72175f80b0b7';*/
		this.purchaseFun();
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
	width: 100%;
	position: absolute;
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
	background: url(../../assets/img/Back_icon.png) no-repeat center;
	background-size: 18px;
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
.max_box{
	width: 100%;
	overflow: hidden;
	padding-bottom: 100px;
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
	width:25%;
	float: left;
	padding-left: 4%;
	line-height: 40px;
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
.puch_posi{
	position: absolute;
	top:-14px;
	right: 10%;
	font-size: 12px;
	padding: 5px;
	padding-bottom: 10px;
	background:#fff url("../../assets/deposits_img/puch01.png") no-repeat center;
	background-size: 100% 100%;
	color: #ff6c39;
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
	line-height: 50px;
}
.coupons_left{
	float: left;
	margin-left:15px;
	padding-left: 22px;
	background: url("../../assets/deposits_img/puch02.png") no-repeat left;
	background-size: 15px 14px;
}
.coupons_right{
	margin-right:15px;
	float: right;
	padding-right: 18px;
	background: url("../../assets/deposits_img/puch03.png") no-repeat right;
	background-size: 7px 12px;
}
.coupon_box{
	width:90%;
	margin-left: 6%;
	overflow: hidden;
}
.coupon_sty{
	width:47%;
	float: left;
	margin-right: 3%;
	height: 66px;
	background: url("../../assets/deposits_img/puch14.png") no-repeat right;
	background-size: 100% 100%;
	margin-top: 15px;
	color:#d8dadb;
	overflow:hidden;
}
.sty_box{
	background: url("../../assets/deposits_img/puch05.png") no-repeat right;
	background-size: 100% 100%;
	color: #ffffff;
}
.sty_money{
	font-size: 30px;
	text-align: center;
}
.sty_span{
	font-size: 14px;
}
.sty_limit{
	font-size: 10px;
	text-align: center;
}
.choice_title{
	width: 100%;
	line-height: 50px;
	margin-top: 20px;
	padding-left: 39px;
	color: #6e7375;
	background: url("../../assets/deposits_img/puch06.png") no-repeat 15px;
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
	margin-top: 18px;
	background: url("../../assets/deposits_img/xuan02.png") no-repeat center;
	background-size: 100% 100%;
}

.choice_tuone,.dis_tuone,.option_tuone{
	background-image: url("../../assets/deposits_img/xuan01.png");
}
.bind_but{
	display: block;
	width: 100%;
	line-height: 44px;
	color: #ff6c39;
	font-size: 15px;
	margin: 15px auto 4px;
	background: url(../../assets/deposits_img/puch12.png) no-repeat 15px center,url(../../assets/deposits_img/puch03.png) no-repeat 93% center;
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
    height: 100px;
}
.food_but{
	width: 90%;
	text-align: center;
	color: #ffffff;
	background-color: #ff6c39;
	line-height: 46px;
	border-radius: 8px;
	margin: auto;
}
.disne_ei{
	width: 90%;
	margin:auto;
	text-align: center;
	font-size: 10px;
	color: #acb2b8;
	margin-top: 12px;
}
.text_box{
	color:#3ca8ee
}
.text_box:hover{
	color:#3ca8ee;
	text-decoration: none;
}
/*�����Ż݄�*/

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
	position: relative; 
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
}
/* 惠活宝购买 */
#touchConfirmPadDiv{
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
#touchArea{
	border-radius:6px;
	width: 100%;height: 200px; margin: 0px auto; background-color: white;
	padding: 10px;
	
}
#btnTouchPay{
	width: 100px;
	vertical-align:top;
}
 
#touchProgress{
	width: 0%;
	height: 100%;
	border-radius:3px;
	background-image:linear-gradient(to right, #f3f3f3 0px, green 100%);
	background-color: green;
}

.close-btn {
	display: inline-block;
	padding-right: 5px;
	font-size: 25px;
	font-family: '微软雅黑';
	top: -5px;
	right: -5px;
	position: absolute;
	color: #333!important;
}
a {
	text-decoration: none!important;
}
/*  惠活宝金额不够提示*/
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
.support_bank{
	display: inline-block;
	float: right;
	width: 25%;
	color: #5fb7f2;
}
.wuyou_img{
	width: 60%;
	display: block;
	margin: auto;
}
.time_sbox{
	width: 100%;
	overflow: hidden;
	padding: 10px 15px 0 36px;
	color: #3ca8ee;
	font-size: 12px;
	background:#f5f5f9 url(../../assets/deposits_img/puch15.png) no-repeat 15px 12px;
	background-size: 15px;
}
.laiyuan{
	position: absolute;
	font-size: 10px;
	left: 20px;
	line-height: 12px;
	bottom: 0;
	color:#acb2b8;
	width: 100%;
	overflow: hidden;
	height:12px;
    padding-right: 30px;
    overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;		
	-webkit-box-orient: vertical;
}

/*vue*/
.puch_monone{
	font-size: 18px;
}
[v-cloak]{
	display:none;
}
/*交易密码*/
.black2{
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
/*预计收益*/
.earning_box{
	width:100%;
	overflow: hidden;
	background-color: #f5f5f9;
	height: 60px;
	border-top:solid 1px #3ca8ee;
}
.earn_left{
	width:28%;
	float: left;
	overflow: hidden;
	text-align: center;
}
.earn_name{
	font-size: 12px;
	color:#acb2b8;
	margin-top: 8px;
}
.earn_num{
	font-size: 14px;
	margin-top: 4px;
}
.earn_jia{
	color:#acb2b8;
	font-size: 24px;
	margin-top: 20px;
	float: left;
}
.earn_width{
	width:30%;
}
/*优惠券*/
.black{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.4;
}
.conpun_box{
	width: 100%;
	position:fixed;
	left: 0;
	bottom: 0;
	height:50%;
	overflow: hidden;
	overflow-y: scroll;
	background-color: #fff;
	padding-bottom: 55px;
}
.conpun_title{
	width: 90%;
	margin:15px auto 0;
	font-size: 14px;
	color:#acb2b8;
}
/*.conpun_sty{
	width: 90%;
	margin:20px auto 0;
	overflow: hidden;
	background: url("../../assets/deposits_img/xuan02.png") no-repeat right center;
	background-size: 20px 20px;
	}
	*/
	.conpun_left{
		width:30px;
		display: block;
		float: left;
	}
	.conpun_center{
		width:75%;
		float: left;
		margin-left: 10px;
	}
	.conpun_name{
		font-size: 14px;
	}
	.conpun_text{
		font-size: 12px;
		color:#acb2b8;
		margin-top: 2px;
	}
	.conpun_post{
		width:90%;
		overflow: hidden;
		height: 50px;
		position:fixed;
		bottom:0;
		left:5%;
		line-height: 50px;
		background:#fff url("../../assets/deposits_img/xuan02.png") no-repeat right center;
	background-size: 20px 20px;
	border-top:solid 1px #e5e5e5;
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
.conpun_sty{
		width: 90%;
		margin:20px auto 0;
		overflow: hidden;
		position: relative;
	}
	.conpun_yuan{
		width: 20px;
		height: 20px;
		position: absolute;
		right: 10px;
		top:15px;
		background: url("../../assets/deposits_img/xuan02.png") no-repeat right center;
		background-size: 20px 20px;
	}
	.conpun_hint_text{
		font-size: 12px;
	    color: red;
	    margin-top: 2px;
	}
	.conpun_hint{
		position: absolute;
		top:15px;
		right:0;
		font-size: 10px;
		line-height: 20px;
		color:red;
	}
	.conpun_back{
		background-image: url("../../assets/deposits_img/xuan01.png");
	}
</style>
