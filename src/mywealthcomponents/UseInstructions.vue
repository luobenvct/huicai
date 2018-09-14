<template>
	<div class="use_box">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			优惠券使用说明
		</div>
		<div class="app_box">
			<div class="app_sty">1、获得的奖券到惠财APP可自主选择使用</div>
			<div class="app_sty">2、单次购买仅限使用一张优惠券，赠送收益将在购买产品回款
				时一起发放到账户中</div>
			<div class="app_sty">3、奖品统一在收到信息后的3个工作日内寄出（或充值）</div>
			<div class="app_sty">4、获得的奖券请留意使用期限，过期作废</div>
			<div class="app_sty">5、如有疑问，请联系惠财客服<a class="app_a" href="tel:4009998381">400-999-8381</a></div>

		</div>
		  
	</div>
</template>

<script>
export default {
  name: 'use_box',
  data () {
	return {
	  
	}
  },
  components:{

  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
   
  },
  created () {
	
  },
  mounted(){
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.use_box{
	font-size: 14px;
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

.controlBank{
	   position: absolute;
	   top: 0;
	   right: 10px;
	   width: 70px;
	   height: 20px; 
	   font-size: 14px;
	   color: #fff;
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
.app_box{
	width:100%;
	overflow:hidden;
	padding:10px 0;
	margin-top: 40px;
}
.app_sty{
	width:90%;
	margin:auto;
	line-height:30px;
	color:#acb2b8;
}
.app_a{
	color:#000;
	font-size:16px;
	margin:0 4px;
}
.app_a:hover{
	color:#000;
	text-decoration: none;
}


</style>
