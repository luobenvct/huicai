<template>
	<div class="help">
		<div class="top" v-if="!showTwo">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="16">
			</div>
			<div class="name fl" v-if="showOne">帮助与反馈</div>
			<div class="name fl" v-else>问题详情</div>
		</div>
		<div class="top" v-else>
			<div @click="goback" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl" v-if="showOne">帮助与反馈</div>
			<div class="name fl" v-else>问题详情</div>
		</div>
		<div id="app" v-cloak v-if="!showTwo">
			<div class="faq_title_box">
				<div class="faq_title_sty" v-for="item in faqList" :class="{faq_title_color:category==item.type}" @click="categoryFun(item)">{{item.name}}</div>
			</div>
			<div class="app_title">常见问题</div>
			<div class="feed_box">
				<div class="feed_sty" v-for="item in faqData" @click="feedUrlFun(item)">{{item.title}}</div>
			</div>
			<div class="food_box"> 
				<div class="food_left">
					专属客服
					<a class="food_a" href="tel:4009998381">400-999-8381</a>
				</div>
				<a class="food_right" @click="judgeLog" v-if="loginUser">
					意见反馈<img class="food_img" src="../assets/img/hole07.png">
					<span class="reddot_box" v-show="showbox"></span>
				</a>
				<router-link class="food_right" to="/login" v-else>
					意见反馈<img class="food_img" src="../assets/img/hole07.png">
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
		name: 'help',
		data () {
			return {
				faqData:'',
				showbox : false,
				showOne:true,       //头部显示判断字段
				showTwo:false,      //两个模块显示隐藏切换的字段  
				loginUser:false,     //判断是否登录
				category :'LOGIN',
				faqList:[{name:"注册登录",type:"LOGIN"},{name:"充值提现",type:"RECHARGE"},{name:"投资回款",type:"INVESTMENT"},{name:"其他",type:"OTHER"}]
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
			categoryFun(item){
				HC.setStorage("faqType",item.type);
				this.category = item.type;
				this.dataFn();
			},
			/*返回--事件*/
			returns(){
				HC.delStorage("faqType");
				this.$router.go(-1);
			},
			/*改变两个模块显示隐藏切换的字段--方法*/
			goback(){
				this.showTwo = false
			},
			/*改变两个模块显示隐藏切换的字段--方法*/
			judgeLog(){
				this.showbox = false;
				this.showTwo = true
			},
			/*到反馈详情页面--事件*/
			feedUrlFun(item){
				this.$router.push({ path: '/helpdetail?faqId='+item.uuid})
			},
			/*进页面就要执行的方法*/
			dataFn(){
			  //帮助反馈列表
			  axios.post(this.rootBase+'/faq/open_auth/list', {
			  	category : this.category
			  })
			  .then(res =>{
			  	console.log("v2"+"帮助反馈列表")
			  	console.log(res)
			  	this.faqData = eval(res.data.result)
			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			}
		},
		mounted(){ 
			this.token = HC.getStorage('sessionToken')
			this.category = HC.getStorage("faqType")||"LOGIN";
			if(this.token == "" | this.token == null){
				this.loginUser = false;
			}else{
				this.loginUser = true;
			}
			this.dataFn();
		}
	}
</script>

<style type="text/css">
	.mint-cell-wrapper{
		font-size: 14px !important;
	}
</style>
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
		padding: 10px 0;
		overflow: hidden;
		background: #fff;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		border-bottom: solid 1px #eee;
	}
	.top .name{
		width: 90%;
		text-align: center;
	}
	.top .returns{
		margin-left: 2%;
	}
	#app{
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
	a:hover{
		color:#000;
	}
	.mint-cell:hover{
		text-decoration: none;
	}
	.feed_box{
		width: 100%;
		background-color: #fff;
	}
	.feed_sty{
		width:100%;
		line-height: 20px;
		box-sizing:border-box;
		border-bottom: solid 1px #f6f6f7;
		background: url("../assets/img/hole05.png") no-repeat 20px 18px, url("../assets/img/hole06.png") no-repeat 96% center;
		background-size: 8px 8px,8px;
		font-size: 12px;
		padding:  13px 36px;
	}
	.app_title{
		line-height: 34px;
	    width: 100%;
	    padding-left: 20px;
	    color: #acb2b8;
	    font-size: 14px;
	}
	.mint-cell-wrapper{
		padding:0;
	}
	.food_box{
		width:100%;
		height:46px;
		line-height: 46px;
		overflow:hidden;
		position:fixed;
		left:0;
		bottom:0;
		line-height:46px;
		border-top: solid 1px #e5e5e5;
		background-color: #fff;
		z-index: 12;
		display: flex;
	}
	.food_left{
		width:60%;		
		flex-grow: 1;
		text-align:center;
		border-right: solid 1px #e5e5e5;
		font-size: 12px;
	}
	.food_a{
		margin-left:4px;
		font-size:14px;
		color:#203542;
	}
	.food_right{
		width: 39%;
		flex-grow: 1;
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
		margin-left: 6px;
	}
	.reddot_box{
		width:5px;
		height:5px;
		border-radius:50%;
		background-color:red;
		display: inline-block;
		vertical-align: text-top;
	}
	.faq_title_box{
		width:100%;
		background-color: #fff;
		display: flex;
		padding: 5px 0;
	}
	.faq_title_sty{
		line-height: 34px;
		text-align: center;
		flex-grow: 1;
	}
	.faq_title_color{
		color:#1f9eff;
		background:url("../assets/img/hole04.png") no-repeat center bottom;
		background-size: 50% 2px;
	}
</style>
