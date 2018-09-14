<template>
	<div class="huoqi">
		<div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            {{targetName}}
        </div>
		<div id="subject" v-cloak>
			<div class="regular_box">
				<div class="regular_name">总资产（元）<div class="regular_span">利率 {{annuals}}%</div></div>
				<div class="regular_money" v-text="totalAssetss"></div>
				<div class="float_sty sty_left">
					<div class="regu_size regu_left">{{dayName}}</div>
					<div v-if="timeShow" class="float_size regu_left">{{dayProfits}}</div>
					<div v-else class="float_size regu_left" v-text="tomorrowProfit"></div>
				</div>
				<div class="float_sty sty_right">
					<div class="regu_size regu_right">在投总收益</div>
					<div class="float_size regu_right" v-text="totalProfits"></div>
				</div>
			</div>
			
			<!--  -->
			<div class="regu_sty"  v-for="item in items">
				<div class="regu_float">
					<div class="regu_money" v-text="item.buyAmounts"></div>
					<div class="regu_size">在投本金</div>
				</div>
				<div class="regu_float float_center">
					<div class="regu_money" v-text="item.expectedProfits"></div>
					<div  class="regu_size">预计收益</div>
				</div>
				<div class="regu_float float_center" v-if="item.timenum == 'yes'">
					<div class="regu_money" v-text="item.dayProfits"></div>
					<div class="regu_size" >预计明日收益</div>
				</div>
				<div class="regu_float float_center" v-else>
					<div class="regu_money" v-text="item.totalProfits"></div>
					<div class="regu_size" >在投收益</div>
				</div>
				<div class="regu_float float_right">
					<div class="regu_money remaintime" v-if="item.reday == null">未起息</div>
					<div v-else class="regu_money remaintime">剩{{item.reday}}天</div>
					<div  class="regu_size">期限{{item.period}}天</div>
				</div>
				<div class="time_box">
					<div class="time_left">使用券包：</div>
					<div class="time_right commonColor" v-if="item.cashcou!=0"> <span  v-if="item.target!=0">+</span> 红包<span style="color:#ff6c39;"> {{item.cashcou}}元</span></div>
					<div class="time_right commonColor" v-if="item.addint!=0"> <span  v-if="item.target!=0">+</span> 加息券<span style="color:#ff6c39;"> {{item.addint}}%</span></div>
					<div class="time_right commonColor"  v-if="item.target!=0">加息<span style="color:#ff6c39;"> {{item.target}}%</span></div>
					<div class="time_right commonColor" v-show="item.couponHide">无</div>
				</div>
				<div class="time_box">
					<div class="time_left">购买日期：{{item.gmtCreates}}</div>
					<div class="time_right">{{item.actext}}</div>
					<img class="time_imgtwo" v-if="item.actext=='存管账户'" src="../assets/deposits_img/mark002.png">
					<img class="time_img" v-else src="../assets/deposits_img/mark004.png">
					
				
				</div>
				<div class="time_box" style="margin-bottom: 6px;">
					<div class="time_left" v-if="item.endProfits">预计到账日期：{{(item.endProfits)}}</div>
					<div class="time_left" v-else>预计到账日期：满标计息</div>
					<div class="time_right"><div class="time_but" @click="agreement(item)">协议文本</div></div>
				</div>
			</div>
			<div class="iton_box">产品到期后将自动回款至存管/普通账户</div>
			<!--  -->

		</div>

	</div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
		return {
			token:'',
			totalAssetss :HC.vueurlFun("totalAssetss"),
			totalProfits : HC.vueurlFun("totalProfits"),
			dayProfits : '',
			tomorrowProfit : HC.vueurlFun("tomorrowProfit"),
			dayName : '',
			items:[],
			bottomStatus: '',
			detail :{
				app_token　: HC.vueurlFun("app_token"),
				financingProjectId : HC.vueurlFun("financingProjectUuid"),
			},
			page : 1,
			list_wu : false,
			annuals : 0,
			targetName :'',
			timeShow:true  //今日或者预计明日的显示与隐藏
		}
	},
	methods:{
		returns(){
			this.$router.go(-1);
		},
		agreement(item){
			var fgid = HC.vueurlFun("financingProjectUuid");
			var depository = HC.vueurlFun("depository");
			if(item.contractImgExist==false){
				this.$router.push({path:"/agreementsignature?app_token="+ this.token +"&buyAmount=" + item.buyAmount + "&financingTargetId=" +  fgid +"&depository=" +  depository+"&gmtCreates="+item.gmtCreates })
			}else{
				this.$router.push({path:"/electronicsignature?biduuid="+item.self_uuid })
			}

			
		},
		newnotice(){
			var deptype = HC.vueurlFun("depository");
			if(deptype=='true'){
				axios.post('/api/v2/financing_project_bid/fixed/in_service/list',this.detail)
				.then(res=>{
					res.data.result.forEach((item)=>{
						if(item.repayDate==''||item.repayDate==null){
								item.endProfits = ''
							}else{
								item.endProfits = this.timeFun(item.repayDate);
							}
						item.actext = '存管账户'
						item.gmtCreates = this.timeFun(item.gmtCreate);
						if(item.totalProfit==null){
							item.totalProfits = 0;
						}else{
							item.totalProfits = HC.decimalFun(item.totalProfit);
						}
						item.buyAmounts = HC.decimalFun(item.buyAmount);
						item.dayProfits = HC.decimalFun(item.dayProfit);
						item.expectedProfits = HC.decimalFun(item.expectedProfit);
						item.timenum = this.timeday(item.gmtCreate);
						item.addint = item.addInterestRates || 0;
						item.cashcou = item.cashCouponAmount|| 0;
						item.target = item.financingProject.annualizedRatePlus || 0;
						item.reday = item.remainingDays;
						item.self_uuid= item.uuid;
						if(item.addInterestRates==null&&item.cashCouponAmount==null&&item.financingProject.annualizedRatePlus==null){
							item.couponHide = true;
						}else{
							item.couponHide = false;
						}
						this.targetName = res.data.result[0].financingProject.name;
						this.items = res.data.result;
						this.annuals = HC.decimalFun(res.data.result[0].financingProject.annualizedRates);
					})

				})
			}else if(deptype=='false'){
				axios.post('/api/financing_target_bid/unexpire_fixed_list.htm',{
					app_token : HC.vueurlFun("app_token"),
					financingTargetId : HC.vueurlFun("financingProjectUuid")
				})
				.then(res=>{
					res.data.result.forEach((item)=>{
						if(item.toAccountDate==''||item.toAccountDate==null){
							item.endProfits = ''
						}else{
							item.endProfits = this.timeFun(item.toAccountDate);
						}
						console.log(item.toAccountDate)
						item.actext = '普通账户'
						item.gmtCreates = this.timeFun(item.payTime);
						item.totalProfits = HC.decimalFun(item.profit);
						item.buyAmounts = HC.decimalFun(item.buyAmount);
						item.dayProfits = HC.decimalFun(item.dayProfit);
						item.expectedProfits = HC.decimalFun(item.expectedProfit);
						item.reday = item.remainDay;
						item.addint = item.addInterestAmount;
						item.cashcou = item.cashCouponAmount;
						item.target = item.targetAnnualizedRatesPlus;
						item.timenum = this.timeday(item.payTime);
						this.targetName = item.targetName;
						item.self_uuid= item.bidUuid;
						if(item.addInterestAmount==0&&item.cashCouponAmount==0&&item.targetAnnualizedRatesPlus==0){
							item.couponHide = true;
						}else{
							item.couponHide = false;
						}
						this.items = res.data.result;
						this.annuals = HC.decimalFun(res.data.result[0].annualizedRates);
					})
				})
				
			}
			
		},
		
		timeFun(time){
			var year = time.split(" ");
			return year[0];
		},
		timeday(time){
			var cont = time.split(" ");
			var d = new Date();
			var contot = Date.format(d,"yyyy-MM-dd");
			if(contot==cont[0]){
				return 'yes'
			}else{
				return 'no'
			}
		}
	},
	mounted(){
		/*this.token = this.getCookie('sessionToken');*/

		this.token = HC.getStorage('sessionToken');
		//this.targetName = decodeURI(HC.vueurlFun("targetName"));
		this.dayProfits = HC.vueurlFun("dayProfits");
		
		if(HC.vueurlFun("incomeShow") == true){
			this.dayName = "预计明日收益";
			this.timeShow = false;
		}else{
			this.dayName = "今日收益";
			this.timeShow = true;
			
		}
		this.newnotice();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	.huoqi{
		position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: #f5f5f9;
        overflow: hidden;
        overflow-y: scroll;
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
        font-size: 16px;
    }

    .returns_box{
        position: absolute;
        top: 0;
        left: 0;
        width:40px;
        height:40px;
        background: url(../assets/img/back00.png) no-repeat center;
        background-size: 12px;
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
	ul,li{
		padding: 0;
		margin:0;
	}
	body{
		background:#f5f5f9;
	}
	#app{
		width:100%;
		overflow:hidden;
	}
	[v-cloak]{
		display:none;
	}
	.regular_box{
		width:100%;
		overflow:hidden;
		border-bottom:solid 1px #e5e5e5;
		background:#FFF;
		position: relative;
		margin-top: 40px;
	}
	.regular_name{
		width:90%;
		text-align:center;
		margin:20px auto 0;
		color:#8f989f;
		font-size:12px;
	}
	.regular_money{
		width:90%;
		text-align:center;
		margin:auto;
		font-size: 36px;
		color: #ff6c39;
	}
	.float_sty{
		width:50%;
		margin-top:20px;
		margin-bottom:20px;
		font-size: 12px;
		color:#8f989f;
	}
	.sty_left{
		float:left;
		background:url(../assets/deposits_img/dian01.png) no-repeat right center;
		background-size:1px 28px;
	}
	.sty_right{
		float:right;
	}
	.float_size{
		font-size: 14px;
		color: #8f989f;
		margin-top: 2px;
	}
	.regu_sty{
		width:92%;
		overflow:hidden;
		border-top:solid 1px #e5e5e5;
		border-bottom:solid 1px #e5e5e5;
		margin-top:12px;
		padding:0 15px;
		background:#FFF;
		margin-bottom: 20px;
	}
	.regu_float{
		width:25%;
		float:left;
		border-bottom:solid 1px #eee;
		padding:15px 0;
		margin-bottom:10px;
		font-size: 12px;
		color: #acb2b8;
		overflow: hidden;
	}
	.float_center{
		text-align:center;
	}
	.float_right{
		text-align:right;
	}
	.regu_money{
		font-size: 14px;
		color: #203542;
		margin-bottom:6px;
	}
	.remaintime{
		font-size:14px;
		color:#ff6c39;
		margin-bottom:6px;
	}
	.time_box{
		width:100%;
		overflow:hidden;
		line-height:26px;
		color:#acb2b8;
		font-size:10px;
	}
	.time_left{
		float:left;
	}
	.img{
		display:inline-block;
		width: 20px;
		height: 20px;
		margin-right: 6px;;
	}
	.img img{
		width:100%;
		height:100%;
		border-radius:50%;
	}
	.time_but{
		width: 60px;
		font-size: 12px;
		border: solid 1px #3ca8ee;
		border-radius: 4px;
		line-height: 20px;
		text-align: center;
		color: #3ca8ee;
	}
	.time_right{
		float:right;
		margin-left: 4px;
	}
	.commonColor{
		color:#acb2b8;
	}
	.mint-spinner-fading-circle{
		margin:auto;
	}
	.list_wu{
		width:100%;
		text-align:center;
		font-size:12px;
		color: #acb2b8;
		margin-top:10px;	
	}
	.iton_box{
		width:100%;
		margin-top: 60px;
		overflow: hidden;
		text-align: center;
		font-size: 10px;
		color:#acb2b8;
		margin-bottom: 6px;
	}
	.time_img{
		float: right;
		width:10px;
		height: 10px;
		margin-top: 7px;
		margin-right: 2px;
	}
	.time_imgtwo{
		float: right;
		width: 14px;
		height: 10px;
		margin-top:7px;
		margin-right: 2px;
	}
	.regular_span{
	    width: 84px;
	    font-size: 12px;
	    text-align: center;
	    height: 20px;
	    line-height: 14px;
	    position: absolute;
	    padding-top: 3px;
	    top: 10px;
	    left: 60%;
		background: url(../assets/deposits_img/mark001.png) no-repeat center;
		background-size: 100% 100%;
	}
	.regu_size{
		font-size: 12px;
	}
	.regu_left{
		padding-left: 15%;
	}
	.regu_right{
	    padding-left: 45%;
	}
	
</style>
