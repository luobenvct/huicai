<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			用户授权协议
		</div>
		<div class="textClass">
			<h4>一、定义及解释</h4>
			<p> （1）网络借贷平台（下称“平台”）由浙江硕惠网络科技有限公司（P2P公司）负责运营。《上饶银行网络交易资金账户服务三方协议》（下称“三方协议”）三方为平台注册用户（下称“用户”）、浙江硕惠网络科技有限公司、上饶银行，本协议对用户、浙江硕惠网络科技有限公司均具有约束力，具有合同上的法律效力。</p>
			<p>用户同意，开通《三方协议》项下的上述所有服务及其相应的委托支付产品、电子账户，同时授权上饶银行按照平台方（浙江硕惠网络科技有限公司）的指令对用户开通的电子账户进行操作，用户已知晓上述服务可能无需用户再次输入支付密码。</h4>
			<p>（一）用户同意，在使用《三方协议》项下的服务时的意思表示均出自于用户本人的真实意愿。同时用户确保在使用服务时所填写的信息均真实有效，否则因此导致的责任由用户自行承担。</p>
			<p>（二）用户在此授权，上饶银行有权根据用户在平台方的投融资活动、指令及平台方的指令，对用户的电子账户进行免密操作，以便用户在平台上正常开展投融资活动。</p>
			<p>（三）用户同意，上饶银行可以根据用户在平台上设置的内容或用户事先授权给平台方的内容从用户的存管电子账户扣款（包括向用户收取相应的服务费用）。</p>
			<p>（四）用户同意，上饶银行仅对因存在过错而导致错误执行平台方的指令承担责任，对于因平台方发送指令错误或迟延，或平台方未取得用户的事先授权而发送指令，导致用户的电子账户或银行账户发生的资金损失，上饶银行不承担任何责任，用户应该与平台方或交易对方自行解决前述纠纷。用户理解并明白上饶银行仅在此过程中仅根据平台方扣款指令划扣相应款项，除上饶银行因存在过错而导致错误执行指令外，用户不得据此向上饶银行主张任何索赔或补偿。</p>
			<p>（五）用户同意，开通《三方协议》项下的服务后，当上饶银行自用户的电子账户中划扣相应款项的情况下，若因平台方未能及时出具账单，或账单逾期、错误导致用户未能及时偿付相关款项而产生违约金或者多扣、重复扣款的，因此导致的所有责任及损失，均由用户与平台方自行协商解决，上饶银行不承担任何责任。</p>
			<h4>三、其他</h4>
			<p>本协议依附于《三方协议》而存在，未尽事宜均以上饶银行或平台方不时更新公布的《三方协议》及相关规则为补充；本协议与《三方协议》及相关规则不一致的地方，以本协议为准。本协议中的所有术语，除非另有说明，其定义与三方协议的定义相同。</p>
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
		
		
	},
	
	created: function () { 

	},
	mounted(){
		
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupons{
	width: 100%;
	position: absolute;
	height: 100%;
	overflow: hidden;
	font-size: 14px;
	overflow-y: scroll;
	background-color: #f5f5f9;
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
.textClass{
    width: 100%;
    background-color: #eee;
    overflow: hidden;
    margin-top: 40px;
}
.textClass h4{
    text-indent: 10px;
    line-height: 28px;
}
.textClass p{
    text-indent: 20px;
    font-size: 14px;
    line-height: 28px;
    padding: 0 15px;
}

</style>
