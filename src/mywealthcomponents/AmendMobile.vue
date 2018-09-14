<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			修改存管手机号
		</div>
		<div class="app_box">
			<div class="code_show" v-show="codeShow">短信验证码已发至手机号 <span>{{userMobile}}</span></div>
			<div class="input_wrapper">
				<input type="text" placeholder="请输入短信验证码" class="inut_bind" maxlength="6" tabindex="3" v-model="verifyCode">
				<div class="time" v-if="timeTrue"><span>{{num}}</span>秒</div>
				<div class="time" v-else @click="VerifyCodeFun">获取验证码</div>
			</div>
			<input type="text" class="indentity_input" placeholder="请输入新手机号" v-model="userNewMobile" id="bank_iden" maxlength="11">
			
			<div id="error_tip"></div>
			<div class="but_box but_opac" v-if="clickshow">确认修改</div>
			<div class="but_box" v-else @click="nextFun">确认修改</div>
			<div class="hint_box">*存管账户手机号变更不改变银行卡在银行的预留手机号</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'

export default {
    name: 'coupons',
    data () {
        return {
    		indentityNum : '',
			clickshow : true,
			num:60,
			verifyCode:'',
			codeShow:false,
			userMobile:'',
			timeTrue:false,
			token:'',
			failUrl:'',
			userNewMobile :''
            
    	}   
    },
	watch:{
		userNewMobile (val){
			this.userNewMobile = this.userNewMobile.replace(/[^\w\.\/]/ig,'');
			if(this.userNewMobile == ''){
				this.clickshow = true;
			}else{
				this.clickshow = false;
			}
		}
	   
	},
	components:{

	},
	methods:{
		returns(){
		  this.$router.go(-1);
		},
		/*获取用户基本信息*/
		userProfile(){
			axios.post('/api/v2/user/profile',{
				app_token: this.token
			})
			.then(res=>{
				this.userMobile = res.data.result.mobile;
			})
			
		},
		/*发送存管相关短信验证码*/
		VerifyCodeFun(){
			this.userProfile();
			axios.post('/api/v2/verify_code/open_auth/depository',{
				app_token: this.token,
	  	 		type: 'CHANGE_MOBILE'
			})
			.then(res=>{
				if(res.data.code == "SUCCESS"){
			  		this.$toast('验证码发送成功');
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
			  		this.$toast(res.data.msg);
			  	}
			})
		},
		nextFun(){
			if(this.userNewMobile.length != 11 ){
				this.$toast("请输入正确的手机号");
				return;
			}
			if(this.verifyCode==''){
				this.$toast("验证码不能为空");
				return;
			}
			axios.post('/api/v2/account/depository/change/depository_mobile',{
				app_token:this.token,
				mobile:this.userNewMobile,
				smsCode:this.verifyCode
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					this.$toast("修改成功");
					this.$router.push({path:'/accountsecurity'})
				}else{
					this.$toast(res.data.msg);
				}
			})
		},
		
       
		
	},
	
	created () { 

	},
	mounted(){
        //this.token = HC.vueurlFun("app_token") || '';
        this.token = HC.getStorage('sessionToken');
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
	width: 100%;
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
	background: url(../assets/img/back00.png) no-repeat center;
	background-size: 12px;
}
.app_box{
	width:100%;
	overflow:hidden;
	margin-top: 40px;
}
.indentity_input{
	width:100%;
	background-color: #fff;
	height:52px;
	border:none;
	border-top:solid 1px #e5e5e5;
	border-bottom:solid 1px #e5e5e5;
	padding-left: 15px;
	text-indent: 10px;
	font-size: 14px;
}
.input_box{
	border-top:none;
}
.but_box{
    width: 90%;
    text-align: center;
    margin: auto;
    line-height: 44px;
    background-color: #ff6c39;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    margin-top: 30px;
}
.but_opac{
    opacity: 0.4;
}
.error_tip{
	width:90%;
    margin:auto;
    font-size: 12px;
    line-height: 18px;
    color:#ff6c39;
    max-height:36px;
    overflow: hidden;
    margin-bottom: 6px;
}
/*上海银行--css*/
.input_wrapper{
	height: 48px;
    width: 100%;
    border-top:solid 1px #e5e5e5;
	border-bottom:solid 1px #e5e5e5;
    text-align: left;
    margin-top: 20px;
    font-size: 14px;
    color: #acb2b8;
	font-family: PingFang-SC-Medium;
	margin-bottom: 20px;
	background: #FFF;
}
.time{
	width: 24%;
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
.inut_bind{
    height: 46px;
    width: 60%;
    border: solid 1px #FFF; 
    text-align: left;
    margin-left: 3%;
    padding-left: 15px;
    font-size: 14px;
    color: #acb2b8;
	font-family: PingFang-SC-Medium;
	margin-bottom: 32px;
	background: #FFF;
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
.hint_box{
	width:96%;
	font-size: 12px;
	color:#999;
	margin:10px auto;
}
</style>
