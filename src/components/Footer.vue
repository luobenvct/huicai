<template>
  <div class="footer_box">
   <ul>
	<li class="item_footer">
	  <router-link to="/home" class="item_nav">
		<div class="bg01"></div>
		<div>首页</div>
	  </router-link>
	</li>
	<li class="item_footer">
	  <router-link to="/financial" class="item_nav">
		<div class="bg02"></div>
		<div>理财</div>
	  </router-link>
	</li>
	<li class="item_footer">
	  <router-link to="/mywealth" class="item_nav">
		<div class="bg03"></div>
		<div>我的财富</div>
	  </router-link>
	</li>
	<li class="item_footer">
	  <router-link to="/found" class="item_nav">
		<div class="bg04"></div>
		<div>发现</div>
	  </router-link>
	</li>
  </ul>
</div>
</template>

<script>
  export default {
	name: 'footer_box',
	data () {
	  return {
	   
	  }
	},
	methods:{

	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.footer_box{
		position: fixed;
		bottom: 0;
		background: #FFF;
		width: 100%;
		border-top: 1px solid #f5f5f5;
		padding-top: 10px;
		padding-bottom: 2px;
		-webkit-touch-callout:none;  /*系统默认菜单被禁用*/
		-webkit-user-select:none; /*webkit浏览器*/
	}
	.footer_box .item_footer{
		display: block;
		float: left;
		width: 25%;
		text-align: center;
		-webkit-touch-callout:none;  /*系统默认菜单被禁用*/
		-webkit-user-select:none; /*webkit浏览器*/
	}
	.footer_box .item_footer a{
		font-size: 12px;
		color: #CCC;
		text-decoration:none;
	}
	.footer_box .item_footer a .bg01{
		width: 20px;
		height: 20px;
		background: url('../assets/img/home.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
	}
	.footer_box .item_footer .router-link-active{
		color:#00a0e9;
	}
	.footer_box .item_footer .router-link-active .bg01{
		width: 20px;
		height: 20px;
		background: url('../assets/img/home_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
	}
	.footer_box .item_footer a .bg02{
		width: 20px;
		height: 18px;
		background: url('../assets/img/licai.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
	    margin-bottom: 2px;
	}
	.footer_box .item_footer .router-link-active .bg02{
		width: 20px;
		height: 18px;
		background: url('../assets/img/licai_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 38%;
	    margin-bottom: 2px;
	}
	.footer_box .item_footer a .bg03{
		width: 19px;
		height: 20px;
		background: url('../assets/img/mymoney.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer_box .item_footer .router-link-active .bg03{
		width: 19px;
		height: 20px;
		background: url('../assets/img/mymoney_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer_box .item_footer a .bg04{
		width: 20px;
		height: 20px;
		background: url('../assets/img/found.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
	.footer_box .item_footer .router-link-active .bg04{
		width: 20px;
		height: 20px;
		background: url('../assets/img/found_a.png') no-repeat center;
		background-size: 100% 100%;
		margin-left: 40%;
	}
</style>
