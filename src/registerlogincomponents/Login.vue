<template>
	<div class="login">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="18">
			</div>
			<div class="name fl">登录</div>
			<div class="fr zhuce" @click="zhuce">注册</div>
		</div>
		<div class="mobile_box">
			<input type="tel" placeholder="手机号" maxlength="13" autocomplete="off" v-model="mobile">
		</div>
		<div class="password_box">
			<input :type="password_test" placeholder="登录密码" minlength="6" autocomplete="off" v-model="password">
			<img class="password_img" v-if="password_test=='password'" @click="passwordFun" src="../assets/img/login_hide.png">
			<img class="password_img" @click="passwordFun" v-else src="../assets/img/login_hide.png">
		</div>
		<div class="login-btn" @click="login">登录</div>
		<div class="forget" @click="forget">忘记密码</div>
	</div>
</template>

	<script>
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'login',
		data () {
			return {
				mobile: '',
				password_test: 'password',
				password: '',
				num:0,
			  	userInfo: { //保存用户信息
					nick: null,
					loginUser:false,
					ulevel: null,
					uid: null,
					portrait: null
				},
				appId:"",
				unionid:"",
				openid:""
			}
		},
		components:{

		},
		mounted(){
		//组件开始挂载时获取用户信息
			this.mobile = this.getCookie('mobile');
			this.getUserInfo();
			this.appId = sessionStorage.getItem("appId");
			this.unionid = sessionStorage.getItem("unionid");
			this.openid = sessionStorage.getItem("openid");
			if(this.mobile.length === 11){
				this.mobile = (this.mobile).substring(0,3)+" "+(this.mobile).substring(3,7)+" "+(this.mobile).substring(7,11)
			}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase;
			}
		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			passwordFun(){
				if(this.password_test=="password"){
					this.password_test = 'text';
				}else{
					this.password_test="password"
				}
				
			},
			//请求用户的一些信息
			getUserInfo(){
				this.getCookie('sessionToken');
				if(this.getCookie('sessionToken') != ''){
					this.userInfo = {
						nick: 'luoben',
						loginUser:true,
						ulevel: 20,
						uid: '10000',
						portrait: ''
					}
				}
			  //发送http请求获取，这里写死作演示
			  /*this.userInfo = {
				nick: 'luoben',
				loginUser:true,
				ulevel: 20,
				uid: '10000',
				portrait: ''
			}*/
			},
			forget(){
			  /*if(this.mobile === '' || this.checkMobile(this.mobile) === false){
				this.$toast({
					  message: "请输入正确的手机号",
					  position: 'bottom',
					  duration: 3000
				});
				return;
			  }
			  this.setCookie("mobile",this.mobile);
			  this.$router.push({ name: 'ForgetPassword', params: { mobile: this.mobile}})*/
			  this.$router.push({ path: '/forgetpassword' })
			},
			zhuce(){
				this.$router.push({ path: '/register' })
			},
			bankIdTrue(value){
				var result=value.replace(/[ ]/g,"");
				return result
			},
			//登录逻辑
			login(){
				if(this.mobile === '' || this.checkMobile(this.bankIdTrue(this.mobile)) === false){
					this.$toast({
						message: "请输入正确的手机号",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(this.password === ''){
					this.$toast({
						message: "密码不能为空",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(this.password.length < 6){
					this.$toast({
						message: "密码格式有误",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(this.mobile!='' && this.password!=''){
					if(this.num >= 5){
						this.$toast({
							message: '您的账号密码错误5次，请使用找回密码',
							position: 'bottom',
							duration: 3000
						});
					}else{
						this.toLogin();
					}
				}
			},
			toLogin(){
			  //登录
			  //alert(this.bankIdTrue(this.mobile));
			  //alert(this.password);
			  //alert(this.appId);
			  //alert(this.unionid);
			  //微信/api/v2/user/login
			  //api/sys/login.htm
			  //alert(this.openid);
			  console.log("v2"+"登录")
			  axios.post(this.rootBase+'/user/login', {

				identity : this.bankIdTrue(this.mobile),
				password : HC.MD5(this.password),
				loginFrom:3,
				appId:this.appId,
				unionid:this.unionid,
				openid:this.openid
			  })
			  .then(res =>{
				console.log("登录");
				console.log(res);  
				if(res.data.code == "SUCCESS"){
				  //this.$messagebox(res.data.msg,"登录");
				  store.commit('updateUserInfo', this.userInfo);
				  console.log(res.data.us.sessionToken);
				  HC.setStorage("sessionToken",res.data.us.sessionToken);
				  /*this.setCookie("sessionToken",res.data.us.sessionToken);*/
				  localStorage.setItem("weixinToken",res.data.us.sessionToken)
				  this.setCookie("mobile",this.bankIdTrue(this.mobile));
				  this.$router.push({path:'/home'})
				}  
				if(res.data.code=='USER_NOT_EXIST_OR_DISABLE' || res.data.code=='MOBILE_ERROR'){
					this.$toast({
						message: '用户不存在，或者号码有误',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(res.data.code == "USER_NOT_EXIST"){
					this.$toast({
						message: '用户不存在',
						position: 'bottom',
						duration: 3000
					});
					return;
				} 
				if(res.data.code == "用户["+this.bankIdTrue(this.mobile)+"]不存在"){
					this.$toast({
						message: '用户不存在',
						position: 'bottom',
						duration: 3000
					});
					return;
				} 
				if(res.data.code == "找不到该对象"){
					this.$toast({
						message: '用户不存在',
						position: 'bottom',
						duration: 3000
					});
					return;
				} 
				if(res.data.code == "PWD_ERROR"){
					this.num +=1;
					console.log(this.num);
					if(this.num == 5){
						this.$toast({
							message: '请重新找回密码',
							position: 'bottom',
							duration: 3000
						});
					}else if(this.num >= 3){
						this.$toast({
							message: '还有'+(5-this.num)+'次输入密码的机会，可以使用找回密码',
							position: 'bottom',
							duration: 3000
						});
					}else{
						this.$toast({
							message: '密码错误，请再次输入',
							position: 'bottom',
							duration: 3000
						});
					}
				} 
				if(res.data.code == "未授权"){
					this.$toast({
						message: res.data.msg,
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(res.data.code == "密码错误"){
					this.$toast({
						message: "登录失败:密码错误!",
						position: 'bottom',
						duration: 3000
					});
					return;
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
		watch:{
			mobile(curVal,oldVal){
				console.log(curVal+"jj")
				console.log(oldVal+"kk")
				/*if(oldVal != ""){
					this.mobile = this.mobile.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{4})+$)/g, ' ');
				}*/
				if(oldVal != "" && oldVal.length < curVal.length){
					if(curVal.length == 3 || curVal.length == 8){
						this.mobile = this.mobile+" "
					}
				}
				
			}
		}
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style>
	.mint-msgbox-title{
		text-align: center;
		padding-left: 0;
		margin-bottom: 0;
		font-size: 16px;
		font-weight: 500 !important;
		color: #333;
	}
	</style>
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
		padding-bottom: 100%;
		overflow: hidden;
	}
	.top{
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		background: #fff;
		color: #000;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	.top .name{
		margin-left: 10%;
	}
	.top .zhuce{
		margin-right: 2%;
		font-size: 12px;
	}
	.mobile_box{
		width: 100%;
		margin-top: 20px;
		margin-bottom: 1px;
	}
	.mobile_box input{
		width: 100%;
		height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.password_box{
		width:100%;
		position: relative;
	}
	.password_box input{
		width: 100%;
		height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.password_img{
		position: absolute;
		right:10px;
		top:14px;
		width:17px;
		height: 11px;
	}
	.login-btn{
		width: 88%;
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
	.forget{
		text-decoration: underline;
		float: right;
		margin-right: 10%;
		margin-top: 10px;
		font-size: 12px;
	}
	</style>
