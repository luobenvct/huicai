<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			了解惠财
		</div>
		<div class="found_logo">
			<img class="logo_img" src="../assets/img/found_logo.png">
		</div>
		<div class="text_box">{{huicaiData.summary}}</div>
		<div class="message_box">
			<a class="cont_sty" :href="huicaiData.website">
				<div class="sty_left">网址</div>
				<div class="sty_right">{{huicaiData.website}}</div>
			</a>
			<!-- mqqapi://card/show_pslcard?src_type=internal&version=1&uin=65895196&card_type=group&source=qrcode -->
			<!-- tencent://message/?uin=3370879419 -->
			<a class="cont_sty" href="mqqwpa://im/chat?chat_type=wpa&uin=1121758642&version=1&src_type=web&web_src=oicqzone.com">
				<div class="sty_left">客服QQ</div>
				<div class="sty_right">{{huicaiData.qq}}</div>
			</a>
			<a class="cont_sty01" href="tel:4009998381">
				<div class="sty_left">客服电话</div>
				<div class="sty_right">
					<div>{{huicaiData.serviceCall}}</div>
					<div class="div02">{{huicaiData.serviceTime}}</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data () {
			return {
				huicaiData:[]
			}   
		},
		components:{

		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			dataFn(){
				//关于惠财
				axios.post('/api/v2/pub/operation_resource/about_us', {
				  
				})
				.then(res =>{
				  	console.log("v2关于惠财");
				  	console.log(res);  
				  	this.huicaiData = res.data.result;
				})
				.catch(res=> {
				  	console.log(res);
				});
			}
		},
		created(){ 

		},
		mounted(){
			this.dataFn();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.nav_box{
		width: 100%;
		position: fixed;
		top: 0;
		left:0;
		height:40px;
		line-height: 40px;
		background-color:#fff;
		text-align: center;
		color: #000; 
		z-index: 100;
		border-bottom: solid 1px #eee;
	}

	.returns_box{
		position: absolute;
		top: 0;
		left: 0;
		width:40px;
		height:40px;
		background: url(../assets/img/Back_icon.png) no-repeat center;
		background-size: 18px;
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
	.text_box{
		width:96%;
		margin:auto;
		line-height: 20px;
		font-size: 12px;
		color:#c0c0c0;
		text-indent: 2em;
		margin-bottom: 20px;       
	}    
	.message_box{
		width: 100%;
		overflow: hidden;
		border-top: solid 7px #f7f7f7; 
	}    
	.cont_sty{
		width: 94%;
		overflow: hidden;
		line-height: 48px;
		display: block;
		border-bottom: solid 1px #e2e2e4;
		margin-left: 6%;
		background: url(../assets/img/found08.png) no-repeat 96% center;
		background-size: 8px;
	}
	.cont_sty01{
		width: 94%;
		overflow: hidden;
		height: 48px;
		display: block;
		border-bottom: solid 1px #e2e2e4;
		margin-left: 6%;
		background: url(../assets/img/found08.png) no-repeat 96% center;
		background-size: 8px;
		padding-top: 10px;
	}
	.cont_sty01 .sty_right{
		text-align: right;
	}
	.cont_sty01 .sty_right .div02{
		font-size: 12px;
		color: #CCC;
	}
	.sty_left{
		float: left;
		font-size: 14px;
		color:#acb2b8;
	}
	.sty_right{
		float: right;
		margin-right: 10%;
		font-size: 14px;
		color: #000;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	


</style>
