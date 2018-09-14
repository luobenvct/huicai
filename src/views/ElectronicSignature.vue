<template>
	<div class="riskwarn">
	<div class="top">
		<div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
		</div>
		<div class="name fl">电子合同</div>
	</div>
	<div class="max_box">
		<div class="img" v-for="item in imgData">
			<img :src="item.imgUrl">
		</div>
	</div>
		<div class="post_box" @click="positionFun" v-show="hrefUrl">
				<div class="post_name">电子合同存证证明：</div>
				<div class="post_href">{{hrefUrl}}</div>
		</div>

	</div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
	data () {
	return {
		imgData : [],
		biduuid : '',
		hrefUrl : '',
		app_token : ''
	}
	},
	methods:{
	returns(){
		this.$router.go(-1);
	},
		positionFun(){
				window.location.href = this.hrefUrl;
		},
	dataFun(){
				axios.get("/api/v2/financing_project_bid/fixed/get_contract/"+this.biduuid, {
				})
				.then(res=>{
					this.imgData = res.data.result;
					console.log(res.data.result);
				})
				.catch(res=>{
					console.log(res);
				});
				axios.post("/api/v2/financing_project_bid/contact/"+this.biduuid, {
						app_token : this.app_token
				})
				.then(res=>{
						if(res.data.code=="SUCCESS"){
								this.hrefUrl = res.data.result;
						}else{
								this.$toast(res.data.msg)
						}
				})
				.catch(res=>{
						console.log(res);
				});

	}
	},
	components:{
	
	},
	computed: {
	 
	},
	mounted(){
		this.app_token = HC.getStorage('sessionToken');
	this.biduuid = HC.vueurlFun("biduuid") || '';
	this.dataFun();
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
	padding-bottom: 60px;
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
  margin-right: 36%;
  margin-top: 8px;
}
.max_box{
	width:100%;
	overflow:hidden;
	background-color:#f7f7f7;
	color:#2d353a;
	margin-top: 42px;
}
.img{
	width: 100%;
	overflow: hidden;
 }
 .img img{
	display: block;
	width: 100%;
 }
 .post_box{
		width:100%;
		background-color: #000;
		opacity: 0.7;
		color:#fff;
		height:60px;
		position: fixed;
		bottom: 0;
		left: 0;
 }
 .post_name{
		width:90%;
		margin:10px auto 0;
 }
 .post_href{
		width:90%;
		margin:4px auto 0;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
 }
</style>
