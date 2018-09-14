<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			风险提示
		</div>
		<div class="max_box">
            <div class="ret_first">尊敬的投资者：</div>
            <div class="ret_sty">为了您全面正确地理解网络借贷产品的风险，惠财金融平台（以下称“我司”）特此提示您采用网络借贷产品交易的方式前须仔细阅读以下内容：</div>
            <div class="ret_sty">网络借贷产品（以下简称“基金”）是一种投资工具，其主要功能是分散投资，降低投资所带来的个别风险。投资人投资不同类型的网络借贷产品将获得不同的收益预期，也将承担不同程度的风险。一般来说，网络借贷产品的收益预期越高，投资人承担的风险也越大。</div>
            <div class="ret_sty">网络借贷产品在投资运作过程中可能面临各种风险，既包括市场风险，也包括网络借贷产品自身的管理风险、技术风险、合规风险。投资网络借贷产品受政治或经济的影响，价格会出现反复，过往的业绩数据并非未来真实表现。我司郑重提醒，您在作出任何投资决定前，应仔细阅读发售文件，并应以中国银监会指定的信息披露媒体上正式公告的有关信息及相应网络借贷产品在官网上公开发布的信息为准,了解网络借贷产品的风险收益特征，并根据自身的投资目的、投资期限、投资经验、资产状况等判断网络借贷产品是否和投资人的风险承受能力相适应。</div>
            <div class="ret_sty">我司已尽最大限度地采取有效措施保护您的资料和交易活动的安全。但本着对您负责的态度，我司在此郑重提示，除其他交易方式共同具有的风险以外，网络借贷产品交易仍然存在下列风险，包括但不限于：</div>
            <div class="ret_sty">（1）互联网的全球性决定了数据在互联网上传输的途径的不确定性，可能会受到非法干扰或侵入。 </div>
            <div class="ret_sty">（2）在互联网上传输的数据有可能被某些未经许可的个人、团体或机构通过某种渠道获得或篡改。 </div>
            <div class="ret_sty">（3）互联网上的数据传输可能因通信繁忙出现延迟，或因其他原因出现中断、停顿或数据不完全、数据错误等情况，从而使交易出现错误、延迟、中断或停顿。 </div>
            <div class="ret_sty">（4）因地震、火灾、台风及其他各种不可抗力因素引起的停电、网络系统故障、电脑故障等原因可能造成投资人的经济损失。</div>
            <div class="ret_sty">（5）互联网上发布的各种信息（包括但不限于分析、预测性的参考资料）可能出现错误并误导您。 </div>
            <div class="ret_sty">（6）您的网上交易身份可能会被泄露或仿冒。</div>
            <div class="ret_sty">（7）您使用的计算机可能因存在性能缺陷、质量问题、计算机病毒、硬件故障及其他原因，而对您的交易时间或交易数据产生影响，给您造成损失。</div>
            <div class="ret_sty">（8）由于您自身的计算机应用操作能力或互联网知识的缺乏或对有关信息的错误理解，可能对您的交易时间或交易数据造成影响，因此给您自身造成损失。</div>
            <div class="ret_sty">（9）因您自身的疏忽造成账号或密码泄露，可能会给您造成损失。 </div>
            <div class="ret_sty">（10）因黑客攻击、电子病毒等非乙方原因造成甲方交易密码等重要信息泄露或遗失，由此给您造成损失的。</div>
            <div class="ret_sty">（11）其他可能导致您损失的风险或事项。</div>
            <div class="ret_sty">上述风险所导致的损失或责任，均应由您自行承担，我司对此不承担任何责任。您一经使用我司网上基金交易方式，即视为已经完全了解并理解网络借贷产品交易的风险，并且能够承担网络借贷产品交易可能带来的风险或损失。尽管如此，本着对客户负责的态度，我公司承诺将采取先进的网络产品和技术措施，最大限度地保护客户资料和交易活动的安全。</div>
            <div class="ret_sty">我公司在此郑重提醒您，以上各条款均为免责条款，我司不承担与此相关的任何损失和法律责任。</div>
            <div class="ret_cont">惠财金融平台</div>
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
.max_box{
    width:100%;
    overflow:hidden;
    background-color:#f7f7f7;
    margin-top: 40px;
}
.ret_first{
    width:94%;
    margin:auto;
    line-height:40px;
}
.ret_sty{
    width:94%;
    margin:auto;
    line-height:40px;
    text-indent: 2em;
}
.ret_cont{
    text-align: right;
    padding-right: 15px;
    margin: 20px auto;
}

</style>
