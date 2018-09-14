<template>
  <div class="coupons">
	<div class="nav_box">
		<div @click="returns" class="returns_box"></div>
		优惠券
		<router-link to="/cseinstructions" class="nav_link">
		  使用说明
		</router-link>
	</div>
	<div class="app_box">
		<div class="page-navbar" v-cloak>
			<mt-navbar class="page-part" v-model="selected" >
				<mt-tab-item id="redPack">红包</mt-tab-item>
				<mt-tab-item id="coupon">加息劵</mt-tab-item>
				<!-- <mt-tab-item id="gold">体验金</mt-tab-item> -->
			</mt-navbar>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="redPack">
					<div v-if="loadingShow" style="margin-top: 200px; text-align: center;">
                        <span>
                            <mt-spinner type="fading-circle" style="margin:60px auto;" :size="30"></mt-spinner>
                        </span>
                        <div style="margin-top: 20px; font-size: 14px;">加载中...</div>
                    </div>
                    <div v-else>
                    	<div class="couponbj_one" v-if="cashcoupon.length == 0"></div>
						<div v-else class="coupon_sty" v-for="item in cashcoupon">
							<div class="sty_left">
								<div class="money_num"><span v-text="item.amount">208</span>元</div>
								<div class="condition_box">满<span v-text="item.minInvestAmount">25000</span>元可用</div>
							</div>
							<div class="sty_right" :class="{coupon_lock:item.blocked}">
								<div class="coupon_title" v-text="item.summary">红包</div>
								<div class="coupon_into">限<span v-text="item.period">180</span>天定期及以上可使用，购买时可抵现金</div>
								<div class="coupon_time">有效期至<span v-text="item.endTimes">2016-12-05</span><div class="due_box" v-if="item.expire">即将到期</div></div>
							</div>
						</div>
                    </div>
					<a class="coupon_a" @click="coupFun">查看历史红包 <img src="../assets/img/hb03.png"></a>
				</mt-tab-container-item>
				<mt-tab-container-item id="coupon">
					<div class="couponbj_one addint_one" v-if="addinterest.length == 0"></div>
					<div class="coupon_sty" v-else v-for="item in addinterest">
						<div class="sty_left sty_two">
							<div class="money_num"><span v-text="item.amount">208</span>%</div>
							<div class="condition_box">满<span v-text="item.minInvestAmount">25000</span>元可用</div>
						</div>
						<div class="sty_right" :class="{coupon_lock:item.blocked}">
							<div class="coupon_title money_two" v-text="item.summary">加息券</div>
							<div v-if="item.showcont" class="coupon_into">仅限<span v-text="item.period">180</span>天定期使用，购买时增加收益</div>
							<div class="coupon_into" v-else-if="item.amount == '3'&& item.showcont == false  " style="margin-bottom: 14px;">限新人惠使用，购买时增加收益</div>
							<div v-else class="coupon_into">限<span v-text="item.period">180</span>天定期及以上可使用，购买时增加收益</div>
							<div class="coupon_time">有效期至<span v-text="item.endTimes">2016-12-05</span><div class="due_box" v-show="item.expire">即将到期</div></div>
						</div>
					</div>
					
					<a class="coupon_a" @click="addFun">查看历史加息券 <img src="../assets/img/hb03.png" height="25" width="12"></a>
				</mt-tab-container-item>
			</mt-tab-container>
		
		</div>
		<!-- <a class="note_box" href="coupon_explain.html">使用说明</a> -->
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
		selected: 'redPack',
		coupondata : {
			app_token :'',
			page : 1,
			limit : 1000,
			usable : true
		},
		loadingShow: true    //显示加载中
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
	couponFun(){
		this.coupondata.app_token = this.token;
		axios.post(this.rootBase+'/coupon/cash/usable/page/1',this.coupondata)
		.then((res)=>{
			console.log("v2红包")
			console.log(res)
			setTimeout(()=>{
                this.loadingShow = false;
            },1000)
			res.data.result.forEach((item)=>{
				/*var condition = eval(item.conditions);
				if(item.name==''||item.name==null){
					item.name = '红包'
				}
				condition.forEach((items)=>{
					item.buy_amount = items.buy_amount;
					item.period = items.period;
				});
				item.expire = this.overdueFun(item.endTime);*/
				item.endTimes = item.endTime.split(" ")[0]
				item.expire = this.overdueFun(item.endTime);
			})
			this.cashcoupon = res.data.result;
		});
		axios.post(this.rootBase+'/coupon/add_interest/usable/page/1',this.coupondata)
		.then((res)=>{
			console.log("v2加息券")
			console.log(res)
			setTimeout(()=>{
                this.loadingShow = false;
            },1500)
			res.data.result.forEach((item)=> {
				/*var condition = eval(item.conditions);
				item.expire = this.overdueFun(item.endTime);
				if(item.name==''||item.name==null){
					item.name = '加息券'
				}
				condition.forEach((items)=>{
					item.buy_amount= items.buy_amount;
					item.period= items.period;
					item.showcont = items.needEqual || false;
				});*/
				item.endTimes = item.endTime.split(" ")[0]
				item.expire = this.overdueFun(item.endTime);
				item.showcont = item.specialPeriod || false;
			})
			this.addinterest = res.data.result;
		})
		
	},
	overdueFun(time){
		var timesplit = time.split("-");
		var timecont = timesplit[1]+"/"+timesplit[0]+"/"+timesplit[2]
		var objtype = Date.daysBetween(new Date(),time);
		//console.log(objtype)
		if(objtype < 3){
			return true;
		}else{
			return false;
		}
	},
	addFun (){
		this.$router.push({ name: 'CouponsHistory', params: { selected: 'coupon'}})
	},
	coupFun(){
		this.$router.push({ name: 'CouponsHistory', params: { selected: 'redPack'}})
	}
  }, 
  created () { 
	//this.token = this.getCookie('sessionToken');
	this.token = HC.getStorage('sessionToken')
	this.couponFun()
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
  overflow: hidden;
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
.nav_link{
	position: absolute;
	top: 0;
	right: 8px;
	font-size: 12px;
	color: #fff;
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
	overflow:hidden;
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
.coupon_lock{
	background:#fff url("../assets/img/lock002.png") no-repeat right top;
	background-size: 60px 52px;
}

</style>
