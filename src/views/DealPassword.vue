<template>
  <div class="bodyClass">
  	<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">设置交易密码</div>
		</div>
	<div class="messBig">
		<input class="messageVerification"  type="tel" id="messageVerification_put" value="" placeholder="请输入短信验证码" maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu = "value=value.replace(/[^0-9]/g,'')">
		<div class="verificationBtn"  >发送验证码</div>
		<div class="verificationBtn2"><span id="changeNum">60</span>秒后重新发送</div>
	</div>
	<input type="text" readonly="readonly" id="kb1" name="input3" placeholder="请输入交易密码" class="default confirmTradePwd" maxlength="12" minlength="6" tabindex="3">
	
	<!--  -->


	<input type="text" readonly="readonly" id="kb2" name="input3" placeholder="请确认交易密码" class="default confirmTradePwd" maxlength="12" minlength="6" tabindex="3">
	
	<div class="detailText">注：密码6~12位数，字母与数字字母组合</div>
	<div class="sureBigClass">
		<div class="sureBtn2">确定</div>
	</div>

</div>
</template>

<script>
	import store from '../vuex/store.js'
	import axios from 'axios'
	import $ from '../assets/js/jquery-2.1.4.min.js'
	/*import Microdoneh5 from '../assets/js/microdone-h5.min.js'*/
	/*import DealJS from '../assets/js/deal_password.js'*/

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
	.bodyClass{
		width: 100%;
		overflow: hidden;
	} 
	.messBig{
		width: 100%;
		height: 46px;
		background-color: #fff;
		border-top:solid 1px #dcdce0;
		border-bottom:solid 1px #dcdce0;
		margin-top: 50PX;
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
		width: 110px;
		background-color: #21b9fb;
		color: #fff;
		height: 30px;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		float: right;
		border: none;
		border-radius: 8px;
		margin-top: 7px;
		margin-right: 15px;
	}
	.verificationBtn2{
		width: 110px;
		background-color: #21b9fb;
		color: #fff;
		height: 30px;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		float: right;
		border: none;
		border-radius: 8px;
		margin-top: 7px;
		margin-right: 15px;
		display: none;
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
		float: clear;
	}
	.confirmTradePwd{
		width:100%;
		background-color: #fff;
		height: 46px;
		border: none;
		border-bottom:solid 1px #dcdce0;
		margin-top: ;
		padding-left: 15px;
		line-height: 46px;
	}
	.detailText{
		width: 100%;
		height: 30px;
		font-size: 14px;
		margin-top:20px;
		line-height: 30px;
		padding-left: 15px;
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
		background-color: #21b9fb;
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
</style>
