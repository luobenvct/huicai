<template>
  <div class="changePass">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">修改登录密码</div>
	</div>
	<div class="bodyClass">
	  <input type="password" name="oldPassWord01" placeholder="原登录密码" class="oldClass" v-model="oldClass">
	  <input type="password" name="oldPassWord02" placeholder="请设置新登录密码" class="newClass" v-model="newClass">
	  <input type="password" name="oldPassWord03" placeholder="请确认新登录密码" class="NextNewClass" v-model="NextNewClass">
	</div>
	<div class="presentationClass">
	  <span style="color: #ff8c1f">*</span><span>   新密码6-16位数字，字母，符号或组合，区分大小写</span>
	</div>
	<div  @click="changePass" class="sureChangeBtn">确认修改</div>
	<router-link to="/forgetpassword">
	<div class="forgetPassWord">忘记登录密码</div>
	</router-link>
	
  </div>
</template>

<script>
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'changePass',
		data () {
			return {
				token:'',
				mobile:'',
				oldClass:'',
				newClass:'',
				NextNewClass:''
			}
		},
		components:{

		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			changePass(){
				if (this.newClass === '' || this.newClass.length < 6) {
					this.$toast({
						message: "密码长度不能小于6位数",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if (this.newClass !== this.NextNewClass) {
					this.$toast({
						message: "密码输入不一致",
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				axios.post(this.rootBase+'/user/login_pwd/change', {
					app_token:this.token,
					newPwd:HC.MD5(this.newClass),
					oldPwd:HC.MD5(this.oldClass)
				})
				.then((res)=>{
					console.log("v2修改登录密码")
					console.log(res)
					if (res.data.code == '修改密码失败:原密码不匹配') {
						this.$toast({
							message: "旧密码错误",
							position: 'bottom',
							duration: 3000
						});
					}
					if (res.data.code == 'SUCCESS') {
						this.$toast({
							message: "密码修改成功",
							position: 'bottom',
							duration: 3000
						});
						setTimeout(()=>{
							this.$router.push({ path: '/mywealth' })
						},1000)
					}
				});
			}
		},
		mounted(){
			//this.token = this.getCookie('sessionToken');
			this.token = HC.getStorage('sessionToken')
			console.log('token')
			console.log(this.token)
			//this.mobile = this.getCookie('mobile');
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
/*
placeholder颜色改变
*/
::-moz-placeholder { color: #acb2b8; }
::-webkit-input-placeholder { color:#acb2b8; }
:-ms-input-placeholder { color:##acb2b8; }
.changePass{
  width: 100%;
  background-color: #ECECF3;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
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
.oldClass{
  margin-top: 15px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  border-top: solid 1px #d4d4d4;
  border-bottom: solid 1px #d4d4d4;
  font-size: 14px;
}
.newClass{
  margin-top: 25px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  border-top: solid 1px #d4d4d4;
  border-bottom: solid 1px #d4d4d4;
  font-size: 14px;
  margin-bottom: 1px;
}
.NextNewClass{
  margin-top: 0;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  border-bottom: solid 1px #d4d4d4;
  font-size: 14px;
}
.presentationClass{
  margin-top: 15px;
  width: 100%;
  height: 30px;
  color: #3e484f;
  font-size: 12px;
  padding-left: 20px;
}
.sureChangeBtn{
  width: 90%;
  height: 40px;
  background-color: #ff6c39;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 10px;
}
.forgetPassWord{
  width: 90%;
  height: 20px;
  text-align: right;
  color: #3ca8ee;
  font-size: 12px;
  margin: 10px auto;
}
</style>
