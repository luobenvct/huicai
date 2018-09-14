<template>
  <div class="coupons">
	<div class="nav_box">
		<div @click="returns" class="returns_box"></div>
		历史优惠券
	</div>
	<div class="app_box">
		<div class="page-navbar" v-cloak>
			<mt-navbar class="page-part" v-model="selected" >
				<mt-tab-item id="redPack" @click.native="couAgain('redPack')">红包</mt-tab-item>
				<mt-tab-item id="coupon" @click.native="couAgain('coupon')">加息劵</mt-tab-item>
				<!-- <mt-tab-item id="gold">体验金</mt-tab-item> -->
			</mt-navbar>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="redPack">
					<div class="page-loadmore">
				        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				                <ul class="page-loadmore-list">
				                	<div style="min-height:300px;">
				                		<div class="couponbj_one" v-if="cashcoupon.length == 0"></div>
				                		<div class="coupon_sty" v-else v-for="item in cashcoupon">
											<div class="sty_left">
												<div class="money_num"><span v-text="item.amount">208</span>元</div>
												<div class="condition_box">满<span v-text="item.buy_amount">25000</span>元可用</div>
											</div>
											<div class="sty_right" :class="item.classname">
												<div class="coupon_title" v-text="item.name">红包</div>
												<div class="coupon_into">限<span v-text="item.period">180</span>天定期及以上可使用，购买时可抵现金</div>
												<div class="coupon_time">有效期至<span v-text="item.endTime">2016-12-05</span></div>
											</div>
										</div>	
										<div style="width:100%;height:30px;"></div>	
										<div class="colse_name" v-show="allcont">没有更多了</div> 
				                	</div>
				                			
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
				</mt-tab-container-item>
				<mt-tab-container-item id="coupon">
					<div class="page-loadmore">
				        <div class="page-loadmore-wrapper" ref="wrappers" :style="{ height: addintHeight + 'px' }">
				            <mt-loadmore :bottom-method="loadaddint" @bottom-status-change="addintleBottomChange" :bottom-all-loaded="allAddint" ref="loadmores">
				                <ul class="page-loadmore-list">
				                	<div style="min-height:300px;">
				                		<div class="couponbj_one addint_one" v-if="addinterest.length == 0"></div>
					                	<div class="coupon_sty" v-else v-for="item in addinterest">
											<div class="sty_left">
												<div class="money_num"><span v-text="item.amount">208</span>%</div>
												<div class="condition_box">满<span v-text="item.buy_amount">25000</span>元可用</div>
											</div>
											<div class="sty_right" :class="item.classname">
												<div class="coupon_title" v-text="item.name">加息券</div>
												<div v-if="item.showcont" class="coupon_into">仅限<span v-text="item.period">180</span>天定期使用，购买时增加收益</div>
												<div class="coupon_into" v-else-if="item.amount == '3'&& item.showcont ==false  " style="margin-bottom: 14px;">限新人惠使用，购买时增加收益</div>
												<div v-else class="coupon_into">限<span v-text="item.period">180</span>天定期及以上可使用，购买时增加收益</div>
												<div class="coupon_time">有效期至<span v-text="item.endTime">2016-12-05</span></div>
											</div>
										</div>
										<div style="width:100%;height:30px;"></div>	
										<div class="colse_name" v-show="addintcont">没有更多了</div>	
									</div>	
				                </ul>
				                <div slot="bottom" class="mint-loadmore-bottom">
					                <span v-show="addintStatus !== 'loading'" :class="{ 'is-rotate': addintStatus === 'drop' }">↑</span>
					                <span v-show="addintStatus === 'loading'">
					                	<mt-spinner type="fading-circle" style="margin:auto;" :size="30"></mt-spinner>
					                </span>
				                </div>
				            </mt-loadmore>
				        </div>
				    </div>
				
					
				</mt-tab-container-item>
			</mt-tab-container>
		
		</div>
		
	</div>
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  name: 'coupons',
  data () {
	return {
		token :"",
		addinterest:[],
		cashcoupon :[],
		selected : 'redPack',
		coupondata : {
			app_token :'',
			page : 1,
			limit : 10,
			usable : false
		},
		addintdata : {
			app_token : '',
			page : 1,
			limit : 10,
			usable : false
		},
		wrapperHeight: 0,
		bottomStatus: '',
		allLoaded: false,
		addintHeight :0,
		addintStatus :'',
		allAddint : false,
		allcont : false,
		addintcont :false
	}
  },
  computed: {
		rootBase(){
			return store.getters.getRootBase
		}
  },
  components:{
	
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	loadGet : function(){
		var selsect = this.$route.params.selected || 'redPack';
		this.selected = selsect;

		console.log(selsect)
		if(selsect=='redPack'){
			this.couponFun();
		}else if(selsect=='coupon'){
			this.addintFun();
		}
	},
	couponFun : function(){
		this.coupondata.app_token = this.token;
		axios.post(this.rootBase+'/coupon/cash/his/page/'+this.coupondata.page,this.coupondata)
		.then((res)=>{
			console.log("v2历史红包")
			console.log(res)
			/**/
			res.data.result.forEach((item)=> {
				item.classname = this.classFun(item.used)
				this.cashcoupon.push({"amount":item.amount,"endTime":item.endTime.split(" ")[0],"classname":item.classname,"buy_amount":item.minInvestAmount,"period":item.period,"name":item.summary});
			});
			if(this.cashcoupon==''){
				this.allLoaded = true; 
			}else if(res.data.result==''&&this.cashcoupon!==''){
				this.allLoaded = true;
				this.allcont = true;
			};
			/**/
			
		})
		
	},
	classFun : function(cont){
		if(cont==false){
			return 'right_bjone';
		}else{
			return 'right_two';
		}
	},
	handleBottomChange :function(status) {
        this.bottomStatus = status;
    },
	loadBottom :function() {
        setTimeout(()=>{
        	this.coupondata.page = this.coupondata.page+1;
        	this.couponFun()
            this.$refs.loadmore.onBottomLoaded();
        }, 1500);
    },	
    addintFun :function(){
    	this.addintdata.app_token = this.token;
		axios.post(this.rootBase+'/coupon/add_interest/usable/page/'+this.addintdata.page,this.addintdata)
		.then((res)=>{
			res.data.result.forEach((item)=> {
				item.showcont = item.specialPeriod || false;
				item.classname = this.classFun(item.used)
				this.addinterest.push({"amount":item.amount,"endTime":item.endTime,"classname":item.classname,"buy_amount":item.minInvestAmount,"period":item.period,"name":item.summary,"showcont":item.showcont});
				console.log(this.addinterest)
			});
			if(this.addinterest==''){
				this.allAddint = true; 
			}else if(res.data.result==''&&this.addinterest!==''){
				this.allAddint = true;
				this.addintcont = true;
			}
		})
    },
    addintleBottomChange  :function(status) {
        this.addintStatus = status;
    },
    loadaddint :function(){
    	setTimeout(()=>{
    		this.addintdata.page = this.addintdata.page+1;
    		this.addintFun()
            this.$refs.loadmores.onBottomLoaded();
        }, 1500);
    },
    couAgain(cont){
    	if(cont=="redPack"){
    		this.allLoaded = false;
    		this.allcont = false;
    		this.cashcoupon = [];
    		this.coupondata.page = 1;
    		this.couponFun();
    	}else if(cont=="coupon"){
    		this.allAddint = false;
    		this.addintcont = false;
    		this.addinterest = [];
    		this.addintdata.page = 1;
    		this.addintFun();
    	}
    }

  }, 
  created: function () { 
  	//this.token = this.getCookie('sessionToken');
  	this.token = HC.getStorage('sessionToken')
	this.loadGet();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
	/*body{
		background: #f5f5f7;
	}*/
</style>
<style scoped>

.coupons{
  width: 100%;
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
	padding:0 ;
	margin:0;
	list-style: none;
}
.app_box{
	width:100%;
	margin-top: 40px;
}
.mint-navbar .mint-tab-item{
	color: #acb2b8;
	padding: 14px 0;
	margin: 0 15px;
}
.mint-navbar .mint-tab-item.is-selected{
	text-decoration: none; 
	border-bottom: 2px solid #26a2ff;
	margin-bottom:0;
	color: #203542;
}
.mint-tab-item-label{
	font-size:16px;
}
.coupon_sty{
	width:94%;
	overflow:hidden;
	margin:auto;
	margin-top: 15px;
}
.sty_left{
	width:32%;
	height:100px;
	float:left;
	overflow:hidden;
	text-align:center;
	background:url('../assets/img/hb01.png') no-repeat center;
	background-size:100% 100%;
	border-radius:5px;
	color:#fff;
}
.sty_two{
	background-image:url('../assets/img/hb04.png');
}
.sty_shree{
	background-image:url('../assets/img/hb05.png');
}
.money_num{
	width:100%;
	font-size:12px;
	margin-top: 18px;
}
.money_num span{
	font-size:30px;
}
.condition_box{
	width:100%;
	font-size:12px;
	margin-top:2px;
}
.sty_right{
	width:68%;
	height:100px;
	float:left;
	overflow:hidden;
	background:url('../assets/img/hb02.png') no-repeat center;
	background-size:100% 100%;
}
.coupon_title{
	width:86%;
	margin:auto;
	font-size:14px;
	line-height:36px;
	height: 36px;
	color:#f96161;
	border-bottom:dashed 1px #ffb4b4;
	padding-left:6px;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;		
	-webkit-box-orient: vertical;
}
.money_two{
	color:#fa9634;
	border-bottom:dashed 1px #fa9634;
}
.money_three{
	color:#6e56e9;
	border-bottom:dashed 1px #6e56e9;
}
.coupon_into{
	width:86%;
	margin:auto;
	font-size:10px;
	color:#acb2b8;
	margin-top:6px;
}
.coupon_time{
	width:86%;
	margin:auto;
	font-size:10px;
	overflow:hidden;
	color:#acb2b8;
	margin-top:2px;
}
.due_box{
	width: 60px;
	background-color: #eee;
	float: right;
	text-align: center;
	font-size: 10px;
	line-height: 18px;
	border-radius: 3px;
}
.coupon_a{
	width:100%;
	text-align:center;
	display:block;
	margin:30px auto;
	color:#acb2b8;
	line-height: 20px;
}
.coupon_a:hover{
	color:#000;
	text-decoration: none;
}
.coupon_a img{
	width: 8px;
	height: 14px;
    vertical-align: middle;
}
.note_box{
	width:24px;
	font-size:12px;
	background-color:red;
	border-radius:4px 0 0 4px;
	color:#fff;
	position:fixed;
	top:0;
	right:0;
	padding: 6px;
	display:blcok;
}
.note_box:hover{
	color:#fff;
	text-decoration: none;
}
.couponbj_one{
	width:58%;
	margin:auto;
	background:url(../assets/img/couponone.png) no-repeat center;
	background-size:70%;	
	height:300px;
}
.addint_one{
	background:url(../assets/img/addintone.png) no-repeat center;
	background-size:80%;
}
.mint-tab-container{
	overflow:visible;
}
.mint-loadmore{
	padding-bottom: 10px;
}
.sty_left{
	background-image:url('../assets/img/hb06.png');
}
.right_bjone{
	background-image:url('../assets/img/hb07.png');
}
.right_two{
	background-image:url('../assets/img/hb08.png');
}
.coupon_title {
	color:#e0e0e0;
	border-color:#e0e0e0;
}
.mint-spinner-fading-circle{
    margin: 10px auto 0;
}
.colse_name{
	width: 100%;
    text-align: center;
    margin-top: 10px;
}


</style>
