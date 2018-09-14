<template>
  <div class="riskwarn">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">惠财投资协议</div>
	</div>
	<div class="max_box" id="max_box" v-cloak>
		<div class="agree_top">本协议以项目实际成交时间为签订日期</div>
		<div class="atree_time" ></div>
		<div class="agree_sty">
			<div class="agee_left">甲方（借款人）：</div>
			<div class="agee_right">{{borderList.trueName}}</div>
		</div>
		<div class="agree_sty" style="margin-top:20px;">
			<div class="agee_left">经营场所：</div>
			<div class="agee_right">{{borderList.address}}</div>
		</div>
		<div class="agree_sty" style="margin-top:20px;">
			<div class="agee_left">法人或经营者：</div>
			<div class="agee_right">{{borderList.legalName}}</div>
		</div>
		<div class="agree_sty" style="margin-top:20px;">
			<div class="agee_left"  style="font-size: 12px;">社会信用代码或身份证号：</div>
			<div class="agee_right" v-if="borderList.type=='Person'">{{borderList.pid}}</div>
			<div class="agee_right" v-else>{{borderList.organizationCode}}</div>
		</div>
		<div class="agree_sty" style="margin-top:20px;">
			<div class="agee_left">乙方（出借人）：</div>
			<div class="agee_right">{{items.lender}}</div>
		</div>
		<div class="table">
		  <ul>
			<li>
			  <div class="div01 fl">惠财用户名</div>
			  <div class="div02 fr">{{items.lenderLoginName}}</div>
			</li>
			<li>
			  <div class="div01 fl">出借金额（元）</div>
			  <div class="div02 fr"  v-text="amount"></div>
			</li>
			<li>
			  <div class="div01 fl">借款期限(天)</div>
			  <div class="div02 fr" v-if="items.period>0">{{items.period}}天</div>
			  <div class="div02 fr" v-else-if="token == ''"></div>
			  <div class="div02 fr" v-else>活期</div>
			</li>
			<li>
			  <div class="div01 fl">投资确认日期</div>
			  <div class="div02 fr">{{timeName}}</div>
			</li>
			
		  </ul>
		</div>
		
		<div class="agree_sty">
			<div class="agee_one">丙方(居间平台服务商)：</div>
			<div class="agee_two" style="height:auto;">{{items.middleman}}</div>
		</div>
		<div class="agree_sty">
			<div class="agee_one">公司住所：</div>
			<div class="agee_two" style="height:auto;">{{items.middlemanAddress}}</div>
		</div>
		<div class="agee_cont">
			 鉴于：<br><br>
			 1、丙方为惠财平台的运营管理人，系提供金融信息及相关服务的居间平台服务商。<br>
			2、甲方及乙方均为享有完全民事行为能力的主体，同意遵守丙方平台的各项行为准则，在充分阅读理解本文本情形下本着诚信自愿原则签订本协议。<br>
			现各方根据平等、自愿的原则，达成本协议如下：<br>
			 一、借款金额及期限<br><br>
			 甲方同意通过惠财平台向乙方借款如下，乙方同意通过惠财平台向甲方发放该等借款：<br>
			 
		</div>
		<div class="table">
		  <ul>
			<li>
			  <div class="div01 fl">借款详细用途</div>
			  <div class="div02 fr">{{capitalUse}}</div>
			</li>
			<li>
			  <div class="div01 fl">借款本金数额（小写）</div>
			  <div class="div02 fr"  v-text="amount"></div>
			</li>
			<li>
			  <div class="div01 fl">借款本金数额（大写）</div>
			  <div class="div02 fr">{{amountCapital}}</div>
			</li>
			<li>
			  <div class="div01 fl">借款年化利率</div>
			  <div class="div02 fr">{{annualizedRates}}</div>
			</li>
			<li>
			  <div class="div01 fl">贴息</div>
			  <div class="div02 fr" v-if="annualizedRatePlus>0">{{annualizedRatePlus}}%</div>
			  <div class="div02 fr" v-else>无</div>
			</li>
			<li>
			  <div class="div01 fl">借款期限(天)</div>
			  <div class="div02 fr" v-if="items.period>0">{{items.period}}天</div>
			  <div class="div02 fr" v-else-if="token == ''"></div>
			  <div class="div02 fr" v-else>活期</div>
			</li>
			<li>
			  <div class="div01 fl">起息日</div>
			  <div class="div02 fr">{{beginDate}}</div>
			</li>
			<li>
			  <div class="div01 fl">到期日</div>
			  <div class="div02 fr">{{endDate}}</div>
			</li>
			<li>
			  <div class="div01 fl">还款方式</div>
			  <div class="div02 fr">{{repayModeTitle}}</div>
			</li>
			<li>
			  <div class="div01 fl">合同生效日期</div>
			  <div class="div02 fr">{{timeName}}</div>
			</li>
		  </ul>
		</div>
		<div class="agee_cont">
			 一、借款流程<br>
			 2.1本协议成立：乙方在惠财平台上对甲方发布的借款需求点击“立即理财”按钮时即视为其已经充分阅读并同意本协议内容，亦视为向甲方作出出借资金的承诺及签署行为，本协议即时成立。<br>
			 2.2 出借资金冻结：同时，乙方点击“立即理财”按钮即视为向丙方发出不可撤销的授权指令，授权丙方委托其指定的支付机构（包括第三方支付机构或银行，下同）冻结乙方确认向甲方出借的资金。冻结将在甲方发布的借款需求所对应的出借资金已经全部募集或募集期届满时解除。<br>
			 2.3 出借资金划转：甲方不可撤销地授权丙方委托其指定支付机构将冻结资金划转至甲方开设的交易结算资金管理账户（即交易参与方在丙方合作支付机构开设的与惠财平台账户关联的支付账户，下同）中，划转完毕即视为乙方出借款项的交付义务已履行完毕，亦可视为甲方已经成功收取借款，本协议即刻生效。甲方可通过“提现”操作将划转的资金转至其银行结算账户上，甲方是否提现资金不影响本协议的效力及债权效力。<br>
			 三、 借款资金来源保证<br>
			 乙方保证其所用于出借的资金来源合法，且乙方是该资金的合法支配权人，如第三方对资金归属、支配权、合法性等问题主张异议，给甲方或居间人造成损失的，应当赔偿损失。<br>
			 四、 本息偿还方式 <br>
			 4.1 甲方必须按照本协议的约定按时、足额偿还对乙方的本金和利息。<br>
			 4.2 甲方授权丙方委托其指定的支付机构按还款计划将金额等同于乙方当期应收金额的资金于约定日期划转至乙方交易结算资金管理账户内，划转完毕即视为本期还款支付成功。为此，甲方应保证在还款日当日的甲方交易结算资金管理账户内余额足以支付当期应付利息或本金。<br>
			 五、债务转让<br>
			 未经乙方的事先书面（包括但不限于电子邮件等方式）同意，甲方不得将本协议项下的任何权利义务转让给任何第三方。<br>
			 六、违约<br>
			 6.1下述情形视为甲方严重违约：甲方擅自改变本协议第一条规定的借款用途；未经乙方书面同意擅自转让本协议项下借款债务的；甲方提供虚假资料或者故意隐瞒重要事实等导致或者可能导致乙方期待利益无法实现或合同目的无法实现等严重后果的违约行为；导致乙方、丙方有合理理由认为甲方严重违反合同义务的其他行为。<br>
			 6.2丙方保留将甲方违约失信的相关信息提供给征信机构和在媒体披露的权利。<br>
			 6.3因甲方未依约履行还款义务而导致各方发起维权行为产生费用将由甲方承担，包括但不限于调查费、交通费、误工费、诉讼费及律师代理费等。<br>
			 6.4甲方违约行为构成犯罪的，本协议各方均将有权向相关国家机关报案，追究甲方刑事责任。<br>
			 七、 争议与解决<br>
			 7.1如果各方在本协议履行过程中发生争议，任何一方可将争议提交杭州仲裁委员会，按照提交争议时该会时执行的仲裁规则进行仲裁，仲裁在杭州进行，仲裁费由对仲裁结果承担不利后果的一方承担。<br>
			 7.2乙方在此不可撤销地委托丙方代为处理本协议项下乙方与甲方之间的全部争议，委托代理权限包括但不限于代为提出、承认、变更、撤回、放弃仲裁请求；代为进行答辩，提出、承认、变更、撤回、放弃仲裁反请求；代为约定仲裁庭组成方式、选定仲裁员；参加开庭审理、陈述事实及代理意见并参加调查、质证活动；接受调解、和解；代为领取仲裁文书及仲裁标的。并且，乙方同意丙方可将前述委托事项转委托给专业机构及人员（如律师事务所、律师等）启动仲裁程序。<br>
			 八、 其他<br>
			 8.1本协议经甲乙双方通过惠财平台以网络在线点击的方式签订。<br>
			 8.2各方确认，就丙方为甲乙双方借款关系的达成所提供的居间服务，不表明或暗示为债权及债务法律关系的一方，相关风险由交易各方自行承担。<br>
			 8.3本协议项下税费由交易各方自行承担。<br>
			 8.4 本协议的任何修改、补充均须以惠财平台电子文本形式作出。<br>
			 8.5各方委托惠财平台保管所有与本协议有关的书面文件或电子信息。<br>
			 8.6 本协议中所使用的定义，除非另有规定，否则应适用惠财平台释义规则，惠财平台对本文定义享有最终解释权。<br>
		</div>
		<div class="time_box">签约日期：{{timeType}}</div>
	</div>

	
	   
  </div>
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'

export default {
  data () {
	return {
		token : '',
		amount : '',
		amountCapital : '',
		discountCouponType : '',
		discountCouponId : '',
		period : '',
		annualizedRates : '',
		annualizedRatePlus : '',
		items:{},
		borderList : {},
		timeName : '',
		timeType : '',
		capitalUse : '',
		createTime : '',
		beginDate : '',
		endDate : '',
		repayModeTitle : '',
		uuid : ''

	}
  },
  methods:{
	returns(){
		this.$router.go(-1);
	},
	agreementFun(){
		var timeText = '';
		if(this.timeName != ""){
			timeText = this.timeName + " 00:00:00"
		}else{
			timeText = Date.format(new Date(),"yyyy-MM-dd hh:mm:ss")
		}
		/*var timeText = this.timeName + " 00:00:00";*/
		if(this.token != ''){
			axios.post('/api/v2/open_auth/financing_project/financial_agreement/'+this.uuid,{
				token: this.token,
				amount :this.amount,
				payTime:timeText,
				discountCouponType :this.discountCouponType,
				discountCouponId : this.discountCouponId
			})
			.then(res=>{
				if(res.data.code=="SUCCESS"){
					if(res.data.result.capitalUse!=null){
						this.capitalUse = res.data.result.capitalUse;
					}else{
						this.capitalUse = "日常资金周转";
					}
					if(res.data.result.repayModeTitle!=null){
						this.repayModeTitle = res.data.result.repayModeTitle;
					}else{
						this.repayModeTitle ="到期一次性还本付息";
					}
					this.annualizedRates = res.data.result.annualizedRates+"%";
					this.annualizedRatePlus = res.data.result.annualizedRatePlus;
					if(res.data.result.borrower!=null){
						this.borderList =  res.data.result.borrower;
					}
					
					this.beginDate  = res.data.result.beginDate.split(" ")[0];
					this.endDate = res.data.result.endDate.split(" ")[0];
					this.items = res.data.result;
					
				}else if(res.data.code=="TOKEN_ERROR"){
					this.$toast("信息失效，请重新登录")
				}else{
					this.$toast(data.msg)
				}
			})
		}
	},
	Arabia_to_Chinese:function(Num) {
		for (var i = Num.length - 1; i >= 0; i--) {
			Num = Num.replace(",", "") //替换tomoney()中的“,”
			Num = Num.replace(" ", "") //替换tomoney()中的空格
		}
		Num = Num.replace("￥", "") //替换掉可能出现的￥字符
		if (isNaN(Num)) { //验证输入的字符是否为数字
			//alert("请检查小写金额是否正确");
			return;
		}
		//字符处理完毕后开始转换，采用前后两部分分别转换
		var part = String(Num).split(".");
		var newchar = "";
		//小数点前进行转化
		for (var i = part[0].length - 1; i >= 0; i--) {
			if (part[0].length > 10) {
				//alert("位数过大，无法计算");
				return "";
			} //若数量超过拾亿单位，提示
			var tmpnewchar = "";
			var perchar = part[0].charAt(i);
			switch (perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "壹" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "贰" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "叁" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "肆" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "伍" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "陆" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "柒" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "捌" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "玖" + tmpnewchar;
				break;
			}
			switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar + "元";
				break;
			case 1:
				if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
				break;
			case 2:
				if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
				break;
			case 3:
				if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
				break;
			case 4:
				tmpnewchar = tmpnewchar + "万";
				break;
			case 5:
				if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
				break;
			case 6:
				if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
				break;
			case 7:
				if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
				break;
			case 8:
				tmpnewchar = tmpnewchar + "亿";
				break;
			case 9:
				tmpnewchar = tmpnewchar + "拾";
				break;
			}
			newchar = tmpnewchar + newchar;
		}
		//小数点之后进行转化
		if (Num.indexOf(".") != -1) {
			if (part[1].length > 2) {
				//alert("小数点之后只能保留两位,系统将自动截断");
				part[1] = part[1].substr(0, 2)
			}
			for (var i = 0; i < part[1].length; i++) {
				tmpnewchar = "";
				perchar = part[1].charAt(i);
			switch (perchar) {
				case "0":
					tmpnewchar = "零" + tmpnewchar;
					break;
				case "1":
					tmpnewchar = "壹" + tmpnewchar;
					break;
				case "2":
					tmpnewchar = "贰" + tmpnewchar;
					break;
				case "3":
					tmpnewchar = "叁" + tmpnewchar;
					break;
				case "4":
					tmpnewchar = "肆" + tmpnewchar;
					break;
				case "5":
					tmpnewchar = "伍" + tmpnewchar;
					break;
				case "6":
					tmpnewchar = "陆" + tmpnewchar;
					break;
				case "7":
					tmpnewchar = "柒" + tmpnewchar;
					break;
				case "8":
					tmpnewchar = "捌" + tmpnewchar;
					break;
				case "9":
					tmpnewchar = "玖" + tmpnewchar;
					break;
				}
				if (i == 0) tmpnewchar = tmpnewchar + "角";
				if (i == 1) tmpnewchar = tmpnewchar + "分";
				newchar = newchar + tmpnewchar;
			}
		}
		//替换所有无用汉字
		while (newchar.search("零零") != -1) newchar = newchar.replace("零零", "零");
		newchar = newchar.replace("零亿", "亿");
		newchar = newchar.replace("亿万", "亿");
		newchar = newchar.replace("零万", "万");
		newchar = newchar.replace("零元", "元");
		newchar = newchar.replace("零角", "");
		newchar = newchar.replace("零分", "");
		if (newchar.charAt(newchar.length - 1) == "元" || newchar.charAt(newchar.length - 1) == "角") newchar = newchar + "整"
		return newchar;
	}

				 

  },
  components:{
	
  },
  computed: {
   
  },
  mounted(){
		var d = new Date();
		var gmtCreates =  HC.vueurlFun("gmtCreates") || '';
		if(gmtCreates!==''){
			this.timeName =  gmtCreates;
			this.timeType =  gmtCreates;
		}else{
			this.timeName =  Date.format(d,"yyyy-MM-dd");
			this.timeType =  Date.format(d,"yyyy年MM月dd日");
		}
		this.token =  HC.vueurlFun("app_token") || '';
		this.amount =  HC.vueurlFun("buyAmount") || '';
		this.amountCapital = this.Arabia_to_Chinese(this.amount)
		this.discountCouponType =  HC.vueurlFun("discountCouponType") || '';
		this.discountCouponId =  HC.vueurlFun("discountCouponId") || '';
		this.uuid =  HC.vueurlFun("financingTargetId") || '';
		console.log(this.uuid)
		this.agreementFun()
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
  .max_box{
	width:100%;
	overflow:hidden;
	background-color:#f7f7f7;
	color:#2d353a;
	margin-top: 45px;
  }
  .agree_top{
	width:96%;
	margin:auto;
	font-size:16px;
	margin-top: 12px;
	margin-bottom:10px;
  }
  .agee_cont{
	width:96%;
	margin:20px auto;
	line-height: 40px;
}
  .agree_sty{
	width:96%;
	margin:auto;
	line-height:40px;
	overflow:hidden;
	margin-top:20px;
  }
  .agee_left,.agee_one{
	width:40%;
	float:left;
	text-align:right;
  }
  
  .agee_right,.agee_two{
	width:56%;
	height:40px;
	border-bottom:solid 1px #c7c7c7;
	float:left;
	padding-left: 10px;
  }
  .agee_one,.agee_two{
	width:46%;
  }
  
  .atree_time{
	width:100%;
	font-size:12px;
	text-align:center;
  }
  .time_box{
	width:96%;
	margin:20px auto;
  }
.table{
  width: 94%;
  margin: 0 auto;
  border: 1px solid #ddd;
  overflow: hidden;
  margin-top: 20px;
}
.table ul li{
  clear: both;
}
.table ul li .div01{
  width: 42%;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 3%;
  box-sizing:border-box;
  font-size: 12px;
  height: 39px;
}
.table ul li .div02{
  width: 58%;
  background: #FFF;
  border-bottom: 1px solid #ddd;
  padding: 3%;
  box-sizing:border-box;
  font-size: 12px;
  height: 39px;
}
.table ul li:nth-last-child(1) div{
  border: none;
}
.table ul li:nth-last-child(1) .div01{
  border-right: 1px solid #ddd;
}

</style>
