<template>
	<div class="details_box">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">账单详情</div>
		</div>
		

		<!--  -->
		<div id="app" v-cloak>
			<!-- <img :src="imgSrc"> -->
			<div class="max_title" v-text="title">存款账户充值</div>
			<div class="order_num"> 
				<div class="order_left">订单号</div>
				<span id="orderNum" v-text="uuid">5584 1516 5516 0318 1458</span>
			</div>
			<div class="max_bank" v-show="wxpectmoney">
				<div v-if="bankShoe">
                    <div class="bank_name" v-text="bankName">招商银行</div>
                    <div class="bank_num" v-text="bankCardNo">尾号7895</div>
                    <img class="bank_img" :src="imgSrcFu">
                </div>
                <div v-show="!bankShoe">
                    <div class="bank_name">活动奖励</div>
                </div>
			</div>
			<div class="max_bank" v-show="!wxpectmoney" style="padding-bottom:10px;">
				<div class="bank_name">钱包账户</div>
			</div>

			<div class="succ_box">
				<div class="succ_lione succ_width" >
					<div class="succ_name" id="goument" v-text="amount">成功购买10000.00元</div>
					<div class="succ_time" id="bidtime" v-text="bidtime">11月11号&nbsp;&nbsp;星期四</div>
				</div>
				<div v-show="expectShow">
					<div class="succ_two succ_width" id="succ_show">
						<div class="succ_name succ_color">预计到账</div>
						<div class="succ_time" v-text="bidtimeend">11月11号&nbsp;&nbsp;星期四</div>
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
			<div class="succ_into">如有疑问可致电<a class="succ_call" href="tel:4009998381">400-999-8381</a></div>
		</div>
		<!--  -->
	</div>
</template>

<script>
import axios from 'axios'
import store from '../../vuex/store.js'

export default {
	name: 'details_box',
	data () {
		return {
			bid_type : 'buy',
			name : '',
			title:'',
			uuid : '',
			bank_show : true,
			amount : '',
			amount01 : '',
			bidtime : '',
			bidtimeend:'',
			succ_time : '',
			succ_fu : '',
			bankName : '',
			bankCardNo : '',
			withdrawal_show : false,
			mobileId:'',
			expectShow:false,
			imgSrc:'',
			timename:'',
            wxpectmoney : false,
            imgSrcFu : '',
            statusRemark: '',
            bankShoe : true,
            endTime:''
		}
	},
	components:{
		
	},
	computed: {
		
	},
	methods:{
		returns(){
			this.$router.go(-1);
		},
		buyFun : function(){
			var arr = (decodeURIComponent(this.timename)).split(" ")[0].split("-");
            this.bank_show = false;
            this.amount = '成功购买'+this.amount01+'元';
            this.bidtime = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";
            //this.bidtimeend = arr[0]+"年"+arr[1]+"月"+(arr[2]-0+1)+"日";

            var toAccountDate = decodeURIComponent(HC.vueurlFun("toAccountDate"))|| decodeURIComponent(HC.vueurlFun("toBankCardDate"));
            console.log(toAccountDate);

            var endshi = this.splitFun(toAccountDate,1)+'/'+this.splitFun(toAccountDate,2)+'/'+this.splitFun(toAccountDate,0);
            this.bidtimeend =  Date.format(new Date(endshi),"yyyy年MM月dd日");
            this.succ_time = Date.format(new Date(endshi),"yyyy年MM月dd日");
            this.succ_fu = Date.format(new Date(endshi),"yyyy年MM月dd日");

            //this.succ_time = arr[0]+"年"+arr[1]+"月"+(arr[2]-0+1)+"日";
            //this.succ_fu = arr[0]+"年"+arr[1]+"月"+(arr[2]-0+1)+"日";
            this.withdrawal_show = true;
            this.title = decodeURI(HC.vueurlFun("bankName"));
            var str = HC.vueurlFun("bankCardNo");
            this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
            this.expectShow = false;
            this.wxpectmoney = false;
             var toAccountDates = decodeURIComponent(HC.vueurlFun("toAccountDate")) || '';
            if(toAccountDates!=''){
                this.wxpectmoney = true;
                this.title = '普通账户购买';
                this.bankName = decodeURI(HC.vueurlFun("bankName"));
                this.imgSrcFu = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
                if(this.bankName=='null'|| this.bankName == "undefined"){
                    this.bankShoe =false;
                    this.title = '活动奖励';
                    this.amount = '活动奖励'+this.amount01+'元';
                }
            }
            
        },
        splitFun : function(index,num){
            var time = index.split(" ")[0].split("-")
            return time[num];
        },
        withdrawalFun :function(){
        	var arr = (this.timename.split(" ")[0]).split("-");
            var arr02 = (this.endTime.split(" ")[0]).split("-");
            this.bank_show = true;
            this.bankName = decodeURI(HC.vueurlFun("bankName"));
            var str = HC.vueurlFun("bankCardNo");
            this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
            this.amount = '成功提现'+this.amount01+'元';
            this.bidtime = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";;
            //this.bidtimeend = arr[0]+"年"+arr[1]+"月"+(arr[2]-0+1)+"日";
            this.bidtimeend = arr02[0]+"年"+arr02[1]+"月"+(arr02[2])+"日";
            this.withdrawal_show = false;
            this.expectShow = true;
            this.wxpectmoney = true;
            this.title = "存管账户提现";
            this.imgSrcFu = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName)
            var nametype =  HC.vueurlFun("namezhong") || '';
            var toAccountDate = decodeURIComponent(HC.vueurlFun("toAccountDate"))|| '';
            console.log(toAccountDate);

            var endshi = this.splitFun(toAccountDate,1)+'/'+this.splitFun(toAccountDate,2)+'/'+this.splitFun(toAccountDate,0);
            if(toAccountDate!=''){
                if(nametype=="zhong"){
                     this.title = '普通账户提现中';
                    this.amount =this.amount01+'元'+'提现中';
                    this.bidtimeend =  Date.format(new Date(endshi),"yyyy年MM月dd日");
                }else{
                    this.title = '普通账户提现';
                    this.amount ='成功提现'+this.amount01+'元';
                    this.bidtimeend =  Date.format(new Date(endshi),"yyyy年MM月dd日");
                }
               
            }else{
                if(nametype=="zhong"){
                    this.title = "存管账户提现中";
                    this.amount = HC.vueurlFun("amount")+'元'+'提现中';
                }
            }
            this.imgSrcFu = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
           
        },
        rechargeFun : function(){
            this.statusRemark = decodeURI(HC.vueurlFun("statusRemark"));
            if(this.statusRemark == "充值失败"){
                var arr = (this.timename.split(" ")[0]).split("-");
                this.bank_show = true;
                this.bankName = decodeURI(HC.vueurlFun("bankName"));
                var str = HC.vueurlFun("bankCardNo");
                this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
                this.amount = '充值失败';
                this.bidtime = '充值失败';
                this.bidtimeend =  '充值失败';
                this.withdrawal_show = false;
                this.expectShow = true;
                this.wxpectmoney = true;
                this.title = "存管账户充值";
                this.imgSrcFu = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
            }else{
                var arr = (this.timename.split(" ")[0]).split("-");
                this.bank_show = true;
                this.bankName = decodeURI(HC.vueurlFun("bankName"));
                var str = HC.vueurlFun("bankCardNo");
                this.bankCardNo = "尾号"+ str.substring(str.length-4,str.length);
                this.amount = '成功充值'+this.amount01+'元';
                this.bidtime = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";;
                this.bidtimeend = arr[0]+"年"+arr[1]+"月"+(arr[2])+"日";
                this.withdrawal_show = false;
                this.expectShow = true;
                this.wxpectmoney = true;
                this.title = "存管账户充值";
                this.imgSrcFu = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(this.bankName);
            }
        }
	},
	mounted(){
		this.token = HC.getStorage('sessionToken');
		this.bid_type = HC.vueurlFun("bidType") || 'buy';
        this.uuid = HC.vueurlFun("uuid") || "45931967718826111913963506881848";
		/*yym*/
		this.timename = decodeURI(HC.vueurlFun("timename"));
        this.endTime = decodeURI(HC.vueurlFun("timenameend"));
		this.amount01 =HC.vueurlFun("amount");
        if(this.bid_type =='buy'){
        	this.imgSrc = '../../assets/deposits_img/buyin01.png';
            this.buyFun();
        }else if(this.bid_type=='withdrawal'){
        	this.imgSrc = '../../assets/deposits_img/buyin09.png';
            this.withdrawalFun();
        }else if(this.bid_type=='recharge'){
        	this.imgSrc = '../../assets/deposits_img/buyin10.png';
            this.rechargeFun();
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
.line{
	clear: both;
	width: 100%;
	height: 10px;
	background: #f5f5f9;
}
.opacity{
	opacity: 0.8;
	margin-bottom: 3px;
}
.color01{
	color: #acb2b8;
	font-size: 12px;
	margin-bottom: 6px;
}
.color02{
	color: #203542;
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
	font-size: 18px;
	text-align: center;
}
#app{
		width:100%;
		overflow:hidden;
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
        margin-top: 52px;
    }
    .order_num{
        width:100%;
        line-height: 40px;
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
	    text-align:right;
    }
    .max_bank{
        overflow: hidden;
        color:#acb2b8;
        font-size: 12px;
        margin-left: 15px;
        margin-right: 15px;
        border-bottom: solid 1px #e5e5e5;
        padding-bottom: 30px;
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
    }
    .succ_width{
    	width: 70%;
    	margin: auto;
    	padding-bottom:20px;
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
		letter-spacing:1px;
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
    	padding-left:15px;
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
