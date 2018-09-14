<template>
		<div class="coupons">
			<div class="nav_box">
					<div @click="returns" class="returns_box"></div>
					支持银行及限额
			</div>
			<div class="into_box">仅支持储蓄卡，暂不支持信用卡<br>具体金额以实际限额为准</div>
			<div class="supp_sty" v-for="item in items">
				<img class="sty_img" :src="item.src">
				<div class="sty_name" v-text="item.name">工商银行</div>
				<div class="sty_into" v-if="item.monthLimit.length == 0">(单笔{{item.limit | money}}万,单日{{item.dayLimit | money}}万, 单月不限)</div>
				<div class="sty_into" v-else>(单笔{{item.limit | money}}万,单日{{item.dayLimit | money}}万, 单月{{item.monthLimit | money}}万)</div>
				<div class="sty_into sty_into_red" v-if="item.remark">({{item.remark}})</div>
			</div>
			<div class="hint_box">
				<div class="hint_title">开通银联在线支付有三种途径：</div>
				<div class="hint_sty">1、通过银联官网开通（登录银联官网—产品-在线支付-立即在线开通或着使用银联官方安全链接<a href="https://www.95516.com/portal/open/init.do?entry=open">https://www.95516.com/portal/open/init.do?entry=open</a> 自行开通）；</div>
				<div class="hint_sty">2、银行柜台开通（注意如果去银行柜台开通要跟银行工作人员说清楚是要开通“银联无卡支付功能”非“快捷支付功能”）；</div>
				<div class="hint_sty">3、登录网银开通，开通路径：登录邮储个人网银后选择“申请开办”—“网上支付通”—“签约加办”，并点击“同意”按钮，在客户服务类型中选择“银联无卡支付”然后输入相关信息，根据提示进行相应操作开通即可。</div>
			</div>
			<div class="hint_box">
				<div class="hint_title">开通无卡支付的途径：</div>
				<div class="hint_sty">1.无卡支付可以拨打银联电话95516开通或银联持卡人服务网站首页（www.95516.com）-帮助中心-付款说明-如何开通银联卡快速付款功能的节点下方“点击开通银联在线支付”（需登录状态下才能开通，如未注册需先注册后再登录，通过持卡人服务网站开通在线支付成功后，卡片即绑定在开通时登录的用户名下。</div>			
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
				items : []
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
		bankFun (){
				var _self = this;
				axios.post(this.rootBase+'/account/operation_resource/depository_rock/bank_limit')
				.then(res =>{
						console.log("v2获取银行卡限额")
						console.log(res.data.result)
						res.data.result.forEach(function(item){
								item.src="https://static.88huicai.com/huicai/image/bank/"+item.image
						})
						 _self.items = res.data.result;
				})
				.catch(res =>{
						console.log(res);
				})
				
		}
	},
	filters :{
		money (val){
			var moneynum = val/10000;
			return moneynum;
		}
	},
	created: function () { 
		this.bankFun()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
	width: 100%;
	overflow: hidden;
}
.nav_box{
	width: 100%;
	position: fixed;
	top: 0;
	left:0;
	height:40px;
	line-height: 40px;
	background-color:#fff;
	text-align: center;
	color: #000; 
	z-index: 100;
	border-bottom: solid 1px #eee;
}

.returns_box{
	position: absolute;
	top: 0;
	left: 0;
	width:40px;
	height:40px;
	background: url(../../assets/img/Back_icon.png) no-repeat center;
	background-size: 18px;
}
.into_box{
	width:100%;
	padding: 15px 30px;
	border-bottom: solid 1px #e5e5e5;
	color:#acb2b8;
	font-size: 12px !important;
	line-height: 20px;
	background: url(../../assets/img/buyin02.png) no-repeat 20px 22px;
	background-size: 6px;
	margin-top: 40px;
}
.supp_sty{
	width:100%;
	line-height: 50px;
	border-bottom: solid 0.5px #e5e5e5;
	overflow: hidden;
}
.sty_img{
	margin-left: 15px;
	width: 20px;
	display: inline-block;
	vertical-align: middle;
}
.sty_name{
	display: inline-block;
	margin-left: 5px;
	font-size: 15px;
	position: relative;
	color: #203542;
}
.sty_into{
	line-height: 22px;
	margin-left: 15px;
	margin-top: -14px;
	margin-bottom: 5px;
	font-size: 12px;
	color: #bec3c7;
}
.sty_span{
	width: 100%;
	font-size: 12px;
	color: #bec3c7;
	line-height: 16px;
	margin-bottom: 10px;
	overflow:hidden;
	clear:both;
}
.left_one{
	float:left; 
	margin-left:15px;   
}
.left_two{
	float:right;
	margin-right:15px;
}
	 
	.sty_into_red{
		color:red;
		font-size: 10px;
	    line-height: 30px;
	    height: 30px;
	    margin-bottom: 4px;
	}
	.hint_box{
		width:100%;
		overflow: hidden;
		border-top: solid 7px #f5f5f9;
		padding-bottom: 20px;
	}
	.hint_title{
		width: 92%;
		margin:auto;
		font-size: 16px;
		color: #203542;
		line-height: 50px;
	}
	.hint_sty{
		width: 92%;
		margin:auto;
		font-size: 12px;
		color: #4d5f6b;
		line-height: 24px;
	}	


</style>
