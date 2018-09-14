<template>
  <div class="help_box">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">问题详情</div>
	</div>
	<div v-if="!feedback">
	  <div class="main">
		<div class="title_box">{{faqdetails.title}}</div>
		<div class="content">{{faqdetails.content}}</div>
	  </div>
	  <div class="food_box"> 
		  <div class="food_left" @click="change">
			<img class="food_img" src="../assets/img/hole03.png">
			<span class="food_a">解决了</span>
		  </div>
		  <a class="food_right" @click="judgeLog" v-if="loginUser">
			<img class="food_img" src="../assets/img/hole01.png">我要反馈
			<span class="reddot_box" v-show="showbox"></span>
		  </a>
		  <router-link class="food_right" to="/login" v-else>
			<img class="food_img" src="../assets/img/hole01.png">我要反馈
			<span class="reddot_box" v-show="showbox"></span>
		  </router-link>
	  </div>
	</div>
	<V_Feedback v-else></V_Feedback> 
  </div>
</template>

<script>
import V_Feedback from '../components/FeedBack.vue'
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
	  showbox:false,
	  faqId:'',
	  faqdetails:[],
	  feedback:false,
	  loginUser:false
	}
  },
  computed: {
	rootBase(){
	  return store.getters.getRootBase
	}
  },
  components:{
	V_Feedback
  },
  methods:{
  	/*返回--事件*/
	returns(){
	  this.$router.go(-1);
	},
	/*获取链接参数--方法*/
	GetUrlRelativePath(name){
	/*debugger*/
	var url = document.location.toString();
	var arrUrl = url.split("?")[1].split("&");
	var listnum = [];
	arrUrl.forEach((item)=>{
	  listnum.push(item.split("="))
	})
	var text ='';
	for (var i = 0; i < listnum.length; i++) {
	  if(listnum[i][0]==name){
		text = listnum[i][1]        
	  }

	}
	return text;　
　　},
	/*点击反馈--事件*/
	change(){
	  this.$toast({
		message: '感谢您的反馈!',
		position: 'bottom',
		duration: 1000
	  })
	  setTimeout(()=>{
		this.$router.go(-1);
	  },1000)
	},
	/*判断登录，如果登录显示问题反馈详情页面--方法*/
	judgeLog(){
	  this.feedback = true
	},
	/*进页面就要执行的方法*/
	dataFn(){
	  //帮助反馈具体解释
	  axios.post(this.rootBase+'/faq/open_auth/'+this.faqId, {
		
	  })
	  .then(res =>{
	  	console.log("v2"+"帮助反馈具体解释")
		this.faqdetails = eval(res.data.result);
	  })
	  .catch(res=> {
		console.log(res);
	  });
	}
  },
  mounted(){
	this.token = HC.getStorage('sessionToken')
	if(this.token == "" | this.token == null){
	  this.loginUser = false;
	}else{
	  this.loginUser = true;
	}
	this.faqId = this.GetUrlRelativePath('faqId'),
	this.dataFn();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help_box{
	width:100%;
	overflow:hidden;
	padding-bottom:46px;  
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	overflow-y: scroll;
	padding-top: 40px;
	background-color: #f6f6f9;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.top{
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.top .name{
  width: 90%;
  text-align: center;
}
.top .returns{
  margin-left: 2%;
}

.main{
}
.main .title_box{
	line-height: 24px;
	width: 100%;
	color: #353536;
	font-size: 14px;
	background: url("../assets/img/hole05.png") no-repeat 15px 28px;
	background-size: 8px 8px;
	padding: 20px 30px;
}
.main .content{
  width: 90%;
 margin: auto;
 color: #666;
 font-size: 12px;
 line-height: 24px;
 padding: 0 10px;
}
.food_box{
  width:100%;
  height:46px;
  overflow:hidden;
  position:fixed;
  left:0;
  bottom:0;
  line-height:46px;
  border-top: solid 1px #e5e5e5;
  background-color: #fff;
  z-index: 2;
}
.food_left{
  width:50%;
  float:left;
  text-align:center;
  border-right: solid 1px #e5e5e5;
  font-size: 12px;
}
.food_a{
  margin-left:0px;
  font-size:14px;
  color:#203542;
}
.food_right{
  width: 49%;
  float:left;
  text-align:center;
  color:#203542;
  font-size: 12px;
}
.food_a:hover,.food_right:hover{
  text-decoration: none;
  color:#203542;
}
.food_img{
  width: 16px;
  margin-right: 2px;
  vertical-align: middle;
}
</style>
