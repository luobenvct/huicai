<template>
	<div class="financial">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl" :class="{curActive:curActive}" @click="changeActive">已售罄</div>
			<div class="line"></div>
			<div class="name fl" :class="{curActive:!curActive}" @click="changeActiveTwo">已还款</div>
		</div>

		<!--  -->
		<div class="page-loadmore">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="page-loadmore-list">
						<!--  -->
						<div class="main" v-show="curActive">
							<div v-for="item in soldoutData" class="list listout" @click="changeDetail(item)">
								<div class="name">
									<h2 class="name_name01 fl">{{item.name}}</h2>
									<div class="name_name02 fr">{{item.minAmount}}元起投</div>
								</div>
								<div class="content fl">
									<ul>
										<li class="content01">
											<div><span class="span01">{{item.annualizedRates | num}}</span><span class="span02">%</span></div>
											<div class="content01_01">预期年化</div>
										</li>
										<li class="content02">
											<div v-if="item.type == 'SCB' ">随存随取</div>
											<div v-else>{{item.period}}天</div>
											<div v-if="item.type == 'SCB' "></div>
											<div v-else class="content02_01">理财期限</div>
										</li>
										<li class="content03">
											<img src="../assets/img/yishouqing.png" height="70" width="70">
										</li>
									</ul>
								</div> 
							</div>
						</div>
						<!--  -->
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
		<!--  -->
		<!--  -->
		<div class="page-loadmore">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeightTwo + 'px' }">
				<mt-loadmore :bottom-method="loadBottom02" @bottom-status-change="handleBottomChange02" :bottom-all-loaded="allLoaded" ref="loadmore02">
					<ul class="page-loadmore-list">
						<!--  -->
						<div class="main" v-show="!curActive">
							<div v-if="repayData.length == 0" class="norepay">
								正在火热销售中...
							</div>
							<div v-else v-for="item in repayData" class="list listout" @click="changeDetail(item)">
								<div class="name">
									<h2 class="name_name01 fl">{{item.name}}</h2>
									<div class="name_name02 fr">{{item.minAmount}}元起投</div>
								</div>
								<div class="content fl">
									<ul>
										<li class="content01">
											<div><span class="span01">{{item.annualizedRates | num}}</span><span class="span02">%</span></div>
											<div class="content01_01">预期年化</div>
										</li>
										<li class="content02">
											<div>{{item.period}}天</div>
											<div class="content02_01">理财期限</div>
										</li>
										<li class="content03">
											<img src="../assets/img/yihuankuan.png" height="70" width="70">
										</li>
									</ul>
								</div> 
							</div>
						</div>    
						<!--  -->
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
		<!--  -->
	</div>
</template>

<script>
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'financial',
		data () {
			return {
				wrapperHeight: 0, 			//mint-ui组件上拉刷新字段
		        bottomStatus: '',			//mint-ui组件上拉刷新字段
		        allLoaded: false,			//mint-ui组件上拉刷新字段
		        wrapperHeightTwo: 0,		//mint-ui组件上拉刷新字段
		        bottomStatusTwo: '',		//mint-ui组件上拉刷新字段
		        allLoadedTwo: false,		//mint-ui组件上拉刷新字段
				huoqiData:[],
				listData:[],
				soldoutData:[],
				repayData:[],
				curActive:true,
				num:1,
				numTwo:1
			}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		methods:{
			/*到投资详情页面--事件*/
			changeDetail(item){
				console.log(item.id);
				console.log(item.name);
				console.log(item.soldout);
				this.$router.push({ name: 'InvestDetail', params: { userId: item.id,userName: item.name, soldout:item.soldout}})
			},
			/*返回--事件*/
			returns(){
				this.$router.go(-1);
			},
			/*查看已售罄(改变curActive字段)--方法*/
			changeActive(){
				this.curActive = true
			},
			/*查看已还款(改变curActive字段)--方法*/
			changeActiveTwo(){
				this.curActive = false
			},
			/*mint-ui组件上拉刷新--事件*/
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			/*mint-ui组件上拉刷新--事件*/
			loadBottom() {
				setTimeout(()=>{
					this.num += 1;
					this.dataFn()
					this.$refs.loadmore.onBottomLoaded(); 
				}, 1500);
			},
			/*mint-ui组件上拉刷新--事件*/
			handleBottomChange02(status) {
				this.bottomStatus = status;
			},
			/*mint-ui组件上拉刷新--事件*/
			loadBottom02() {
				setTimeout(()=>{
					this.numTwo += 1;
					this.dataTwoFn()
					this.$refs.loadmore02.onBottomLoaded(); 
				}, 1500);
			},
			/*进页面就要执行的方法*/
			dataFn(){
				  //已售罄数据
				  axios.post('/api/v2/open_auth/financing_project/out/page/'+this.num, {
				  	limit: 10
				  })
				  .then(res =>{
				  	console.log("已售罄数据");
				  	console.log(res);
				  	//this.soldoutData = res.data.result;
				  	res.data.result.forEach((item)=>{
				  		item.soldout = 'soldout';
				  		this.soldoutData.push({"name":item.name,"minAmount":item.minAmount,"annualizedRates":item.annualizedRates,"period":item.period,"id":item.uuid,"soldout":item.soldout})
				  	})   
				  })
				  .catch(res=> {
				  	console.log(res);
				  });
			},
			/*进页面就要执行的方法--Two*/
			dataTwoFn(){
				//已还款数据
				  axios.post('/api/v2//open_auth/financing_project/repay/page/'+this.numTwo, {
				  	limit: 10
				  })
				  .then(res =>{
				  	console.log("已还款数据");
				  	console.log(res);
				  	//this.repayData = res.data.result;
				  	res.data.result.forEach((item)=>{
				  		item.soldout = 'payback';
				  		this.repayData.push({"name":item.name,"minAmount":item.minAmount,"annualizedRates":item.annualizedRates,"period":item.period,"id":item.uuid,"soldout":item.soldout})
				  	}) 
				  })
				  .catch(res=> {
				  	console.log(res);
				  });
			}
		},
		components:{
			
		},
		mounted(){
			this.dataFn();
			this.dataTwoFn();
		},
		filters: {
			num(value) {
				if(value == parseInt(value)){
					return value + '.0';
				}else{
					return value
				}     
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.el-progress-circle{
		height: 58px !important;
		width: 60px !important;
	}
	.el-progress__text{
		color: red !important;
	}
	.el-progress-circle__path{
		stroke: red !important;
		stroke-width:3 !important;
	}
</style>
<style scoped>
	li{
		list-style: none;
	}
	.line{
		width: 2px;
		height: 16px;
		background: #FFF;
		float: left;
		margin-top: 12px;
		margin-left: 10px;
	}
	.financial{
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
		padding: 7px 0;
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
		margin-right: 30%;
		margin-top: 8px;
	}
	.header{
		position: fixed;
		top: 0;
		width: 100%;
		padding: 10px 0;
		background: #3ca8ee;
		text-align: center;
		color: #FFF;
		z-index: 2;
	}
	.main{
		margin-top: 40px;
		clear: both;
		background: #f5f5f9;
	}
	.name{
		margin-left: 10px;
		margin-top: 12px;
		font-size: 12px;
		opacity: 0.6;
	}
	.curActive{
		margin-top: 8px;
		font-size: 16px;
		opacity: 1;
	}
	.name .name_name02{
		margin-right: 24px;
		font-size: 12px;
	}
	.name .name_name03{
		width: 32px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		background: #CCC;
		color: red;
		font-size: 12px;
		border-radius: 3px;
	}
	.list{
		width: 100%;
		overflow: hidden;
		background: #FFF;
		margin-bottom: 12px;
		padding-top: 6px;
		padding-bottom: 10px;
	}
	.title{
		clear: both;
		margin-top: 10px;
		height: 30px;
		border-bottom: 1px solid #CCC;
		padding-top: 10px;
		background: #FFF;
	}
	.title .title_name01{
		margin-right: 20px;
		margin-left: 10px;
		font-size: 12px;
	}
	.title .title_name02{
		margin-left: 10px;
		font-size: 12px;
		color: #c9cdd1;
	}
	.content{
		clear: both;
		width: 100%;
		margin: 5px 0;
	}
	.content ul li{
		float: left;
		width: 25%;
	}
	.content .content01{
		margin-left: 4%;
		margin-right: 10%;
	}
	.content .content01 .content01_01{
		font-size: 12px;
	} 
	.content .content02 div{
		font-size: 16px;
	}
	.content .content02 .content02_01{
		margin-top: 4px;
		font-size: 12px;
	} 
	.content .content01 .span01{
		color: red;
		font-size: 36px;
	}
	.content .content01 .span02{
		color: red;
		font-size: 12px;
	}
	.content .content02{
		text-align: center;
		margin-right: 10%;
		margin-top: 14px;
	}
	.content .content03{
		text-align: center;
	}
	.listout{
		color: #CCC;
	}
	.listout .content .content01 .span01{
		color:#CCC;
		font-size: 32px;
	}
	.listout .content .content01 .span02{
		color:#CCC;
		font-size: 12px;
	}
	.financial_btn_wrapper{
		background: #f5f5f9;
		padding-bottom: 24px;
	}
	.financial_btn{
		width: 80%;
		height: 24px;
		text-align: center;
		line-height: 24px;
		border:1px solid #CCC;
		border-radius: 12px;
		margin: 0 auto;
		font-size: 12px;
	}
	.norepay{
		width: 100%;
		text-align: center;
		height: 520px;
		line-height: 520px;
		background: #FFF;
		color: #CCC;
	}
</style>
