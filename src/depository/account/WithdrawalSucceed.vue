<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			提现结果
		</div>
		<div class="app_box">
			<img class="max_img" v-if="!wihdrawalShow" src="../../assets/deposits_img/buyin100000.png">
            <img class="max_img" v-else src="../../assets/deposits_img/buyin09.png">
            <div class="max_title"></div>
            <div class="order_num"> 
                <div class="order_left">订单号</div>
                <span id="orderNum">{{items.orderNo}}</span>
            </div>
            <div class="max_bank">
                <div class="bank_name">{{items.bankName}}</div>
                <div class="bank_num" >尾号{{items.bankCardNos}}</div>
                <img class="bank_img" :src="items.imgSrcFn">
            </div>
            <div class="succ_box">
                <div class="succ_lione succ_width" >
                    <div class="succ_name" id="goument">{{items.amountName}}</div>
                    <div class="succ_time" id="bidtime">{{items.gmtCreates}}</div>
                </div>
                <div class="succ_two succ_width" id="succ_show">
                    <div class="succ_name succ_color">预计到账</div>
                    <div class="succ_time">{{items.expectedTimes}} <span>(具体到账时间视银行而定)</span></div>
                </div>
            </div>
            <div class="but_box">
                <a class="other_but"  @click="otherFun">其他产品</a>
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
    		items:[],
            wihdrawalShow : false,
            detailsUuid : '',
            token : ''
    	}   
    },
	watch:{
		
	   
	},
	
	components:{

	},
	methods:{
		returns(){
		  this.$router.push({path:'/mywealth'});
		},
        otherFun(){
            this.$router.push({path:'/financial'});
        },
        seeFun(){
            this.$router.push({path:'/mywealth'});
        },
        withdrawalFun :function(){
            axios.post('/api/v2/account/depository/withdraw/details',{
                app_token : this.token,
                detailsUuid : this.detailsUuid
            })
            .then(res=>{
                if(res.data.code=="SUCCESS"){
                    res.data.result.gmtCreates = res.data.result.gmtCreate.split(" ")[0];
                    res.data.result.expectedTimes = res.data.result.expectedTime.split(" ")[0];
                    res.data.result.bankCardNos = res.data.result.bankCardNo.substring(res.data.result.bankCardNo.length-4);
                    res.data.result.imgSrcFn = 'https://static.88huicai.com/huicai/image/bank/card/' + HC.imgFun(res.data.result.bankName);
                    if(res.data.result.status=="U"){
                        this.wihdrawalShow = false;
                        res.data.result.amountName = res.data.result.amount+"元提现中";
                    }else if(res.data.result.status=="S"){
                        this.wihdrawalShow = true;
                        res.data.result.amountName = "成功提现"+res.data.result.amount+"元";
                    }
                    this.items = res.data.result;
                }else if(res.data.code=="TOKEN_ERROR"){
                    this.$toast('用户信息失效')
                }else{
                    this.$toast(res.data.msg)
                }
            })

        }
	},
	
	created: function () { 

	},
	mounted(){
        //this.token = HC.vueurlFun("app_token") || '';
        this.token = HC.getStorage('sessionToken');
		this.detailsUuid = HC.vueurlFun("detailsUuid") || '';
		this.withdrawalFun();
        
		
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
        background: url("../../assets/img/buyin02.png") no-repeat left 6px,url('../../assets/img/buyin03.png') no-repeat 3px 6px;
        background-size: 7px 7px,1px 100%;
    }
    .succ_li{
        background: url("../../assets/img/buyin02.png") no-repeat left 6px,url('../../assets/img/buyin03.png') no-repeat 3px 0;
        background-size: 7px 7px,1px 100%;
    }
    .succ_two{
        background: url("../../assets/img/buyin02.png") no-repeat left 6px,url('../../assets/img/buyin03.png') no-repeat 3px 0;
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
