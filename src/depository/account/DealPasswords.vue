<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			设置交易密码
		</div>
		<div class="bodyClass">
			<div class="messBig">
				<input class="messageVerification"  type="tel" v-model="messageVerification_put" value="" placeholder="请输入短信验证码" maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu = "value=value.replace(/[^0-9]/g,'')">
				<div class="verificationBtn" @click="gainFun" v-if="messageShow">发送验证码</div>
				<div class="verificationBtn2" v-else><span>{{msgNum}}</span> 秒后重新发送</div>
			</div>
			<input  style="margin-top: 8px;border-top: solid 1px #dcdce0;" type="text" readonly="readonly" id="kb1" name="input3" placeholder="请输入交易密码" class="default confirmTradePwd" maxlength="12" minlength="6" tabindex="3">
			<input type="text" readonly="readonly" id="kb2" name="input3" placeholder="请确认交易密码" class="default confirmTradePwd" maxlength="12" minlength="6" tabindex="3">
			<div class="detailText">注：密码6~12位数，字母与数字字母组合</div>
			<div id="error_tip"></div>
			<div class="sureBigClass">
				<div class="sureBtn2" @click="openUserBtn" :class="{sureBt9:surShow}">确定</div>
			</div>
			<div id="runingLayout" v-show="runingLayout">开户中,请稍等...</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
  name: 'coupons',
  data () {
	return {
		messageShow : true,
		msgNum:60,
		messageVerification_put : '',
		surShow : false,
		runingLayout:false,
        pid :'',
        channel : '',
        bankCode : '',
        token:'',
        bankCardNo : '',
        openMobile :'',
        bankId : ''
	}   
  },
	watch:{
		
	   
	},
  	computed: {
		rootBase(){
			return store.getters.getRootBase
		}
	},
	components:{

	},
	methods:{
		returns(){
		  this.$router.go(-1);
		},
		/*开户*/
		openUserBtn(){
			this.surShow = true;
			setTimeout(()=>{
				this.surShow = false;
			},200);
			if (this.messageVerification_put== "") {
				this.$toast("验证码输入为空");
			}else if(passGuard1.getLength()==0){
				this.$toast("交易密码输入为空");
			}else if(passGuard2.getLength()==0){
				this.$toast("确定交易密码输入为空");
			}else if(passGuard1.getHash()!= passGuard2.getHash()){
				this.$toast("交易密码输入不一致");
				passGuard1.keyclear();
				passGuard2.keyclear();
				$("#kb1").val("");
				$("#kb2").val("");
				for(var i=1;i<=Le;i++){
					$("#kb"+i).attr('placeholder',PH.arrPlace[i-1])
				}
			}else if(passGuard1.getValid()==1){
				this.$toast("新密码不符合要求！");
			}else{
				this.runingLayout = true;
				this.itemnum++;
				var holdername =  HC.getStorage("holder");
				var bankName =  HC.getStorage("bankInput");
				axios.post('/api/v2/account/depository/open_account',{
					// 访问渠道
					channel: this.channel,
					// 存管账户
					accountType:'',
					// 账户UuId
					accountUuid:'',
					// 银行代码
					bankCode: this.bankCode,
					// 银行名称
					bankName:bankName,
					// 银行卡号
					bankCardNo:this.bankCardNo,
					// 持卡人
					holder: holdername,
					// 身份证号
					pid:this.pid,
					// 开卡手机号
					mobile: this.openMobile,
					// 支付密码
					password : passGuard1.getOutput(),
					// 验证码
					smsCode:this.messageVerification_put,
					app_token: this.token,
					bankId : this.bankId
				})
				.then(res=>{
					this.runingLayout = false;
					if(res.data.code == "SUCCESS") {
						this.$toast("开户成功");
						setTimeout(()=>{
							this.$router.push({path:'/bank'})
						},1000)
						HC.delStorage("bankInput");
	                    HC.delStorage("cardInput");
	                    HC.delStorage("openMobile");
	                    HC.delStorage("tokenmobile");
                        HC.delStorage("bankId");
                        HC.delStorage("holder");
                        HC.delStorage("pid");
                        HC.delStorage("bankCode");
                        HC.delStorage("bankCardNo");
						HC.delStorage("channel");
                        
					}else{
						this.$toast(res.data.msg);
						$("#error_tip").text(res.data.msg)
						passGuard1.keyclear();
						passGuard2.keyclear();
						this.sjs();
						$("#kb1").val("");
						$("#kb2").val("");
						for(var i=1;i<=Le;i++){
							$("#kb"+i).attr('placeholder',PH.arrPlace[i-1])
						}
					}
				})

			}

		},
		/*获取短信验证码*/
		gainFun(){
			axios.post('/api/v2/verify_code/open_auth/jixin',{
				app_token: this.token,
				mobile :this.openMobile,
				reqType :1,
				srvTxCode :'ACCOUNT_OPEN_PLUS'
			})
			.then(res=>{
				if(res.data.code == "SUCCESS") {
					this.messageShow = false;
					this.msgNum = 60;
					var tojun=setInterval(()=>{
						this.msgNum--;
						if(this.msgNum==0){
							this.messageShow = true;
							clearInterval(tojun);
						}
					},1000) 
				}else{
					this.$toast(res.data.msg)
				}
			})
		},
		/*随机数*/
		sjs(){
			axios.get(this.rootBase+'/account/depository/send_rand_key?app_token='+this.token)
			.then(res=>{
				var arr = eval(res.data);
				//console.log(arr);
				if(arr.code=="SUCCESS"){
					passGuard1.setRandKey(arr.sendRandKey);
				}else{
	                this.$toast(arr.msg)
	            }
			})
			
		},
		/*初始化*/
		initialize(){
	        var Le = $(".default").length;
	        for(var i=1;i<=Le;i++){
	            $("#kb"+i).val("");
	        };
	        setTimeout(function(){
	            kb.generate();
	        },100);
	        var winHeight = $(window).height();
	    },
	    /*初始化键盘*/
	    keyboardFun(){
			passGuard1.generate("kb1",kb,0);
			passGuard2.generate("kb2",kb,0);
		}
		
	},
	
	created: function () { 

	},
	mounted(){
        this.pid =  HC.getStorage("pid");
        this.bankCode =  HC.getStorage("bankCode");
        this.openMobile = HC.getStorage("openMobile");
        this.bankCardNo =  HC.getStorage("bankCardNo");
        this.token = HC.getStorage('sessionToken');
        this.bankId = HC.getStorage('bankId');
		this.channel = HC.getStorage('channel');
		this.gainFun();
		this.sjs();
		this.keyboardFun();
		this.initialize();
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
.bodyClass{
    width: 100%;
    overflow: hidden;
    margin-top: 40px;
} 
.messBig{
    width: 100%;
    height: 46px;
    background-color: #fff;
    border-top:solid 1px #dcdce0;
    border-bottom:solid 1px #dcdce0;
    margin-top: 10PX;
    border-radius: 0;
    overflow: hidden;
} 
.messageVerification{
    width:50%;
    height: 46px;
    padding-left: 15px;
    float: left;
    border:none;
}
.verificationBtn{
	width: 100px;
    color: #ff6c39;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    float: right;
    border: none;
    border-radius: 8px;
    margin-top: 7px;
    margin-right: 10px;
    background-color: #fff;
}
.verificationBtn2{
    width: 100px;
    color: #ff6c39;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    float: right;
    border: none;
    border-radius: 8px;
    margin-top: 7px;
    margin-right: 10px;
    background-color: #fff;
}
.setTradePwd{
    width:100%;
    background-color: #fff;
    height: 46px;
    border: none;
    border-top:solid 1px #dcdce0;
    border-bottom:solid 1px #dcdce0;
    margin-top: 25PX;
    padding-left: 15px;
    line-height: 46px;
    
}
.confirmTradePwd{
    width:100%;
    background-color: #fff;
    height: 46px;
    border: none;
    border-bottom:solid 1px #dcdce0;
    padding-left: 15px;
    line-height: 46px;
}
.detailText{
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    color: #5a5a5a;
}
.sureBtn{
    width: 90%;
    margin: 0 auto;
    height: 46px;
    background-color: #21b9fb;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    color: #fff;
    line-height: 46px;
    opacity: 0.4;
}
.sureBtn2{
    width: 90%;
    margin: 0 auto;
    height: 46px;
    background-color: #ff855d;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    color: #fff;
    line-height: 46px;
}

.sureBigClass{
    width: 100%;
    margin-top: 15px;
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
   
.sureBt9{
	background-color:#c55531;
}	


</style>
