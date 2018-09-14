<template>
	<div class="purchase">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="18">
			</div>
			<div class="name fl">购买</div>
		</div>
		<div class="max_box" id="app">
			<div class="puch_title">
				<div class="puch_name">购买金额</div>
				<input class="puch_input" id="puch_money" type="text" v-model="money" :placeholder="holder">
				<div class="puch_right">元</div>
				<!-- <div class="puch_posi" v-show="!hhbShow && calShow">预计收益<span id="puch_num">{{calculatormoney}}</span>元</div> -->
			</div>
			<div class="share_box">
				<div class="share_left">可购份额 <span id="canbuy">{{targetData.canbuy}}</span>元</div>
				<div class="share_right">限额<span id="limit_amount">{{targetData.limit_amount}}</span>元</div>
			</div>

			<div><!--  v-show="hhbShow" -->
				<!-- <div class="coupons_box">
					<div class="coupons_left">使用的优惠券</div>
					<div v-if="couponsData.addinterest == '' && couponsData.cashcoupon == ''"></div>
					<div v-else class="coupons_right" @click="moreCoupon">暂无优惠券</div>
				</div> -->

				<div class="coupons_box" @click="moreCoupon">
					<div class="coupons_left">使用的优惠券</div>
					<div class="coupons_right">
						<span v-if="moreCouponsData.length == 0 && this.optionType == ''">
						
							<span style="color: #ff6c39;" v-if="this.choiceName == '不使用优惠券'">不使用优惠券</span>
							<span v-else>暂无优惠券</span>
						</span>
						<span style="color: #ff6c39;" v-else>{{choiceName}}</span>
					</div>
				</div>
				<!-- 更多优惠券 -->
				<div class="black" v-show="couponShow" @click="blackClose"></div>
				<div class="discount_box" v-show="couponShow">
					<div class="discou_cont" id="discouBox">
						<!-- 红包 -->
						<div v-show="hongbaoShow">
							<div class="conpun_title">红包</div><!-- class="conpun_sty" -->
							<div class="conpun_sty" v-for="item in moreCouponsData" v-show="item.coupon_type=='cashCoupon'" @click="choiceCash(item)" typeid="cashCoupon">
								<img class="conpun_left" src="../assets/deposits_img/bid001.png">
								<div class="conpun_center">
									<div class="conpun_name">{{item.amount}}元，期限<span v-show="item.specialshow">=</span><span v-show="!item.specialshow">≥</span>{{item.period}}天  金额≥{{item.minInvestAmount}}</div>
									<div class="conpun_text">有效期至：{{item.endTime.split(" ")[0]}} <span v-show="item.summary">来源：{{item.summary}}</span></div>
									<div class="conpun_hint_text" v-if="item.blocked">该券已被锁定(正在订单购买中)，请等待5~15分钟后再重试</div>
								</div>
								<div class="conpun_yuan" :class="{conpun_back:nowId==item.uuid}" v-if="!item.blocked"></div>
								<div class="conpun_hint" v-else>使用中</div>
							</div>
						</div>
						
						<!--  -->

						<!-- 加息券 -->
						<div v-show="jiaxiquanShow">
							<div class="conpun_title" style="border-top: solid 1px #e5e5e5;padding-top: 15px;">加息券</div>
							<div class="conpun_sty" v-for="item in moreCouponsData" v-show="item.coupon_type=='addInterest'" @click="choiceInterest(item)" typeid="cashCoupon">
								<img class="conpun_left" src="../assets/deposits_img/bid002.png">
								<div class="conpun_center">
									<div class="conpun_name">{{item.amount}}%，期限≥{{item.period}}天  金额≥{{item.minInvestAmount}}</div>
									<div class="conpun_text">有效期至：{{item.endTime.split(" ")[0]}} <span v-show="item.summary">来源：{{item.summary}}</span></div>
									<div class="conpun_hint_text" v-if="item.blocked">该券已被锁定(正在订单购买中)，请等待5~15分钟后再重试</div>
								</div>
								<div class="conpun_yuan" :class="{conpun_back:nowId==item.uuid}" v-if="!item.blocked"></div>
								<div class="conpun_hint" v-else>使用中</div>
							</div>
						</div>
						
						<!--  -->

						<!-- 不使用 -->
						<div class="noconpun" :class="{noconpun02:noconpuntrue}" @click="noconpun">暂不使用优惠券</div>
						<!--  -->
					</div>
					<!-- <div class="confirm_but" @click="confirm">确认选择</div> -->
				</div>
			</div>

			<!-- 计算收益 -->
			<div class="earning_box"><!--  v-show="hhbShow" -->
				<div class="earn_left">
					<div class="earn_name">标的收益</div>
					<div class="earn_num">{{earnings}} 元</div>
				</div>
				<div class="earn_jia">+</div>
				<div class="earn_left">
					<div class="earn_name">奖励收益</div>
					<div class="earn_num">{{couponnum}} 元</div>
				</div>
				<div class="earn_jia">=</div>
				<div class="earn_left earn_width">
					<div class="earn_name">预计总收益</div>
					<div class="earn_num">{{totalMoney}} 元</div>
				</div>
			</div>
			<!--  -->

			<div class="hint_box" v-show="hintBoxShow">
				您已选择使用优惠券，如果支付失败，该券会被锁定15分钟，不能使用。
			</div>

			<!--银行卡-->
			<div class="choice_title" v-if="bankList.length != 0 ">选择支付方式</div>
			<div id="choiceBox">
				<div v-show="hhbShow">
					<div class="choice_sty" id="hhbscb" @click="choiceBankTwo(hhbData)">
						<img class="choice_img" src="../assets/img/puch07.png">
						<div class="choice_name">奖励账户<span class="choice_span">（可用金额<span id="hhbMoney">{{hhbData.totalMoney}}</span>元）</span></div>
						<div class="choice_tu" :class="{choice_tuone : nowId03 == hhbData.id}" id="hhbid" text="scb" bank="scb"></div>
					</div>
				</div>
				<div class="choice_sty" v-for="item in bankList" @click="choiceBank(item)">
					<img class="choice_img" :src="item.imgUrl">
					<div class="choice_name">{{item.bank}}<span class="choice_span">（单笔{{item.cashFuiouOne | wan}}万,单日{{item.cashFuiouDay | wan}}万）</span></div>
					<div class="choice_tu" :class="{choice_tuone : nowId03 == item.bankCardNo}"></div>
				</div>
			</div>   
			<a class="bind_but" v-show="bankList.length == 0" @click="addBank">添加银行卡</a>   
			<div class="posi_box">
				<div class="food_but" @click="purchases">提交订单</div>
				<div class="disne_ei"><span>点击提交订单即代表您已同意签署</span><a class="text_box" @click="agreement">《惠财投资协议》</a>和
			<a class="text_box" @click="promiseFun">《风险揭示及承诺书》</a></div>
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
      		hongbao:0,
      		canApplyBuy:0,         //可够份额
      		choiceName:'',          //选择之后的结果
      		choiceAmount:0,         //选择之后的金额
      		noconpuntrue:false,     //使用使用券
      		//earnings:0,			//标的收益
      		couponnum:0,			//奖励收益
      		totalMoney:0,			//预计总收益
      		hongbaoShow: false,		//是否有红包
      		jiaxiquanShow: false ,   //是否有加息券
      		hintBoxShow:false,       //加息券提示
      		bidType: ''    //标的类型
		}
	},
	components:{

	},
	methods:{
		/*返回--事件*/
		returns(){
			this.$router.go(-1);
			localStorage.removeItem("buymoney");
			localStorage.removeItem("optionType");
			localStorage.removeItem("optionStr");
			localStorage.removeItem("choiceName");
			localStorage.removeItem("couponnum");
			localStorage.removeItem("totalMoney");
			localStorage.removeItem("token_uuid");
			localStorage.removeItem("hintBoxShow");
		},
		/*到投资协议--事件*/
		promiseFun(){
			var token_uuid = this.token +this.financingtargetid;
			localStorage.setItem("optionType",this.optionType);
			localStorage.setItem("token_uuid",token_uuid);
			localStorage.setItem("optionStr",this.optionStr);
			localStorage.setItem("choiceName",this.choiceName);
			localStorage.setItem("couponnum",this.couponnum);
			localStorage.setItem("totalMoney",this.totalMoney);
			localStorage.setItem("hintBoxShow",this.hintBoxShow);
			this.$router.push({path:"/riskreveal"})
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
			var token_uuid = this.token +this.financingtargetid;
			localStorage.setItem("optionType",this.optionType);
			localStorage.setItem("token_uuid",token_uuid);
			localStorage.setItem("optionStr",this.optionStr);
			localStorage.setItem("choiceName",this.choiceName);
			localStorage.setItem("couponnum",this.couponnum);
			localStorage.setItem("totalMoney",this.totalMoney);
			localStorage.setItem("hintBoxShow",this.hintBoxShow);
			if(this.bidType=="SCB"){
				this.$router.push({path:"/agreement?app_token="+this.token +"&buyAmount=" + this.money + "&financingTargetId=" + this.financingtargetid  +"&depository=false" })
			}else{
				this.$router.push({path:"/agreementsignature?app_token="+this.token +"&buyAmount=" + this.money + "&financingTargetId=" + this.financingtargetid  +"&depository=false" })
			}
			
		},
		/*购买--事件*/
		purchases(){
			console.log(this.nowId)
			console.log(this.nowId02)
			console.log(this.optionStr)
			console.log(this.hongbao)
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
			if (this.bankname == "") {
				this.$toast({
					  message: "请先选定银行卡",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			console.log("数据1");
			console.log(this.bankdata)
			//debugger;
			/*if(this.bankdata.pay_type == 'scb'){
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
					}else if((this.money-0) > (this.canApplyBuy-0)){
						this.$toast({
							message: "可购份额不足!",
							position: 'bottom',
							duration: 3000
						});
						return;
					}else if(this.hhbMoney == 0){
						this.$toast({
							message: "奖励账户资产为零",
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
					}else if((this.money-0) > (this.canApplyBuy-0)){
						this.$toast({
							message: "可购份额不足!",
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
				if ((this.money-0) > (this.canApplyBuy-0)) {
					this.$toast({
						message: "可购份额不足!",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				this.orderShow = true;
				setTimeout(()=>{
					this.bankpurchase();
				},3000)
			}*/
			if ((this.money-0) > (this.canApplyBuy-0)) {
				this.$toast({
					message: "可购份额不足!",
					position: 'bottom',
					duration: 3000
				});
				return;
			}
			this.orderShow = true;
			setTimeout(()=>{
				this.bankpurchase();
			},3000)
		},
		/*使用惠活宝购买--方法*/
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
				localStorage.removeItem("optionType");
				localStorage.removeItem("optionStr");
				localStorage.removeItem("choiceName");
				localStorage.removeItem("couponnum");
				localStorage.removeItem("totalMoney");
				localStorage.removeItem("hintBoxShow");
				//debugger
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
		/*使用银行卡购买--方法*/
		bankpurchase(){
			if (this.bankname == "") {
				this.$toast({
					  message: "请先选定银行卡",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
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
		/*富有支付*/
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
					way : 'fuiou',                 //支付渠道 fuiou reapal
					app_token: this.token,   //用户token
					device: "android/ios&id",
					clientType:'weixin'
			})
			.then(res =>{
			  	console.log("富友使用银行卡购买接口数据");
			  	console.log(res);
			  	this.orderShow = false;
			  	localStorage.removeItem("buymoney");
			  	localStorage.removeItem("optionType");
				localStorage.removeItem("optionStr");
				localStorage.removeItem("choiceName");
				localStorage.removeItem("couponnum");
				localStorage.removeItem("totalMoney");
				localStorage.removeItem("hintBoxShow");
			  	//debugger/*测试*/
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
		/*选择银行卡--方法*/
		choiceBank(item){
		  this.bankdata = item;
		  this.nowId03 = item.bankCardNo;
		  this.userName = item.name;
		  this.IDcard = item.pid;
		  this.bankID = item.bankCardNo;
		  this.banknum = item.bankNo;
		  this.userId = item.userId;
		  this.bankname = item.bank;
		},
		/*选择惠活宝--方法*/
		choiceBankTwo(hhbData){
			this.bankdata = hhbData;
			this.bankdata.pay_type = "scb";
			this.nowId03 = hhbData.id;
			console.log(hhbData)
		},
		/*不使用优惠券*/
		noconpun(){
			this.hintBoxShow = false;
			this.nowId = "";
			this.choiceName = "不使用优惠券";
			this.noconpuntrue = true;
			this.couponShow = false;
			this.optionType = "";  //红包还是加息
     		this.optionStr =  "" ;  //劵的id
			this.couponnum = 0;
		  	this.totalMoney = ((this.earnings-0) + (this.couponnum-0)).toFixed(2);
		  	localStorage.setItem("choiceName",this.choiceName)
		},
		/*点击黑色区域关闭优惠券*/
		blackClose(){
			this.couponShow = false;
		},
		/*使用现金券*/
		choiceCash(item){
			if(item.blocked == true){
				return;
			}
			this.hintBoxShow = true;
			this.noconpuntrue = false;
			this.nowId = item.uuid;
			this.optionType = item.coupon_type;
		  	this.optionStr = item.uuid;
		  	this.hongbao = item.amount;
		  	this.couponnum = item.amount;
		  	this.totalMoney = ((this.earnings-0) + (this.couponnum-0)).toFixed(2);
		  	this.choiceAmount = item.amount;
		  	this.choiceName = item.name;
		  	this.couponShow = false;
		 	return;
		},
		/*使用优惠券*/
		choiceInterest(item){
			if(item.blocked == true){
				return;
			}
			this.hintBoxShow = true;
			this.noconpuntrue = false;
			this.nowId = item.uuid;
			this.optionType = item.coupon_type;
		  	this.optionStr = item.uuid;
		  	this.choiceAmount = item.amount;
		  	this.choiceName = item.name;
		  	this.couponnum = (this.money/365*item.amount*this.period/100).toFixed(2);
		  	this.totalMoney = ((this.earnings-0) + (this.couponnum-0)).toFixed(2);
		  	this.couponShow = false;
		  	return;
		},
		choice02(item){
			if(this.nowId02 == item.uuid){
				console.log("取消")
				this.use = false;
				this.nowId02 = '';
				this.optionType = "";
			}else{
				this.nowId02 = item.uuid;
				this.nowId = '';
				if (item.optionType==1 || this.optionType == 'CASH_COUPON') {
					this.optionType = 'cashCoupon';
				}else if(item.optionType==2 || this.optionType == 'ADD_INTEREST'){
					this.optionType = 'addInterest';
				}
			  	this.optionStr = item.uuid;
			  	this.hongbao = item.amount;
			  	console.log("使用")
			  	this.use = true;
			  	console.log(item)
			  	console.log(this.optionType)
			  	console.log(this.optionStr)
				console.log(this.nowId02)
			}
		},
		/*查看更多优惠券--方法*/
		moreCoupon(){
			if(this.money == 0 || this.money == ""){
				this.$toast({
					  message: "请输入购买金额",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			}
			this.dataThreeFn();
		},
		/*关闭红包--事件*/
		closeCoupon(){
		  this.couponShow = false;
		  this.nowId = '';
		},
		/*添加银行卡--事件*/
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
		/*红包选择后确认--事件*/
		confirm(){
		  this.couponShow = false;
		  this.nowId02 = '';
		},
		/*获取链接参数--方法*/
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
		/*进页面就要执行的方法*/
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
				this.canApplyBuy = this.targetData.canbuy;
				this.dataTwoFn(); 
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
		/*进页面就要执行的方法--Two*/
		dataTwoFn(){
			/* 判断标的 */
			axios.post('/api/getFinancingTarget_Type.htm', {
				financingTargetId:this.financingtargetid
			})
			.then(res =>{
				console.log("判断标的数据");
				console.log(res); 
				this.bidType =  res.data.type || '';
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
					//this.hhbShow = true;
					this.hhbShow = false;
				}
			})
			.catch(res=> {
				console.log(res);
			});
		},
		/*进页面就要执行的方法--three*/
		dataThreeFn(){
			/*更多优惠劵数据*/
			axios.post('/api/v2/coupon/cash/list_buy_bid', {
				t:new Date(),
				app_token:this.token,//新人16
				canAddInterest : this.interest,
				canCashCoupon  : this.coupon,
				amount:this.money,
				period:this.period,
				status:1
			})
			.then(res =>{
				console.log("more优惠劵数据");
				console.log(res);
				/**/
				res.data.result.forEach((item)=>{
					if (item.couponType==1 || item.couponType == 'CASH_COUPON') {
						item.coupon_type = 'cashCoupon';
						this.hongbaoShow = true;
					}else if(item.couponType==2 || item.couponType == 'ADD_INTEREST'){
						item.coupon_type = 'addInterest';
						this.jiaxiquanShow = true;
					}
					if(item.specialPeriod==null){
						item.specialshow = false;
					}else{
						item.specialshow = item.specialPeriod;
					}
				})
				this.moreCouponsData = res.data.result;
				if(this.moreCouponsData.length == 0){
					this.$toast({
						message: "暂无优惠券！",
						position: 'bottom',
						duration: 3000
					});
					return;
				}else{
					this.couponShow = true;
				}
				console.log("more");
				console.log(this.moreCouponsData);
			})
			.catch(res=> {
				console.log(res);
			});
		},
		/*延迟出发--方法*/
		delay:debounce(function(){
			this.couponFn();	
		},500),
		couponFn(){
			//debugger;
			if(this.money == " " || this.money == 0){
				this.totalMoney = 0;
				return;
			}else{
				axios.post('/api/v2/coupon/cash/list_buy_bid', {
					t:new Date(),
					app_token:this.token,//新人16
					canAddInterest : this.interest,
					canCashCoupon  : this.coupon,
					amount:this.money,
					period:this.period,
					status:1
				})
				.then(res =>{
					console.log("more优惠劵数据");
					console.log(res);
					//alert(typeof res.data.result)
					if(res.data.result == []){
						this.nowId02 = "";
						this.optionType = "";  //红包还是加息
	     				this.optionStr =  "" ;  //劵的id
	     			}else {
	     				/*if (res.data.result[0].type==1) {
	     					this.optionType = 'cashCoupon';
	     				}else if(res.data.result[0].type==2){
	     					this.optionType = 'addInterest';
	     				}*/
	     				this.noconpuntrue = false;
	     				var arr = [];
	     				
	     				res.data.result.forEach((item,index)=>{
	     					if (!item.blocked) {
	     						arr.push(item);
	     					}
	     					if(item.specialPeriod==null){
								item.specialshow = false;
							}else{
								item.specialshow = item.specialPeriod;
							}

	     					/*this.nowId = res.data.result[0].id;

		     				this.nowId02 = res.data.result[0].id;
							//this.optionType = res.data.result[0].type;  //红包
		     				this.optionStr =  res.data.result[0].id ;  //劵的id
		     				this.hongbao = res.data.result[0].amount ;*/
		     				//this.choiceName =  res.data.result[0].name;
	     				})
						if(arr.length == 0){
							this.nowId02 = "";
							this.optionType = "";  //红包还是加息
	     					this.optionStr =  "" ;  //劵的id
	     					this.hintBoxShow = false;
						}else{
							this.hintBoxShow = true;
							if (arr[0].couponType=="CASH_COUPON") {
		     					this.optionType = 'cashCoupon';
		     				}else if(arr[0].couponType=="ADD_INTEREST"){
		     					this.optionType = 'addInterest';
		     				}
							this.nowId = arr[0].uuid;
		     				this.nowId02 = arr[0].uuid;
							//this.optionType = arr[0].type;  //红包
		     				this.optionStr =  arr[0].uuid ;  //劵的id
		     				this.hongbao = arr[0].amount ;
						}
	     			}
	     			this.moreCouponsData = arr;
	     			if(this.moreCouponsData.length == 0){
	     				this.choiceName = "暂无优惠券";
	     				this.couponnum = 0;
	     				this.totalMoney = ((this.earnings-0) + (this.couponnum-0)).toFixed(2);
	     			}else{
	     				this.choiceName = this.moreCouponsData[0].name;
	     				if(this.money > 0){
	     					if(this.moreCouponsData[0].couponType == "CASH_COUPON"){
	     						this.couponnum = this.moreCouponsData[0].amount;
	     						this.optionType = "cashCoupon";
	     					}else{
	     						this.couponnum = (this.money/365*this.moreCouponsData[0].amount*this.period/100).toFixed(2);
	     						this.optionType = "addInterest";
	     					}
	     				}else{
	     					this.couponnum = 0;
	     				}
	     				this.totalMoney = ((this.earnings-0) + (this.couponnum-0)).toFixed(2);
	     			}
	     			console.log("more");
	     			console.log(this.moreCouponsData);
		         })
				.catch(res=> {
					console.log(res);
				});
			}
		}
	},
	created(){

	},
	mounted(){
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
		var token_id = this.token + this.financingtargetid;
		var token_uuid_text =localStorage.getItem("token_uuid") ||'';
		if(token_id == token_uuid_text){
			if(localStorage.getItem("buymoney")){
				this.money = localStorage.getItem("buymoney");
			}
			if(localStorage.getItem("choiceName")){
				/*alert('kk');
				alert(localStorage.getItem("choiceName"))*/
				this.optionType = localStorage.getItem("optionType");
				this.optionStr = localStorage.getItem("optionStr");
				this.nowId = localStorage.getItem("optionStr");
				this.choiceName = localStorage.getItem("choiceName");
				this.couponnum = localStorage.getItem("couponnum");
				this.couponnum = localStorage.getItem("couponnum");
				this.totalMoney = localStorage.getItem("totalMoney");
				this.hintBoxShow = localStorage.getItem("hintBoxShow");
				if (this.hintBoxShow == 'true') {
					this.hintBoxShow = true;
				}else{
					this.hintBoxShow = false;
				}
			}
			if(localStorage.getItem("choiceName") == "不使用优惠券"){
				this.noconpuntrue = true;
			}
		}
		
		this.dataFn();
	}, 
	computed:{
		/*标的收益--方法*/
		earnings(){
			let thismoney = (this.money).replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			console.log(thismoney)
			console.log(this.period)
			console.log(this.rates)
			return ((thismoney*this.period*this.rates)/100/365).toFixed(2)
		},
		/*预计收益--方法*/
		calculatormoney(){
			let thismoney = (this.money).replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			console.log(thismoney)
			console.log(this.period)
			console.log(this.rates)
			return ((thismoney*this.rates)/100/365).toFixed(2)
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
			/*if(this.hhbShow){
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
				
				this.delay();
			}*/
			
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
			this.delay();
			
			if(curVal > this.targetData.limit_amount){
				this.money = (this.targetData.limit_amount).toString();
				this.$toast({
					  message: "限额"+this.targetData.limit_amount+"元",
					  position: 'bottom',
					  duration: 3000
				});
			}
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
		background: #fff;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		border-bottom: solid 1px #eee;
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
		height: 32px;
		line-height: 32px;
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
		background: url("../assets/deposits_img/puch03.png") no-repeat right;
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
		border-top: solid 1px #f5f5f9;
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
		/*margin: 15px auto 4px;*/
		background: url(../assets/img/puch12.png) no-repeat 15px center,url(../assets/img/puch03.png) no-repeat 83% center;
		background-size: 18px 18px,7px 12px;
		padding-left: 40px;
		border-top: 1px solid #f5f5f9;
	}
	.disne_ei {
		width: 90%;
	    text-align: center;
	    font-size: 12px;
	    color: #acb2b8;
	    margin: 5px auto;
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
	.dis_tuone, .option_tuone {
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
	.text_box {
		color: #3ca8ee;
	}
	.text_box:hover{
		color:#3ca8ee;
		text-decoration: none;
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
		width:100%;
		height: 410px;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		top:50%;
		margin-top: -50px;
		z-index: 6;
	}
	.discount_box .tips{
		clear: both;
		float: left;
		margin-top: -50px;
		margin-left: 18%;
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
		position: relative;
		width:100%;
		overflow: hidden;
		height: 270px;
		overflow-y: scroll;
		padding-bottom: 55px;
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

	/*存管yym*/
	.redcoupon{
		float: left;
		width: 30px;
		margin-left: 4%;
		margin-top: 12px;
	}
	.redcoupon img{
		width: 30px;
		height: 40px;
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
        background: url("../assets/deposits_img/xuan02.png") no-repeat right center;
        background-size: 20px 20px;
        font-size: 12px;
    }*/
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
		background: url("../assets/deposits_img/xuan02.png") no-repeat right center;
		background-size: 20px 20px;
	}

    
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
        background:#fff url("../assets/deposits_img/xuan02.png") no-repeat right center;
        background-size: 20px 20px;
        border-top:solid 1px #e5e5e5;
        font-size: 12px;
    }
    .conpun_back{
        background-image: url("../assets/deposits_img/xuan01.png");
    }
    .conpun_hint{
		position: absolute;
		top:15px;
		right:0;
		font-size: 10px;
		line-height: 20px;
		color:red;
	}
	.conpun_hint_text{
		font-size: 12px;
	    color: red;
	    margin-top: 2px;
	}
    .choice_tuone{
    	background-image: url("../assets/deposits_img/xuan01.png");
    }
    .noconpun{
    	width: 90%;
	    overflow: hidden;
	    height: 50px;
	    position: fixed;
	    bottom: 0;
	    left: 5%;
	    line-height: 50px;
	    background: #fff url(../assets/deposits_img/xuan02.png) no-repeat right center;
	    background-size: 20px 20px;
	    border-top: solid 1px #e5e5e5;
    }
    .noconpun02{
    	width: 90%;
	    overflow: hidden;
	    height: 50px;
	    position: fixed;
	    bottom: 0;
	    left: 5%;
	    line-height: 50px;
	    background: #fff url(../assets/deposits_img/xuan01.png) no-repeat right center;
	    background-size: 20px 20px;
	    border-top: solid 1px #e5e5e5;
    }
    /*预计收益*/
    .earning_box{
        width:100%;
        overflow: hidden;
        background-color: #f5f5f9;
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
        margin-top:20px;
        float: left;
    }
    .earn_width{
        width:30%;
    }
    .hint_box {
	    width: 90%;
	    position: fixed;
	    left: 5%;
	    bottom: 110px;
	    color: #666;
	    font-size: 12px;
	    line-height: 22px;
	}

</style>
