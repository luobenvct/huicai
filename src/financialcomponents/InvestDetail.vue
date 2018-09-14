<template>
	<div class="details_box">
		<div v-show="isShow">
			<div class="top">
				<div @click="returns" class="returns fl">
					<img src="../assets/img/Back_icon.png" height="18" width="18">
				</div>
				<div class="name fl">{{targetDetailData.name}}</div>
				<div @click="wenti" class="wenti fr"><img src="../assets/deposits_img/wenti.png" height="20" width="20"></div>
			</div>
			<div class="wapper01">
				<div class="content_text">预期年化</div>
				<div class="content_rateout" v-if="soldoutTrue">已售罄</div>
				<div class="content_rateout" v-else-if="paybackTrue">已还款</div>
				<div class="content_rate" v-else>
					<div v-if="targetDetailData.annualizedRatePlus > 0">
						<span>{{targetDetailData.annualizedRates}}</span>%
						<span class="add01">+</span>
						<span class="add02">{{targetDetailData.annualizedRatePlus}}</span>
						<span class="add03">%</span>
					</div>
					<div v-else>
						<span>{{targetDetailData.annualizedRates}}</span>%
					</div>
				</div>
				<div class="content_detail">
					<span class="span01">{{targetDetailData.bidCount}}</span>
					<span class="span02">位用户已投资</span>
					<span @click="goInvestmentRecord"><img src="../assets/img/details.png" height="16" width="42"></span>
				</div>
			</div>
			<div class="wapper02">
				<ul>
					<li class="li01">
						<div class="opacity">起投金额</div>
						<div><span>{{targetDetailData.minAmount}}</span>元</div>
					</li>
					<li class="li02">
						<div class="opacity">剩余金额</div>
						<div><span>{{targetMain}}</span>元</div>
					</li>
					<li class="li03">
						<div class="opacity">投资期限</div>
						<div v-if="targetDetailData.type == 'SCB'">无</div>
						<div v-else><span>{{targetDetailData.period}}</span>天</div>
					</li>
				</ul>
			</div>
			<!-- <div class="notice" v-if="targetDetailData.tagetSummery">
				<div class="notice_name">【活动】</div>
				<marquee behavior="scroll" direction="left" scrollamount="4" class="notice_content">{{targetDetailData.tagetSummery}}</marquee>
			</div> -->
			<div class="notice" v-if="targetDetailData.tagetSummery" @click="addressUrl">
				<div class="notice_name">【活动】</div>
				<div class="item_max">
	        		<div class="item_box">
		        		<div class="item_inte">{{targetDetailData.tagetSummery}}</div>
		        		<div class="item_inte">{{targetDetailData.tagetSummery}}</div>
		        	</div>
	        	</div>
			</div>
			<div class="star">
				<span class="star_spn01">资产等级</span>
				<span><img src="../assets/img/details_star.png" height="14" width="15"></span>
				<span><img src="../assets/img/details_star.png" height="14" width="15"></span>
				<span><img src="../assets/img/details_star.png" height="14" width="15"></span>
				<span><img src="../assets/img/details_star.png" height="14" width="15"></span>
				<span><img src="../assets/img/details_star.png" height="14" width="15"></span>
				<span class="assets_level">优</span>
			</div>
			<div class="line"></div>
			<div class="wapper03">
				<ul>
					<li class="li01">
						<div class="color01">起息日</div>
						<div class="color02">{{beginTime}}</div>
					</li>
					<li class="li02">
						<div class="color01">到期日</div>
						<div class="color02">{{endTime}}</div>
					</li>
					<li class="li03">
						<div class="color01">本息到账</div>
						<div class="color02">T(到期日)+{{targetDetailData.settleInterestOffset}}</div>
					</li>
				</ul>
				<div class="yuan"><img src="../assets/img/details_line.png" height="10" width="90%"></div>
			</div>
			<div class="line"></div>
			<div class="wapper04">
				<div class="moneyname fl">借款金额</div>
				<div class="moneynum fr">{{targetDetailData.collectAmount}}元</div>
			</div>
			<div class="wapper05">
				<div class="typename fl">回款方式</div>
				<div class="typeresult fr">
					<div class="result01">到期一次性还本付息</div>
					<div class="result02">正常情况下T+1个工作日内自动回款至<!-- 奖励账户或 -->原银行卡，遇节假日顺延(具体到账时间视银行而定)</div>
				</div>
			</div>
			<div class="line" style="margin-top:12px; margin-bottom:10px;"></div>
			<div class="detail_btn" @click="lookmore">查看更多相关详情</div>
		</div>

		<!-- 更多详情模块 -->
		<div class="more_wapper" v-show="!isShow">
			<div class="top">
				<div @click="goback" class="returns fl">
					<img src="../assets/img/Back_icon.png" height="18" width="11">
				</div>
				<div class="name fl">{{targetDetailData.name}}</div>
			</div>
			<div class="page-navbar">
				<mt-navbar class="page-part" v-model="selected">
					<mt-tab-item id="1">产品说明</mt-tab-item>
					<mt-tab-item v-show="type !='SCB'" id="2">还款来源</mt-tab-item>
					<mt-tab-item id="3">安全保障</mt-tab-item>
				</mt-navbar>
				<div class="line"></div>
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1">						
						<div class="table">
							<div class="clear background">
								<div class="fl table_left">项目信息</div>
								<div class="fr table_right">&nbsp;</div>
							</div>
							<div class="clear">
								<div class="fl table_left">项目名称</div>
								<div class="fr table_right">{{targetDetailData.name}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">项目简介</div>
								<div class="fr table_right more_right" @click="ProjectIntroduction"><img src="../assets/img/puch03.png" height="13" width="8"></div>
							</div>
							<!-- 项目简介 -->
							<div class="black_two" @click="closeProject" v-show="ProjectShow"></div>
							<div class="project" v-show="ProjectShow">
								<div class="fr close_btn" @click="closeProject">
									<img src="../assets/img/puch11.png" height="16" width="16">
								</div>
								<div class="project_clear">
									项目介绍：<span v-html="targetDetailData.description"></span>
								</div>
							</div>
							<div class="clear">
								<div class="fl table_left">期望年化利率</div>
								<div class="fr table_right">{{annualizedRates}}%</div>
							</div>
							<div class="clear">
								<div class="fl table_left">借款用途</div>
								<div class="fr table_right">{{targetDetailData.capitalUse}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">借款期限</div>
								<div class="fr table_right">{{targetDetailData.period}}天</div>
							</div>
							<div class="clear">
								<div class="fl table_left">借款金额</div>
								<div class="fr table_right">{{targetDetailData.collectAmount}}元</div>
							</div>
							<div class="clear">
								<div class="fl table_left">还款方式</div>
								<div class="fr table_right">{{targetDetailData.repayModeTitle}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">起投金额</div>
								<div class="fr table_right">{{targetDetailData.minAmount}}元</div>
							</div>
							<div class="clear">
								<div class="fl table_left">投资上限</div>
								<div class="fr table_right">{{targetDetailData.limitAmount}}元</div>
							</div>
							<div class="clear">
								<div class="fl table_left">资产来源</div>
								<div class="fr table_right">{{targetDetailData.assetsSources}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">风险评估及结果</div>
								<div class="fr table_right more_right" @click="riskAssessment"><img src="../assets/img/puch03.png" height="13" width="8"></div>
							</div>
							<div class="clear">
								<div class="fl table_left">查看合同(范本)</div>
								<div class="fr table_right more_right" @click="contract"><img src="../assets/img/puch03.png" height="13" width="8"></div>
							</div>
							<div class="clear">
								<div class="fl table_left">还款保障措施</div>
								<div class="fr table_right more_right" @click="SafeguardFun"><img src="../assets/img/puch03.png" height="13" width="8"></div>
							</div>
							<div class="clear">
								<div class="fl table_left">担保措施</div>
								<div class="fr table_right">{{targetDetailData.bailControl}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">募集期</div>
								<div class="fr table_right">{{targetDetailData.raiseDay}}天</div>
							</div>
							<div class="clear">
								<div class="fl table_left">发起时间</div>
								<div class="fr table_right">{{targetDetailData.issuedBeginDate}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">匹配到期时间</div>
								<div class="fr table_right">{{targetDetailData.issuedEndDate}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">收取出借人费用</div>
								<div class="fr table_right">{{targetDetailData.lenderFee}}元</div>
							</div>
							
						</div>
						<div class="table" v-show="type !='SCB'">
							<div class="clear background">
								<div class="fl table_left">借款人基本信息</div>
								<div class="fr table_right">&nbsp;</div>
							</div>
							<div class="clear">
								<div class="fl table_left">借款人</div>
								<div class="fr table_right">{{borrowerData.trueName}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">身份证号/统一社会信用代码</div>
								<div class="fr table_right">{{borrowerData.pid}}<br/>&nbsp;</div>
							</div>
							<div class="clear">
								<div class="fl table_left">主体性质</div>
								<div class="fr table_right">{{borrowerData.type}}</div>
							</div>
							<!-- <div class="clear">
								<div class="fl table_left">工作性质</div>
								<div class="fr table_right">{{borrowerData.workNature}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">所属行业</div>
								<div class="fr table_right">{{borrowerData.trade}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">月均收入</div>
								<div class="fr table_right">{{borrowerData.monthlyIncome}}</div>
							</div> -->
							<div class="clear">
								<div class="fl table_left">负债情况</div>
								<div class="fr table_right">{{borrowerData.debtSituation}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">其他平台借款</div>
								<div class="fr table_right">{{borrowerData.otherPlatformBorrowAmount}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">征信信息</div>
								<div class="fr table_right">{{borrowerData.reditInvestigation}}</div>
							</div>
							<div class="clear">
								<div class="fl table_left">平台逾期次数</div>
								<div class="fr table_right">{{borrowerData.overdueCount}}次</div>
							</div>
							<div class="clear">
								<div class="fl table_left">平台逾期总金额</div>
								<div class="fr table_right">{{borrowerData.overdueAmount}}元</div>
							</div>
							<div class="clear" v-if="inspectionShow">
								<div class="fl table_left">实地考察</div>
								<div class="fr table_right more_right" @click="inspection"><img src="../assets/img/puch03.png" height="13" width="8"></div>
							</div>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
						<div class="repayment" v-if="targetDetailData.repaymentOrigin" v-html="targetDetailData.repaymentOrigin"></div>
						<div v-else></div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
						<div class="max_box">
						 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_01.png">
						 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_02.png">
						 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_03.png">
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div> 
		</div>

		<!-- 计算器 -->
		<div class="black" @click="close" v-show="calShow"></div>
		<div class="calculator" v-show="calShow">
			<div class="del fr" @click="close"><img src="../assets/img/detail_del.png" height="14" width="14"></div>
			<h2 class="cal_name">计算收益</h2>
			<div class="cal_main">
				<div class="cal_main01 fl">
					<span><img src="../assets/img/detail_money.png" height="21" width="21"></span>
					<input type="text" maxlength="10" name="name" placeholder="投资金额" v-model="money" ref="focus">
					<span class="money">元</span>
				</div>
				<div class="cal_main02 fr">
					<span class="fl"><img src="../assets/img/detail_calculator.png" height="18" width="22"></span>
					<span class="fl today03" v-if="targetDetailData.type == 'SCB'">
						<input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="4" name="name" placeholder="投资期限" v-model="period" ref="focus">
					</span>
					<span class="fl today02" v-else>{{targetDetailData.period}}</span>
					<span class="fr today">天</span>
					
				</div>
			</div>
			<div class="cal_bottom">
				<span class="cal_name01 fl">产品预期收益</span>
				<span class="cal_name02 fr" v-if="targetDetailData.type == 'SCB'">{{calculatorAAmoney}}</span>
				<span class="cal_name02 fr" v-else>{{calculatorBBmoney}}</span>
			</div>
		</div>
		<div class="footer">
			<div class="footer_wapper">
				<div class="footer01 fl" @click="calculator"><img src="../assets/img/details_count.png" height="32" width="33"></div>
				<div v-if="loginUser">
					<div class="footerout02 fr" v-if="soldoutTrue">已售罄</div>
					<div class="footerout02 fr" v-else-if="paybackTrue">已还款</div>
					<div class="footer02 fr" v-else-if="RiskWarningShowBtn && RiskWarningShowBtnTwo && hhbShow"  @click="goWarning">
						购买
						<!-- <div>单笔限额：{{limit}}元</div> -->
					</div>
					<div class="footer02 fr" v-else  @click="goPurchase">
						购买
						<!-- <div>单笔限额：{{limit}}元</div> -->
					</div>
				</div>
				<div v-else>
					<div class="footer02 fr" @click="gologin">购买<!-- <div>单笔限额：{{limit}}元</div> --></div>
				</div>
			</div>
		</div>

		<!-- 测评 -->
		<div class="black_two" v-show="riskShow" @click="closeRisk"></div>
		<div class="wapper_risk" v-show="riskShow">
			<div class="close_btn" @click="closeRisk">
				<img src="../assets/deposits_img/puch11.png" height="16" width="16">
			</div>
			<div class="text text_tip">您还没有进行过风险测评，做好风险测评，了解自己的风险承受能力，选择合适的理财产品</div>
			<div class="text text_tip">我是:</div>
			<div class="risk_btn" v-for="item in measurementList">
				<div class="risk_btn_one" @click="conservative(item)">{{item.grade}}</div>
				<div class="risk_tip">投资建议:0-{{item.amountLimit/10000}}万</div>
			</div>
			<div class="line_one"></div>
			<div class="risk_btn_two" @click="goRiskAssessment">自主测评(进入测评答题系统)</div>
		</div>

		<!-- 风险提示 -->
		<div class="black_three" v-show="!RiskWarningShow" @click="closekWarning"></div>
		<div class="warning" v-show="!RiskWarningShow">
			<div class="close_btn" @click="closekWarning">
				<img src="../assets/deposits_img/puch11.png" height="16" width="16">
			</div>
			<div class="warning_head">投资建议</div>
			<div class="warning_tip">所购买的标的已超出您的风险承受能力，请谨慎选择哦！</div>
			<div class="warning_btn" @click="goPurchase">知道了，就要买</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'

export default {
	name: 'details_box',
	data () {
		return {
			userId:"",
			userName:'',		   //标的名称
			targetDetailData:[],   //标的详情数据
			borrowerData:[],       //借款人信息
			targetMain:'',    	   //融资剩余金额
			endTime:'',
			beginTime:'',
			selected:'1',
			isShow:true,
			calShow:false,          //是否显示计算器的字段
			money:'',				//金额
			period:'',				//惠活宝投资期限
			rating:'',				
			periodTwo:'',  			//定期投资期限
			soldout:'',
			soldoutTrue:false,      
			paybackTrue:false,
			newUser:false,    		//是否是新人
			newInvestor:"",			//是否是新人惠标的
			token:'',
			loginUser:false,        //是否登录字段
			uuid:'',                //标的uuid
			href:'',                //活动链接
			type:"",				//标的类型
			annualizedRates:0,      //标的实际利息
			ProjectShow:false,      //项目简介
			limit:0,                //单笔限额
			SafeguardMeasures:'',   //还款保障
			borrowerId:"",          //借款人id
			risk:false,              //是否测评
			riskShow:false,           //显示测评弹框
			measurementList:[],		  //测评类型以及数据
			borrowerInfo:'',          //实地考察数据
			RiskWarningShow:true,     //是否向用户有过风险提示
			RiskWarningShowBtn:false, //是否向用户有过风险提示按钮
			RiskWarningShowBtnTwo:false, //是否向用户有过风险提示按钮
			hhbShow:false,            //惠活宝不提示
			alreadyMoney:0,           //已投总金额
			riskname:'',              //投资风险类型
			limitMoney: 0,            //投资风险类型--对应的限额
			inspectionShow:false      //是否显示实地考察判断字段
			//riskShow:false          //风险评估
		}
	},
	components:{
		
	},
	computed: {
		/*计算惠活宝利息--方法*/
		calculatorAAmoney(){
			let thismoney = (this.money).replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			let thisperiod = (this.period).replace(/\D/g, "");
			return ((thismoney*thisperiod*this.rating)/100/365).toFixed(2)
		},
		/*计算定期利息--方法*/
		calculatorBBmoney(){
			let thismoney = (this.money).replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			return ((thismoney*this.periodTwo*this.rating)/100/365).toFixed(2)
		}
	},
	methods:{
		/*返回--事件*/
		returns(){
			this.$router.go(-1);
		},
		/*moveFun(){
			
		},*/
		addressUrl(){
			window.location.href = this.targetDetailData.cityAddress;
		},
		closeRisk(){
			this.riskShow = false;
		},
		riskFun(){
			if(this.token!=''){
				/* 获取用户单个标的总投资*/
			    axios.post('/api/v2/financing_project_bid/user/bid_amount/'+this.userId, {
			        app_token:this.token,
			        isDepository:false
			    })
			    .then(res =>{
			      	console.log("获取用户单个标的总投资")
			        console.log(res)
			        this.alreadyMoney = +res.data.result;
			    })
			    .catch(res=> {
			        console.log(res);
			    });
				/*风险类型结果*/
				axios.post('/api/v2/risk_preference_assessment/result',{
					app_token : this.token
				})
				.then((res)=>{
					console.log("v2风险偏好结果")
					console.log(res)
					if(res.data.code == "SUCCESS"){
						if(res.data.result.length==2){
							this.risk = true;
							this.riskname = res.data.result[1].grade;
							//alert(this.riskname)
							/*购买限额list*/
						    axios.post('/api/v2/pub/register/open_auth/risk_remind_amount_limit', {
						        
						    })
						    .then(res =>{
						        console.log("购买限额list")
						        console.log(res)
						        res.data.result.forEach((item)=>{
						        	if(this.riskname == item.grade){
						        		this.limitMoney = item.amountLimit;
						        		if(this.alreadyMoney-this.limitMoney<0){
						        			this.RiskWarningShowBtnTwo = false;
						        		}else{
						        			this.RiskWarningShowBtnTwo = true;
						        		}
						        	}
						        })
						    })
						    .catch(res=> {
						        console.log(res);
						    });
						}else{
							this.risk = false;
							this.riskname = "";
						}
					}
					if(res.data.code == "TOKEN_ERROR"){
					  	this.loginUser = false; 
					}
				})
				
			}else{
				
			}
			
		},
		/*到测评页面进行测评*/
		goRiskAssessment(){
			this.$router.push({ name: 'RiskAssessment', params: { userId: this.userId,bidtype:'common'}})
		},
		/*选择你的理财类型*/
		conservative(item){
			axios.post('/api/v2/risk_preference_assessment/save_risk_type',{
				app_token : this.token,
				riskType: item.type
			})
			.then((res)=>{
				if(res.data.code=="SUCCESS"){
					this.$router.push({ name: 'MeasurementResults', params: { userId: this.userId,bidtype:'common'}})		
				}
			})
		},
		/*到帮助反馈页面*/
		wenti(){
			this.$router.push({path:'/helpfeedback'});
		},
		/*改变两个模块显示隐藏切换的字段--方法*/
		goback(){
			this.isShow = true;
		},
		/*到登录页面--事件*/
		gologin(){
			this.$router.push({path:'/login'});
		},
		/*项目简介*/
		ProjectIntroduction(){
			this.ProjectShow = true;
		},
		/*关闭项目简介*/
		closeProject(){
			this.ProjectShow = false;
		},
		/*风险评估*/
		riskAssessment(){
			this.$router.push({path:'/detailriskassessment'});
		},
		/*关闭风险评估*/
		closeRisk(){
			this.riskShow = false;
		},
		/*关闭风险提示*/
		closekWarning(){
			this.RiskWarningShow = true;
		},
		/*到合同范本*/
		contract(){
			this.$router.push({path:"/agreementsignature?app_token="+this.token +"&buyAmount=" + "0" + "&financingTargetId=" + this.uuid  +"&depository=false" })
		},
		/*到实地考察页面*/
		inspection(){
			this.$router.push({name:'Inspection',params:{borrowerInfo:this.borrowerInfo}});
		},
		/*到投资记录--事件*/
		goInvestmentRecord(){
			this.$router.push({ name: 'InvestmentRecord', params: { userId: this.userId}});
		},
		/*到还款保障--事件*/
		SafeguardFun(){
			this.$router.push({ name: 'SafeguardMeasures', params: { safeData: this.SafeguardMeasures}});
		},
		/*风险提示*/
		goWarning(){
			this.RiskWarningShow = false;
		},
		/*到购买页面--事件*/
		goPurchase(){
			if(this.RiskWarningShow == false){
			    axios.post('/api/v2/user_reminder/invest_amount_risk/remind', {
			        app_token:this.token,
			        projectUuid:this.userId
			    })
			    .then(res =>{
			      	console.log("当前标的投资金额风险是否已提示过")
			        console.log(res)
			    })
			    .catch(res=> {
			        console.log(res);
			    });
		    }
			if(this.newUser == false && this.newInvestor == true){
				this.$messagebox('提示',"此标的为新人惠标的，您已购买，请继续购买其他理财产品。");
				return;
			}else if(this.risk == false){
				this.riskShow = true;
				return;
			}else{
				this.$router.push({ name: 'Purchase', params: { userId: this.userId}});
			}


			/*if(this.newUser == false && this.newInvestor == true){
				this.$messagebox('提示',"此标的为新人惠标的，您已购买，请继续购买其他理财产品。");
				return;
			}else{
				this.$router.push({ name: 'Purchase', params: { userId: this.userId}})
			}	*/
		},
		//查看更多
		lookmore(){
			this.isShow = false;
		},
		//显示计算器
		calculator(){
			this.calShow = true;
		},
		//关闭计算器
		close(){
			this.calShow = false;
			this.money = '';
		},
		/*借款人信息*/
		borrowerFun(){
			/*借款人信息*/
		    axios.post('/api/v2/account/borrower/'+this.borrowerId, {
		        
		    })
		    .then(res =>{
		        console.log("借款人信息")
		        console.log(res);
		        if(res.data.code == "DATA_IS_NULL"){
		        	this.borrowerData = [];
		        	return;
		        }
		        this.borrowerData = res.data.result;
        		if(this.borrowerData.workNature == null){
		        	this.borrowerData.workNature = "无";
		        }
		        if(this.borrowerData.trade == null){
		        	this.borrowerData.trade = "无";
		        }
		        if(this.borrowerData.monthlyIncome == null){
		        	this.borrowerData.monthlyIncome = "无";
		        }
		        if(this.borrowerData.debtSituation == null){
		        	this.borrowerData.debtSituation = "无负债";
		        }
		        if(this.borrowerData.overdueCount == null){
		        	this.borrowerData.overdueCount = 0;
		        }
		        if(this.borrowerData.overdueAmount == null){
		        	this.borrowerData.overdueAmount = 0;
		        }
		        if(this.borrowerData.otherPlatformBorrowAmount == null){
		        	this.borrowerData.otherPlatformBorrowAmount = "无其他平台借款";
		        }
		        if(this.borrowerData.type == 'Company'){
		        	this.borrowerData.type = "公司";
		        	this.borrowerData.pid = this.borrowerData.organizationCode;
		        }else if(this.borrowerData.type == '公司'){
		        	this.borrowerData.pid = this.borrowerData.organizationCode;
		        }else{
		        	this.borrowerData.type = "自然人";
		        }
		    })
		    .catch(res=> {
		        console.log(res);
		    });
		},
		/*进页面就要执行的方法*/
		dataFn(){
			//标的详情
			axios.post('/api/financing_target_findby_id.htm', {
				id:this.userId
			})
			.then(res =>{
				console.log("标的详情数据");
				console.log(res);
				//debugger
				this.targetDetailData = res.data;
				var data = this.targetDetailData;
				if(data.borrowerInfo == undefined || data.borrowerInfo== ""){
					this.inspectionShow = false;
				}else{
					this.inspectionShow = true;
					this.borrowerInfo = data.borrowerInfo;
				}
				if(data.capitalUse == null){
					data.capitalUse = "日常资金周转";
				}
				if(data.assetsSources == null){
					data.assetsSources = "合作方推荐";
				}
				if(data.bailControl == null){
					data.bailControl = "债权回购，个人担保，第三方担保";
				}
				if(data.repayModeTitle == null){
					data.repayModeTitle = "到期还本付息";
				}
				data.annualizedRates = HC.decimalFun(data.annualizedRates);
				if(data.annualizedRatePlus != null){
					this.annualizedRates = ((data.annualizedRates-0)+(data.annualizedRatePlus-0)).toFixed(2);
					this.rating = ((data.annualizedRates-0)+(data.annualizedRatePlus-0));
				}else{
					this.annualizedRates = (data.annualizedRates-0).toFixed(2);
					this.rating = (data.annualizedRates-0);
				}
				
				data.minAmount =  HC.decimalFun(data.minAmount);
				data.collectAmount = HC.decimalFun(data.collectAmount);
				data.limitAmount = HC.decimalFun(data.limitAmount);
				if (data.issuedBeginDate != null) {
					data.issuedBeginDate = (data.issuedBeginDate).split(" ")[0] ;
					data.issuedEndDate = (data.issuedEndDate).split(" ")[0];
				}else{
					data.issuedBeginDate ="已售罄";
					data.issuedEndDate = "已售罄";
				}
				
				this.limit = HC.decimalFun(data.limitAmount);
				this.SafeguardMeasures = data.repayControl;
				
				this.periodTwo = data.period;
				if ( HC.decimalFun(data.collectAmount - data.finishAmount) < 0) {
					this.targetMain = "0.00"
				}else{
					this.targetMain = HC.decimalFun(data.collectAmount - data.finishAmount);
				}
				
				/*alert(data.collectAmount)
				alert(data.finishAmount)
				alert(this.targetMain)*/
				var dayTime = new Date();
				this.beginTime = Date.format(dayTime.addDay(data.carryInterestOffset));
				this.endTime = Date.format(dayTime.addDay(data.period));
				this.newInvestor = data.newInvestor;
				this.type = data.type;
				this.uuid = data.uuid || data.id;
				this.borrowerId = data.borrowerId;
				if(this.type != "SCB"){
					this.borrowerFun();
					this.hhbShow = true;
				}else{
					data.repayModeTitle = '无';
					this.hhbShow = false;
				}
				/*this.href = data.cityAddress;*/
			})
			.catch(res=> {
				console.log(res);
			});
			/*新人惠购买 是否是新人*/
		    axios.post('/api/is_new_investor.htm', {
		        token: this.token
		    })
		    .then(res =>{
		        console.log("测试是否是新用户")
		        console.log(res)
		        if(res.data == false){
		          this.newUser = false;
		        }
		        if(res.data == true){
		          this.newUser = true;
		        }
		    })
		    .catch(res=> {
		        console.log(res);
		    });
		    /*购买限额list*/
		    axios.post('/api/v2/pub/register/open_auth/risk_remind_amount_limit', {
		        
		    })
		    .then(res =>{
		        console.log("购买限额list")
		        console.log(res)
		        this.measurementList = res.data.result;
		    })
		    .catch(res=> {
		        console.log(res);
		    });
		    /* 当前标的投资金额风险是否已提示过*/
		    axios.post('/api/v2/user_reminder/invest_amount_risk/is_remind', {
		        app_token:this.token,
		        projectUuid:this.userId
		    })
		    .then(res =>{
		      	console.log("当前标的投资金额风险是否已提示过")
		        console.log(res)
		        if(res.data.result == false){
		        	this.RiskWarningShowBtn = true;
		        }else{
		        	this.RiskWarningShowBtn = false;
		        }
		    })
		    .catch(res=> {
		        console.log(res);
		    });  
		}
	},
	mounted(){
		this.token = HC.getStorage('sessionToken');
		this.userName = this.$route.params.userName;
		this.soldout = this.$route.params.soldout;
		this.userId = this.$route.params.userId;
		if(this.soldout == 'soldout'){
			this.soldoutTrue = true;
		}else{
			this.soldoutTrue = false;
		}
		if(this.soldout == 'payback'){
			this.paybackTrue = true;
		}else{
			this.paybackTrue = false;
		}
		this.riskFun();	
		this.dataFn();
		this.$nextTick(() => {
			this.$refs.focus.focus();
		})   
		if(this.token == "" | this.token == null){
	      this.loginUser = false;
	    }else{
	      this.loginUser = true;
	    }   
	    
	},
	created(){
		if(this.targetDetailData.tagetSummery!=""||this.targetDetailData.tagetSummery!=null){
			setInterval(()=>{
				var itenheight =  $(".item_inte").width();
				$(".item_box").animate({marginLeft:-itenheight-54},10000,function(){
					$(".item_box .item_inte:last").after($(".item_box .item_inte:first"));
					$(".item_box .item_inte:last").css("margin-left","0")
					$(".item_box").css({marginLeft:0})
				})
			},10000);
		}
		
	},
	watch: {
		money(curVal,oldVal){
			this.money = this.money.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.more_wapper .borrow02 p:nth-child(1){
	padding: 10px 0 0 4% !important;
	font-size: 12px !important;
}
.more_wapper .borrow02 p{
	padding: 10px 1% 0 4% !important;
	font-size: 12px !important;
}
.more_wapper .borrow02 img{
	width: 96%;
	display: block;
	margin:10px auto 0;
}
.repayment p{
	background: url('../assets/img/quadrilateral.png') no-repeat 15px center;
	background-size: 12px;
	padding-left: 40px;
	line-height: 50px;
	border-bottom: 1px solid #CCC;
	font-size: 14px;
}
.repayment ul{
	margin-left: 4%;
}
.repayment ul li{
	font-size: 14px;
	margin: 10px 0;
}
.mint-navbar .mint-tab-item-label{
	font-size: 16px;
}
</style>
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
	background: #fff;
	color: #000;
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
	width: 80%;
	font-size: 18px;
	text-align: center;
}
.wenti{
	margin-right: 5%;
	margin-top: 2px;
}
.wapper01{
	background: #1d8fed;
	margin-top: 40px;
	overflow: hidden;
}
.wapper01 .content_text{
	width: 100px;
	text-align: center;
	margin: 0 auto;
	padding-top: 29px;
	color: #FFF;
	opacity: 0.8;
	font-size: 12px;
	margin-bottom: -4px;
}
.wapper01 .content_rate{
	text-align: center;
	margin: 0 auto;
	color: #FFF;
	font-size: 18px;
}
.wapper01 .content_rateout{
	width: 100px;
	text-align: center;
	margin: 0 auto;
	color: #FFF;
	font-size: 24px;
	margin-top: 12px;
	margin-bottom: 6px;
}
.wapper01 .content_rate span{
	font-size: 50px;
}
.wapper01 .content_rate .add01{
	font-size: 30px;
	color: #ffff00;
}
.wapper01 .content_rate .add02{
	font-size: 30px;
	color: #ffff00;
}
.wapper01 .content_rate .add03{
	font-size: 16px;
	color: #ffff00;
}
.wapper01 .content_detail{
	width: 300px;
	text-align: center;
	margin:0 auto;
	color: #FFF;
	padding-bottom: 16px;
}
.wapper01 .content_detail .span01{
	opacity:1;
	font-size: 14px;
}
.wapper01 .content_detail .span02{
	opacity:0.8;
	font-size: 12px;
}
.wapper02{
	width: 100%;
	background: #2394f1;
	overflow: hidden;
	padding-top: 8px;
	padding-bottom: 8px;
}
.wapper02 ul li{
	float: left;
	color: #FFF;
	font-size: 12px;
}
.wapper02 ul .li01{
	width: 25%;
	text-align: center;
}
.wapper02 ul .li02{
	width: 50%;
	text-align: center;
}
.wapper02 ul .li03{
	width: 25%;
	text-align: center;
}
.notice{
	width: 100%;
	overflow : hidden;
	/*text-overflow: ellipsis;*/
	display: -webkit-box;
	/*-webkit-line-clamp: 1;  */
	-webkit-box-orient: vertical;
	color: #ff6c39;
	background: #f5f5f9;
	padding: 14px 0;
	font-size: 14px;
	text-indent: 10px;
	height: 14px;
	position: relative;
}
.notice_name{
	position: absolute;
	background: #f5f5f9;
	z-index: 2;
	height: 40px;
	line-height: 16px;
}
.notice_content{
	width: 240%;
	height: 16px;
	/*overflow: hidden;*/
	/*text-overflow: ellipsis;*/
	display: -webkit-box;
	/*-webkit-line-clamp: 1;  */
	-webkit-box-orient: vertical;
	font-size: 12px;
	margin-left: -70%;
}
.star{
	background: #FFF;
	padding: 6px 0;
	overflow: hidden;
}
.star .star_spn01{
	margin-left: 4%;
	margin-right: 20px;
	font-size: 14px;
	color: #acb2b8;
}
.assets_level{
	display: inline-block;
	margin-left: 10px;
	font-size: 14px;
	color: #203542;
}
.wapper03{
	padding-top: 16px;
	padding-bottom: 12px;
	overflow: hidden;
	font-size: 12px;
}
.wapper03 ul li{
	float: left;
	font-size: 12px;
	margin-bottom: 10px;
}
.wapper03 ul .li01{
	width: 25%;
	text-align: left;
	margin-left: 4%;
}
.wapper03 ul .li02{
	width: 43%;
	text-align: center;
}
.wapper03 ul .li03{
	width: 25%;
	text-align: right;
	margin-right: 3%;
}
.wapper03 .yuan{
	margin-left: 5%;
}
.wapper04{
	width: 100%;
	padding: 8px 0;
	background: #FFF;
	overflow: hidden;
	font-size: 12px;
}
.wapper04 .moneyname{
	width: 32%;
	text-indent: 4%;
	padding-bottom: 8px;
	border-bottom: 1px solid #f5f5f9;
	color: #acb2b8;
}
.wapper04 .moneynum{
	width: 68%;
	padding-bottom: 8px;
	border-bottom: 1px solid #f5f5f9;
	font-size: 14px;
}
.wapper05{
	width: 100%;
	background: #FFF;
	margin-bottom: 10px;
	overflow: hidden;
	font-size: 12px;
}
.wapper05 .typename{
	width: 32%;
	text-indent: 4%;
	padding-top: 10px;
	color: #acb2b8;
}
.wapper05 .typeresult{
	width: 68%;
	padding-top: 10px;
}
.wapper05 .typeresult .result01{
	padding-bottom: 10px;
	font-weight: 600;
	color: #203542;
	font-size: 14px;
} 
.wapper05 .typeresult .result02{
	width: 94%;
	background: #f5f5f9;
	padding: 6px 0px 12px 10px;
	color: #959598;
	letter-spacing:4px;
} 
.detail_btn{
	clear: both;
	width: 80%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	margin: 0 auto;
	border-radius: 6px;
	margin-bottom: 70px;
	font-size: 14px;
	margin-top: 20px;
	background: #f5f5f9;
	color: #acb2b8;
}
.footer{
	width: 100%;
	height: 50px;
	background: #FFF;
	position: fixed;
	bottom: 0;
	border-top: 1px solid #CCC;
}
.footer .footer_wapper .footer01{
	width: 12%;
	text-align: center;
	height: 40px;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #ff6c39;
	padding-top: 8px;
}
.footer .footer_wapper .footer02{
	width: 88%;
	text-align: center;
	color: #FFF;
	height: 42px;
	line-height: 44px;
	padding-top: 4px;
	position: fixed;
	bottom: 0;
	right: 0;
	background: #ff6c39;
	font-size: 16px;
}
.footer .footer_wapper .footerout02{
	width: 88%;
	text-align: center;
	color: #FFF;
	height: 38px;
	line-height: 38px;
	position: fixed;
	bottom: 0;
	right: 0;
	background: #ff6c39;
	opacity: 0.4;
}
/*更多详情*/
.mint-navbar{
	margin-top: 40px;
}
.mint-navbar .mint-tab-item{
	color: #acb2b8;
}
.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 2px solid #26a2ff;
		color: #203542;
		margin-bottom: 0px;
}
.more_wapper .title{
	padding: 10px 0;
	padding-left: 4%;
	border-bottom: 1px solid #CCC;
}
.more_wapper .more_content{
	padding: 10px;
	padding-bottom: 16px;
	font-size: 14px;
}
.more_wapper .information{
	width: 92%;
	margin: 0 auto;
	margin-top: 10px;
	overflow: hidden;
	border:1px solid #CCC;
	border-bottom: none;
	margin-bottom: 16px;
}
.more_wapper .limit{
	width: 92%;
	margin: 0 auto;
	margin-top: 10px;
	overflow: hidden;
	border:1px solid #CCC;
	border-bottom: none;
}
.more_wapper ul li{
	border-bottom: 1px solid #CCC;
}
.more_wapper .invest_span{
	display: inline-block;
	padding: 12px;
	border-right: 1px solid #CCC;
	font-size: 14px;
	color: #CCC;
}
.more_wapper .invest_span02{
	display: inline-block;
	text-indent: 10px;
	font-size: 14px;
}
.more_wapper .borrow01{
	margin-bottom: 60px;
	padding-left: 4%;
	font-size: 12px;
	padding-top: 10px;
	padding-bottom: 4px;
}
.more_wapper .borrow02{
	margin-bottom: 60px;
}
.max_box{
	width:100%;
	margin: 0 auto;
	overflow:hidden;
	margin-bottom: 54px;
}
.max_img,.max_img1,.max_img2{
	width:100%;
	position:relative;
}
/*计算器*/
.black{
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.4;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
}
.calculator{
	width: 90%;
	height: 160px;
	background: #FFF;
	position: fixed;
	top: 40%;
	left: 5%;
	z-index: 6;
	border-radius: 8px;
}
.calculator .del{
	margin-right: 10px;
	margin-top: 6px;
} 
.cal_name{
	clear: both;
	text-align: center;
	font-size: 14px;
	margin-bottom: 12px;
}
.cal_main{
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid #CCC;
	border-top: 1px solid #CCC;
	margin-bottom: 24px;
}
.cal_main01{
	width: 48%;
	border-right: 1px solid #CCC;
	padding-right: 1%;
}
.cal_main01 input{
	display: inline-block;
	float: left;
	width: 80px;
	text-align: right;
	border: none;
	text-indent: 4px;
	margin-bottom: 6px;
	margin-top: 6px;
	background: #FFF;
}
.cal_main02 input{
	display: inline-block;
	float: left;
	width: 80px;
	text-align: right;
	border: none;
	text-indent: 4px;
	margin-bottom: 6px;
	margin-top: -2px;
}
.cal_main02 ::-webkit-input-placeholder { /* WebKit browsers */
	color: #999;
	font-size: 12px;
}
.cal_main01 ::-webkit-input-placeholder { /* WebKit browsers */
	color: #999;
	font-size: 12px;
}
.cal_main01 :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	color: #999;
	font-size: 12px;
}
.cal_main01 ::-moz-placeholder { /* Mozilla Firefox 19+ */
	color: #999;
	font-size: 12px;
}
.cal_main01 :-ms-input-placeholder { /* Internet Explorer 10+ */
	color: #999;
	font-size: 12px;
}
.cal_main01 span{
	display: inline-block;
	float: left;
	margin-left: 10px;
	margin-top: 8px;
}
.cal_main02{
	width: 48%;
}
.cal_main02 span{
	display: inline-block;
	margin-top: 8px;
}
.cal_main02 .today{
	margin-right: 6%;
	font-size: 14px; 
	color: #333;
}
.cal_main01 .money{
	display: inline-block;
	margin-top: 5px;
	font-size: 14px; 
	color: #CCC;
}
.cal_main02 .today02{
	width: 64%;
	text-align: right;
	font-size: 14px; 
}
.cal_bottom{
	clear: both;
}
.cal_bottom .cal_name01{
	margin-left: 10px;
	font-size: 12px;
}
.cal_bottom .cal_name02{
	margin-right: 10px;
	font-size: 12px;
	color: red;
}
/*更多详情*/
.table{
	width: 94%;
	margin-left: 3%;
	border-right: 1px solid #9d9d9d;
	border-left: 1px solid #9d9d9d;
}
.table .clear{
	color: #203542;
	border-top: 1px solid #9d9d9d;
}
.background{
	overflow: hidden;
	background: #f7f7f7;
}
.table:nth-child(1){
	margin-bottom: 60px;
	margin-top: 30px;
}
.table:nth-child(2){
	margin-bottom: 70px;
}
.clear:nth-last-child(1){
	overflow: hidden;
	border-bottom: 1px solid #9d9d9d;
}
/*.clear:nth-child(1) .table_right{
	border:none;
}*/
.table .clear:nth-child(1) .table_left{
	border-right:none;
}
.table_left{
	width: 29%;
	box-sizing:border-box;
	/*border-right: 1px solid #9d9d9d;*/
	padding: 8px 0;
	padding-left: 1%;
	/*border-left: 1px solid #9d9d9d;*/
}
.table_right{
	width: 57%;
	text-align: right;
	padding: 8px 4% 8px 2%;
	border-left: 1px solid #9d9d9d;
}
.more_right{
	text-align: right;
}
/*风险提示*/
.black_three{
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.4;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
}
.warning{
	width: 100%;
	background: #FFF;
	position: fixed;
	bottom: 0%;
	left: 0%;
	z-index: 6;
}
.warning_head{
	clear: both;
	width: 100%;
	text-align: center;
	font-size: 16px;
	color: rgb(32,53,66);
	margin-bottom: 20px;
}
.warning_tip{
	width: 90%;
	margin-left: 5%;
	font-size: 14px;
	color: #959598;
}
.warning_btn{
	width: 90%;
	height: 40px;
	line-height: 40px;
	background: #ff6c39;
	border-radius: 5px;
	text-align: center;
	font-size: 14px;
	color: #FFF;
	margin: 16px 0;
	margin-left: 5%;
}
/*项目简介*/
.black_two{
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.4;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
}
.project{
	width: 90%;
	padding-bottom: 20px;
	background: #FFF;
	position: fixed;
	top: 16%;
	left: 5%;
	z-index: 6;
}
.close_btn{
	width: 40px;
	height: 24px;
	line-height: 24px;
	border-radius: 4px;
	margin-top: 8px;
	margin-right: 10px;
	text-align: center;
}
.project_clear{
	clear: both;
	padding: 10px;
	color: #000;
	letter-spacing: 1px;
}
.project_clear span{
	color: #acb2b8;
	font-size: 14px;
}
/*风险评估*/
.black_three{
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.4;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
}
.risk{
	width: 90%;
	height: 380px;
	background: #FFF;
	position: fixed;
	top: 20%;
	left: 5%;
	z-index: 6;
}
.close_btn{
	width: 40px;
	height: 24px;
	line-height: 24px;
	border-radius: 4px;
	margin-top: 8px;
	margin-right: 10px;
	text-align: center;
}
.risk_clear{
	clear: both;
	padding: 10px;
	color: #acb2b8;
	letter-spacing: 1px;
}
.risk_head{
	width: 100%;
	text-align: center;
	font-size: 16px;
	margin-bottom: 12px;
}
.risk_level{
	width: 100%;
	text-align: center;
	padding-top: 32px;
	padding-bottom: 12px;
	border:1px solid #CCC;
}
.risk_level_value{
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 32px;
	color: #000;
}
.risk_tip{
	margin-top: 10px;
	margin-bottom: 10px;
}
.risk_tip span{
	color: red;
}
.risk_tip_two{
	margin: 10px 0;
}
/*测评*/
.black_two{
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.4;
	position: fixed;
	top: 0;
	z-index: 5;
}
.wapper_risk{
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 6;
	background: #FFF;
}
.close_btn{
	margin-top: 12px;
	width: 40px;
	height: 26px;
	text-align: center;
	float: right;
	border-radius: 5px;
	margin-bottom: 8px;
}
.text{
	clear: both;
	font-size: 12px;
	margin-left: 12px;
	margin-right: 10px;
	color: #acb2b8;
}
.text_tip{
	font-size: 14px;
	color: rgb(32,53,66);
	margin-bottom: 30px;
}
.risk_btn{
	width: 24%;
	float: left;
	text-align: center;
	margin-left: 8%;
	margin-bottom: 16px;
}
.risk_btn_one{
	width: 100%;
	padding: 6px 0;
	border: 1px solid #CCC;
	border-radius: 6px;
	border:1px solid rgb(60,168,238);
	font-size: 15px;
	color: rgb(60,168,238);
}
.risk_btn_two{
	clear: both;
	width: 88%;
	text-align: center;
	padding: 10px 0;
	margin-left: 6%;
	margin-top: 26px;
	margin-bottom: 20px;
	background: rgb(255,108,57);
	color: #FFF;
	border-radius: 6px;
}
.risk_tip{
	font-size: 12px;
	color: rgb(172,178,184);
	margin-top: 6px;
}
.line_one{
	clear: both;
	float: left;
	width: 100%;
	height: 10px;
	background: #f5f5f9;
	margin-top: 20px;
	margin-bottom: 20px;
}
.item_max{
	width:92%;
	overflow:hidden;
	margin:auto;
}
.item_box{
	width:500%;
	overflow:hidden;
	height: 14px;
}
.item_inte{
	float:left;
	padding-left: 54px;
	font-size: 12px;
	height: 14px;
}
</style>
