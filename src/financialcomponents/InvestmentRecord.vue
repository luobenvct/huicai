<template>
  <div class="investmentrecord">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">投资记录</div>
	</div>
	<div class="top02">
	  <div class="fl">
		<span class="fontSize12">投资人数：</span>
		<span class="color">{{investCount.total}}</span>
		<span class="fontSize12">人</span>
	  </div>
	  <div class="fr">
		<span class="fontSize12">总投资：</span>
		<span class="color" v-if="investCount.payment">{{investCount.payment | num}}</span>
		<span class="color" v-else>0.00</span>
		<span class="fontSize12">元</span>
	  </div>
	</div>
	<div class="line"></div>
	<div class="inves_title">
	  <div class="inves_left">投资人/时间</div>
	  <div class="inves_right">投资金额</div>
	</div>
	
	<!-- start -->
		<div class="page-loadmore" v-if="investCount.total">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="page-loadmore-list">
						<div class="inves_content">
						  <div class="inves_sty" v-for="item in investData">
							<div class="sty_box">
							  <div class="sty_left">
								<div class="sty_name">{{item.mobile | mobile}}</div>
								<div class="sty_time">{{item.to_char}}</div>
							  </div>
							  <div class="sty_num">{{item.buy_amount | num}}</div>
							</div>
						  </div>  
						</div> 
						<div class="list_wu" v-show="isNot">没有更多了</div> 
					</ul>
					<div slot="bottom" class="mint-loadmore-bottom">
						<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
						<span v-show="bottomStatus === 'loading'">
							<mt-spinner type="fading-circle" style="margin:auto;" :size="30"></mt-spinner>
						</span>
					</div>
				</mt-loadmore>
			</div>
		</div>
	<!-- end -->

	<div class="inves_content" v-else>
	  <img src="../assets/img/norecord.png" height="345" width="375">
	</div>

  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
	  userId:"",
	  investData:[],
	  investCount:[],
	  wrapperHeight: 0,     //mint-ui组件上拉刷新字段
	  bottomStatus: '',		//mint-ui组件上拉刷新字段
	  allLoaded: false,		//mint-ui组件上拉刷新字段
	  isNot:false,          //是否显示加载完毕字段
	  page:1
	}
  },
  methods:{
	/*返回--事件*/
	returns(){
	  this.$router.go(-1);
	},
	/*投资记录数据--事件*/
	investment(){
	  //投资记录数据
		axios.post('/api/financing_bid_message.htm', {
			financingTargetId:this.userId,
			page : this.page
		})
		.then(res =>{
			console.log("投资记录数据");
			console.log(res);
			var arrData = eval(res.data.list);
			this.investCount = eval(res.data.amount)[0];
			console.log(arrData) 
			console.log(this.investCount) 
			var _self = this;
			arrData.forEach(function(item) {
			_self.investData.push({"mobile":item.mobile,"to_char":item.to_char,"buy_amount":item.buy_amount})
			})
		})
		.catch(res=> {
			console.log(res);
		});
	},
	/*mint-ui组件上拉刷新--事件*/
	handleBottomChange(status) {
		this.bottomStatus = status;
	},
	/*mint-ui组件上拉刷新--事件*/
	loadBottom() {
		setTimeout(()=> {
			this.page += 1;
			console.log(this.page)
			this.investment();
			this.$refs.loadmore.onBottomLoaded(); 
		}, 1500);
	}
  },
  components:{
	
  },
  computed: {
	
  },
  mounted(){
	this.userId = this.$route.params.userId;
	this.investment();
  },
  filters: {
	num(value) {
	  if(value == parseInt(value)){
		return value + '.00';
	  }else{
		return value
	  }     
	},
	mobile(value){
	  let firstnext =value.substring(0,3);
	  let lastnext=value.substring(value.length-4);
	  let name=firstnext+"****"+lastnext;
	  return name;
	}
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
.color{
	color: #3ca8ee;
}
.line{
	clear: both;
	width: 100%;
	height: 10px;
	background: #f5f5f9;
	margin-top: 80px;
	position: fixed;
	top: 0px;
}
.fontSize12{
	font-size: 12px;
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
.top02{
	width: 96%;
	margin: 0 auto;
	padding:10px 2%;
	position: fixed;
	top: 40px;
	background: #FFF;
	z-index: 4;
}
.inves_title{
	width: 90%;
	overflow: hidden;
	border-bottom: solid 1px #e5e5e5;
	font-size: 12px;
	color:#acb2b8;
	line-height: 40px;
	height: 40px;
	margin: auto;
	margin-top: 86px;
}
.inves_left{
	float: left;
	margin-left: 4px;
}
.inves_right{
	float:right;
	margin-right: 4px;
}
.inves_sty{
	overflow: hidden;
}
.sty_box{
	width:90%;
	overflow: hidden;
	margin: auto;
	border-bottom: solid 1px #e5e5e5;
	height: 67px;
}
.sty_left{
	float: left;
	margin-left: 4px;
}
.sty_name{
	font-size: 16px;
	color: #203542;
	margin-top: 15px;
	margin-bottom: 4px;
}
.sty_time{
	font-size: 10px;
	color: #acb2b8;
}
.sty_num{
	float: right;
	margin-right: 4px;
	line-height: 66px;
	font-size: 16px;
	color:#ff6c39;
}
</style>
