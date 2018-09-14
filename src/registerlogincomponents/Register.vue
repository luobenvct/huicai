	<template>
	<div class="register">
		<div v-show="!registerShow02">
			<div class="top">
				<div @click="returns" class="returns fl">
					<img src="../assets/img/Back_icon.png" height="18" width="18">
				</div>
				<div class="name01 fl">注册</div>
			</div>
			<div v-show="registerShow">
				<div class="prompt"><span>*</span>注册即送888元现金券和3%加息券喔</div>
				<div class="username">
					<input type="tel" placeholder="输入手机号" maxlength="13" autocomplete="off" v-model="mobile">
				</div>
				<div class="imgCode">
					<input class="fl" type="text" placeholder="输入图片验证码" maxlength="6" autocomplete="off" v-model="imgCode">
					<div class="fr" @click="changeImgUrl"><img :src="imgUrl"></div>
				</div>
				<div class="inviteCode">
					<input type="text" placeholder="输入邀请码(选填)" autocomplete="off" v-model="inviteCode">
				</div>
				<div class="agreement">
					<span class="choice" @click="choice"><input type="checkbox" checked="checked"></span>我已同意<span class="xieyi" @click="xieyi">《惠财注册及服务协议》</span>
				</div>
				<div class="login-btn" v-if="choiceTrue" @click="register">下一步</div>
				<div class="login-btn" v-else @click="registerFalse">下一步</div>
			</div>
			<div class="register02" v-show="!registerShow">
				<div class="bottomline">
					<input class="fl input01" type="text" placeholder="请输入验证码" maxlength="6" autocomplete="off" v-model="verifyCode">
					<div class="fr time" v-if="timeTrue"><span>{{num}}</span>秒后重发</div>
					<div class="fr time" v-else @click="getVerifyTwo">重新获取</div>
				</div>
				<div class="password_box">
					<input class="fl input02" :type="password_test" placeholder="请输入密码" maxlength="16" autocomplete="off" v-model="password">
					<img class="password_img" v-if="password_test=='password'" @click="passwordFun" src="../assets/img/login_hide.png">
					<img class="password_img" @click="passwordFun" v-else src="../assets/img/login_hide.png">
				</div>
				<div class="tip"><span>*</span>建议密码使用6位以上数字、字母组合，区分大小写</div>
				<div class="login-btn02" @click="registerTo">注册</div>
			</div>
		</div>

		<!--  -->
		<div class="register" v-show="registerShow02">
			<div class="top">
				<div @click="goback" class="returns fl">
					<img src="../assets/img/Back_icon.png" height="18" width="18">
				</div>
				<div class="name fl">惠财注册协议</div>
			</div>
			<div class="max_box">
				<div class="ret_first">重要须知</div>
				<div class="ret_sty">本协议是您（用户，包括自然人、法人）与
					<!-- 浙江硕惠网络科技有限公司之间就惠财平台网站注册 --> 惠财金融平台网站注册的契约，适用于您在平台注册及使用惠财平台服务的全部行为。</div>
					<div class="ret_sty">在注册成为惠财平台用户前，请您务必认真、仔细阅读并充分理解本协议全部内容，特别是其中所涉及的对惠财平台的责任免除及对您的权利限制的条款。您在惠财平台提供的网络页面上点击以合理的理解表明您希望与本公司签订本协议的按钮（例如，按钮上书写“同意协议并注册”或类似文字，且页面上同时列明了本协议的内容或者可以有效展示本协议内容的链接），即表示您在充分阅读并理解本协议的内容基础上确认接受并签署本协议，同时表示您与惠财平台已达成协议并同意接受本协议的全部约定内容，包括与本协议有关的各项规则及本网站所包含的已经发布的或者将来发布的各类声明、规则、说明等（若服务协议中没有约定的以本网站发布的各类声明、规则、说明等中对应内容为准）。 如您不同意或者不接受本协议的全部或者部分内容，请您不要注册成为惠财平台用户及使用惠财平台服务。</div>
					<div class="ret_first">一． 惠财平台的账户及服务</div>
					<div class="ret_first">1、惠财平台是指注册后由惠财平台相关公司为用户提供的各类金融产品的交易平台，包括但不限于网络借贷等（具体以惠财平台及相关交易网站实时展示为准）。</div>
					<div class="ret_first">2、惠财平台采用实名制注册，用户应如实填写和提交账号注册和认证资料，并对资料的真实性、合法性、准确性和有效性承担责任。</div>
					<div class="ret_first">3、用户注册成功后，惠财平台将给予每个用户一个用户账号及相应的密码（“惠财账户”），该用户账号和密码由用户负责保管；用户应当对以其用户账号进行的所有活动和事件负法律责任。</div>
					<div class="ret_first">4、用户可使用惠财账户登录惠财平台及相关交易网站而无需另行注册，如需发起交易可在各相关网站开设与惠财平台账户相关联的交易账户，交易规则以各相关网站公示或提示为准，用户的交易行为应遵守上述交易规则。</div>
					<div class="ret_first">5、为确保交易安全，用户同意使用专业服务机构提供的数字证书完成交易文件签署及交易行为确认，用户知悉并授权惠财平台将用户相关信息提交至服务机构代为申请专属于用户的数字证书，该数字证书将会被作为完成用户在惠财平台在线签署电子合同等法律文本之目的使用。</div>
					<div class="ret_first">6、除非另有其它明示规定，惠财平台所展示的新产品、新功能、新服务，均受到本协议之规范。</div>
					<div class="ret_first">7、惠财平台仅作为网络环境下用户或者关联网站发布信息的场所，鉴于网络服务的特殊性，用户同意惠财平台有权不经事先通知，随时变更、中断或终止部分或全部的网络服务。</div>
					<div class="ret_first">8、惠财平台需要定期或不定期地进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断，惠财平台无需为此承担任何责任。惠财平台保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。</div>
					<div class="ret_first">9、惠财平台有权于任何时间暂时或永久修改或终止服务（或其任何部分），而无论其通知与否，惠财平台对用户和任何第三人均无需承担任何责任。</div>
					<div class="ret_first">10、用户确认知悉，惠财平台的账户仅供惠财平台及相关交易网站提供居间服务及交易环境，基于交易行为发生的相关的资金管理及划付服务均由具有法定资质的第三方机构提供，惠财平台对用户以完成交易为目的的资金管理及划付的指令及最终的结果、时效性不承担任何责任。针对冒用他人账户的行为，惠财平台保留对实际使用人追究责任的权利。</div>
					<div class="ret_first">11、惠财账户的所有权归惠财金融平台所有，用户完成注册申请手续后，获得惠财账户的使用权。用户同意惠财平台基于自行之考虑，有权对符合以下条件的惠财账户做回收处理，回收处理情形下惠财平台的服务相应终止，且惠财平台有权立即关闭或删除用户惠财账户及其中所有相关信息及文件： </div>
					<div class="ret_first">o（1）未绑定通过实名认证的各平台账户；</div>
					<div class="ret_first">o（2）连续12个月未用于登录；</div>
					<div class="ret_first">o（3）不存在未到期的有效业务超过12个月 ；</div>
					<div class="ret_first">o（4）惠财平台有合理理由认为用户的行为已经违反本协议的文字及精神及公平正义、公序良俗等社会公益价值。</div>
					<div class="ret_first">二、惠财平台服务内容</div>
					<div class="ret_first">1、惠财平台只接受持有中华人民共和国有效身份证的18周岁以上的具有完全民事行为能力的自然人或者依据中华人民共和国法律依法设立并存续的法人成为网站用户，如用户不符合资格，请勿继续操作注册。惠财平台保留因用户注册信息不实而随时中止或终止用户资格的权利，包括但不限于对用户惠财账号进行回收、封号等操作，由此所产生的损失由用户自行承担，惠财平台将不承担任何责任。</div>
					<div class="ret_first">2、用户在注册惠财平台及使用相关网站服务时应当根据惠财平台的要求提供自己的个人资料或法人资料，并在使用过程中依据惠财平台和相关网站的要求更新上述个人或法人资料并保证此等资料完整、有效。如因注册信息不真实或更新不及时而引起的问题，惠财平台及相关网站不负任何责任。如发现用户以虚假信息注册而骗取惠财账号使用权，或注册信息存在违法和不良信息的，惠财平台有权单方采取限期改正、暂停使用、注销登记、收回等措施，且上述措施的采用不以通知为必要条件。</div>
					<div class="ret_first">3、用户成功注册为惠财平台用户后，应当妥善保管自己的用户名和密码，不得将账号、密码进行转让、出售、出借、出租、赠与或授权给第三方使用，若用户授权他人使用其账户应对被授权人在该账户下发生的所有行为负全部责任。因密码被遗忘、被第三方破解，使用的计算机被入侵等原因造成的交易风险均亦由用户自行承担。用户在此确认以其用户名和密码登录惠财平台及相关交易网站情形下，经由用户的惠财账户发出的一切指令均视为用户本人的行为和真实意思表示，该等指令不可撤销，由此产生的一切责任和后果由用户本人承担。</div>
					<div class="ret_first">4、用户不得利用惠财平台从事任何违法违规活动，用户在此承诺合法使用惠财平台提供的服务，遵守中国现行法律、法规、规章、规范性文件的规定以及惠财平台及相关交易网站的规则、协议等规范。若用户违反上述规定，所产生的一切法律责任和后果由用户自行承担。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及如惠财平台首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应向惠财平台进行赔偿。如因此给惠财平台造成损失的，由用户赔偿惠财平台的损失。惠财平台保留将用户违法违规行为及有关信息资料进行公示、计入用户信用档案、按照法律法规的规定提供给有关政府部门或按照有关协议约定提供给第三方的权利。</div>
					<div class="ret_first">5、如用户在惠财平台的某些行为或言论不合法、违反有关协议约定、侵犯惠财平台及相关交易网站的利益等，惠财平台有权基于独立判断直接删除用户在惠财平台上作出的上述行为或言论，有权中止、终止、限制用户使用惠财平台服务，而无需通知用户，亦无需承担任何责任。</div>
					<div class="ret_first">三、不保证条款</div>
					<div class="ret_first">1、惠财平台提供的信息和服务中不含有任何明示、暗示的，对任何用户、任何交易的真实性、准确性、可靠性、有效性、完整性等的任何保证和承诺，用户需根据自身风险承受能力，衡量惠财平台披露的内容的真实性、可靠性、有效性、完整性，用户因其选择使用惠财平台提供的服务、参与的交易等而产生的直接或间接损失均由用户自己承担，包括但不限于资金损失、利润损失、营业中断等。</div>
					<div class="ret_first">2、基于互联网的特殊性，无法保证惠财平台的服务不会中断，对于包括但不限于设备、系统存在缺陷，计算机发生故障、遭到病毒、黑客攻击或者发生地震、海啸等不可抗力而造成服务中断或因此给用户造成的损失，由用户自己承担。</div>
					<div class="ret_first">四、 隐私保护</div>
					<div class="ret_first">1、惠财平台有义务就用户提供的及自行合法收集的用户信息采用合理的、必要的手段及措施进行保护，以更充分的了解用户需求、协助用户完成交易。</div>
					<div class="ret_first">2、惠财平台有权利就用户提供的及自行合法收集的用户信息进行合法的使用（包括以不伤害用户隐私权为前提的商业上的使用），且在如下情况下，惠财平台可能会披露您的信息：</div>
					<div class="ret_first">o（1）事先获得用户的授权；</div>
					<div class="ret_first">o（2）用户使用共享功能；</div>
					<div class="ret_first">o（3）根据法律、法规、法律程序的要求或政府主管部门的强制性要求；</div>
					<div class="ret_first">o（4）以学术研究或公共利益为目的；</div>
					<div class="ret_first">o（5）为维护惠财平台的合法权益，例如查找、预防、处理欺诈或安全方面的问题；</div>
					<div class="ret_first">o（6）为维护惠财平台其他用户的合法权益，即在用户违反惠财平台及相关交易网站的规则及交易协议约定情形下，惠财平台有权将用户的信息进行黑名单披露并共享给与惠财平台及相关交易网站有合作关系的第三方；；</div>
					<div class="ret_first">o（7）符合相关服务条款或使用协议的规定。</div>
					<div class="ret_first">3、惠财平台采用行业标准惯例以保护用户的个人或法人信息和资料，鉴于技术限制，不能确保用户的全部私人通讯及其他个人或法人资料不会通过不明的途径泄露出去。</div>
					<div class="ret_first">4、针对本条款约定情形下的信息使用及披露有可能给用户造成的损失，惠财平台及相关交易网站不承担任何责任。</div>
					<div class="ret_first">五、使用规则</div>
					<div class="ret_first">1、用户在使用惠财平台及相关交易网站服务时，必须遵守中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为: </div>
					<div class="ret_first">（1）上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：</div>
					<div class="ret_first">o    1） 反对宪法所确定的基本原则的；</div>
					<div class="ret_first">o    2） 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</div>
					<div class="ret_first">o    3） 损害国家荣誉和利益的；</div>
					<div class="ret_first">o    4） 煽动民族仇恨、民族歧视、破坏民族团结的；</div>
					<div class="ret_first">o    5） 破坏国家宗教政策，宣扬邪教和封建迷信的；</div>
					<div class="ret_first">o    6） 散布谣言，扰乱社会秩序，破坏社会稳定的；</div>
					<div class="ret_first">o    7） 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</div>
					<div class="ret_first">o    8） 侮辱或者诽谤他人，侵害他人合法权利的；</div>
					<div class="ret_first">o    9） 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</div>
					<div class="ret_first">o    10） 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的。</div>
					<div class="ret_first">（2）不得为任何非法目的而使用惠财平台服务系统。</div>
					<div class="ret_first">2、用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方向惠财平台及其相关交易网站主张的任何索赔、要求或损失（包括合理的律师费），将由用户向惠财平台与相关交易网站进行赔偿，以使之免受损害。对此，惠财平台有权视用户行为的性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、回收惠财账号、追究法律责任等措施。对恶意注册惠财账号或利用惠财账号进行违法活动，骚扰、欺骗其他用户，以及其他违反法律规定及违反本协议的行为，惠财平台有权回收其惠财账号。同时，惠财平台公司会视司法部门的要求，协助调查。</div>
					<div class="ret_first">3、用户不得对本协议及本服务的任何部分或基于本协议或本服务之使用或获得的信息，进行出售、转售或用于任何其它商业目的。</div>
					<div class="ret_first">4、用户同意：惠财平台为更加有效、及时的向用户提供服务将通过站内信、APP推送、手机短信、电子邮件等形式向用户发布惠财平台相关信息，包括但不限于项目信息、投资行为确认信息、账户资金变动信息等。</div>
					<div class="ret_first">六、知识产权</div>
					<div class="ret_first">1、惠财平台内容受中国知识产权法律法规及各国际版权公约的保护。用户承诺不以任何形式复制、模仿、传播、出版、公布、展示惠财平台内容，包括但不限于电子的、机械的、复印的、录音录像的方式和形式等。</div>
					<div class="ret_first">2、用户未经授权不得将惠财平台包含的资料等任何内容发布到任何其他网站或者服务器。任何未经授权对惠财平台内容的使用均属于违法行为。</div>
					<div class="ret_first">3、用户保证，其发布在惠财平台上的任何信息和内容都没有侵犯任何第三方的知识产权，也不存在可能导致侵犯第三方知识产权的情形。若任何第三方因用户发布的信息和内容提出权属异议或引起任何纠纷，用户自行承担责任，与惠财平台无关。</div>
					<div class="ret_first">4、用户同意，其发布上传到惠财平台上可公开获取区域的任何内容，用户同意惠财平台有权将内容用于其他合法用途，包括但不限于部分或者全部地复制、修改、改编、翻译、组装、分拆、推广、分发、广播、表演、演绎、出版。</div>
					<div class="ret_first">七、 法律适用和争议解决</div>
					<div class="ret_first">本协议的签订、效力、履行、终止、解释和争端解决适用中国法律法规。如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向惠财平台所在地的人民法院提起诉讼。</div>
					<div class="ret_first">八、其他</div>
					<div class="ret_first">1、本协议自用户签署并成功注册为惠财平台用户之日起生效，除非惠财平台终止本协议或者用户丧失惠财平台用户资格，否则本协议始终有效。出于运行和交易安全的需要，惠财平台可以暂时停止提供或者限制本服务部分功能，或提供新的功能，在任何功能减少、增加或者变化时，只要用户仍然使用惠财平台服务，表示用户仍然同意本协议或者变更后的协议。</div>
					<div class="ret_first">2、本协议终止并不免除用户根据本协议或其他有关协议、规则已经发生的行为或达成的交易项下所应承担的义务和责任。</div>
					<div class="ret_first">3、惠财平台未行使或执行本服务协议任何权利或规定，不构成对前述权利之放弃。</div>
					<div class="ret_first">4、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</div>
					<div class="ret_first">5、惠财平台对本协议享有最终的解释权。</div>
				</div>
			</div>
			<!--  -->

		</div>
	</template>

	<script>
		import store from '../vuex/store.js'
		import axios from 'axios'


		export default {
			data () {
				return {
					password_test: 'password',
					mobile: '',
					imgCode: '',
					verifyCode:'',
					password:'',
					inviteCode:'',
					choiceTrue:true,
			  		imgUrl:"", 
			  		registerShow:true,
			  		registerShow02: false, //惠财注册协议
			  		timeTrue:true,
			  		num:60,
			  		time:"",
			  		verifyCodeTrue:false,
			  		userInfo: { //保存用户信息
					  	nick: null,
					  	loginUser:false,
					  	ulevel: null,
					  	uid: null,
					  	portrait: null
					},
			  		imgurltime :''
				}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			},
			Https(){
				return store.getters.getHttps
			}
		},
		components:{

		},
		mounted(){
			//组件开始挂载时获取用户信息
			this.getUserInfo();
			this.appId = sessionStorage.getItem("appId");
			this.unionid = sessionStorage.getItem("unionid");
			this.openid = sessionStorage.getItem("openid");
		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			passwordFun(){
				console.log(this.password_test)
				if(this.password_test=="password"){
					this.password_test = 'text';
				}else{
					this.password_test="password"
				}
				
			},
			goback(){
				this.registerShow02 = false;
			},
			changeImgUrl(){
				console.log("kk")
				this.imgurltime = new Date().getTime();
				this.imgUrl = this.Https+"/api/v2/verify_code/open_auth/image_verify?imei=" +this.imgurltime;
				console.log(this.imgUrl)
			},
			registerFalse(){
				this.$toast({
					message: '请先同意惠财注册协议',
					position: 'bottom',
					duration: 3000
				});
			},
			xieyi(){
				this.registerShow02 = true;
			},
			choice(){
				this.choiceTrue = !this.choiceTrue;
				console.log("同意协议")
			},
			//请求用户的一些信息
			getUserInfo(){
			  //发送http请求获取，这里写死作演示
			  this.userInfo = {
			  	nick: 'luoben',
			  	loginUser:true,
			  	ulevel: 20,
			  	uid: '10000',
			  	portrait: ''
			  }
			},
			getVerifyTwo(){
				this.VerifyCode();
			},
			bankIdTrue(value){
				var result=value.replace(/[ ]/g,"");
				return result
			},
			//注册逻辑
			register(){
				if(this.mobile == ''){
					this.$toast({
						message: '手机号码不能为空',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(this.checkMobile(this.bankIdTrue(this.mobile)) == false){
					this.$toast({
						message: '手机号码格式有误',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				if(this.imgCode == "" ){
					this.$toast({
						message: '图型验证码不能为空',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
			  //this.Pattern();
			  axios.post(this.rootBase+'/verify_code/open_auth/code_verify',{
			  	imei : this.imgurltime,
			  	verifyCode : this.imgCode
			  })
			  .then((res)=>{
			  	console.log("v2发送验证码")
			  	console.log(res)
			  	if(res.data.code=="SUCCESS"){
			  		axios.post(this.rootBase+'/open_auth/user/is_register', {
			  			mobile:this.bankIdTrue(this.mobile)
			  		})
			  		.then(res =>{
			  			console.log("v2注册接口数据");
			  			console.log(res);    
			  			if (res.data.result === false) {
			  				this.$toast({
			  					message: '该手机已注册',
			  					position: 'bottom',
			  					duration: 3000
			  				});
			  				return;
			  			}else{
			  				this.setCookie("mobile",this.bankIdTrue(this.mobile));
			  				this.VerifyCode();
			  			}

			  		})
			  		.catch(res=> {
			  			console.log(res);
			  		});
			  	}else{
			  		this.$toast({
			  			message: "图型验证码有误",
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  	}
			  })
			  /**/
			},
			/*Pattern(){
				if(this.imgCode == "" ){
					this.$toast({
						message: '图型验证码不能为空',
						position: 'bottom',
						duration: 3000
					});
					return;
				}
				//验证图型验证码
				axios.post('/api/image_verify.htm', {
					imei:this.time,
					verifyCode: this.imgCode
				})
				.then(res =>{
					console.log("验证图型验证码");
					console.log(res);    
				})
				.catch(res=> {
					console.log(res);
				});
			},*/
			VerifyCode(){
			  //发送短信验证码
			  axios.post(this.rootBase+'/verify_code/open_auth/huicai', {
			  	mobile:this.bankIdTrue(this.mobile),
			  	verifyType : "REGIST",
			  	imageCode: this.imgCode
			  })
			  .then(res =>{
			  	console.log("v2发送短信接口数据");
			  	console.log(res);    
			  	if(res.data.code == "SUCCESS"){
			  		this.$toast({
			  			message: '验证码发送成功',
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  		this.registerShow = false;
			  		this.timeTrue = true;
			  		var timer = setInterval(()=>{
			  			this.num --;
			  			if(this.num == 0){
			  				this.num = 60;
			  				this.timeTrue = false;
			  				clearInterval(timer)
			  			}
			  		},1000)
			  	}
			  	if(res.data.code == "MSG_AMOUNT_LIMITED"){
			  		this.$toast({
			  			message: '发送次数过多',
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  	} 
			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			},
			registerTo(){
			  //注册
			  if(this.verifyCode == ''){
			  	this.$toast({
			  		message: '验证码不能为空！',
			  		position: 'bottom',
			  		duration: 3000
			  	});
			  	return;
			  }
			  if(this.password == ''){
			  	this.$toast({
			  		message: '密码不能为空！',
			  		position: 'bottom',
			  		duration: 3000
			  	});
			  	return;
			  }
			  if(this.password.length < 6){
			  	this.$toast({
			  		message: '密码不能低于6位数！',
			  		position: 'bottom',
			  		duration: 3000
			  	});
			  	return;
			  }
			  axios.post(this.rootBase+'/open_auth/user/register', {
			  	mobile:this.bankIdTrue(this.mobile),
			  	verifyCode:this.verifyCode,
			  	loginPwd:HC.MD5(this.password),
			  	inviteFrom:this.inviteCode
			  })
			  .then(res =>{
			  	console.log("v2注册");
			  	console.log(res);    
			  	if(res.data.errorCode == "VERIFY_CODE_ERROR"){
			  		this.$toast({
			  			message: res.data.msg,
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  	} 
			  	if(res.data.code == "USER_EXIST"){
			  		this.$toast({
			  			message: res.data.errorMsg,
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  	} 
			  	if(res.data.code == "SUCCESS"){
			  		this.$toast({
			  			message: "注册成功",
			  			position: 'bottom',
			  			duration: 3000
			  		});
			  		this.toLogin()
			  	} 
			  })
			  .catch(res=> {
			  	console.log(res);
			  });
			},
			toLogin(){
			  //登录
			  ///api/sys/login.htm
			  ///api/v2/user/login
			  axios.post(this.rootBase+'/user/login', {
				identity : this.bankIdTrue(this.mobile),
				password : HC.MD5(this.password),
				loginFrom:3,
				appId:this.appId,
				unionid:this.unionid,
				openid:this.openid
			  })
			  .then(res =>{
			  	console.log("v2登录");
			  	console.log(res);  
			  	if(res.data.code == "SUCCESS"){
				  //this.$messagebox(res.data.msg,"登录");
				  store.commit('updateUserInfo', this.userInfo);
				  HC.setStorage("sessionToken",res.data.us.sessionToken);
				  this.setCookie("mobile",this.bankIdTrue(this.mobile));
				  localStorage.setItem("weixinToken",res.data.us.sessionToken)
				  this.$router.push({path:'/home'})
				}  
			})
			  .catch(res=> {
			  	console.log(res);
			  });
			},
			checkMobile(str) {
				var re = /^1\d{10}$/ 
				if (re.test(str)) {
					return true;
				} else {
					return false;
				}
			}
		},
		mounted(){ 
			this.changeImgUrl();
		},
		watch:{
			/*mobile(curVal,oldVal){
				this.mobile = this.mobile.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{4})+$)/g, ' ');
			}*/
			mobile(curVal,oldVal){
				console.log(curVal)
				console.log(oldVal)
				/*if(oldVal != ""){
					this.mobile = this.mobile.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{4})+$)/g, ' ');
				}*/
				if(oldVal != "" && oldVal.length < curVal.length){
					if(curVal.length == 3 || curVal.length == 8){
						this.mobile = this.mobile+" "
					}
					
				}
				
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
	input{
		border: none;
	}
	.login{
		width: 100%;
		background: #CCC;
		padding-bottom: 460px;
		padding-right: 5%;
	}
	.top{
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		background: #fff;
		color: #000;
		padding-right: 5%;
		border-bottom: solid 1px #eee;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	.top .zhuce{
		margin-right: 2%;
		font-size: 12px;
	}
	.top .name01{
		margin-left: 10%;
	}
	.register .top .name{
		margin-left: 0%;
	}
	.prompt{
		margin-top: 20px;
		margin-left: 4%;
		font-size: 12px;
	}
	.prompt span{
		color: red;
	}
	.username{
		width: 100%;
		margin-top: 20px;
	}
	.username input{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.imgCode{
		width: 100%;
	}
	.imgCode input{
		display: block;
		width: 74%;
		height: 40px;
		line-height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		float: left;
	}
	.imgCode div{
		width: 26%;
		height: 41px;
		float: right;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.imgCode div img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.inviteCode input{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.password_box{
		width:100%;
		position: relative;
	}
	.password_img{
		position: absolute;
		right:10px;
		top:14px;
		width:17px;
		height: 11px;
	}
	.register02{
		margin-top: 10px;
	}
	.register02 .bottomline{
		width: 100%;
		height: 40px;
		overflow: hidden;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.register02 .input01{
		width: 76%;
		height: 40px;
		line-height: 40px;
		text-indent: 20px;
		font-size: 12px;
		float: left;
	}
	.register02 .input02{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-indent: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
	}
	.register02 .time{
		width: 20%;
		text-align: center;
		height: 42px;
		line-height: 40px;
		color: #ff6c39;
		font-size: 12px;
		float: right;
	}
	.agreement{
		margin-left: 4%;
		margin-top: 10px; 
		font-size: 12px;
	}
	.agreement .choice{
		color: red;
	}
	.agreement .xieyi{
		color: blue;
	}
	.login-btn{
		width: 88%;
		height: 39px;
		margin: 0 auto;
		line-height: 39px;
		background: #ff6c39;
		border-radius: 5px;
		font-size: 16px;
		text-align: center;
		color: #FFF;
		margin-top: 20px;
	}
	.login-btn02{
		width: 88%;
		height: 39px;
		line-height: 39px;
		background: #ff6c39;
		border-radius: 5px;
		font-size: 16px;
		text-align: center;
		color: #FFF;
		position: fixed;
		z-index: 2;
		margin-left: 6%;
		margin-top: 180px;
	}
	.tip{
		margin-left: 2%;
		font-size: 12px;
		float: left;
		margin-top: 20px;
	}
	.tip span{
		color: red;
	}
	.max_box{
		width:100%;
		overflow:hidden;
		background-color:#f7f7f7;
		font-size: 12px;
	}
	.ret_first{
		width:94%;
		margin:auto;
		line-height:32px;
	}
	.ret_sty{
		width:94%;
		margin:auto;
		line-height:32px;
		text-indent: 2em;
	}
	</style>
