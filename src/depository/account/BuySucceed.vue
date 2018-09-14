<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			购买结果
		</div>
		<div class="app_box">
			<img class="max_img" src="../../assets/deposits_img/buyin01.png">
            <div class="max_title">{{items.projectName}}</div>
            <div class="order_num"> 
                <div class="order_left">订单号</div>
                <span id="orderNum">{{items.uuid}}</span>
            </div>
            <div class="max_bank">
                <div class="bank_name">存管账户</div>
                <!-- <div class="bank_num"><span><img src="../../assets/deposits_img/mobile01.png" style='height:15px;'></span>{{items.mobiles}}</div> -->
                
            </div>
            
            <div class="succ_box">
                <div class="succ_lione succ_width" >
                    <div class="succ_name" id="goument">成功购买{{items.buyAmount}}元</div>
                    <div class="succ_time" id="bidtime">{{items.gmtCreates}}</div>
                </div>
                <div class="succ_li succ_width">
                    <div class="succ_name succ_color">计算收益</div>
                    <div class="succ_time" >{{items.beginProfits}}</div>
                </div>
                <div class="succ_two succ_width" id="succ_show">
                    <div class="succ_name succ_color">显示收益</div>
                    <div class="succ_time">{{items.beginProfits}}</div>
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
    		items :{},
            uuid : '',
            token : ''
    	}   
    },
	watch:{
		
	   
	},
	
	components:{

	},
	methods:{
		returns(){
		  this.$router.push({path:'/financial'});
		},
        otherFun(){
            this.$router.push({path:'/financial'});
        },
        seeFun(){
            this.$router.push({path:'/mywealth'});
        },
        buyFun : function(){
            axios.post('/api/v2//financing_project_bid/invest/order_detail/'+this.uuid,{
                    app_token : this.token
                })
            .then(res=>{
                if(res.data.code=="SUCCESS"){
                    res.data.result.gmtCreates = res.data.result.gmtCreate.split(" ")[0];
                    res.data.result.beginProfits = res.data.result.beginProfit.split(" ")[0];
                    res.data.result.mobiles =res.data.result.mobile.substring(0,3)+'****'+res.data.result.mobile.substring(7);
                    this.items = res.data.result;
                }else if(res.data.code=="TOKEN_ERROR"){
                    this.$toast('用户信息失效')
                }else{
                    this.$toast(res.data.msg)
                }
            })
         
        },
		
	},
	
	created: function () { 

	},
	mounted(){
        //this.token = HC.vueurlFun("app_token") || '';
        this.token = HC.getStorage('sessionToken');
		this.uuid = HC.vueurlFun("uuid") || '';
		this.buyFun();
        
		
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
