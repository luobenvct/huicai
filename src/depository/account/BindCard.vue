<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			绑定银行卡
		</div>
		<div class="max_box">
			<div class="max_cont">
				<div class="cont_img">●</div>
				<div class="cont_text">您当前正在重新绑定存管账户银行卡</div>
			</div>
			<!--第二步-->
			<div class="last_bu">
				<input class="nameCard"  v-model="userNameInput" id="card_input" type="text" readonly="readonly">
				<input class="bank_name_card"  v-model="userIdInput" id="card_input" type="text" readonly="readonly">
			    <input class="card_box" @blur.prevent="bankSelect"  v-model="cardInput" id="card_input" type="tel" value="" placeholder="请输入您的卡号"  maxLength="19" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu = "value=value.replace(/[^0-9]/g,'')">
			    <div class="bankNameInput">
					<div class="bankInputFirst" id="bankName_put">
						<span style="color: #757575;" v-if="bankInput==''">开户银行</span>
						<span v-else>{{bankInput}}</span>
					</div>
				</div>
				<input class="activateCard" v-model="openMobile" id="activateCard_put" type="tel" value="" placeholder="请输入开卡手机号" maxlength="11" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu = "value=value.replace(/[^0-9]/g,'')">
				<div class="account">点击<span>“获取验证码”</span>向{{user_mobile}}发送验证码</div>
				<div class="input_test_box">
					<input class="accountTest" v-model="VerifyCode" type="text" maxlength="6" placeholder="请输入短信验证码" >
					<div class="accountTime">
						<div class="time" v-if="timeTrue"><span>{{num}}</span>秒</div>
						<div class="time" v-else @click="VerifyCodeFun">获取验证码</div>
					</div>
				</div>

				
				<div class="bank_Big">
					<div class="bank_next bank_opac" v-if="nextClickshow">确认</div>
					<div class="bank_next" v-else @click="tradePwdBtn">确认</div>
				</div>
			</div>

		</div>
		
		<div id="runingLayout" v-show="runingLayout">绑卡中,请稍等...</div>

	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
  name: 'coupons',
  data () {
	return {
		bankname :'',
		clickshow : true,
		nextClickshow : true,
		oneshow :true,
		app_token :'',
		banknameShow : false,
		runingLayout : false,
		bankInput : '',
		cardInput : '',           //银行卡号
		openMobile : '',
		photoShow01 : true,
		photoShow02 : true,
		blag : true,
		flag : true,
		shadeBtn : false,
		items :[],
		readBlag : false,
		flagNoread : true, 
		agreeFlag : true,
		userType : false,        // 用户是否绑定身份
		actList : '',            // 存储电子账户
		bankId :'',				 // 银行卡编码ICBC
		bank_xuan:'',
		is_has:false,
		account_yard :false,
		gain_number :'',
		gainsend :true,
		gain_count:60,
		bankCode:'',              // 银行代码
		nextnum : 1,
		userNameInput:'',                   //用户姓名
		userIdInput:'',               //用户身份证号码
		timeTrue:false,
		VerifyCode:'',                          //短信验证码
		num:60 ,
        user_mobile : ''
	}   
  },
	watch:{
		//监控卡号输入
		cardInput(val){
			if (val != "") {
				this.nextClickshow = false;
			}else{
				 this.nextClickshow = true;
			}
		}
	},
  	computed: {
		
	},
	components:{

	},
	methods:{
		returns(){
		  this.$router.go(-1);
		},
		/*发送存管相关短信验证码*/
		VerifyCodeFun(){
			axios.post('/api/v2/verify_code/open_auth/depository',{
				app_token: this.app_token,
	  	 		type: 'BIND_CARD'
			})
			.then(res=>{
				if(res.data.code == "SUCCESS"){
			  		this.$toast('验证码发送成功');
			  		this.timeTrue = true;
			  		var timer = setInterval(()=>{
			  			this.num --;
			  			if(this.num == 0){
			  				this.num = 60;
			  				this.timeTrue = false;
			  				clearInterval(timer)
			  			}
			  		},1000)
			  	}else{
			  		this.$toast(res.data.msg);
			  	}
			})
		},
		cardFun(){
			axios.post('/api/v2/account/depository/get/identifier',{
				app_token: this.app_token,
			})
			.then(res=>{
				if (res.data.code == "SUCCESS") {
                    this.user_mobile = res.data.result.mobile;
					this.userNameInput = res.data.result.name;
					this.userIdInput = res.data.result.idCard;
				}else{
				   this.$toast(res.data.msg);
				}
			})
			
		},
		tradePwdBtn(){

			if (this.bankInput == "" || this.bankInput == null) {
				this.$toast("选择银行为空");
				this.nextClickshow = false;	
			}else if(this.openMobile == "" || this.openMobile == null){
				this.$toast("开卡手机号为空");
				this.nextClickshow = false;
			}else if(this.openMobile.length != 11){
				this.$toast("手机号码格式有误");
				this.nextClickshow = false;
			}else if(this.VerifyCode == ""){
				this.$toast("请输入您的短信验证码");
				this.nextClickshow = false;
			}else{
				/*绑定银行卡*/
				// 请求账户绑定银行卡接口
                this.runingLayout = true;
				axios.post('/api/v2/account/depository/bank_card/bind',{
					app_token : this.app_token,
					bankCardNo : this.cardInput,
					bankCode : this.bankCode,
					bankIdNo : this.bankId,    
					bankName : this.bankInput,
					holder : this.userNameInput,
					mobile : this.openMobile,
					pid : this.userIdInput,
					smsCode : this.VerifyCode
				})
				.then(res=>{
					if(res.data.code=="SUCCESS"){
                        this.runingLayout = false;
                        this.$toast("绑卡成功");
                        let bankUrl = HC.getStorage('bankUrl')||'';
                        if(bankUrl==''||bankUrl==null){
                            this.$router.push({path:'/bank'})
                        }else{
                            this.$router.push({path:bankUrl});
                            HC.delStorage('bankUrl')
                        }
						
					}else{
                        this.runingLayout = false;
						this.$toast(res.data.msg);
					}
				})
			}
		},
		//获取银行信息匹配
		bankSelect(){
			if(this.cardInput==""){
				return
			}
			axios.post('/api/v2/account/common/bank/open_auth/profile/'+ this.cardInput)
			.then(res=>{
				if (res.data.code == "SUCCESS") {
					this.bankInput = res.data.result.usedbank;
					this.bankCode = res.data.result.bankCode;
					this.bankId = res.data.result.bankId;
				}else{
					 this.$toast(res.data.msg);
					this.bankInput = "";
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
	created () { 

	},
	mounted(){
		this.app_token = HC.getStorage('sessionToken');
		this.cardFun();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
    width: 100%;
    position: absolute;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    overflow-y: scroll;
    background-color: #f5f5f9;
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
	.max_box{
       width: 100%;
	    overflow: hidden;
	    background-color: #f5f5f9;
	    margin-top: 40px;

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
        margin-top: 12px;
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
        margin-top: 0;
        padding-left: 15px;
        border-radius: 0;
        margin-top: 12px;
    }
    .activateCard{
        width:100%;
        background-color: #fff;
        height: 46px;
        border: none;
        border-bottom:solid 1px #dcdce0;
        margin-top: 0;
        padding-left: 15px;
        border-radius: 0;
    }
    .nameCard{
        width:100%;
        background-color: #fff;
        height: 46px;
        border: none;
        border-bottom:solid 1px #dcdce0;
        margin-top: 0;
        padding-left: 15px;
        border-radius: 0;
    }
    .bank_name_card{
        width:100%;
        background-color: #fff;
        height: 46px;
        border: none;
        border-bottom:solid 1px #dcdce0;
        margin-top: 0;
        padding-left: 15px;
        border-radius: 0;
    }
    .bankNameInput{
        width: 100%;
        background-color: #fff;
        height: 46px;
        margin-top: 8px;
        border-top: solid 1px #dcdce0;
        border-bottom: solid 1px #dcdce0;
    }
    .bankInputFirst{
        width: 95%;
        height: 46px;
        padding-left: 15px;
        line-height: 46px;
        /*background: url(img/puch03.png) no-repeat right 50%;*/
        background-size: 10px;
        border:none;
    }
    .account{
        width: 100%;
        height: 20px;
        border: none;;
        margin-top: 30px;
        padding-left: 15px;
        border-radius: 0;
    }
    .input_test_box{
    	width:100%;
    	overflow:hidden;
    	background-color: #fff;
    	 border-top: solid 1px #dcdce0;
        border-bottom:solid 1px #dcdce0;
        margin-top: 5px;
    }
    .accountTest{
        width: 56%;
        background-color: #fff;
        height: 46px;
        border: none;
        padding-left: 15px;
        border-radius: 0;
        float: left;
    }
    .accountTime{
        width: 32%;
        background-color: #fff;
        height: 46px;
        line-height: 46px;
        border: none;
        padding-left: 15px;
        border-radius: 0;
        float: right;
    }
    .accountTime .time{
        width: 80%;
        text-align: center;
        height: 32px;
        line-height: 32px;
        margin-top: 6px;
        border:1px solid #CCC;
        border-radius: 5px;
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
        margin-top:40px;
    }
    .protocol_img{
        width:14px;
        height:16px;
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
        width:100%;
        height: 44px;
        margin-top:20px;
        background-color: #ff6c39;
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
	.tip_into{
        width:80%;
        height: 56px;
        position: fixed;
        bottom: 100px;
        left: 10%;
        border-radius: 6px;
        text-align: center;
        line-height: 56px;
        color: #ffffff;
        font-size: 12px;
        display:none;
    }
    .tip_posi{
        opacity: 0.5;
        background-color: #000000;
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
   	    background: url(../../assets/deposits_img/wuyou01.png) no-repeat 86% center;
    	background-size: 7px;
    }
    .bank_Big{
        width:100%;
        margin-top:20px;
    }
	.bank_next{
        width: 90%;
        height: 46px;
        margin:0 auto 15px; 
        background-color: #ff6c39;
        text-align: center;
        border-radius: 8px;
        font-size: 16px;
        color: #fff;
        line-height: 46px;
    }
   .bank_opac{
        opacity: 0.4;
    }
    .posBox{
        width:100%; 
        position:fixed; 
        top:0; 
        left: 0;
        z-index:1000; 
        background-color: #fff;
        overflow: hidden;
        overflow-y: scroll;
        height:100%;
    } 
    .blueClass{
        width:100%;
        padding: 15px 30px;
        border-bottom: solid 1px #e5e5e5;
        color:#acb2b8;
        font-size: 12px !important;
        line-height: 20px;
        background: url("../../assets/deposits_img/buyin02.png") no-repeat 20px 22px;
        background-size: 6px;
    }
    .bankList{
        width:100%;
        border-bottom: solid 1px #e5e5e5;
        overflow: hidden;
        background: url(../../assets/deposits_img/xuan02.png) no-repeat 94%;
        background-size: 20px 20px;
    }
    .bankList_xuan{
        background-image: url(../../assets/deposits_img/xuan01.png);
    }
    .bankIcon{
        width: 20px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        float: left;
        margin-top: 15px;

    }
    .nameClass{
        margin-left: 5px;
        font-size: 15px;
        position: relative;
        display: inline-block;
        float: left;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    .dayClass{
        font-size: 12px;
        margin-right: 10px;
        color: #bec3c7;
        clear: both;
        margin: 10px 15px;
    }
    .account_des{
        color: #f87d2b;
        margin-top: 15px;
        font-size: 14px;
        overflow: hidden;
        width: 100%;
        padding-left: 25px;
    }
    .account_left{
        float: left;
    }
    .chargeClass{
        float: left;
        color: #acb2b8;
        margin-left: 8px;
        font-size: 12px;
        width: 92%;
    }
    .system_des{
        color: #f87d2b;
        margin-left: 25px;
        margin-top: 8px;
        font-size: 12px;
    }
    .desChargeClass{
        color: #acb2b8;
        margin-left: 8px;
        font-size: 14px;
    }
    [v-cloak]{
        display:none;
    }
    /*交易密码*/
    .black{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: #000;
        opacity: 0.4;
        display: none;
    }
    .business_box{
        width:90%;
        min-height:240px;
        position: fixed;
        top:50%;
        left:5%;
        background-color: #fff;
        border-radius: 5px;
        margin-top:-130px;
        display: none;
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
    .forget_box{
        font-size: 12px;
        margin-right: 5%;
        width: 60px;
        float: right;
        text-align: right;
        color: #203542;
        text-decoration: underline;
    }
    .sun_but{
        width: 90%;
        line-height: 40px;
        margin:20px auto 6px;
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
    .bus_title{
        width:90%;
        line-height: 50px;
        border-bottom: solid 1px #e5e5e5;
        margin: auto;
        text-align: center;
        color: #203542;
        position: relative;
    }
    .bus_img{
        position: absolute;
        top:18px;
        right: 0;
        width:15px;
    }
    .account_box{
        width: 90%;
        margin:auto;
        overflow: hidden;
        position: relative;
    }
    .account_yard{
        width: 68%;
        display: block;
        float: left;
        height: 40px;
        padding-left: 10px;
        border-radius: 5px;
        border: none;
        letter-spacing: 2px;
        background-color: RGB(247,247,247);
    }
    .account_gain{
        width: 32%;
        float: left;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        color:#ff6c39;
    }
    .account_gain1{
        display: none;
        width: 32%;
        float: left;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        color:#ff6c39;
    }


</style>
