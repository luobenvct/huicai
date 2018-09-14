<template>
  <div class="riskwarn">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">实地考察</div>
	</div>
	<div class="max_box" id="max_box" v-cloak>
		<div class="info" v-html="borrowerInfo"></div>
	</div>
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
		borrowerInfo:''      //实地考察数据
	}
  },
  methods:{
	returns(){
		this.$router.go(-1);
	}
  },
  components:{
	
  },
  computed: {
   
  },
  mounted(){
	this.borrowerInfo = this.$route.params.borrowerInfo;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
	list-style: none;
}
.riskwarn{
	background: #f5f5f9;
	font-size: 12px;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.top{
	width: 100%;
	padding: 6px 0;
	overflow: hidden;
	background: #3ca8ee;
	color: #FFF;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
}
.top .name{
	font-size: 16px;
	margin-top: 5px;
}
.top .returns{
	margin-left: 2%;
	margin-right: 38%;
	margin-top: 8px;
}
*{   
	-webkit-touch-callout:none;   
	-webkit-user-select:none; 
	-khtml-user-select:none;    
	-moz-user-select:none;  
	-ms-user-select:none;  
	user-select:none;   
}  
input{
	outline:none;
	-webkit-user-select:auto;  
}
.max_box{
	width:100%;
	overflow:hidden;
	background-color:#f7f7f7;
	color:#2d353a;
	margin-top: 48px;
}
.info{
	width: 94%;
	margin-left: 3%;
}
</style>
<style type="text/css">
	.info img{
		width: 100% !important;
		height: auto !important;
	}
</style>
