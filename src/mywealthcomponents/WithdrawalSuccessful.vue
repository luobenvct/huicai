<template>
	<div>
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">提现</div>
		</div>
		<div class="main">
			<img class="img01" src="../assets/img/WithdrawalSuccessful.png" height="88" width="88">
			<div class="tip">提现申请已提交，等待银行确认</div>
			<div class="time">预计到账时间：{{time}}(节假日顺延)</div>
			<div>请耐心等待...</div>
			<div class="btn" @click="complete">完成</div>
		</div>		
	</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
	return {
	  time:""
	}
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	complete(){
		this.$router.push({path:'/mywealth'})
	}
  },
  components:{
	
  },
  computed: {
	
  },
  mounted(){
	let time01 = new Date();
	this.time = Date.format(new Date(time01.getTime() + 1000*60*60*24));
  },
  filters:{
	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl{
	float: left;
}
.fr{
	float: right;
}
.clear{
	clear: both;
}
.color01{
	color: red;
}
.color02{
	color: #ff6c39;
	margin-right: 10px;
}
.top{
	width: 100%;
	padding: 10px 0;
	overflow: hidden;
	background: #3ca8ee;
	color: #FFF;
}
.top .name{
	margin-left: 10%;
}
.top .returns{
	margin-left: 2%;
	margin-right: 30%;
}
.main{
	font-size: 14px;
	text-align: center;
}
.img01{
	margin-top: 60px;
}
.tip{
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 30px;
	margin-top: 10px;
}
.time{
	margin-bottom: 12px;
}
.btn{
	width: 80%;
	height: 32px;
	line-height: 32px;
	background: #ff6c39;
	color: #FFF;
	margin-left: 10%;
	margin-top: 20px;
	border-radius: 5px;
}
</style>
