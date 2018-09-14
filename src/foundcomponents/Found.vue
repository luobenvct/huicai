<template>
  <div class="found_box">
	<div class="header">发现</div>
	<div class="found_logo">
		<img class="logo_img" src="../assets/img/found_logo.png">
		<div class="version_box">版本号3.0.0</div>
	</div>
	<div class="list_box" style="margin-bottom: 10px;">
		<router-link to="/activitycenter" class="list_tiao">
		  活动中心
		</router-link>
	</div>
	<div class="list_box" style="margin-bottom: 10px;">
		<router-link to="/banklimit"  class="list_tiao bj_two">
		  银行卡限额说明
		</router-link>
		<router-link to="/riskassessment"  class="list_tiao bj_sex" v-if="loginUser" >
		  风险偏好
			<div class="risk_posi" v-text="riskname" v-show="riskname"></div>
		</router-link>
		<router-link to="/login"  class="list_tiao bj_sex" v-else>
		  风险偏好
		</router-link>
	</div>
	<div class="list_box">
		<router-link to="/investmentcounter" class="list_tiao bj_three">
		  买房、养老等投资
		</router-link>
		<router-link to="/assetsinstructions" class="list_tiao bj_four">
		  资产计算说明
		</router-link>
		 <router-link to="/realizehuicai" class="list_tiao bj_five">
		  了解惠财
		</router-link>
	</div>
	<div class="exit_box" v-if="loginUser" @click="loginOut">退出登录</div>
	<div class="exit_box" v-else @click="login">登录</div>
	<V_Footer></V_Footer>
  </div>
</template>

<script>
import V_Footer from '../components/Footer.vue'
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  name: 'found_box',
  data () {
	return {
	  token:'',
	  loginUser:false,
	  weixintest:true,
	  riskname : ''
	}
  },
  methods : {
  	test(){
  		axios.interceptors.response.use((res) =>{
			 //对响应数据做些事
			 if(!res.data.success){
			    // _.toast(res.data.msg);
			    return Promise.reject(res);
			}
			return res;
		}, (error) => {
			this.$toast({
				message: "网络异常,退出登录失败",
				position: 'bottom',
				duration: 3000
			});
			return Promise.reject(error);
		});
  	},
	loginOut(){
	   //退出登录
	   this.$messagebox.confirm('确认要退出惠财理财吗').then(action => {
		   	//this.test();
		   	axios.post(this.rootBase+'/user/logout', {
		   	///api/sys/logout.htm
		   	/*/api/v2/user/logout*/
		   		app_token:this.token
		   	})
		   	.then(res =>{
		   		console.log("v2退出登录");
		   		console.log(res);  
		   		if(res.data.code == "SUCCESS"){
		   			HC.delStorage("sessionToken");
		   			this.loginUser = false; 
		   		} 
		   		if(res.data.code == "TOKEN_ERROR"){
		   			HC.delStorage("sessionToken");
		   			this.loginUser = false;
		   		}   
		   	})
		   	.catch(res=> {
		   		console.log(res);
		   	});
	   });
		
	},
	login(){
		this.$router.push({path:'/login'})
	},
	riskFun(){
		var token = this.token || '';
		console.log(token)
		if(token!=''){
			axios.post(this.rootBase+'/risk_preference_assessment/result',{
				app_token : token
			})
			.then((res)=>{
				console.log("v2风险偏好结果")
				console.log(res)
				if(res.data.code == "SUCCESS"){
					if(res.data.result.length==2){
						this.riskname = res.data.result[1].grade;
					}else{
						this.riskname = '';
					}
				}
				if(res.data.code == "TOKEN_ERROR"){
					HC.delStorage("sessionToken");
				  	this.loginUser = false; 
				}
				
				
			})
		}else{
			this.riskname = '';
		}
		
	}
  },
  components:{
	V_Footer
  },
  computed: {
	rootBase(){
		return store.getters.getRootBase
	}
  },
  mounted(){
	/*this.token = this.getCookie('sessionToken');*/
	this.token = HC.getStorage('sessionToken')
	let flag = HC.getStorage("test");
	if(flag == true){
		this.weixintest = false;
	}else{
		this.weixintest = true;
	}
	if(this.token == "" | this.token == null){
	  this.loginUser = false;
	}else{
	  this.loginUser = true;
	}
	this.riskFun();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.found_box{
	width: 100%;
	overflow:hidden;
	background-color: #f6f6f9;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	overflow-y: scroll;
}
.header{
	position: fixed;
	top: 0;
	width: 100%;
	line-height: 40px;
	background: #fff;
	text-align: center;
	color: #000;
	z-index: 3;
	border-bottom: solid 1px #eee;
}
.found_logo{
	width: 100%;
	overflow: hidden;
	margin-top:40px;
	padding: 30px 0;
	background-color: #fff;
}
.logo_img{
	width:96px;
	display: block;
	margin:auto;
}
.version_box{
	width:80px;
	margin:auto;
	font-size: 10px;
	color:#83858d;
	border: solid 1px #e1e1e1; 
	text-align: center;
	line-height: 18px;
	border-radius: 10px;
	margin-top: 6px;
}
.list_box{
	width: 100%;
	overflow:hidden;
	background-color: #fff;
	line-height: 50px;
}
.list_tiao{
	width:94%;
	display: block;
	margin-left: 6%;
	border-top: solid 1px #efecec;
	padding-left: 30px;
	background: url(../assets/img/found01.png) no-repeat left center, url(../assets/img/found08.png) no-repeat 86% center;
	background-size: 20px,9px;
	font-size: 14px;
	color:#203542;
	position: relative;
}
.bj_two{
	background-image: url(../assets/img/found03.png),url(../assets/img/found08.png);
}
.bj_three{
	background-image: url(../assets/img/found05.png),url(../assets/img/found08.png);
}
.bj_four{
	background-image: url(../assets/img/found06.png),url(../assets/img/found08.png);
}
.bj_five{
	background-image: url(../assets/img/found07.png),url(../assets/img/found08.png);
}
.bj_sex{
	background-image: url(../assets/img/found09.png),url(../assets/img/found08.png);
}
.exit_box{
	width:100%;
	line-height: 50px;
	text-align: center;
	background-color: #fff;
	color:#ff6c39;
	font-size: 14px;
	margin: 15px 0;
	margin-bottom: 60px;
}
.risk_posi{
	position: absolute;
	top: 0;
	right: 25%;
	color:#ff6c39;

}
</style>
