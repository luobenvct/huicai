<template>
	<div class="repay">
		<div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            标的到期列表
        </div>
		<div class="page-loadmore">
	        <div class="page-loadmore-wrapper" ref="wrapper">
	            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
	                <ul class="page-loadmore-list" >
						<div class="else" v-if="items.length == 0"></div>
	                  	<div v-else class="max_box" v-for="item in items">
							<div class="month_box" v-text="item.yearname"></div>
							<div class="regu_sty" v-for="itee in item.contlist">
								<div class="time_box">
									<div class="time_left mark_font" v-text="itee.targetName"></div>
									<div class="time_left interest">{{itee.targetAnnualizedRates}}%</div>
									<div class="time_left deposit" v-if="itee.payMark === '存管账户'">存管</div>
								</div>
								<div class="time_box border_box">
									<div class="time_left commonColor">购买金额</div>
									<div class="time_right commonColor">本金<span class="money_font" v-text="itee.buyAmount"></span>元</div>
								</div>
								<div class="time_box02">
									<div class="time_left commonColor">使用券包</div>
									<div class="time_right commonColor" v-if="itee.cashCouponAmount >0 "> <span  v-if="itee.annualizedRatePlus > 0">+</span> 红包<span style="color:#ff6c39;"> {{itee.cashCouponAmount}}元</span></div>
									<div class="time_right commonColor" v-if="itee.addInterest > 0"> <span  v-if="itee.annualizedRatePlus > 0">+</span> 加息券<span style="color:#ff6c39;"> {{itee.addInterest}}%</span></div>
									<div class="time_right commonColor"  v-if="itee.annualizedRatePlus > 0">加息<span style="color:#ff6c39;"> {{itee.annualizedRatePlus}}%</span></div>
									<div class="time_right commonColor" v-show="itee.couponHide">无</div>
								</div>
								<div class="time_box02" style="padding-top:4px;">
									<div class="time_left commonColor">购买日期:{{itee.gmtCreate}} ({{itee.period}}天)</div>
									<div class="time_right commonColor"  v-if="itee.bankName == '存管账户'">存管账户</div>
									<div class="time_right commonColor"  v-else>普通账户</div>
									<div class="time_right imgSrc" v-if="itee.bankName == '存管账户'">
										<img src="../../assets/deposits_img/depositbank01.png">
									</div>
									<div class="time_right imgSrc02" v-else>
										<img src="../../assets/deposits_img/depositbank02.png">
									</div>
									
								</div>
								<div class="time_box02">
									<div class="time_left commonColor" v-if="itee.toAccountDate">预计到账日期:{{(itee.toAccountDate).split(" ")[0]}}</div>
									<div class="time_left commonColor" v-else>满标计息</div>
									<div class="time_right zhuangtai">{{itee.state}}</div>
								</div>
							</div>
						</div>
						<div class="list_wu" v-show="list_wu">没有更多了</div>	
						<div class="into_box">如有疑问可致电<a class="into_a" href="tel:4009998381">400-999-8381</a></div>				
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
	</div>
</template>

<script>
	import axios from 'axios'
	import store from '../../vuex/store.js'

	export default {
		data () {
			return {
				items : [],
				ulstyle:false,
				token:'',
				page:1,
				bottomStatus: '',
				allLoaded: false,
				list_wu: false,
				yearlist : [],
				selectShows: false,  //控制刷选显示
				loadingShow: true    //显示加载中
			}   
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			handleBottomChange(status) {
	            this.bottomStatus = status;
	        },
			loadBottom() {
				setTimeout(()=>{
					this.page = this.page+1;
	            	this.dataFn()
		            this.$refs.loadmore.onBottomLoaded();
				}, 1500);
	        },	
	        selectShow(){
	        	this.selectShows = true;
	        },
	        choose(item){
	        	this.selectShows = false;
	        },
			dataFn(){
				axios.post('/api/v2/financing_project_bid/due_bid/page/'+this.page, {
		  			app_token:this.token,
		  			page: this.page,
		  			limit:6
				})
				.then(res =>{
				  	console.log("存管+到期标的列表");
				  	console.log(res)
				  	this.loadingShow = false;
				  	var date = new Date;
						var month = date.getMonth()+1;
						console.log(month);
						if(res.data.result ==''|| res.data.result == null){
							this.allLoaded = true;
							if(this.items.length!==0){
								this.list_wu = true;
							}
							
							return;
						}
						res.data.result.forEach((item)=> {
							var year = 	this.splitFun(item.payTime,1); 
							if(item.addInterestAmount== 0 &&item.cashCouponAmount== 0 &&item.targetAnnualizedRatesPlus== 0){
								item.couponHide = true;
							}else{
								item.couponHide = false;
							}
						    //console.log(timenum)
						    if(item.endProfit==''||item.endProfit==null){
								item.endProfit = ''
							}else{
								item.endProfit = this.timeFun(item.endProfit);
							}
							if(item.state=="WAITING"||item.state=="LEND_PAYING"||item.state=="LEND_PAY"||item.state=="INCOME"||item.state=="TRANSFER"||item.state=="EXPIRED"){
								item.states ="购买成功"
							}else if(item.state=="REPAYING"){
								item.states ="回款中"	
							}else if(item.state=="REPAY"||item.state=="COMPLETING"||item.state=="REVOKE"||item.state=="COMPLETE"){
								item.states ="回款成功"	
							}
							item.principalAndInterest = HC.decimalFun(item.buyAmount+item.profit);
							item.imgSrc = "https://static.88huicai.com/huicai/image/bank/card/" + HC.imgFun(item.bankName);
							if (this.yearlist.indexOf(year) == -1){
								this.yearlist.push(year);
								this.items.push({"yearname":year+"月","contlist":[]})
							}
							var listnum = this.yearlist.indexOf(year);
							item.targetAnnualizedRateson =  HC.decimalFun(item.targetAnnualizedRates)
							this.items[listnum].contlist.push({"imgSrc":item.imgSrc,"state":item.states,"targetName":item.targetName,"buyAmount":HC.decimalFun(item.buyAmount),"bankName":item.bankName,"gmtCreate":this.timeFun(item.payTime),"period":item.period,"endProfit":item.endProfit,"cashCouponAmount":item.cashCouponAmount,"addInterest":item.addInterestAmount,"annualizedRatePlus":item.targetAnnualizedRatesPlus,"targetAnnualizedRates":item.targetAnnualizedRateson,"payMark":item.payMark,"couponHide":item.couponHide,"toAccountDate":item.toAccountDate})
						});
				})
				.catch(res=> {
				  	console.log(res);
				});

				
			},
			splitFun(index,num){
				var time = index.split(" ")[0].split("-")
				return time[num];
			},
			showFun(index){
				if(index==''){
					return false;
				}else{
					return true;
				}
				
			},
			change(item,index){
				this.lists.forEach(function(item){
					item.show = false;
				})
				this.lists[index].show=true;
				this.list_wu = false;
				this.items = [];
				this.yearlist =[];
				this.record.status = item.status;
				this.page = 1;
				this.loadingShow = true;
				this.dataFn()
				this.ulstyle = false;
				this.allLoaded = false;
			},
			show(){
				this.ulstyle = !this.ulstyle;
			},
			timeFun(time){
				var year = time.split(" ");
				return year[0];
			},
			blackFun(){
				this.ulstyle = false;
			}
		},
		filters :{
			money (val){
				var moneynum = val/10000;
				return moneynum;
			}
		},
		mounted(){
			this.token = HC.getStorage('sessionToken');
			this.dataFn();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.repay{
	    width: 100%;
	    overflow: hidden;
	    /*background-color: #f5f5f9;
	    height: 100%;
	    position: absolute;
		overflow-y: scroll;*/
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
		font-size: 16px;
	}

	.returns_box{
		position: absolute;
		top: 0;
		left: 0;
		width:40px;
		height:40px;
		background: url(../../assets/img/back00.png) no-repeat center;
		background-size: 12px;
	}
	.into_box{
		width:100%;
		margin-top: 12px;/*
		border-bottom: solid 1px #e5e5e5;*/
		color:#acb2b8;
		font-size: 12px !important;
		line-height: 20px;
		/*background: url(../../assets/img/buyin02.png) no-repeat 20px 22px;*/
		background-size: 6px;
		margin-top: 40px;
	}
	body{
		background-color:#f5f5f9;
	}
	*{   
	    -webkit-touch-callout:none;   
	    -webkit-user-select:none; 
	    -khtml-user-select:none;    
	    -moz-user-select:none;  
	    -ms-user-select:none;  
	    user-select:none;   
	}  
    input{
    	outline:none;
    	-webkit-user-select:auto;  
    }
	[v-cloak]{
		display:none;
	}
	ul,li{
		padding:0;
		margin:0;
		list-style: none;
	}
	#app{
		width:100%;
	   
	}
	.max_box{
		width:100%;
		overflow:hidden;
		margin-top: 42px;
	}
	.month_box{
		width:100%;
		padding-left:15px;
		margin-top: 10px;
	}
	.regu_sty{
		width:100%;
		overflow:hidden;
		padding:10px 15px;
	    margin-top: 10px;
	    background-color:#fff;
	}
	.time_box{
		width:94%;
		overflow:hidden;
		line-height:30px;
		font-size:12px;
	}
	.time_box02{
		width:94%;
		overflow:hidden;
		margin-top:4px;
		font-size:12px;
	}
	.time_left{
		float:left;
	}
	.time_right{
		float:right;
		margin-left: 4px;
	}
	.commonColor{
		color:#acb2b8;
	}
	.zhuangtai{
		color:#3ca8ee;
		font-size:12px;
	}
	.mark_font{
		font-size:16px;
	}
	.money_font{
		font-size:16px;
		font-weight:bold;
		color:#ff6c39;
	}
	.into_box{
		line-height:40px;
		text-align:center;
		width:100%;
		color:#acb2b8;
		margin-top:20px;
	}
	.into_a{
		color:#ff6c39;
		margin-left:6px;
	}
	.into_a:hover{
		color: #ff6c39;
	    text-decoration: none;
	}
	.top{
		width: 50px;
	    height: 24px;
	    line-height: 22px;
	    color: #3ca8ee;
	    text-align: center;
	    border-radius: 4px;
	    font-size: 14px;
	    position: fixed;
	    top: 7px;
	    right: 10px;
	    border: solid 1px #3ca8ee;
	}
	
	.img{
		display:inline-block;
		width: 18px;
	    height: 18px;
	    margin-right: 6px;
	}
	.border_box{
		border-bottom:solid 1px #e5e5e5;
		padding-bottom: 6px;
	}
	.mint-spinner-fading-circle{
		margin:auto;
	}
	.list_wu{
		width:100%;
		text-align:center;
		font-size:12px;
	    color: #acb2b8;
	    margin-top:10px;	
	}
	.else{
		width:100%;
		height: 396px;
		background:url("../../assets/deposits_img/dingqi02.png") center no-repeat;
		background-size: 46%;
		overflow:hidden;
	}
	.page-loadmore-list{
		
	}
	.ul_title{
		position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    text-align: center;
	    color: #203542;
	    background: #FFF;
	    z-index: 100;
		display:none;
	}
	.ul_title li{
	    width: 25%;
	    float: left;
	    line-height: 30px;
	    color: #b1b6ba;
	    margin: 8px 0;
	}
	
	.ul01{
		display:block;
	}
	.ul_title .bj_color{
		color: #3ca8ee;
	}
	.bj_border{
		border-right: solid 1px #e1e2e4;
	}
	.bj_border01{
		border-left: solid 1px #e1e2e4;
	}
	/* yinyimin */
	.interest{
		width:50px;
		height:18px;
		line-height:18px;
		text-align:center;
		margin-top:4px;
		background:url("../../assets/deposits_img/deposits01.png") center no-repeat;
		background-size: 100% 100%;
		margin-left:4px;
		color:#ff6c39;
	}
	.deposit{
		width:40px;
		height:18px;
		line-height:18px;
		text-align:center;
		border:1px solid rgb(60,168,238);
		margin-left:4px;
		margin-top:4px;
		color:rgb(60,168,238);
		border-radius: 2px;
	}
	.black{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		background-color:#000;
		opacity: 0.4;
		z-index:99;
	}
	.loading{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		background-color:#000;
		z-index:98;
		color:#FFF;
		text-align:center;
		line-height:500px;
	}
	.more{
		width:100%;
		text-align:center;
		margin-top:20px;
	}
	.moreIcon{
		width:100%;
		text-align:center;
		margin-top:10px;
	}
	.imgSrc{
		width:16px;
		margin-top:1px;
	}
	.imgSrc02{
		width:8px;
		margin-top:1px;
	}
	.imgSrc img{
		width:100%;
	}
	.imgSrc02 img{
		width:100%;
	}
</style>
