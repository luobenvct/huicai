<template>
	<div class="huoqi">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">惠活宝投资记录</div>
		</div>
		<div class="wapper">
			<div class="main" v-for="item in hhbData">
				<div class="main_top">
					<div class="title fl">{{item.title}}</div>
					<div class="money fr">{{item.amount}}</div>
				</div>
				<div class="main_bottom">
					<div class="time fl">{{item.date}}</div>
					<div class="fr content" :class="{red:item.colorShow}">{{item.content}}</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  name: 'huoqi',
  data () {
	return {
	  hhbData :[],
	  token :''
	}
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	dataFn(){
	  //惠活宝投资记录
	  axios.post(this.rootBase+'/assets/combine/ondemand/history', {
		t : new Date(),
		genre : "BUY_SCB",
		app_token:this.token
	  })
	  .then(res =>{
		console.log("v2惠活宝投资记录数据ww");
		console.log(res);    
		this.hhbData = res.data.result;  
		this.hhbData.forEach((item)=>{
		  item.colorShow = false;
		  //item.date =  new Date(item.date).toLocaleString();
		  /*item.date =  new Date(item.date).toLocaleDateString() + " "+new Date(item.date).toLocaleTimeString();*/
		  if(item.subject == 'buy_scb'){
			item.title = "购买";
			item.amount = item.amount;
			item.content = "交易成功"
			item.colorShow = false;
		  }else if(item.subject == 'withdraw' && item.status == "transfered" && item.payMark == 'DEMAND_2_FIX'){
			item.title = "转入惠定存";
			item.amount = '-'+item.amount;
			item.content = "交易成功"
			item.colorShow = false;
		  }else if(item.subject == 'withdraw' && item.status == "transfered" && item.payMark == null){
			item.title = "提现";
			item.amount = '-'+item.amount;
			item.content = "提现成功"
			item.colorShow = true;
		  }else if(item.subject == 'withdraw' && item.status == "apply" && item.payMark == null){
			item.title = "提现";
			item.amount = '-'+item.amount;
			item.content = "提现中"
			item.colorShow = true;
		  }
		})  
	  })
	  .catch(res=> {
		console.log(res);
	  });
	}
  },
  components:{
	
  },
  computed: {
	rootBase(){
		return store.getters.getRootBase
	}
  },
  mounted(){
	//this.token = this.getCookie('sessionToken');
	this.token = HC.getStorage('sessionToken')
	this.dataFn();
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
	.login{
		width: 100%;
		background: #CCC;
		padding-bottom: 460px;
	}
	.top{
		position: fixed;
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		background: #3ca8ee;
		color: #FFF;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	input{
		outline:none;
		-webkit-user-select:auto;  
	}
	body{
		background-color:#f5f5f9;
	}
	.wapper{
		margin-top: 42px;
	}
	.huoqi{
		width:100%;
		overflow:hidden;
	}
	.main{
		width: 100%;
		overflow: hidden;
		padding-bottom: 10px;
		border-bottom: 1px solid #CCC;
	}
	.main_top{
		margin-left: 4%;
		margin-top: 10px;
	}
	.main_top .title{
		margin-bottom: 6px;
	}
	.main_top .money{
		margin-right: 4%;
	}
	.main_bottom{
		clear: both;
		margin-left: 4%;
		margin-top: 10px;
	}
	.main_bottom .content{
		margin-right: 4%;
		color: green;
	}
	.main_bottom .time{
		font-size: 12px;
		color: #666;
	}
	.main .red{
		color: red;
	}
</style>
