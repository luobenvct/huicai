<template>
	<div class="purchase">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">购买</div>
		</div>
		<div class="max_box" id="app">
			<div class="puch_title">
				<div class="puch_name">购买金额</div>
				<input class="puch_input" id="puch_money" type="text" v-model="money" :placeholder="holder">
				<div class="puch_right">元</div>
				<div class="puch_posi" v-show="calShow && hhbShow">预计收益<span id="puch_num">{{calculatormoney}}</span>元</div>
			</div>
			<div class="time_sbox" @click="active">购买“翻倍有惊喜”产品，单笔无上限返现金，累计无上限返购物卡；购买“壕送iphone 8”产品，送智能化豪华大礼哟~
			</div>
			<div class="share_box">
				<div class="share_left">可购份额 <span id="canbuy">{{targetData.canbuy}}</span>元</div>
				<div class="share_right">限额<span id="limit_amount">{{targetData.limit_amount}}</span>元</div>
			</div>

			<div v-show="hhbShow">
				<div class="coupons_box">
					<div class="coupons_left">可使用的现金券</div>
					<div v-if="couponsData.addinterest == '' && couponsData.cashcoupon == ''"></div>
					<div v-else class="coupons_right" @click="moreCoupon">更多</div>
				</div>
				<!--优惠券-->
				<div v-if="couponsData.addinterest == '' && couponsData.cashcoupon == ''"><img src="../assets/img/nocouponsrecord.png" height="69" width="50%" style="margin-left:25%;"></div>
				<div v-else class="coupon_box" id="couponBox" >
					<div class="coupon_sty" v-for="item in couponsData.cashcoupon" :data='item.id' :class="{coupon_sty02: (nowId02 == item.id) || (item.id == nowId)}" @click="choice02(item)">
						<div class="sty_money">{{item.amount}}<span class="sty_span">元</span></div>
						<div class="sty_limit" v-for="item02 in item.conditions01">期限＞{{item02.period}}天&nbsp;&nbsp;金额≥{{item02.buy_amount}}元</div>
					</div>
					<div class="coupon_sty" v-for="item in couponsData.addinterest" :data='item.id' :class="{coupon_sty02: (nowId02 == item.id) || (item.id == nowId)}" @click="choice02(item)">
						<div class="sty_money">{{item.amount}}<span class="sty_span">%</span></div>
						<div class="sty_limit">加息券</div>
					</div>
				</div>
				<!-- 更多优惠券 -->
				<div class="black" v-show="couponShow"></div>
				<div class="discount_box" v-show="couponShow">
					<div class="discount_title">
						其它优惠券
						<img class="close_img" src="../assets/img/puch11.png" @click="closeCoupon">
					</div>
					<div class="discou_cont" id="discouBox">
						<div class="dis_sty" v-for="item in moreCouponsData.cashcoupon" :data='item.id'  @click="choiceCash(item)">
							<div class="dis_cont">
								<span class="dis_num">{{item.amount}}</span>
								<span class="dis_unit">元</span>
								<span class="dis_no">（</span><span class="dis_zhu" v-for="item02 in item.conditions01">期限＞{{item02.period}}天&nbsp;金额≥{{item02.buy_amount}}元</span>
								<span class="dis_no">）</span>
							</div>
							<div class="dis_tu" :class="{choice_tuone: nowId == item.id}" typeid="cashCoupon"></div>
							<div class="tips">
								(有效期：{{item.end_time}}, 来源：{{item.summary}})
							</div>
						</div>
						<div class="dis_sty" v-for="item in moreCouponsData.addinterest" :data='item.id'  @click="choiceInterest(item)">
							<div class="dis_cont">
								<span class="dis_num">{{item.amount}}</span>
								<span class="dis_unit">%</span>
								<span class="dis_no">（</span><span class="dis_zhu" v-for="item02 in item.conditions01">期限＞{{item02.period}}天&nbsp;金额≥{{item02.buy_amount}}元</span>
								<span class="dis_no">）</span>
							</div>
							<div class="dis_tu" :class="{choice_tuone: nowId == item.id}" typeid="cashCoupon"></div>
							<div class="tips">
								(有效期：{{item.end_time}}, 来源：{{item.summary}})
							</div>
						</div>
					</div>
					<div class="confirm_but" @click="confirm">确认选择</div>
				</div>
			</div>

			<!--银行卡-->
			<div class="choice_title" v-if="bankList.length != 0 ">选择银行卡</div>
			<div id="choiceBox">
				<div v-show="hhbShow">
					<div class="choice_sty" id="hhbscb" @click="choiceBank02(hhbData)">
						<img class="choice_img" src="../assets/img/puch07.png">
						<div class="choice_name">惠活宝<span class="choice_span">（可用金额<span id="hhbMoney">{{hhbData.totalMoney}}</span>元）</span></div>
						<div class="choice_tu" :class="{choice_tuone : nowId03 == hhbData.id}" id="hhbid" text="scb" bank="scb"></div>
					</div>
				</div>
				<div class="choice_sty" v-for="item in bankList" @click="choiceBank(item)">
					<img class="choice_img" :src="item.imgUrl">
					<div class="choice_name">{{item.bank}}<span class="choice_span">（单笔{{item.cashOne | wan}}万,单日{{item.cashDay | wan}}万）</span></div>
					<div class="choice_tu" :class="{choice_tuone : nowId03 == item.bankCardNo}"></div>
				</div>
			</div>   
			<a class="bind_but" v-show="bankList.length == 0" @click="addBank">添加银行卡</a>   
			<div class="posi_box">
				<div class="food_but" @click="purchases">提交订单</div>
				<div class="disne_ei"><span>点击提交订单即代表您已同意签署</span><a id="text_box" @click="agreement">《惠财投资协议》</a></div>
			</div>
		</div>

		<form id="formPay" action="" method="post" target="_self">
			<input name="t" value="<%=new Date() %>" type="hidden" />
			<input name="mchntCd" id="mchntCd" type="hidden" value="" /> 
			<input name="orderid" id="orderid" type="hidden" value="" /> 
			<input name="ono" id="ono" type="hidden" value="" /> 
			<input name="backurl" id="backurl" type="hidden" value="" /> 
			<input name="reurl" id="reurl" type="hidden" value="" /> 
			<input name="homeurl" id="homeurl" type="hidden" value="" /> 
			<input name="name" id="name" type="hidden" value="" /> 
			<input name="sfz" id="sfz" type="hidden" value="" /> 
			<input name="md5" id="md" type="hidden" value="" />
		</form> 

		<div id="reapalCerFormLayout" style="display: none;" v-html="reapalCerFormHtml"></div>
		<div id="fuiouFormLayout" style="display: none;" v-html="fuiouFormHtml"></div>
		<input id="bankCode" type="hidden" value="">
		<input id="channel" type="hidden" value="">
		<input id="userId" type="hidden" value="">

		<div class="black01" v-show="orderShow"></div>
		<div class="order" v-show="orderShow">下单中,请稍等...</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'

export default {
	data () {
		return {
			userName:'', 			//购买用户姓名
			financingtargetid:'', 	//标的id
			money:"", 				//购买金额
			IDcard:'', 				//购买用户身份证
			bankID:'', 				//购买银行卡号
			banknum:'', 			//银行编号
      		bankname:'', 			//那个银行
      		channel:'', 			//渠道
      		userId:'', 				//用户id
      		way:'', 				//支付渠道
			minMoney:'',			//标的投资的最小金额
			targetData:[],			//可购及限额接口数据
			holder:'',				//input框的placeholder
			interest:'',			//红包
			coupon:'',				//优惠券
			period:'',				//理财期限
			rates:'',				//利息
			couponsData:[],			//优惠券数据
			moreCouponsData:[],
			calShow:false,			//计算器
			couponShow:false,		//查看更多优惠券
			nowId:'',
			nowId02:'',
			nowId03:'hhb',
			bankList:[],			//银行卡
			bankdata : {"pay_type":"scb"},
			hhbData:[],				//惠活宝
			hhbMoney:0,
			choiceShow:true,		
			token:'',
			hhbShow:false,
			payTime:'',
			orderShow:false,
			reapalCerFormHtml :'', 	//融宝
			fuiouFormHtml:'', 		//富友
			optionType:'',          //红包或者加息券
      		optionStr:'',           //红包或者加息券id
      		certificateId:"",
      		use:true,				//是否使用红包或者加息券
      		loginUser:false,
      		hongbao:0
		}
	},
	components:{

	},
	methods:{
		returns(){
			this.$router.go(-1);
			localStorage.removeItem("buymoney")
		},
		active(){
			window.location.href= "https://m.88huicai.com/mobile/activity/double/double.html"
		},
		agreement(){
			if(this.money == "" || this.money == null){
				this.$toast({
					  message: "请输入金额",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			this.$router.push({ name: 'Agreement', params: { markId: this.financingtargetid, buyAmount:this.money,payTime:this.payTime}}) 
		},
		purchases(){
			if(this.money == "" || this.money == null){
				this.$toast({
					  message: "请输入金额",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.choiceShow == false){
				this.$toast({
					  message: "请先绑定银行卡",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.money < this.minMoney){
				this.$toast({
					  message: "投资额至少大于"+this.minMoney+"元",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.use == false){
				this.$toast({
					  message: "使用现金券有便宜可赚哦！",
					  position: 'bottom',
					  duration: 3000
				});
				this.use = true;
				return;
			}
			console.log("数据1");
			console.log(this.bankdata)
			//debugger;
			if(this.bankdata.pay_type == 'scb'){
				console.log("hhhhhhh");
				console.log(this.money);
				console.log(this.hhbMoney)
				if(this.optionType == "cashCoupon"){
					if((this.money-0) > ((this.hhbMoney-0)+(this.hongbao-0))){
						this.$toast({
							message: "惠活宝余额不足，请选择银行卡或绑定新银行卡!",
							position: 'bottom',
							duration: 3000
						});
						return;
					}else{
						this.orderShow = true;
						setTimeout(()=>{
							this.hhbpurchase();
						},3000)
					}	
				}else{
					if((this.money-0) > (this.hhbMoney-0)){
						this.$toast({
							message: "惠活宝余额不足，请选择银行卡或绑定新银行卡!",
							position: 'bottom',
							duration: 3000
						});
						return;
					}else{
						this.orderShow = true;
						setTimeout(()=>{
							this.hhbpurchase();
						},3000)
					}	
				}
				
			}else{
				this.orderShow = true;
				setTimeout(()=>{
					this.bankpurchase();
				},3000)
			}
		},
		hhbpurchase(){
			/* 使用惠活宝购买接口*/
			axios.post('/api/bid_pay_with_scb.htm', {
				t : new Date(),
				app_token:this.token,
				targetId : this.financingtargetid,
				buyAmount : this.money,
				discountCouponType : this.optionType,    //红包还是加息
        		discountCouponId : this.optionStr,   //劵的id
        		clientType:'weixin'
			})
			.then(res =>{
				console.log("使用惠活宝购买接口");
				console.log(res);
				this.orderShow = false;
				localStorage.removeItem("buymoney");
				if (res.data.code == "SUCCESS") {
					this.certificateId = res.data.certificateId;

					this.money = '';
					this.$router.push({ path: '/buyingresults?hui=cai'+'&orderid='+this.certificateId})
				} else if (res.data.code == "AMOUNT_LESS") {
					this.$toast({
						  message: "购买不能低于1000元",
						  position: 'bottom',
						  duration: 3000
					});
				} else if (res.data.code == "NOT_HAS_ENOUGH_PRINCIPAL") {
					this.$toast({
						  message: "可购买份额不足",
						  position: 'bottom',
						  duration: 3000
					});
				} else if (res.data.code == "NOT_HAS_ENOUGH_MONEY") {
					this.$toast({
						  message: "余额不足",
						  position: 'bottom',
						  duration: 3000
					});
				} else {
					this.$toast({
					  message: "交易失败:"+res.data.code,
					  position: 'bottom',
					  duration: 3000
					});
				}
			})
			.catch(res=> {
				console.log(res);
			}); 
		},
		bankpurchase(){
			//支付渠道
            axios.post('/api/bank_pay_way.htm', {
                t : new Date(),
                bankName : this.bankname,
                buyAmount : this.money,
                app_token: this.token
            })
            .then(res =>{
                console.log("支付渠道1");
                console.log(res);
                  if(res.data.way=='' || res.data.way==null){
                    axios.post('/api/bank_pay_way.htm', {
                      t : new Date(),
                      bankName : this.bankname,
                      buyAmount : this.money,
                      app_token: this.token
                    })
                    .then(res =>{
                      console.log("支付渠道2");
                      console.log(res);
                      this.way = res.data.way;
                    })
                    .catch(res=> {
                      console.log(res);
                    });
                  }else{
                    this.way = res.data.way;
                  }
                  this.fuiou();
            })
            .catch(res=> {
                console.log(res);
            });
		},
		fuiou(){
			//富友 使用银行卡购买接口
			console.log("富友");
			//debugger
			axios.post('/api/bid_form_create_fuiou_order.htm', {
			  	t : new Date(),
				buyAmount : this.money,    //购买金额
				name : this.userName,     //购买用户姓名
				pid  : this.IDcard,   //购买用户身份证
				bankCardNo : this.bankID,  //购买银行卡号
				financingTargetId : this.financingtargetid, //标的id
				bankNo : this.banknum,   //银行编号
				userId : this.userId,    //用户id
				bankName : this.bankname,   //那个银行
				_channel : 'mobile', //渠道
				pay_type : "bank",                //银行卡购买
				discountCouponType : this.optionType,    //红包还是加息
        		discountCouponId : this.optionStr,   //劵的id
				way : this.way,                 //支付渠道
				app_token: this.token,   //用户token
				device: "android/ios&id",
				clientType:'weixin'
		})
		.then(res =>{
		  	console.log("富友使用银行卡购买接口数据");
		  	console.log(res);
		  	this.orderShow = false;
		  	localStorage.removeItem("buymoney");
		  	if (!res.data) {
		  		this.$toast({
					  message: "购买出错了",
					  position: 'bottom',
					  duration: 3000
				});
		  		return;
		  	}
		  	if (res.data.code == "SUCCESS") {
		  		if (res.data.baofoo_wap_pay_form) {
				  //$("#baofooWapPayLayout").html(data.baofoo_wap_pay_form);
				  //$("#baofooWapPayLayout").find("form").submit();
				}else if(res.data.reapalCerFormHtml){
				  //debugger
				  console.log("融宝")
				  this.reapalCerFormHtml = res.data.reapalCerFormHtml;
				  this.$nextTick(() => {
				  	console.log("融宝")
				  	console.log(document.getElementById("rongpaysubmit"))
				  	document.getElementById("rongpaysubmit").submit();
				  })    
				  console.log(this.reapalCerFormHtml)
				 /* console.log("富友我问问")
				  console.log(document.getElementById("rongpaysubmit"))
				  document.getElementById("rongpaysubmit").submit();*/
				  //$("#reapalCerFormLayout").html(data.reapalCerFormHtml);
						//$("#reapalCerFormLayout").show();
						//$("#reapalCerFormLayout").find("form").submit();
				} else {
					//console.log("富友11")
					console.log(res)
					/*document.getElementById("formPay").action = res.data.fuiouPayUrl;
					document.getElementById("mchntCd").value = res.data.mchntCd;
					document.getElementById("backurl").value = res.data.backurl;
					document.getElementById("reurl").value = res.data.reurl;
					document.getElementById("homeurl").value = res.data.homeurl;
					document.getElementById("orderid").value = res.data.fuiouOrderId;
					document.getElementById("ono").value = res.data.bankCardNo;
					document.getElementById("name").value = res.data.name;
					document.getElementById("sfz").value = res.data.pid;
					document.getElementById("md").value = res.data.sign;
					document.getElementById("formPay").submit();*/

					console.log("富友11")
					this.fuiouFormHtml = res.data.fuiou2_wap_pay_form;
					this.$nextTick(() => {
					  	console.log("富友12")
					  	console.log(document.getElementById("fuiou2submit"))
					  	document.getElementById("fuiou2submit").submit();
					})    
					console.log(this.fuiouFormHtml)
				}
				return;
			} else if (res.data.code == "COLLECT_AMOUNT_NOT_ENOUGH") {
				this.$toast({
					  message: "可购份额不足!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "PID_CANT_USED") {
				this.$toast({
					  message: "该身份证不能使用,已被他人认证绑定!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "BANK_CARD_CANT_USED") {
				this.$toast({
					  message: "该银行卡不能使用,可能被他人绑定!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "BUY_AMOUNT_CONDITION_ERROR") {
				this.$toast({
					  message: "该现金券不满足金额条件!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "PERIOD_CONDITION_ERROR") {
				this.$toast({
					  message: "该现金券不满足周期条件!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "TARGET_TYPE_CONDITION_ERROR") {
				this.$toast({
					  message: "该现金券不能购买此标的!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "UNABLE_BUY") {
				this.$toast({
					  message: "不能购买此体验标的!",
					  position: 'bottom',
					  duration: 3000
				});
			} else if (res.data.code == "REAPAL_CER") {
				this.$toast({
					  message: res.data.code,
					  position: 'bottom',
					  duration: 3000
				});
			} else {
				this.$toast({
					  message: "出错了!:" + res.data.code,
					  position: 'bottom',
					  duration: 3000
				});
			}
		})
		  .catch(res=> {
		  	console.log(res);
		  });
		},
		choiceBank(item){
		  //选择银行卡
		  console.log(item.bank)
		  console.log(item.bankCardNo)
		  console.log(item.bankNo)
		  console.log(item.cashDay)
		  console.log(item.cashMon)
		  console.log(item.cashOne)
		  console.log(item.icon)
		  console.log(item.name)
		  console.log(item.pay_type)
		  console.log(item.pid)
		  console.log(item.userId)

		  this.bankdata = item;
		  this.nowId03 = item.bankCardNo;
		  this.userName = item.name;
		  this.IDcard = item.pid;
		  this.bankID = item.bankCardNo;
		  this.banknum = item.bankNo;
		  this.userId = item.userId;
		  this.bankname = item.bank;
		},
		choiceBank02(hhbData){
			this.bankdata = hhbData;
			this.bankdata.pay_type = "scb";
			this.nowId03 = hhbData.id;
			console.log(hhbData)
		},
		choiceCash(item){
			this.nowId = item.id;
			this.optionType = item.type;
		  	this.optionStr = item.id;

		  	this.hongbao = item.amount;
		 
		  	
		  	var length = this.couponsData.cashcoupon.length;
		  	if(length == 3){
		  		var flag = false;
		  		for (var i = 0; i < length; i++) {
		  			console.log(this.couponsData.cashcoupon[i].amount);
		  			console.log(item.amount)
		  			if(this.couponsData.cashcoupon[0].amount == item.amount || this.couponsData.cashcoupon[1].amount == item.amount){
		  				flag = false;

		  			}else{
		  				flag = true;
		  			}
		  		}
		  		if(flag == true){
		  			this.couponsData.cashcoupon.splice(2,1).push(item)
		  		}else{
		  			this.couponsData.cashcoupon.splice(2,1);
		  			return;
		  		}	
		  	}
		  	if(length == 2){
		  		var flag2 = false;
		  		for (var i = 0; i < length; i++) {
		  			if(this.couponsData.cashcoupon[0].amount == item.amount || this.couponsData.cashcoupon[1].amount == item.amount){
		  				flag2 = false;
		  			}else{
		  				flag2 = true;
		  			}
		  		}
		  		if(flag2 == true){
		  			
		  			this.couponsData.cashcoupon.splice(2,1).push(item)
		  		}else{
		  			
		  			this.couponsData.cashcoupon.splice(2,1);
		  			return;
		  		}	
		  	}
		  	if(length == 1){
		  		var flag3 = false;
		  		for (var i = 0; i < length; i++) {
		  			if(this.couponsData.cashcoupon[0].amount == item.amount || this.couponsData.cashcoupon[1].amount == item.amount){
		  				flag3 = false;
		  			}else{
		  				flag3 = true;
		  			}
		  		}
		  		if(flag3 == true){
		  			this.couponsData.cashcoupon.splice(2,1).push(item)
		  		}else{
		  			this.couponsData.cashcoupon.splice(2,1);
		  			return;
		  		}	
		  	}
		  	this.couponsData.cashcoupon.push(item);
			console.log(this.nowId)
			console.log("加息券11")
			console.log(this.couponsData.cashcoupon)
			console.log("加息券12")
		  	/*console.log(item)
		  	console.log(this.optionType)
		  	console.log(this.optionStr)
			console.log(this.nowId02)*/
		},
		choiceInterest(item){
			this.nowId = item.id;
			this.optionType = item.type;
		  	this.optionStr = item.id;
		  	
		  	var length = this.couponsData.addinterest.length;
		  	if(length == 3){
		  		var flag = false;
		  		for (var i = 0; i < length; i++) {
		  			console.log(this.couponsData.addinterest[i].amount);
		  			console.log(item.amount)
		  			if(this.couponsData.addinterest[0].amount == item.amount || this.couponsData.addinterest[1].amount == item.amount){
		  				flag = false;
		  			}else{
		  				flag = true;
		  			}
		  		}
		  		if(flag == true){
		  			this.couponsData.addinterest.splice(2,1).push(item)
		  		}else{
		  			this.couponsData.addinterest.splice(2,1);
		  			return;
		  		}	
		  	}
		  	if(length == 2){
		  		var flag2 = false;
		  		for (var i = 0; i < length; i++) {
		  			if(this.couponsData.addinterest[0].amount == item.amount || this.couponsData.addinterest[1].amount == item.amount){
		  				flag2 = false;
		  			}else{
		  				flag2 = true;
		  			}
		  		}
		  		if(flag2 == true){
		  			
		  			this.couponsData.addinterest.splice(2,1).push(item)
		  		}else{
		  			
		  			this.couponsData.addinterest.splice(2,1);
		  			return;
		  		}	
		  	}
		  	if(length == 1){
		  		var flag3 = false;
		  		for (var i = 0; i < length; i++) {
		  			if(this.couponsData.addinterest[0].amount == item.amount || this.couponsData.addinterest[1].amount == item.amount){
		  				flag3 = false;
		  			}else{
		  				flag3 = true;
		  			}
		  		}
		  		if(flag3 == true){
		  			this.couponsData.addinterest.splice(2,1).push(item)
		  		}else{
		  			this.couponsData.addinterest.splice(2,1);
		  			return;
		  		}	
		  	}
		  	this.couponsData.addinterest.push(item);
		  	
			console.log(this.nowId)
			console.log("加息券11")
			console.log(this.couponsData.addinterest)
			console.log("加息券12")
		  	/*console.log(item)
		  	console.log(this.optionType)
		  	console.log(this.optionStr)
			console.log(this.nowId02)*/
		},
		choice02(item){
			if(this.nowId02 == item.id){
				console.log("取消")
				this.use = false;
				this.nowId02 = '';
				this.optionType = "";
			}else{
				this.nowId02 = item.id;
				this.nowId = '';
				this.optionType = item.type;
			  	this.optionStr = item.id;
			  	this.hongbao = item.amount;
			  	console.log("使用")
			  	this.use = true;
			  	console.log(item)
			  	console.log(this.optionType)
			  	console.log(this.optionStr)
				console.log(this.nowId02)
			}
		},
		moreCoupon(){
			this.couponShow = true;
			this.dataFn03();
		},
		closeCoupon(){
		  //关闭红包
		  this.couponShow = false;
		  this.nowId = '';
		},
		addBank(){
			if(this.money == "" || this.money == null){
				this.$toast({
					  message: "请输入金额",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.money < this.minMoney){
				this.$toast({
					  message: "投资额至少大于"+this.minMoney+"元",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.money > this.targetData.canbuy){
				this.$toast({
					  message: "可购额份不足！",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			if(this.money > this.targetData.limit_amount){
				this.$toast({
					  message: "限额"+ this.targetData.limit_amount + "元",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			this.$router.push({ name: 'AddBank', params: { userId: this.financingtargetid, buyAmount:this.money, optionType:this.optionType, optionStr:this.optionStr}}) 
		},
		confirm(){
		  //红包选择后确认
		  this.couponShow = false;
		  this.nowId02 = '';
		},
		GetUrlRelativePath(name){
			/*debugger*/
	　　　　var url = document.location.toString();
	　　　　var arrUrl = url.split("?")[1].split("&");
			var listnum = [];
			arrUrl.forEach((item)=>{
				listnum.push(item.split("="))
			})
			var text ='';
			for (var i = 0; i < listnum.length; i++) {
				if(listnum[i][0]==name){
					text = listnum[i][1]				
				}

			}
			return text;　
	　　},
		dataFn(){
			/* 可购及限额接口数据*/
			axios.post('/api/gettargetid.htm', {
				t:new Date(),
				financingtargetid:this.financingtargetid
			})
			.then(res =>{
				console.log("可购及限额接口数据");
				console.log(res);
				if(res.data[0] != null){
					this.targetData = res.data[0];
				}
				
				this.minMoney = this.targetData.min_amount;
				this.holder = '最低'+this.minMoney+'元起';
				this.interest = this.targetData.can_add_interest;
				this.coupon = this.targetData.can_cash_coupon;
				this.period = this.targetData.period;
				this.rates = this.targetData.rates;
				this.dataFn02(); 
			})
			.catch(res=> {
				console.log(res);
			});
			/* 银行卡获取相关数据 *//*/api/UserBankList.htm*//*/api/v2/account/common/bank_card/list*/
			axios.post('/api/UserBankList.htm', {
				app_token:this.token
			})
			.then(res =>{
				console.log("v2银行卡获取接口");
				console.log(res);
				if(res.data.code == "TOKEN_ERROR"){
					HC.delStorage("sessionToken");
					this.$router.push({ path: '/home' })
				}

				if(res.data.code == "TOKEN_ERROR" && this.loginUser){
					HC.delStorage("sessionToken");
					this.$router.push({ path: '/login' })
				} 
				if(res.data.length == 0){
					this.choiceShow = false;
				}
				this.bankList = res.data;
				res.data.forEach((item)=>{
					item.imgUrl = "https://static.88huicai.com/huicai/image/bank/card/"+(item.icon);
					this.channel = item._channel;
				})

			})
			.catch(res=> {
				console.log(res);
			});
			/* 惠活宝金额 */
			axios.post('/api/get_sui_cun_bao_merged_profit.htm', {
				app_token:this.token
			})
			.then(res =>{
				console.log("惠活宝金额接口数据22");
				console.log(res);   
				if(res.data.code == "TOKEN_ERROR" && this.loginUser){
					HC.delStorage("sessionToken");
					this.$router.push({ path: '/login' })
				} 
				this.hhbData = res.data; 
				this.hhbMoney = this.hhbData.totalMoney;
				this.hhbData.id = 'hhb';   
			})
			.catch(res=> {
				console.log(res);
			});	
		},
		dataFn02(){
			/*优惠劵数据*//**/
			axios.post('/api/buywithcounpon.htm', {
				t:new Date(),
				app_token:this.token,
				canAddInterest : this.interest,
				canCashCoupon  : this.coupon,
				amount:'',
				period:this.period,
				status:0,
				financingTargetId:this.financingtargetid
			})
			.then(res =>{
				console.log("优惠劵数据");
				console.log(res);
				res.data.cashcoupon.forEach((item)=>{
					item.conditions01 = eval(item.conditions);
					item.type = 'cashCoupon';
				})
				res.data.addinterest.forEach((item)=>{
					item.conditions01 = eval(item.conditions);
					item.type = 'addInterest';
				})
				this.couponsData = res.data;
			})
			.catch(res=> {
				console.log(res);
			});
			/* 判断标的 */
			axios.post('/api/getFinancingTarget_Type.htm', {
				financingTargetId:this.financingtargetid
			})
			.then(res =>{
				console.log("判断标的数据");
				console.log(res);    
				if(res.data.type == 'SCB' ){
					this.hhbShow = false;
					this.nowId03 = this.bankList[0].bankCardNo;
					this.bankdata.pay_type = 'bank';

					this.userName = this.bankList[0].name;
					this.IDcard = this.bankList[0].pid;
					this.bankID = this.bankList[0].bankCardNo;
					this.banknum = this.bankList[0].bankNo;
					this.userId = this.bankList[0].userId;
					this.bankname = this.bankList[0].bank;

				}else{
					this.hhbShow = true;
				}
			})
			.catch(res=> {
				console.log(res);
			});
		},
		dataFn03(){
			/*更多优惠劵数据*/
			axios.post('/api/buywithcounpon.htm', {
				t:new Date(),
				app_token:this.token,//新人16
				canAddInterest : this.interest,
				canCashCoupon  : this.coupon,
				amount:this.money,
				period:this.period,
				status:1,
				financingTargetId:this.financingtargetid
			})
			.then(res =>{
				console.log("more优惠劵数据");
				console.log(res);
				res.data.cashcoupon.forEach((item)=>{
					item.conditions01 = eval(item.conditions);
					item.type = 'cashCoupon';
				})
				res.data.addinterest.forEach((item)=>{
					item.conditions01 = eval(item.conditions);
					item.type = 'addInterest';
				})
				this.moreCouponsData = res.data;
				console.log("more");
				console.log(this.moreCouponsData);
			})
			.catch(res=> {
				console.log(res);
			});
		}
	},
	created(){

	},
	mounted(){
		/*this.token = this.getCookie('sessionToken');*/
		this.token = HC.getStorage('sessionToken') || this.GetUrlRelativePath("app_token");
		console.log(this.token)
		if(this.token == "" || this.token == null){
		  this.loginUser = false;
		}else{
		  this.loginUser = true;
		}
		console.log(this.$route.params);
		this.financingtargetid = this.$route.params.userId;
		console.log("id")
		console.log(this.financingtargetid)
		if(localStorage.getItem("buymoney")){
			this.money = localStorage.getItem("buymoney");
		}
		this.dataFn();
		/*setTimeout(()=>{
			this.dataFn02(); 
		},150)*/
	}, 
	computed:{
		calculatormoney(){
			let thismoney = (this.money).replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			console.log(thismoney)
			console.log(this.period)
			console.log(this.rates)
			return ((thismoney*this.period*this.rates)/100/365).toFixed(2)
		}
	},
	watch:{
		money(curVal,oldVal){
			this.money = this.money.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			if(curVal > 0){
				//debugger;
				this.calShow = true;
				localStorage.setItem("buymoney",curVal)
			}else{
				this.calShow = false;
			}
			console.log(this.hhbShow);
			if(this.hhbShow){
				if(curVal > (this.hhbData.totalMoney-0)){
					console.log(curVal);
					console.log(this.hhbData.totalMoney);
					this.nowId03 = '';
					if(this.choiceShow){
						this.nowId03 = this.bankList[0].bankCardNo;
						this.bankdata.pay_type = 'bank';
						this.userName = this.bankList[0].name;
						this.IDcard = this.bankList[0].pid;
						this.bankID = this.bankList[0].bankCardNo;
						this.banknum = this.bankList[0].bankNo;
						this.userId = this.bankList[0].userId;
						this.bankname = this.bankList[0].bank;
					}
				}else{
					this.nowId03 = 'hhb';
				}

				setTimeout(()=>{
					axios.post('/api/buywithcounpon.htm', {
						t:new Date(),
						app_token:this.token,
						canAddInterest : this.interest,
						canCashCoupon  : this.coupon,
						amount:this.money,
						period:this.period,
						status:0,
						financingTargetId:this.financingtargetid
					})
					.then(res =>{
						console.log("优惠劵数据2222");
						console.log(res);
						if(res.data.addinterest.length == 0 && res.data.cashcoupon.length == 0){
							this.nowId02 = "";
							this.optionType = "";  //红包还是加息
	         				this.optionStr =  "" ;  //劵的id
						}else if(res.data.cashcoupon.length != 0){
							this.nowId02 = res.data.cashcoupon[0].id;
							this.optionType = 'cashCoupon';  //红包
	         				this.optionStr =  res.data.cashcoupon[0].id ;  //劵的id
	         				this.hongbao = res.data.cashcoupon[0].amount ;
							console.log(this.nowId02)
							console.log("红包")
							console.log(this.optionType)
							console.log(this.optionStr)
						}else if(res.data.addinterest.length != 0 && res.data.cashcoupon.length == 0){
							this.nowId02 = res.data.addinterest[0].id;
							this.optionType = 'addInterest';  //加息
	         				this.optionStr =  res.data.addinterest[0].id ;  //劵的id
							console.log(this.nowId02)
							console.log("加息券")
							console.log(this.optionType)
							console.log(this.optionStr)
						}
						res.data.cashcoupon.forEach((item)=>{
							item.conditions01 = eval(item.conditions);
							item.type = 'cashCoupon';
						})
						res.data.addinterest.forEach((item)=>{
							item.conditions01 = eval(item.conditions);
							item.type = 'addInterest';
						})
						this.couponsData = res.data;
					})
					.catch(res=> {
						console.log(res);
					});
				},500)
			}
			
			if(curVal > this.targetData.limit_amount){
				this.money = (this.targetData.limit_amount).toString();
				this.$toast({
					  message: "限额"+this.targetData.limit_amount+"元",
					  position: 'bottom',
					  duration: 3000
				});
			}
			
		  //console.log(curVal,oldVal);
		}
	},
	filters:{
		//转化为以万元为单位
		wan(val){
			return val/10000
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
	.top{
		width: 100%;
		padding: 8px 0;
		overflow: hidden;
		background: #3ca8ee;
		color: #FFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
	}
	.top .returns{
		margin-left: 2%;
		margin-top: 3px;
	}
	.top .name{
		width: 90%;
		text-align: center;
	}
	.max_box{
		width: 100%;
		overflow: hidden;
		padding-bottom: 100px;
		margin-top: 20px;
	}
	.puch_title{
		width: 100%;
		position: relative;
		font-size: 16px;
		color:#3e484f;
		margin: 36px 0;
	}
	.puch_name{
		width:25%;
		float: left;
		padding-left: 4%;
		line-height: 40px;
	}
	.puch_input{
		display: inline-block;
		border: none;
		float: left;
		width: 50%;
		padding-left: 10px;
		height: 40px;
		font-size: 18px;
		margin-bottom: 10px;
		margin-top: -2px;
	}
	.puch_right{
		float: right;
		width: 10%;
		line-height: 40px;
		margin-top: 2px;
	}
	.puch_posi{
		position: absolute;
		top:-14px;
		right: 10%;
		font-size: 12px;
		padding: 5px;
		padding-bottom: 10px;
		background:#fff url("../assets/img/puch01.png") no-repeat center;
		background-size: 100% 100%;
		color: #ff6c39;
		display: -none;
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
		padding: 2px 16px;
		font-size: 14px;
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
		background: url("../assets/img/puch14.png") no-repeat right;
		background-size: 100% 100%;
		margin-top: 15px;
		color:#d8dadb;
		overflow:hidden;
	}
	.coupon_sty02{
		border-radius: 6px;
		background: #3ca8ee;
		color: #FFF;
	}
	.sty_box{
		background: url("../assets/img/puch05.png") no-repeat right;
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
	.time_sbox{
		width: 88%;
		overflow: hidden;
		padding: 10px 25px 0 36px;
		color: #3ca8ee;
		font-size: 12px;
		background:#f5f5f9 url(../assets/img/puch15.png) no-repeat 15px 12px;
		background-size: 15px;
	}
	.food_but {
		width: 90%;
		text-align: center;
		color: #ffffff;
		background-color: #ff6c39;
		line-height: 46px;
		border-radius: 8px;
		margin: auto;
	}
	.bind_but {
		display: block;
		width: 100%;
		line-height: 44px;
		color: #ff6c39;
		font-size: 15px;
		margin: 15px auto 4px;
		background: url(../assets/img/puch12.png) no-repeat 15px center,url(../assets/img/puch03.png) no-repeat 83% center;
		background-size: 18px 18px,7px 12px;
		padding-left: 40px;
		border-top: 12px solid #f5f5f9;
	}
	.disne_ei {
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #acb2b8;
		line-height: 34px;
	}
	.posi_box {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		padding-top: 15px;
		border-top: solid 1px #e5e5e5;
		background-color: #fff;
	}
	.choice_tuone, .dis_tuone, .option_tuone {
		float: right;
		margin-right: 15px;
		width: 20px;
		height: 20px;
		margin-top: 15px;
		background: url(../assets/img/xuan01.png) no-repeat center !important;
		background-size: 100% 100% !important;
	}
	.choice_tu, .dis_tu, .option_tu {
		float: right;
		margin-right: 15px;
		width: 20px;
		height: 20px;
		margin-top: 15px;
		background: url(../assets/img/xuan02.png) no-repeat center;
		background-size: 100% 100%;
	}
	#text_box {
		color: #3ca8ee;
	}
	a {
		text-decoration: none!important;
	}
	/*更多优惠券*/
	.black{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.4;
		z-index: 5;
	}
	.discount_box{
		width:90%;
		height: 410px;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		top:50%;
		left: 5%;
		margin-top: -200px;
		border-radius: 5px;
		z-index: 6;
	}
	.discount_box .tips{
		clear: both;
		float: left;
		margin-top: -30px;
		margin-left: 5%;
		font-size: 12px;
		color: #CCC;
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
		margin-left: 4%;
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
	.black01{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 40px;
		background: #000;
		opacity: 0.5;
		z-index: 3;
	}
	.order{
		width: 200px;
		text-align: center;
		height: 30px;
		position: fixed;
		top: 180px;
		z-index: 5;
		left: 26%;
		color: #FFF;
	}
</style>
