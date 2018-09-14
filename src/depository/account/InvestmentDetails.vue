<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			{{boxtitle}}
		</div>
		<div class="app_box">
			<img class="max_img" v-if="bid_type == 'buy'" src="../../assets/deposits_img/buyin01.png">
	        <img class="max_img" v-else-if="bid_type == 'withdrawal'" src="../../assets/deposits_img/buyin09.png">
	       <!--  <img class="max_img" v-else-if="bid_type == 'recharge'" src="../../assets/deposits_img/buyin10.png"> -->
	        <div class="max_title">{{title}}</div>
	        <div class="order_num"> 
	        	<div class="order_left">订单号</div>
	        	<span id="orderNum" v-text="uuid">5584 1516 5516 0318 1458</span>
	        </div>
	        <div class="max_bank" v-if="bank_show">
	            <div class="bank_name" v-text="bankName">招商银行</div>
	            <div class="bank_num" v-text="bankCardNo">尾号7895</div>
	            <img class="bank_img" :src="imgSrc">
	        </div>
	        <div class="max_bank" v-else>
	            <div class="bank_name">可用余额账户</div>
	            <div class="bank_num"><span><img src="../../assets/deposits_img/mobile01.png" style='height:15px;'></span>{{mobileId}}</div>
	            
	        </div>
	        
	        <div class="succ_box">
	            <div class="succ_lione succ_width" >
	                <div class="succ_name" id="goument" v-text="amount">成功购买10000.00元</div>
	                <div class="succ_time" id="bidtime" v-text="bidtime">11月11号&nbsp;&nbsp;星期四</div>
	            </div>
	            <div v-show='expectShow'>
	            	<div class="succ_two succ_width" id="succ_show">
		                <div class="succ_name succ_color">预计到账</div>
		                <div class="succ_time">{{bidtimeyu}} <span v-show="expectShow01">(节假日及法定假日顺延)</span></div>
		            </div>
	            </div>
	            <div class="succ_li succ_width" v-show="withdrawal_show">
	                <div class="succ_name succ_color">计算收益</div>
	                <div class="succ_time" v-text="succ_time">11月11号&nbsp;&nbsp;星期四</div>
	            </div>
	            <div class="succ_two succ_width" id="succ_show"  v-show="withdrawal_show">
	                <div class="succ_name succ_color">显示收益</div>
	                <div class="succ_time" v-text="succ_fu">11月11号&nbsp;&nbsp;星期四</div>
	            </div>
	        </div>
	        <div class="but_box">
	            <a class="other_but" @click="otherFun">其他产品</a>
	            <a class="see_but" @click="seeFun">查看资产</a>
	        </div>
	        <div class="succ_into">如有疑问可致电<a class="succ_call" href="tel:4009998381">400-999-8381</a></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
  name: 'coupons',
  data () {
	return {
		boxtitle:'购买结果',
		bid_type : 'buy',
		name : '',
		title:'',
        uuid : '',
        bank_show : true,
        amount : '',
        bidtime : '',
        bidtimeyu : '',
        succ_time : '',
        succ_fu : '',
        bankName : '',
        bankCardNo : '',
        withdrawal_show : true,
        mobileId:'',
        expectShow:false,
        expectShow01:false,
        imgSrc:''
	}   
  },
	watch:{
		
	   
	},
	
	components:{

	},
	methods:{
		returns(){
		  this.$router.go(-1);
		},
        getQueryString(key){
            var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
            var result = window.location.search.substr(1).match(reg);
            return result?decodeURIComponent(result[2]):null;
        },
		otherFun(){
			this.$router.push({path:'/financial'});
		},
		seeFun(){
			this.$router.push({path:'/mywealth'});
		},
		buyFun(){
			var arr = (decodeURIComponent(HC.vueurlFun("beginProfit")).split(" ")[0]).split("-");
            this.bank_show = false;
            this.title = HC.getStorage('financingProjectName');
            this.amount = '成功购买'+HC.vueurlFun("amount")+'元';
            this.bidtime = decodeURI(HC.vueurlFun("timename"));
            this.succ_time = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";
            this.succ_fu = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";
            this.mobileId = HC.vueurlFun("mobileId").substring(0,3)+'****'+ HC.vueurlFun("mobileId").substring(7);
        },
        withdrawalFun(){
            this.bank_show = true;
            this.bankName =  decodeURI(HC.vueurlFun("bankName"));
            var str = HC.vueurlFun("bankCardNo");
            this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
            this.amount = '成功提现'+HC.vueurlFun("amount")+'元';
            //this.bidtime = (decodeURIComponent(HC.vueurlFun("timename"))).split(" ")[0];
            
            var date = new Date();
            var date02 = Date.format(date,"yyyy-MM-dd");
            var arr01 = (decodeURIComponent(HC.vueurlFun("timename"))).split(" ")[0];
            var arr = arr01.split("-");
            var riqian = (arr[2]-0);
            this.bidtime = date02; //提现时间
            this.bidtimeyu = arr[0]+"-"+arr[1]+"-"+riqian; //预计到账时间 arr01
            this.withdrawal_show = false;
            this.expectShow = true;
            this.expectShow01 = true;
            this.title = "存管账户提现";
            this.imgSrc = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
        },
        rechargeFun(){
            this.bank_show = true;
            this.bankName = decodeURI(HC.vueurlFun("bankName"));
            var str = HC.vueurlFun("bankCardNo");
            this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
            this.amount = HC.vueurlFun("amount")+'元充值操作中';
            this.bidtime = decodeURI(HC.vueurlFun("timename"));
            this.bidtimeyu = decodeURI(HC.vueurlFun("timename"));
            this.withdrawal_show = false;
            this.expectShow = true;
            this.title = "存管账户充值";
            this.imgSrc = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
        }
		
	},
	
	created: function () { 

	},
	mounted(){
		this.bid_type = HC.vueurlFun("bidType") || 'buy';
		this.uuid = HC.vueurlFun("uuid") || "45931967718826111913963506881848";
        if(this.bid_type =='buy'){
        	this.boxtitle="购买结果";
            this.buyFun();
        }else if(this.bid_type=='withdrawal'){
        	this.boxtitle="提现结果";
            this.withdrawalFun();
        }else if(this.bid_type=='recharge'){
        	this.boxtitle="充值结果";
            this.rechargeFun();
        }
        
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.returns_box{
	position: absolute;
	top: 0;
	left: 0;
	width:40px;
	height:40px;
	background: url(../../assets/img/back00.png) no-repeat center;
	background-size: 12px;
}
.app_box{
		width:100%;
		overflow:hidden;
		margin-top: 40px;
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
    margin:0 15px;
    overflow: hidden;
    margin-top:15px;
    padding-bottom:15px;
    border-bottom: solid 1px #e5e5e5;
}
.succ_width{
	width: 70%;
	margin: auto;
}
.succ_lione{
    background: url("../../assets/deposits_img/buyin02.png") no-repeat left 6px,url('../../assets/deposits_img/buyin03.png') no-repeat 3px 6px;
    background-size: 7px 7px,1px 100%;
}
.succ_li{
    background: url("../../assets/deposits_img/buyin02.png") no-repeat left 6px,url('../../assets/deposits_img/buyin03.png') no-repeat 3px 0;
    background-size: 7px 7px,1px 100%;
}
.succ_two{
    background: url("../../assets/deposits_img/buyin02.png") no-repeat left 6px,url('../../assets/deposits_img/buyin03.png') no-repeat 3px 0;
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
    margin-top: 5px;
    padding-left: 25px;
    padding-bottom: 10px;
}
.succ_into{
	width:90%;
	line-height:40px;
	color: #acb2b8;
	margin:auto;
	font-size:12px;
	position: fixed;
	bottom: 0;
	left: 25%;
}
.succ_call{
	color: rgb(255,108,57);
}
.succ_call:hover{
	color: #acb2b8;
	text-decoration: none;
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
