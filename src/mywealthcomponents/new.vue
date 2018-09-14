<template>
	<div class="financial">
		<div class="header">理财</div>
		<div class="main">
			<div class="newwapper" v-show="newUser && isNoShow" @click="toDetailsTwo(homeMark)">
				<div class="newInvestor">
					<div class="new01">{{homeMark.name}}</div>
					<div class="new02">
						<div class="new02left fl">
							<div class="newdiv01 fl"><span class="fl" style="display:inline-block; font-size:24px; margin-top:18px;">+</span>{{homeMark.annualizedRates}}</div>
							<div class="newdiv02 fl">
								<div class="newdiv03">%</div>
								<div class="newdiv04">年化</div>
							</div>
						</div>
						<div class="new02right fr">
							<div class="newdiv05">新手特权</div>
							<div class="newdiv06">狂赚<span>{{homeMark.period}}</span>天</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div v-for="item in huoqiData" class="list" @click="changeDetail(item)">
				<div class="title">
					<div class="fl">
						<img src="../assets/img/huoqi_background.png" height="20" width="68">
					</div>
					<div class="title_name01 fl">随存随取， T+1到账</div>
				</div>
				<div class="name">
					<h2 class="name_name01 fl">{{item.name}}</h2>
					<div class="name_name02 fr">{{item.minAmount}}元起投</div>
				</div>
				<div class="content fl">
					<ul>
						<li class="content01">
							<div>
								<span class="span01">{{item.annualizedRates | num}}</span><span class="span02">%</span>
							</div>
							<div class="content01_01">预期年化</div>
						</li>
						<li class="content02">
							<div>{{item.limit}}</div>
							<div class="content02_01" style="color:#ff6c39;">随存随取</div>
						</li>
						<li class="content03">
							<el-progress  type="circle" :percentage="item.percentage"></el-progress>
						</li>
					</ul>
				</div>
			</div> -->
			<div class="title"  v-show="listDataActive.length > 0">
				<div class="fl">
					<img src="../assets/img/dingqi_background.png" height="20" width="68">
				</div>
				<div class="title_name03 fr"><img src="../assets/img/active.png" height="86" width="77"></div>
			</div>
			<div v-for="item in listDataActive" class="list" @click="changeDetail(item)">
				<div class="name">
					<h2 class="name_name01 fl">{{item.name}}</h2> 
					<div class="name_name03 fl" v-if="item.isDepository == true">存管</div>
					 <div class="name_name02 fr">{{item.minAmount}}元起投</div>
				</div>
				<div class="content fl">
					<ul>
						<li class="content01">
							<div>
								<span class="span01">{{item.annualizedRates | num}}</span><span class="span02">%</span>
								<span v-if="item.annualizedRatePlus>0" class="span03">+{{item.annualizedRatePlus | num}}%</span>
							</div>
							<div class="content01_01">预期年化</div>
						</li>
						<li class="content02">
							<div>{{item.period}}天</div>
							<div class="content02_01">理财期限</div>
						</li>
						<li class="content03">
							<el-progress  type="circle" :percentage="item.percentage02"></el-progress>
						</li>
					</ul>
				</div> 
			</div>
			<div class="title" v-show="listDataNoActive.length > 0">
				<div class="fl">
					<img src="../assets/img/nodingqi_background.png" height="20" width="68">
				</div>
				<div class="title_name03 fr"><img src="../assets/img/noactive.png" height="86" width="77"></div>
			</div>
			<div v-for="item in listDataNoActive" class="list" @click="changeDetail(item)">
				<div class="name">
					<h2 class="name_name01 fl">{{item.name}}</h2> 
					<div class="name_name03 fl" v-if="item.isDepository == true">存管</div>
					 <div class="name_name02 fr">{{item.minAmount}}元起投</div>
				</div>
				<div class="content fl">
					<ul>
						<li class="content01">
							<div>
								<span class="span01">{{item.annualizedRates | num}}</span><span class="span02">%</span>
								<span v-if="item.annualizedRatePlus>0" class="span03">+{{item.annualizedRatePlus | num}}%</span>
							</div>
							<div class="content01_01">预期年化</div>
						</li>
						<li class="content02">
							<div>{{item.period}}天</div>
							<div class="content02_01">理财期限</div>
						</li>
						<li class="content03">
							<el-progress  type="circle" :percentage="item.percentage02"></el-progress>
						</li>
					</ul>
				</div> 
			</div> 
			<div class="financial_btn_wrapper">
				<div class="financial_btn" @click="toSoldout">查看更多 (已售罄<span>{{soldoutNum}}</span>个，已还款<span>{{repayNum}}</span>个)</div>
			</div>

		</div>
		<V_Footer></V_Footer>
	</div>
</template>

<script>
	import V_Footer from '../components/Footer.vue'
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'financial',
		data () {
			return {
				homeMark:[],          	//顶部新人惠数据
				huoqiData:[],    	 	//活期数据
				listData:[],		  	//列表数据
				listDataActive:[],    	//列表活动标的数据
				listDataNoActive:[],  	//列表的非活动标的数据
				soldoutNum:0,           //已售罄
				repayNum:0,             //已还款
				newUser:true,			//是否是新手字段
				isNoShow:false,         //头部新人惠数据是否显示字段
				token:''            
			}
		},
		methods:{
			/*到详情页面--事件*/
			changeDetail(item){
				if(item.isDepository === true){
					this.$router.push({ name: 'DepInvestDetail', params: { userId: item.uuid,userName: item.name, soldout:item.soldout, canInvest:item.canInvest}})
				}else{
					this.$router.push({ name: 'InvestDetail', params: { userId: item.uuid,userName: item.name, soldout:item.soldout}})
				}
			},
			/*到已售罄(还款)页面--方法*/
			toSoldout(){
				this.$router.push({ path: '/soldout' })
			},
			/*新人惠到详情页面--方法*/
			toDetailsTwo(homeMark){
				this.$router.push({ path: '/investdetail/'+homeMark.uuid })
			},
			/*截取数字后一位，不足的补位--方法*/
			decimalFun(obj){
				var money = obj.toString().split(".");
				var moneyto = "0"
				if(money[1]==''||money[1]==null){
					moneyto = "0"
				}else{
					moneyto = money[1].substring(0,1)
				}
				return parseFloat(money[0]+"."+ moneyto);
			},
			/*进页面就要执行的方法*/
			dataFn(){
			  //理财惠活宝数据
			  axios.post(this.rootBase+'/open_auth/financing_project/position/ONDEMAND/list', {
			  	limit: 1
			  })
			  .then(res =>{
			  	console.log("v2理财惠活宝数据");
			  	console.log(res);
			  	this.huoqiData = res.data.result;
			  	res.data.result.forEach((item)=>{
			  		item.percentage = this.decimalFun(parseFloat((item.finishAmount/item.collectAmount)*100));
			  		console.log("百分比1")
			  		console.log(item.percentage)
			  	})
			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			  //理财数据列表
			  axios.post(this.rootBase+'/open_auth/financing_project/position/FIXED/list', {
			  	limit: 10,
			  	app_token: this.token
			  })
			  .then(res =>{
			  	console.log("v2理财数据列表");
			  	console.log(res);
			  	this.listData = res.data.result;
			  	res.data.result.forEach((item,index)=>{
			  		item.percentage02 =this.decimalFun(parseFloat((item.finishAmount/item.collectAmount)*100));
			  		if(item.activityProject === true){
			  			this.listDataActive.push(res.data.result[index])
			  		}
			  		if(item.activityProject === false && item.newInvestor === false){
			  			this.listDataNoActive.push(res.data.result[index])
			  		}
			  		if(item.newInvestor === true){
			  			this.homeMark = res.data.result[index];
			  			console.log(this.homeMark)
			  		}
			  		console.log("百分比2")
			  		console.log(item.percentage02)
			  	})
			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			  //已售罄数据
			  axios.post(this.rootBase+'/open_auth/financing_project/out/count', {

			  })
			  .then(res =>{
			  	console.log("已售罄个数");
			  	console.log(res);
			  	this.soldoutNum = res.data.result;

			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			  //已还款个数数据
			  axios.post(this.rootBase+'/open_auth/financing_project/repay/count', {

			  })
			  .then(res =>{
			  	console.log("v2已还款个数");
			  	console.log(res);
			  	this.repayNum = res.data.result;

			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			  /*新人惠购买 是否是新人*/
			  axios.post(this.rootBase+'/user/is_new_investor', {
				token: this.token
			  })
			  .then(res =>{
				console.log("v2测试是否是新用户")
				console.log(res)
				if(res.data.result== false){
				  this.newUser = false;
				}
				if(res.data.result == true){
				  this.newUser = true;
				  this.isNoShow = true;
				} 
				if(res.data.code == "TOKEN_ERROR"){
				  this.newUser = true;
				  this.isNoShow = true;
				} 
			  })
			  .catch(res=> {
				console.log(res);
			  });
			}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		components:{
			V_Footer
		},
		mounted(){
			this.token = HC.getStorage('sessionToken');
			this.dataFn()
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
	.el-progress-circle .el-progress__text{
		color: #ff6c39 !important;
	}
	.el-progress-circle__track{
		stroke: #feeee3 !important;
	}
	.el-progress-circle__path{
		/*stroke: #ff6c39 !important;*/
		stroke: #000 !important;
		stroke-width:3 !important;
	}
</style>
<style scoped>
	li{
		list-style: none;
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
		margin-bottom: 40px;
	}
	.name{
		clear: both;
		margin-left: 10px;
		margin-top: 10px;
	}
	.name .name_name01{
		font-weight: 600;
		font-size: 14px;
		margin-right: 4px;
		color: #203542;
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
		background: #ffe7d7;
		color: #ff6c39;
		font-size: 12px;
		border-radius: 3px;
	}
	.newwapper{
		background: #FFF;
	}
	.newInvestor{
		width: 92%;
		height: 100px;
		margin: 0 auto;
		border-radius: 6px;
		background: url("../assets/img/newInvestor.png") no-repeat center;
		background-size: 100% 100%;
		color: #FFF;
		margin-top: 60px;
		padding-top: 8px;
		padding-bottom: 24px;
	}
	.new01{
		border-left: 2px solid #FFF;
		margin-left: 12px;
		font-size: 14px;
		margin-bottom: 10px;
		padding-left: 6px;
	}
	.new02{

	}
	.new02left{
		width: 50%;
		border-right: 1px solid rgba(255,255,255,0.6);
		padding-bottom: 8px;
		padding-top: 8px;
	}
	.new02right{
		width: 42%;
		margin-left: 5%;
		padding-top: 6px;
		letter-spacing: 10px;
		font-size: 18px;
	}
	.newdiv01{
		font-size: 47px;
		margin-left: 16%;
	}
	.newdiv02{
		margin-top: 4px;
		font-size: 12px;
	}
	.newdiv03{
		font-size: 22px;
	}
	.newdiv05{
		clear: both;
		margin-top: 8px;
		font-size: 20px;
	}
	.newdiv06{
		clear: both;
		font-size: 20px;
	}
	.newdiv06 span{
		font-size: 20px;
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
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding-top: 10px;
		background: #FFF;
	}
	.title .title_name01{
		margin-right: 20px;
		margin-left: 10px;
		font-size: 12px;
		color: #acb2b8;
	}
	.title .title_name02{
		margin-left: 10px;
		font-size: 12px;
		color: #c9cdd1;
	}
	.title .title_name03{
		margin-top: -13px;
		width: 39px;
	}
	.title .title_name03 img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.content{
		clear: both;
		width: 100%;
		margin: 5px 0;
	}
	.content ul li{
		float: left;
	}
	.content .content01{
		margin-left: 3%;
		margin-right: 0%;
		color: #acb2b8;
		width: 41%;
	}
	.content .content01 .content01_01{
		font-size: 12px;
	} 
	.content .content02 .content02_01{
		margin-top: 4px;
		font-size: 12px;
		color: #acb2b8;
	} 
	.content .content01 .span01{
		color: #ff6c39;
		font-size: 34px;
	}
	.content .content01 .span02{
		color: #ff6c39;
		font-size: 12px;
	}
	.content .content01 .span03{
		color: #f8a900;
		font-size: 14px;
	}
	.content .content02{
		text-align: center;
		margin-right: 1%;
		margin-top: 20px;
		margin-left: 4%;
	}
	.content .content02 div{
		font-size: 16px;
	}
	.content .content03{
		text-align: center;
		width: 20%;
		float: right;
		margin-right: 4%;
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
		height: 32px;
		text-align: center;
		line-height: 32px;
		border:1px solid #CCC;
		border-radius: 8px;
		margin: 0 auto;
		font-size: 14px;
		color: #CCC;
	}

	/*新手引导*/
	.black{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		z-index: 2;
	}
	.newNovice{
		position: fixed;
		z-index: 3;
		top: 0;
		left: 2%;
	}
	.header_new{
		width: 108%;
		padding: 11px 0;
		overflow: hidden;
		/*background: #3ca8ee;*/
	}
	.header_new .head_item01{
		float: left;
		margin-left: 2%;
		width: 22px;
		height: 20px;
		background: url('../assets/img/login.png') no-repeat;
		background-size: 100% 100%;
	}
</style>
