<template>
	<div class="addbank">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">绑定银行卡</div>
		</div>
		<div class="max_box">
			<div class="max_step" v-show="!nextStep">
				<img class="step_img" style="margin-left: 5px;" src="../assets/img/step01.png">
				<div class="step_one"></div>
				<img class="step_img" src="../assets/img/step02.png">
				<div class="step_cont">第1步</div>
				<div class="step_cond">第2步</div>
			</div>
			<div class="max_step" v-show="nextStep">
				<img class="step_img" style="margin-left: 5px;" src="../assets/img/step01.png">
				<div class="step_two"></div>
				<img class="step_img" src="../assets/img/step01.png">
				<div class="step_cont">第1步</div>
				<div class="step_cond">第2步</div>
			</div>
			<div class="max_cont">
				<div class="cont_img">●</div>
				<div class="cont_text">请绑定持卡人本人的银行卡，您的用卡安全是全程保密的，请放心填写</div>
			</div>
			<div class="fist_bu" v-show="!nextStep">
				<input class="bank_input" id="bank_name" type="text" v-model="userName" style="margin-top:8px;" placeholder="请输入开卡姓名" :readOnly="readTrue">
				<input class="bank_input" id="bank_iden" type="text" v-model="IDcard" placeholder="请输入开卡身份证号" maxLength="18" :readOnly="readTrue">

				<div class="but_box" v-if="this.userName == '' || this.IDcard == ''">
					<div class="but_one but_opac">下一步</div>
				</div>
				<div class="but_box" v-else>
					<div class="but_one"  @click="goNextOne">下一步</div>
				</div>
			</div>
			<!--第二步-->
			<div class="last_bu" v-show="nextStep">
				<input class="card_box" id="card_input" type="tel" v-model="bankID" placeholder="请输入您的卡号"  maxLength="23">
				<div class="support_bank">
					<div class="support_but"  @click="supportBank">支持银行</div>
				</div>
				<div class="protocol_box">
					<img class="protocol_img" src="../assets/img/step04.png">
					<span>我已阅读同意<a class="protocol_a" id="text_one" @click="riskwarn">《风险揭示及承诺书》</a> 和<a class="protocol_a" id="text_box" @click="agreement">《惠财投资协议》</a></span>
				</div>
				<div class="bank_but" v-if="this.bankID == ''">
					<div class="but_one but_opac">下一步</div>
				</div>
				<div class="bank_but" v-else>
					<div class="but_one" @click="goNextTwo">下一步</div>
				</div>

			</div>
			<!-- <div id="runingLayout">下单中,请稍等...</div> -->
			<form id="formPay" action="" method="post" target="_self">
				<input name="t" value="<%=new Date() %>" type="hidden" />
				<input name="mchntCd" type="hidden" value="" /> 
				<input name="orderid" type="hidden" value="" /> 
				<input name="ono" type="hidden" value="" /> 
				<input name="backurl" type="hidden" value="" /> 
				<input name="reurl" type="hidden" value="" /> 
				<input name="homeurl" type="hidden" value="" /> 
				<input name="name" type="hidden" value="" /> 
				<input name="sfz" type="hidden" value="" /> 
				<input name="md5" type="hidden" value="" />
			</form> 

			<div id="reapalCerFormLayout" style="display: none;" v-html="reapalCerFormHtml"></div>
			<div id="reapalCerFormLayout" style="display: none;" v-html="fuiouFormHtml"></div>
			<div id="baofooWapPayLayout" style="display: none;"></div>
			<input id="bankCode" type="hidden" value="">
			<input id="channel" type="hidden" value="">
			<input id="userId" type="hidden" value="">


		</div>

	</div>
</template>

<script>
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		data () {
			return {
				userName:'',
				IDcard:'',
				bankID:'',
				readTrue:false,
				nextStep:false,
				buyAmount:'',
				way:'',
				markId:'',
				banknum:'',
				bankname:'',
				channel:'',
				userId:'',
				payTime:'',
				token:'',
				reapalCerFormHtml :'',	//融宝
				fuiouFormHtml:'',		//富友
	  			optionType:'',          //红包或者加息券
	  			optionStr:'',           //红包或者加息券id
	  			hiddenTrue:false,
	  			bidType:''    //标的类型
			}
		},
		methods:{
			returns(){
				this.$router.go(-1);
				this.delCookie("bankID");
			},
			riskwarn(){
				this.$router.push({path:"/riskreveal"})
			},
			agreement(){
				if(this.bidType=="SCB"){
					this.$router.push({path:"/agreement?app_token="+this.token +"&buyAmount=" + this.buyAmount + "&financingTargetId=" + this.markId  +"&depository=false" })
				}else{
					this.$router.push({path:"/agreementsignature?app_token="+this.token +"&buyAmount=" + this.buyAmount + "&financingTargetId=" + this.markId  +"&depository=false" })
				}
				/*this.$router.push({ name: 'Agreement', params: { markId: this.markId, buyAmount:this.buyAmount,payTime:this.payTime}}) */
			},
			supportBank(){
				this.$router.push({path:'/banklimit'})
			},
			bankIdTrue(value){
				var result=value.replace(/[ ]/g,"");
				return result
			},
			/*token失效*/
			failureFun(){
				HC.delStorage('sessionToken');
				this.$router.push({path:'/login'})
			},
			goNextOne(){
				  //IDCardCheck();
				  if(this.readTrue == true){
				  	this.nextStep = true;
				  }
				  if(this.IDCardCheck()==false){
				  	this.$toast({
				  		message: "身份证号错误！",
				  		position: 'bottom',
				  		duration: 3000
				  	});
				  	return;
				  }else{
					//身份证验证
					axios.post('/api/save_user_pid.htm', {
						t : new Date(),
						app_token :this.token, 
						pid:this.IDcard,
						name: this.userName
					})
					.then(res =>{
						console.log("身份证验证");
						console.log(res);
						if(res.data.code=="NOT_MORE_MOBILE"){
							this.$toast({
								message: "同一个身份证号，最多绑定3个手机号",
								position: 'bottom',
								duration: 3000
							});
						}else if(res.data.code=="SUCCESS"){
							this.nextStep = true;
						}
					})
					.catch(res=> {
						console.log(res);
					});
				}
			},
			goNextTwo(){
				  //绑定银行卡
				  axios.post('/api/bankblinding.htm', {
				  	t : new Date(),
				  	bankno : this.bankIdTrue(this.bankID)
				  })
				  .then(res =>{
				  	console.log("绑定银行卡");
				  	console.log(res);
				  	if(res.data.code=="nosuport" || res.data.code=="bankerror"){
				  		this.$toast({
				  			message: "银行卡号错误！",
				  			position: 'bottom',
				  			duration: 3000
				  		});
				  	}else{
				  		this.banknum = res.data.bankCode;
				  		this.bankname = res.data.bank;
						  //银行卡渠道
						  axios.post('/api/bank_pay_way.htm', {
						  	t : new Date(),
						  	bankName : res.data.bank,
						  	buyAmount : this.buyAmount,
						  	app_token: this.token
						  })
						  .then(res =>{
						  	console.log("银行卡渠道01");
						  	console.log(res);
						  	if(res.data.way=='' || res.data.way==null){
						  		axios.post('/api/bank_pay_way.htm', {
						  			t : new Date(),
						  			bankName : res.data.bank,
						  			buyAmount : this.buyAmount,
						  			app_token: this.token
						  		})
						  		.then(res =>{
						  			console.log("银行卡渠道02");
						  			console.log(res);
						  			if(res.data.code == "TOKEN_ERROR"){
										this.failureFun();
									}
						  			this.way = res.data.way;
						  		})
						  		.catch(res=> {
						  			console.log(res);
						  		});
						  	}else{
						  		this.way = res.data.way;
						  	}
						  	this.$toast({
						  		message: "下单中...",
						  		position: 'bottom',
						  		duration: 3000
						  	});
						  	this.setCookie("buyAmount",this.buyAmount);
						  	this.fuiou()
						  })
						  .catch(res=> {
						  	console.log(res);
						  });
						}
				})
				.catch(res=> {
				  	console.log(res);
				});
			},
			fuiou(){
			  //富友
			  console.log("富友");
			  //debugger
			  axios.post('/api/bid_form_create_fuiou_order.htm', {
			  	t : new Date(),
				buyAmount : this.buyAmount,    //购买金额
				name : this.userName,     //购买用户姓名
				pid  : this.IDcard,   //购买用户身份证
				bankCardNo : this.bankIdTrue(this.bankID),  //购买银行卡号
				financingTargetId : this.markId, //标的id
				bankNo : this.banknum,   //银行编号
				userId : this.userId,    //用户id
				bankName : this.bankname,   //那个银行
				_channel : 'mobile', //渠道
				pay_type : "on",                //银行卡购买
				discountCouponType : this.optionType,    //红包还是加息
				discountCouponId : this.optionStr,   //劵的id
				way :'fuiou' ,                 //支付渠道this.way
				app_token: this.token,   //用户token
				device: "android/ios&id",
				clientType:'weixin'
			})
			  .then(res =>{
			  	console.log("富友数据");
			  	console.log(res);
			  	if (!res.data) {
			  		this.$messagebox('提示',"");
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
					  console.log("kkkk")
					  this.reapalCerFormHtml = res.data.reapalCerFormHtml;
					  this.$nextTick(() => {
					  	console.log("富友我问问")
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
					}else if(res.data.fuiou2_wap_pay_form){
						console.log("富友11")
						this.fuiouFormHtml = res.data.fuiou2_wap_pay_form;
						this.$nextTick(() => {
						  	console.log("富友12")
						  	console.log(document.getElementById("fuiou2submit"))
						  	document.getElementById("fuiou2submit").submit();
						  	this.nextStep = false;
			  				this.bankID = '';
						})    
						console.log(this.fuiouFormHtml)
					}else {	
					  /*$("#formPay").attr("action",data.fuiouPayUrl)
					  var formPay = $("#formPay");
					  formPay.find("[name='mchntCd']").val(data.mchntCd);
					  formPay.find("[name='backurl']").val(data.backurl);
					  formPay.find("[name='reurl']").val(data.reurl);
					  formPay.find("[name='homeurl']").val(data.homeurl);
					  formPay.find("[name='orderid']").val(data.fuiouOrderId);
					  formPay.find("[name='ono']").val(data.bankCardNo);
					  formPay.find("[name='name']").val(data.name);
					  formPay.find("[name='sfz']").val(data.pid);
					  formPay.find("[name='md5']").val(data.sign);
					  formPay.submit();*/
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
			  	console.log(res.status);
			  });
			},
			IDCardCheck(){
				//获取填写的身份证号码
				var num = this.IDcard;
				num = num.toUpperCase();
				//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
				if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
					/* alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');*/
					return false;
				}
				//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
				//下面分别分析出生日期和校验位
				var len, re;
				len = num.length;
				if (len == 15) {
					re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
					var arrSplit = num.match(re);
					//检查生日日期是否正确
					var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
					var bGoodDay;
					bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
					if (!bGoodDay) {
						/*alert('输入的身份证号里出生日期不对！');*/
						return false;
					}
					else {
						//将15位身份证转成18位
						//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
						var nTemp = 0, i;
						num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
						for (i = 0; i < 17; i++) {
							nTemp += num.substr(i, 1) * arrInt[i];
						}
						num += arrCh[nTemp % 11];
						return true;
					}
				}
				if (len == 18) {
					re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
					var arrSplit = num.match(re);
					//检查生日日期是否正确
					var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
					var bGoodDay;
					bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
					if (!bGoodDay) {
					   /* alert(dtmBirth.getYear());
					   alert(arrSplit[2]);*/
					   /* alert('输入的身份证号里出生日期不对！');*/
					   return false;
					}
					else {
						//检验18位身份证的校验码是否正确。
						//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
						var valnum;
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
						var nTemp = 0, i;
						for (i = 0; i < 17; i++) {
							nTemp += num.substr(i, 1) * arrInt[i];
						}
						valnum = arrCh[nTemp % 11];
						if (valnum != num.substr(17, 1)) {
							/*alert('18位身份证的校验码不正确！'); *///应该为： + valnum
							return false;
						}
						return true;
					}
				}
				return false;
			},
			dataFn(){
				/* 获取身份信息 */
				axios.post('/api/get_my_pid.htm', {
					t : new Date(),
					app_token :this.token,
				})
				.then(res =>{
					console.log("获取身份信息");
					console.log(res);
					//this.soldoutData = res.data
					if(res.data.code=="NO_PID"){
						this.userId = res.data.userId;
					}else{
						this.userName = res.data.name;
						this.IDcard = res.data.pid;
						this.channel = res.data.channel;
						this.userId = res.data.userId;
						this.readTrue = true;
					}

				})
				.catch(res=> {
					console.log(res);
				});
				/* 判断标的 */
				axios.post('/api/getFinancingTarget_Type.htm', {
					financingTargetId:this.markId
				})
				.then(res =>{
					console.log("判断标的数据"); 
					console.log(res.data)
					this.bidType =  res.data.type || '';
					console.log(this.bidType)
				})
				.catch(res=> {
					console.log(res);
				});

			}
		},
		components:{
			
		},
		computed: {

		},
		mounted(){
			//this.token = this.getCookie('sessionToken');
  			this.token = HC.getStorage('sessionToken');
  			this.markId = this.$route.params.userId; //标的ID
  			if(HC.getStorage("bankID") == null){
  				this.bankID = ""
  			}else{
  				this.bankID = this.bankIdTrue(HC.getStorage("bankID"));
  			}
  			//this.bankID = this.bankIdTrue(HC.getStorage("bankID")) || "";
  			if(this.bankID == ""){
  				this.nextStep = false;
  			}else{
  				this.nextStep = true;
  			}
			this.dataFn();
			console.log(this.$route.params);
			this.buyAmount = this.$route.params.buyAmount;
			this.optionStr = this.$route.params.optionStr;
			this.optionType = this.$route.params.optionType;
			console.log("红包加息ss")
			console.log(this.optionStr)
			
		},
		filters: {

		},
		watch:{
			bankID(curVal,oldVal){
				this.bankID = this.bankID.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
				HC.setStorage("bankID",this.bankIdTrue(this.bankID));
			},
			IDcard(val){
				this.IDcard = this.IDcard.replace(/[^\a-\z\A-\Z0-9]/g,'');
			},
			userName(val){
				//只能输入汉字
				this.userName = this.userName.replace(/[^\u4E00-\u9FA5]/g,'');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li{
		list-style: none;
	}
	.addbank{
		background: #f5f5f9;
	}
	.line{
		width: 2px;
		height: 16px;
		background: #FFF;
		float: left;
		margin-top: 12px;
		margin-left: 10px;
	}
	.financial{
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
		font-size: 12px;
		text-indent: 10px;
	}
	.max_box{
		width:100%;
		overflow:hidden;
		background-color: #f5f5f9;
		position: absolute;
		margin-top: 48px;
	}
	.max_step{
		width:230px;
		margin: 20px auto;
		overflow: hidden;
	}
	.step_img{
		width: 32px;
		height: 32px;
		float:left ;
		display : block;
	}
	.step_one{
		width:156px;
		float: left;
		height:2px;
		background-color: #d0d0d8;
		margin-top: 15px;
	}
	.step_two{
		width:156px;
		float: left;
		height:2px;
		background-color:#3ca8ee;
		margin-top: 15px;
	}
	.step_cont{
		float: left;
		line-height: 40px;
		font-size: 16px;
		color:#3ca8ee;
	}
	.step_cond{
		float: right;
		line-height: 40px;
		font-size: 16px;
		color:#848484;
	}
	.max_cont{
		width:96%;
		line-height:26px;
		margin:auto;
		overflow: hidden;
		color:#808080;
	}
	.cont_img{
		float: left;
		width: 5%;
		color: #3ca8ee;
		font-size: 14px;
	}
	.cont_text{
		float: left;
		width: 95%;
		font-size: 12px;
	}
	.card_box{
		width:100%;
		background-color: #fff;
		height: 46px;
		border: none;
		border-top:solid 1px #dcdce0;
		border-bottom:solid 1px #dcdce0;
		margin-top: 8px;
		padding-left: 15px;
		border-radius: 0;

	}
	.but_box{
		width:100%;
		margin-top:20px;
	}
	.but_one{
		width: 90%;
		text-align: center;
		margin: auto;
		line-height: 44px;
		background-color: #ff6c39;
		border-radius: 5px;
		color: #fff;
		font-size: 16px;
	}
	.but_opac{
		opacity: 0.4;
	}
	.fist_bu{
		width:100%;
		overflow:hidden;
	}
	.last_bu{
		width:100%;
		overflow:hidden;
	}

	.card_text{
		width:100%;
		line-height: 40px;
		padding-left:15px;
		font-size: 15px;
		color:#6e7375;
		margin-top: 10px;
	}
	#card_cont{
		color:#203542;
		font-size: 20px;
	}
	.bank_box{
		width:100%;
		padding-left:15px;
		line-height: 40px;
	}
	.bank_img{
		width: 20px;
		float: left;
		margin-top: 10px;
	}
	.bank_cont{
		float: left;
		margin-left:10px;
		font-size: 15px;
		color: #203542;
	}
	.bank_input{
		width:100%;
		background-color: #fff;
		height: 46px;
		border: none;
		border-top:solid 1px #dcdce0;
		padding-left: 15px;
		border-radius: 0;
	}
	.bank_intwo{
		border-bottom:solid 1px #dcdce0;
	}
	.protocol_box{
		width:100%;
		font-size: 12px;
		padding-left:15px;
		margin-bottom:20px;
	}
	.protocol_img{
		width:14px;
		height:14px;
		margin-right: 4px;
	}
	.protocol_a{
		color:#3ca8ee;
	}
	.protocol_a:hover{
		color:#3ca8ee;
		text-decoration:none;
	}
	.bank_but{
		width: 100%;
		overflow: hidden;
	}
	.support_bank{
		width:100%;
		overflow:hidden;
		line-height:44px;
		font-size:12px;
		color:#3ca8ee;
	}
	.support_but{
		width:30%;
		text-align:center;
		float:right;
		background: url(../assets/img/wuyou01.png) no-repeat 86% center;
		background-size: 7px;
	}

</style>
