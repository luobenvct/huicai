<template>
  <div class="login">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="18">
	  </div>
	  <div class="name fl">输入手机号</div>
	</div>
	<div v-show="!idShow">
		<div class="username">
		<input type="tel" placeholder="输入手机号" maxlength="11" autocomplete="off" v-model="username">
	  </div>
	  <div class="login-btn" @click="next01">下一步</div>
	  <!-- <div class="login-btn" v-else @click="next02">下一步</div> -->
	</div>
	<div v-show="idShow">
		<div class="username">
		  <input type="text" placeholder="输入身份证号" maxlength="18" autocomplete="off" v-model="idNum">
		</div>
	  <div class="login-btn" @click="next02">下一步</div>
	</div>
	
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
	  username: '',
	  idNum:'',
	  idNum02:'',
	  idShow:false,
	  uuid:''
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
	next01(){
	  this.dataFn();
	},
	next02(){
		axios.post(this.rootBase+'/open_auth/user/reset_login_pwd/verify/pid/'+this.uuid,{
			pid: this.idNum
		}).then(res =>{
			if(res.data.result === false){
				this.$toast({
					message: "身份证号码有误",
					position: 'bottom',
					duration: 3000
				});
				return;
			}else{
				this.next()
			}
		}).catch(res=> {
			console.log(res);
	  	});
	},
	next(){
	  if(this.username === '' || this.checkMobile(this.username) === false){
		this.$toast({
			message: "请输入正确的手机号",
			position: 'bottom',
			duration: 3000
		});
		return;
	  }

	  /* 发送短信接口数据 */
	  axios.post(this.rootBase+'/verify_code/open_auth/huicai', {
		mobile:this.username,
		verifyType:'RESET_LOGINPWD'
	  })
	  .then(res =>{
		console.log("v2发送短信接口数据");
		console.log(res);    
		if(res.data.code=='USER_NOT_EXIST_OR_DISABLE' || res.data.code=='MOBILE_ERROR'){
		  this.$toast({
			  message: "用户不存在，或者号码有误",
			  position: 'bottom',
			  duration: 3000
		  });
		  return;
		}else if(res.data.code=="MSG_AMOUNT_LIMITED"){
		  this.$toast({
			  message: "超出发送次数限制",
			  position: 'bottom',
			  duration: 3000
		  });
		  return;
		}else if(res.data.code=='SUCCESS'){
		  this.$toast({
			  message: "发送成功",
			  position: 'bottom',
			  duration: 3000
		  });
		  this.setCookie("mobile01",this.username);
		  this.$router.push({ name: 'FindPassword', params: { mobile: this.mobile}})
		  return;
		} 
	  })
	  .catch(res=> {
		console.log(res);
	  });
	},
	dataFn(){
	  axios.post(this.rootBase+'/user/open_auth/is_identify/'+this.username, {
		
	  })
	  .then(res =>{
		  console.log("v2是否绑定过身份证");
		  console.log(res)
		  if(res.data.code == "USER_NOT_EXIST"){
		  		this.$toast({
				  message: "用户不存在",
				  position: 'bottom',
				  duration: 3000
			  	});
		  }
		  
		  if(res.data.msg === '用户未认证'){
		  	this.idShow = false;
		  	this.next();
		  }else{
		  	if(res.data.result.uuid != null){
		  		this.idShow = true;
		  		this.uuid = res.data.result.uuid;
		  	}else{
		  		this.idShow = false;
		  		this.next();
		  	}
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
	//this.username = this.getCookie('mobile');
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
		padding-bottom: 502px;
		padding-right: 5%;
	}
	.top{
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		background: #fff;
		color: #000;
		padding-right: 5%;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	.top .zhuce{
		margin-right: 2%;
		font-size: 12px;
	}
	.username{
		width: 100%;
		padding-right: 5%;
		margin-top: 20px;
	}
	.username input{
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.login-btn{
		width: 88%;
		height: 40px;
		margin: 0 auto;
		line-height: 40px;
		background: #ff6c39;
		border-radius: 5px;
		font-size: 16px;
		text-align: center;
		color: #FFF;
		margin-top: 20px;
	}
</style>
