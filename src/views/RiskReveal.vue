<template>
	<div class="riskwarn">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">风险揭示及承诺书</div>
		</div>
		<div class="max_box">
			<div class="ret_first">尊敬的出借人：</div>
			<div class="ret_sty">出借有风险，当您出借时，可能获得利息，但同时也面临着风险。您在做出接受网络借贷信息中介机构服务和出借决策之前，请仔细阅读本风险揭示书，全面认识网络借贷的风险和特性，认真考虑本服务存在的各项风险因素，并充分考虑自身的投资风险意识、风险识别能力和风险承受能力，谨慎做出接受服务和出借的决策。</div>
			<div class="ret_sty">根据有关法律法规，网络借贷信息中介机构和出借人做出如下承诺、风险揭示及声明：</div>
			<div class="ret_first">一、风险揭示</div>
			<div class="ret_first">1、资金损失风险</div>
			<div class="ret_sty">网络借贷信息中介机构将按照依法、诚信、自愿、公平的原则为出借人和借款人提供信息中介服务，维护出借人与借款人的合法权益。但网络借贷信息中介机构不提供增信服务，不承担借贷违约风险。出借人和借款人遵循借贷自愿、诚实守信、责任自负、风险自担的原则承担借贷风险，出借人自行承担借贷产品的本息损失。</div>
			<div class="ret_first">2、借款人风险</div>
			<div class="ret_sty">借款人因经验及能力不足风险、婚姻及家庭不稳定风险、居住不稳定风险、品质及道德风险、健康风险、信用风险、经营风险、股权风险、管理不足风险、还款能力不足风险、过度负债风险等原因，未按照合同约定还款，导致出借人的出借本金和利息无法按时回收。</div>
			<div class="ret_first">3、出借人风险</div>
			<div class="ret_sty">出借人因其出借风险意识、风险识别能力、出借经历、风险承受能力等原因，未能准确了解借贷风险，出借决策产生偏差，致使自身遭受损失。</div>
			<div class="ret_first">4、资金回收风险</div>
			<div class="ret_sty">针对出借人出借本金或者回款再出借资金，网络借贷信息中介机构会积极协助出借人寻找、推荐借款人，以完成资金出借、获取利息之目的，但寻找、推荐借款人日期存在一定不确定性，会导致出借人在出借期限届满后可能无法完全回收出借资金和获得利息。</div>
			<div class="ret_first">5、促成失败的风险</div>
			<div class="ret_sty">本次借款的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而无法成立的风险。</div>
			<div class="ret_first">6、市场风险</div>
			<div class="ret_sty">网络借贷行业因受经济因素、政治因素等各种因素影响而引起的波动，从而会产生风险。</div>
			<div class="ret_first">（二）一般风险：</div>
			<div class="ret_first">1、税收风险</div>
			<div class="ret_sty">对于本借款所适用的税务政策，中国财政机关和税务机关尚未制定统一、完善的税务法律体系，且由于各地方政府税务机关存在执行不统一、稳定性差、缺乏足够的政策支持等特点，出借人的利息收入可能会因相应的税收政策的变化而受到不利影响。</div>
			<div class="ret_first">2、经济周期风险</div>
			<div class="ret_sty">经济运行具有周期性的特点，全球宏观经济运行状况将对出借人获得期待利息产生影响，从而产生风险。</div>
			<div class="ret_first">3、管理风险</div>
			<div class="ret_sty">网络借贷信息中介机构的知识、经验、判断、决策、技能等，会影响其对信息的搜集、信息交互和对借款人的资信评估，将会影响出借人的利息收入，从而产生风险。</div>
			<div class="ret_first">4、经营风险</div>
			<div class="ret_sty">网络借贷信息中介机构承诺将按照相关法律法规的规定进行运营及管理，但无法保证永久符合相关法律和监管部门的要求。如网络借贷信息中介机构无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。</div>
			<div class="ret_sty">网络借贷信息中介机构有权将借款人信息复核、贷后跟踪等用户服务事项以委托服务/服务外包等方式交由其他机构办理，因合作机构不符合监管部门规定的资质，或被监管部门撤销相关业务许可、责令停业整顿等原因不能正常履行职责，或不具备提供服务的相关条件、或因管理不善，或发生停业、解散、破产、被吊销营业执照等情形，可能会给出借人带来一定的风险。</div>
			<div class="ret_first">5、操作或技术风险</div>
			<div class="ret_sty">操作或技术风险是指网络借贷信息中介机构、支付机构或资金存管机构在业务操作过程中，因内部控制存在缺陷或者人为因素造成操作失误或违反操作规程等引致的风险，例如交易错误、IT系统故障等风险。</div>
			<div class="ret_first">6、法律和政策风险</div>
			<div class="ret_sty">经济运行具有周期性的特点，全球宏观经济运行状况将对出借人获得期待利息产生影响，从而产生风险。</div>
			<div class="ret_first">7、其他风险</div>
			<div class="ret_sty">战争、自然灾害等不可抗力的出现，可能导致借贷本息遭受损失。代理机构违约等超出网络借贷信息中介机构自身直接控制能力范围之外的风险，也可能导致出借人的利益受损，从而带来风险。</div>
			<div class="ret_first">二、资金来源合法承诺</div>
			<div class="ret_sty">当您选择通过惠财平台进行资金出借时，您须保证并承诺：您向惠财平台提供的身份证明、银行账户、联系方式等信息真实、准确、完整，不存在任何虚假、错误、误导或者遗漏；您须保证并承诺：您所用于出借的资金来源合法，并非毒品犯罪、黑p 社会性质组织犯罪、恐怖活动犯罪、走私犯罪、贪污贿赂犯罪、破坏金融管理秩序犯罪、金融诈骗犯罪等任何犯罪或者其他任何非法活动所得及或其产生的收益，且您是该资金的合法支配权人，如第三方对资金归属、支配权、合法性等问题主张异议，给借款人或积木盒子平台造成损p 失的，应当赔偿损失。</div>
			<div class="ret_sty">您须保证并承诺：您不会将在惠财平台出借资金及/或其产生的收益用作任何反国家、恐怖融资等违法犯罪活动，或以出借资金及所得收益支持、资助或变相帮助反国家、恐怖组织从事非法活动。</div>
			<div class="ret_first">三、其他提示</div>
			<div class="ret_sty">请出借人仔细阅读相关合同的全部内容，了解并知悉根据合同规定而享有的权利及应当承担的义务和风险。</div>
			<div class="ret_sty" style="font-weight: bold;">四、在您签署本服务协议书前，应当仔细阅读本风险揭示书、资金来源合法承诺并自己独立作出是否接受服务和出借的决定。您签署本揭示及承诺书是您真实的意思表示，您已知悉并理解本服务的全部风险，并自愿承担由此带来的一切后果。</div>
			<div class="ret_sty" style="font-weight: bold;">风险告知方（网络借贷信息中介机构）：浙江硕惠网络科技有限公司</div>
			<div class="ret_sty" style="font-weight: bold;">客户确认栏</div>
			<div class="ret_sty">本人自愿接受浙江硕惠网络科技有限公司的服务并保证本人具有参与网络借贷应当具备的投资风险意识、风险识别能力和投资经历，本人自愿承担由此带来的一切后果。</div>
			<div class="ret_sty">确认人（签章）：</div>
			<div class="ret_sty">日期：</div>

		</div>
		
		   
	</div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
		
		
	}
  },
  methods:{
	returns(){
		this.$router.go(-1);
	},
	
  },
  components:{
	
  },
  computed: {
   
  },
  mounted(){
  },
  filters: {
	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  list-style: none;
}
.riskwarn{
  background: #f5f5f9;
  font-size: 12px;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.top{
  width: 100%;
  padding: 6px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.top .name{
  font-size: 16px;
  margin-top: 5px;
}
.top .returns{
  margin-left: 2%;
  margin-right: 32%;
  margin-top: 8px;
}
.max_box{
	width:100%;
	overflow:hidden;
	background-color:#f7f7f7;
	margin-top: 44px;
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
</style>
