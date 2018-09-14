<template>
	<div class="coupons">
	   <div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">保障措施</div>
		</div>
		<div class="main">
			<div v-html="SafeguarData"></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'coupons',
	data () {
		return {
			SafeguarData:''
		}   
	},
	components:{
	
	},
	methods:{
		returns(){
		  this.$router.go(-1);
		}
	},
	mounted() { 
	   this.SafeguarData = this.$route.params.safeData || '';
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
		padding:0;
		margin:0;
		list-style: none;
	}
	.fl{
	  float: left;
	}
	.fr{
	  float: right;
	}
	.top{
	  width: 100%;
	  padding: 4px 0;
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
	.main{
		margin-top: 50px;
		width: 90%;
		margin-left: 5%;
	}
</style>
