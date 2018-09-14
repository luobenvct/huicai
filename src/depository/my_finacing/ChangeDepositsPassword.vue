<template>
  <div class="changePass">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">修改交易密码</div>
	</div>
	<div id="app" v-cloak>
		<input type="text" class="indentity_input" placeholder="请输入身份证号" v-model="indentityNum" id="bank_iden" maxlength="18">
		<!-- <input type="tel" class="indentity_input input_box"  maxLength="19" placeholder="请输入绑定的银行卡" v-model="bankNum" maxlength="19"> -->
		<div id="error_tip"></div>
	</div>
	<div class="sureChangeBtn02" v-if="btnTrue">下一步</div>
	<div class="sureChangeBtn" v-else @click="nextFun">下一步</div>
  </div>
</template>

<script>
	import store from '../../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'changePass',
		data () {
			return {
				token:'',
				indentityNum : '',
				bankNum : '',
				clickshow : true,
				btnTrue : true
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
			nextFun(){
				if(this.IDCardCheck()==false){
					this.$toast({
						message: '身份证错误',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				//
				axios.post(this.rootBase+'/account/depository/verify/pid_and_bank_card', {
					app_token:this.token,
					pid:this.indentityNum,
					bankNo : this.bankNum
				})
				.then(res =>{
					console.log("存管+银行卡");
					console.log(res);  
					if(res.data.code=="SUCCESS"){
						this.$router.push({path:'/modifydepositspassword'});
					}else{
						this.$toast({
							message: res.data.msg,
							position: 'bottom',
							duration: 3000
						});
					}
				})
				.catch(res=> {
					console.log(res);
				});
			},
			IDCardCheck() {
				var _self = this;
				//获取填写的身份证号码
				var num = document.getElementById("bank_iden").value;
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
			}
		},
		watch:{
			indentityNum (val){
				this.indentityNum = this.indentityNum.replace(/[^\w\.\/]/ig,'');
				if(this.indentityNum==''){
					this.btnTrue = true;
				}else{
					this.btnTrue = false;
				}
			},
			bankNum (val){
				this.bankNum = this.bankNum.replace(/\D/g,'');
				if(this.indentityNum==''){
					this.btnTrue = true;
				}else{
					this.btnTrue = false;
				}

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
		    font-size: 14px;
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
	.indentity_input{
		width:100%;
		background-color: #fff;
		height:52px;
		border:none;
		border-top:solid 1px #e5e5e5;
		border-bottom:solid 1px #e5e5e5;
		padding-left: 15px;
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
	.sureChangeBtn02{
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
		opacity: 0.6;
	}
	.forgetPassWord{
		width: 90%;
		height: 20px;
		text-align: right;
		color: #3ca8ee;
		font-size: 12px;
		margin: 10px auto;
	}
	#app{
		margin-top: 12px;
	}
</style>
