<template>
  <div class="coupons">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">正文</div>
	</div>
	<div class="app_box" v-cloak>
		<div class="title">{{title}}</div>
		<div v-html="test"></div>
	</div>
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  name: 'coupons',
  data () {
	return {
		token :"",
		title:"",
		time:"",
		content:'',
		test:''
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
	

  }, 
  created: function () { 
  	//this.token = this.getCookie('sessionToken');
  	this.token = HC.getStorage('sessionToken');
  	this.test = this.$route.params.content;
  	this.title = this.$route.params.title;
  	console.log(this.test)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
	/*body{
		background: #f5f5f7;
	}*/
</style>
<style scoped>

.coupons{
  width: 100%;
  font-size: 14px;
}
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
ul,li{
	padding:0 ;
	margin:0;
	list-style: none;
}
.app_box{
	width:90%;
	margin-left: 5%;
	margin-top: 40px;
	text-align: center;
	overflow:hidden;
}
.mint-navbar .mint-tab-item{
	color: #acb2b8;
	padding: 14px 0;
	margin: 0 15px;
}
.mint-navbar .mint-tab-item.is-selected{
	text-decoration: none; 
	border-bottom: 2px solid #26a2ff;
	margin-bottom:0;
	color: #203542;
}
.mint-tab-item-label{
	font-size:16px;
}
.coupon_sty{
	width:94%;
	overflow:hidden;
	margin:auto;
	margin-top: 15px;
}
.sty_left{
	width:32%;
	height:100px;
	float:left;
	overflow:hidden;
	text-align:center;
	background:url('../assets/img/hb01.png') no-repeat center;
	background-size:100% 100%;
	border-radius:5px;
	color:#fff;
}
.sty_two{
	background-image:url('../assets/img/hb04.png');
}
.sty_shree{
	background-image:url('../assets/img/hb05.png');
}
.money_num{
	width:100%;
	font-size:12px;
	margin-top: 18px;
}
.money_num span{
	font-size:30px;
}
.condition_box{
	width:100%;
	font-size:12px;
	margin-top:2px;
}
.sty_right{
	width:68%;
	height:100px;
	float:left;
	overflow:hidden;
	background:url('../assets/img/hb02.png') no-repeat center;
	background-size:100% 100%;
}
.coupon_title{
	width:86%;
	margin:auto;
	font-size:14px;
	line-height:36px;
	height: 36px;
	color:#f96161;
	border-bottom:dashed 1px #ffb4b4;
	padding-left:6px;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;		
	-webkit-box-orient: vertical;
}
.money_two{
	color:#fa9634;
	border-bottom:dashed 1px #fa9634;
}
.money_three{
	color:#6e56e9;
	border-bottom:dashed 1px #6e56e9;
}
.coupon_into{
	width:86%;
	margin:auto;
	font-size:10px;
	color:#acb2b8;
	margin-top:6px;
}
.coupon_time{
	width:86%;
	margin:auto;
	font-size:10px;
	overflow:hidden;
	color:#acb2b8;
	margin-top:2px;
}
.due_box{
	width: 60px;
	background-color: #eee;
	float: right;
	text-align: center;
	font-size: 10px;
	line-height: 18px;
	border-radius: 3px;
}
.coupon_a{
	width:100%;
	text-align:center;
	display:block;
	margin:30px auto;
	color:#acb2b8;
	line-height: 20px;
}
.coupon_a:hover{
	color:#000;
	text-decoration: none;
}
.coupon_a img{
	width: 8px;
	height: 14px;
    vertical-align: middle;
}
.note_box{
	width:24px;
	font-size:12px;
	background-color:red;
	border-radius:4px 0 0 4px;
	color:#fff;
	position:fixed;
	top:0;
	right:0;
	padding: 6px;
	display:blcok;
}
.note_box:hover{
	color:#fff;
	text-decoration: none;
}
.couponbj_one{
	width:58%;
	margin:auto;
	background:url(../assets/img/couponone.png) no-repeat center;
	background-size:70%;	
	height:300px;
}
.addint_one{
	background:url(../assets/img/addintone.png) no-repeat center;
	background-size:80%;
}
.mint-tab-container{
	overflow:visible;
}
.mint-loadmore{
	padding-bottom: 10px;
}
.sty_left{
	background-image:url('../assets/img/hb06.png');
}
.right_bjone{
	background-image:url('../assets/img/hb07.png');
}
.right_two{
	background-image:url('../assets/img/hb08.png');
}
.coupon_title {
	color:#e0e0e0;
	border-color:#e0e0e0;
}
.mint-spinner-fading-circle{
    margin: 10px auto 0;
}
.colse_name{
	width: 100%;
    text-align: center;
    margin-top: 10px;
}
.title{
	width: 90%;
	font-size: 18px;
	text-align: center;
	color: rgb(32,53,66);
	margin-bottom: 12px;
}

</style>
