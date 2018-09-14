<template>
  <div class="login">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">找回登录密码</div>
	</div>
	<div class="verification_code">
	  <input class="fl" type="text" placeholder="请输入验证码" maxlength="6" v-model="verificationcode">
	  <div class="fr" v-if="timeShow" @click="take">重新获取</div>
	  <div class="fr" v-else><span v-text="time"></span>秒后重发</div>
	</div>
	<div class="newpsw01">
	  <input type="password" placeholder="请设置新登录密码" maxlength="16" autocomplete="off" v-model="newpsw01">
	</div>
	<div class="newpsw02">
	  <input type="password" placeholder="请确认新登录密码" maxlength="16" autocomplete="off" v-model="newpsw02">
	</div>
	<div class="prompt"><span>*</span>新密码6-16位数字，字母，符号或组合，区分大小写</div>
	<div class="login-btn" @click="modification">确认修改</div>
	
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  name: 'login',
  data () {
	return {
	  verificationcode: '',
	  newpsw01: '',
	  newpsw02: '',
	  timeShow:false,
	  time:60,
	  mobile:''
	}
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
	take(){
	  /* 发送短信接口数据 */
	  axios.post(this.rootBase+'/verify_code/open_auth/huicai', {
		mobile:this.mobile,
		verifyType:'RESET_LOGINPWD'
	  })
	  .then(res =>{
		console.log("v2发送短信接口数据02");
		console.log(res);    
		if(res.data.code=='USER_NOT_EXIST_OR_DISABLE' || res.data.code=='MOBILE_ERROR'){
		 
		}else if(res.data.code=="MSG_AMOUNT_LIMITED"){
		  this.$toast({
			message: "超出发送次数限制",
			position: 'bottom',
			duration: 3000
		  });
		}else if(res.data.code=='SUCCESS'){
		  this.timeShow = false;
		  this.$toast({
			message: "发送成功",
			position: 'bottom',
			duration: 3000
		  });
		  this.times();
		} 
	  })
	  .catch(res=> {
		console.log(res);
	  });
	},
	times(){
	  this.timeShow = false;
	  var time = setInterval(()=>{
		this.time--;
		if(this.time === 0){
		  clearInterval(time);
		  this.timeShow = true;
		  this.time = 60;
		}
	  },1000)
	},
	modification(){
	  if(this.verificationcode === ''){
		this.$toast({
			message: "验证码不能为空",
			position: 'bottom',
			duration: 3000
		  });
		return;
	  }
	  if(this.newpsw01 === ''){
		this.$toast({
			message: "密码不能为空",
			position: 'bottom',
			duration: 3000
		  });
		return;
	  }
	  if(this.newpsw01.length<6){
		this.$toast({
			message: "密码长度不能小于6位数",
			position: 'bottom',
			duration: 3000
		  });
		return;
	  }
	  if(this.newpsw01 !== this.newpsw02){
		this.$toast({
			message: "密码不一致",
			position: 'bottom',
			duration: 3000
		  });
		return;
	  }
	  /*重置登录密码*/
	  axios.post(this.rootBase+'/open_auth/user/reset_login_pwd/reset', {
		mobile:this.mobile,
		newPassword:HC.MD5(this.newpsw01),
		verifyCode:this.verificationcode
	  })
	  .then(res =>{
		console.log("v2重置登录密码数据");
		console.log(res);    
		if(res.data.code == "USER_NOT_EXIST"){
		  this.$toast({
			message: "用户不存在",
			position: 'bottom',
			duration: 3000
		  });
		}
		if(res.data.code == "VERIFY_CODE_ERROR"){
		  this.$toast({
			message: "短信验证码错误",
			position: 'bottom',
			duration: 3000
		  });
		}
		if(res.data.code == "SUCCESS"){
		  this.$toast({
			message: "修改成功，已重新登录",
			position: 'bottom',
			duration: 2000
		  });
		  this.toLogin()
		}
	  })
	  .catch(res=> {
		console.log(res);
	  });
	},
	toLogin(){
		//登录
		axios.post(this.rootBase+'/user/login', {
		identity : this.mobile,
		password : HC.MD5(this.newpsw01)
		})
		.then(res =>{
		console.log("v2登录");
		console.log(res);  
		if(res.data.code == "SUCCESS"){
		  //this.$messagebox(res.data.msg,"登录");
		  store.commit('updateUserInfo', this.userInfo);
		  HC.setStorage("sessionToken",res.data.us.sessionToken);
		  this.setCookie("mobile",this.mobile);
		  this.$router.push({path:'/home'})
		}  
		})
		.catch(res=> {
		console.log(res);
		});
	},
	checkMobile(str) {
		var re = /^1\d{10}$/ 
		if (re.test(str)) {
		  return true;
		} else {
		  return false;
		}
	}
  },
  mounted(){
	this.mobile = this.getCookie('mobile01');
	this.times();
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
input{
  border: none;
}
.login{
  width: 100%;
  background: #f5f5f5;
  padding-bottom: 375px;
}
.top{
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
}
.top .zhuce{
  margin-right: 2%;
  font-size: 12px;
}
.verification_code{
  width: 100%;
  margin-top: 20px;
}
.verification_code input{
  width: 76%;
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  border-bottom: 1px solid #CCC;
  font-size: 12px;
}
.verification_code div{
  width: 20%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  text-align: center;
  color: red;
}
.newpsw01 input{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  border-bottom: 1px solid #CCC;
  font-size: 12px;
  margin-top: 6px;
  margin-bottom: 1px;
}
.newpsw02 input{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  border-bottom: 1px solid #CCC;
  font-size: 12px;
}
.prompt{
  margin-top: 20px;
  margin-left: 4%;
  font-size: 12px;
}
.prompt span{
  color: red;
}
.login-btn{
  width: 310px;
  height: 39px;
  margin: 0 auto;
  line-height: 39px;
  background: #ff6c39;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  color: #FFF;
  margin-top: 20px;
}
</style>
