<template>
  <div class="buyingResults">
  	<div class="top">
		<div @click="returns" class="returns fl">
			<img src="../assets/img/Back_icon.png" height="18" width="11">
		</div>
		<div class="name fl">购买成功</div>
	</div>
	<div class="max_box">
		<img class="max_img" src="../assets/img/buyin01.png" height="128" width="750">
		<div class="max_title">{{resultData.targetName}}</div>
		<div class="order_num"> 
			<div class="order_left">订单号</div>
			<span id="orderNum">{{certificateId}}</span>
		</div>
		<div class="max_bank" v-if="cardlast">
			<div class="bank_name">{{bankName}}</div>
			<div class="bank_num">尾号{{cardlast}}</div>
			<img class="bank_img" :src="bankIcon01">
		</div>
		<div class="max_bank" v-else>
			<div>惠活宝</div>
		</div>
		<div class="succ_box">
			<div class="succ_lione" >
				<div class="succ_name" id="goument">成功购买{{resultData.Amount}}元</div>
				<div class="succ_time" id="bidtime">{{resultData.biddate}}&nbsp;&nbsp;{{resultData.bidweek}}</div>
			</div>
			<div class="succ_li">
				<div class="succ_name succ_color">计算收益</div>
				<div class="succ_time">{{resultData.beginProfit}}&nbsp;&nbsp;{{resultData.week}}</div>
			</div>
			<div class="succ_two" id="succ_show">
				<div class="succ_name succ_color">显示收益</div>
				<div class="succ_time" id="timenum">{{resultData.beginProfit}}&nbsp;&nbsp;</div>
			</div>
			
		</div>
	</div>
	<div class="but_box">
		<span class="other_but" @click="other">其他产品</span>
		<span class="see_but" @click="checkMoney">查看资产</span>
	</div>
	
	<div class="prompt_box">如有疑问可致电<a class="prompt_a" href="tel:400-999-8381">400-999-8381</a></div>
	<!-- <input id="certificateId" type="hidden" value="${orderid }"> -->
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
	  	certificateId:"",
	  	resultData:[],
	  	showTime:'',
	  	cardlast:'',
	  	bankIcon:'',
	  	bankIcon01:'',
	  	bankName:''
	}
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	other(){	
		this.$router.push({ path: '/financial' })
	},
	checkMoney(){
		this.$router.push({ path: '/mywealth' })
	},
	jieshu(index){
		var list=index.split("-");
		return list[1]+"月"+list[2]+"日";
	},
	GetUrlRelativePath(name){
		/*debugger*/
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("?")[1].split("&");
		var listnum = [];
		arrUrl.forEach((item)=>{
			listnum.push(item.split("="))
		})
		var text ='';
		for (var i = 0; i < listnum.length; i++) {
			if(listnum[i][0]==name){
				text = listnum[i][1]				
			}

		}
		return text;　
　　},
	dtime(time,offset){
		return new Date(time.getTime() + (offset)*1000*60*60*24);
	},
	dataFn(){
		//购买返回结果
		axios.post('/api/bid_result.htm', {
			t : new Date(),
			orderId:this.certificateId
		})
		.then(res =>{
			console.log("购买返回结果");
			console.log(res);    
			this.resultData = res.data[0];
			this.resultData.Amount = HC.decimalFun(this.resultData.Amount);
			this.resultData.biddate = this.jieshu(this.resultData.biddate);
			this.resultData.beginProfit = this.jieshu(this.resultData.beginProfit);
			var d = new Date();
			//this.showTime = Date.format(this.dtime(d,2),'MM月dd日');
			this.bankName = res.data[0].bankName;
			this.bankIcon = HC.imgFun(res.data[0].bankName);
			this.bankIcon01 = "https://static.88huicai.com/huicai/image/bank/card/"+this.bankIcon;
		})
		.catch(res=> {
			console.log(res);
		});
	},

  },
  mounted(){
	this.certificateId =  this.GetUrlRelativePath("orderid");
	this.cardlast = this.GetUrlRelativePath("shortBankCardNo") || '';
	this.dataFn();
  },
  filters: {
   
  },
  watch:{
	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reapal{
	background: #f5f5f9;
}
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
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.top .name{
	margin-left: 10%;
	margin-top: 5px;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
  margin-top: 8px;
}
.max_box{
	width:100%;
	overflow: hidden;
	background-color: #ffffff;
	margin-top: 46px;
}
.max_img{
	width:100%;
}
.max_title{
	width:100%;
	padding-left: 15px;
	font-size: 16px;
	color:#203542;
	margin-top: 10px;
}
.order_num{
	width:100%;
	line-height: 34px;
	color:#acb2b8;
	font-size: 12px;
	overflow:hidden;
}
.order_left{
	float: left;
	width: 20%;
	padding-left: 15px;
}
#orderNum{
	width: 70%;
	word-wrap: break-word;
	display: block;
	float: left;
	line-height: 16px;
	padding: 9px 0;
	padding-right: 15px;
}
.max_bank{
	overflow: hidden;
	color:#acb2b8;
	font-size: 12px;
	margin-left: 15px;
	margin-right: 15px;
	border-bottom: solid 1px #e5e5e5;
	padding-bottom: 10px;
}
.bank_name{
	float: left;
}
.bank_num{
	float: right;
}
.bank_img{
	float: right;
	width: 16px;
	margin-right: 8px;
}
.succ_box{
	width:70%;
	margin:auto;
	overflow: hidden;
	margin-top:15px;
}
.succ_lione{
	background: url("../assets/img/buyin02.png") no-repeat left 6px,url('../assets/img/buyin03.png') no-repeat 3px 6px;
	background-size: 7px 7px,1px 100%;
}
.succ_li{
	background: url("../assets/img/buyin02.png") no-repeat left 6px,url('../assets/img/buyin03.png') no-repeat 3px 0;
	background-size: 7px 7px,1px 100%;
}
.succ_two{
	background: url("../assets/img/buyin02.png") no-repeat left 6px,url('../assets/img/buyin03.png') no-repeat 3px 0;
	background-size: 7px 7px,1px 8px;
}
.succ_name{
	width:100%;
	font-size: 15px;
	color: #3ca8ee;

	padding-left:25px;

}
.succ_color{
	color:#203542;
}
.succ_time{
	width:100%;
	font-size: 12px;
	color: #acb2b8;
	margin-top: 3px;
	padding-left: 25px;
	padding-bottom: 10px;
}
.prompt_box{
	width:100%;
	color:#acb2b8;
	line-height: 24px;
	font-size: 12px;
	padding: 6px 15px;
}
.prompt_a{
	color:#ff6c39;
	margin-left:4px;
}
.prompt_a:hover{
	color:#ff6c39;
	text-decoration:none;
}
.but_box{
	width:100%;
	overflow:hidden;
	background-color: #f5f5f9;
}
.other_but,.see_but{
	width:35%;
	text-align: center;
	line-height: 36px;
	font-size: 16px;
	float: left;
	margin-left: 8%;
	margin-top: 20px;
	background-color: #ff6c39;
	border-radius: 5px;
	color: #ffffff;
	display: block;
	margin-bottom: 20px;
}
.other_but:hover,.see_but:hover{
	color: #ffffff;
	text-decoration: none;
}
.see_but{
	margin-left:14%;
	background-color: #3ca8ee;
}
</style>
