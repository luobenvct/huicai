<template>
  <div class="riskwarn">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">融宝手机支付协议</div>
	</div>
	
	<div class="max_box">
		<div class="max_sty font_blod">一、账户使用服务协议（以下简称“本协议”）是您自愿与天津融宝支付网络有限公司（以下简称“融宝”）就您使用融宝支付账户相关服务（以下简称“本服务”）所订立的有效协议。</div>
		<div class="max_sty">二、本协议与您的利益有重大关系，在您使用本服务之前，请您先仔细阅读并充分理解本协议约定的全部条款内容。如果您不同意或无法准确理解本协议任何条款的含义，请您选择其他服务进行交易。如您对本协议的所有条款均能准确理解并同意本协议所有条款之内容，您可继续使用本服务。</div>
		<div class="max_sty font_blod">三、为了交易安全，建议您尽量避免在公共计算机上或使用公共WIFI上网。</div>
		<div class="max_sty">四、您保证，您在使用本服务时，您必须具有完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、或经合法授权的操作人。如您不具备前述条件的，您应终止使用本服务。</div>
		<div class="max_sty font_blod">五、您保证您是本账户的所有人或合法使用人，可合法、有效使用该融宝支付账户，并保证所使用该账户提供的包括但不限于银行卡号、账户名称、身份证号码、手机号码、动态验证码信息的真实性、有效性、合法性、准确性、完整性。</div>
		<div class="max_sty">六、您知晓，您应妥善保管您的账户信息，您保证不向任何第三方泄露，如因您的泄露或银行卡、身份证、手机信息丢失等原因导致的所有损失由您自行承担。</div>
		<div class="max_sty font_blod">七、您在使用本服务支付前，应当认真确认交易信息，包括但不限于商品名称、数量、质量、金额。您确认交易信息后，还需根据系统提示要求进行身份识别等相关认证操作，并在身份认证后向融宝发送支付指令。您认可和同意：您进行身份认证等所有操作均视为您本人所为，您向融宝发出的支付指令不可撤回或撤销，融宝有权根据您的支付指令委托银行或第三方从您绑定的银行卡中将您确认的资金划扣给收款人。届时您不应以非本人意愿交易或其他任何原因要求融宝退款或承担其他责任。</div>
		<div class="max_sty">八、您在应对使用本服务过程中发出指令的真实性及有效性承担全部责任；您承诺，融宝依照您的指令进行操作的一切风险由您自行承担。您不应以未在交易单据中签名、签名不符、非本人意愿交易等原因要求融宝退款或承担其他责任。</div>
		<div class="max_sty font_blod">九、您认可，您使用本服务所涉及的账户的身份认证等使用记录数据、交易金额数据等均以融宝系统平台记录的数据为准。</div>
		<div class="max_sty">十、您同意并授权融宝因风险控制或技术需求或基于为更好的向您提供服务的目的，有权留存您填写的相应支付信息，以供后续向您持续性地提供相应服务（包括但不限限于将本信息用于向您推广、提供其他更加优质的产品或服务）。融宝将对您的支付账户信息予以保密。</div>
		<div class="max_sty font_blod">十一、您同意，出现下列情况之一的，融宝有权立即中止或终止您使用本服务而无需承担任何责任：（1）您违反本协议的约定；（2）您违反融宝或其他关联公司网站的条款、协议、规则、通告等相关规定，而被上述任一网站终止提供服务；（3）您将本服务用于非法目的；（4）继续提供服务会给融宝带来损失或风险。</div>
		<div class="max_sty">十二、您同意，基于运行和交易安全的需要，融宝有权暂停提供或者限制本服务部分功能，或提供新的功能。您须及时关注，在减少、增加或者变化任何功能时，只要您仍然使用本服务，表示您仍然同意本协议或者变更后的协议。</div>
		<div class="max_sty font_blod">十三、您同意，融宝有权根据业务发展情况及风险情况随时对本协议内容进行变更。本协议内容包括协议正文及所有在融宝网站已经发布或将来可能发布的融宝服务的使用规则。</div>
		<div class="max_sty">十四、您保证，在您的账户信息发生泄露、丢失、盗用时，您应及时以书面形式告知融宝并在告知书中明确要求暂停您的账户使用本服务。融宝在接到您的书面通知后会积极响应，但您应理解，在融宝收到您的书面通知前已提供的服务导致您的损失，融宝不承担任何责任。</div>
		<div class="max_sty font_blod">十五、您知悉并同意，在您使用本服务时，如因融宝自身的原因导致本服务无法提供，由融宝承担相应责任；如因政府机关、银行、电信部门或其他第三方原因导致本服务不能正常提供，融宝对此不承担责任，您需向政府机关、银行、电信部门或其他第三方原因进行追责。</div>
		<div class="max_sty">十六、您同意，本协议的订立、履行、解释及争议的解决均应适用中华人民共和国大陆地区之有效法律（但不包括其冲突法规则）。如发生本协议与适用之法律相抵触时，则本协议涉及条款将按法律规定重新解释，而其它条款继续有效。</div>
		<div class="max_sty font_blod">十七、因融宝与您就本协议的签订、履行或解释发生任何争议，双方应协商解决。如协商不成，双方均可向融宝住所地人民法院提起诉讼。</div>
	</div>

  </div>
</template>

<script>
export default {
  data () {
	return {
	 
	}
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	}
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
.fr{
	float: right;
}
.fl{
	float: left;
}
.top{
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.top .name{
	margin-top: 6px;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
  margin-top: 8px;
}
.max_box{
	width:100%;
	overflow:hidden;
	margin:10px auto;
	margin-top: 54px;
}
.max_sty{
	width:90%;
	margin:auto;
	font-size:12px;
	color:#203542;
	line-height:24px;
}
.font_blod{
	font-weight:bold;
}
</style>
