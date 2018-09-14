<template>
	<div class="financial_box">
		<div class="header_title">理财</div>
		<div class="main_box">
			<div class="newwapper" @click="toDetailsTwo(homeMark)" v-show="newUser">
				<div class="new_wapper_sign">
					<div class="new_sign_box">新手</div>
				</div>
				<div class="new_inverstor_box">
					<div class="new_inverstor_title">{{homeMark.name}}</div>
					<div class="new_inverstor_syt new_inerstor_right">{{homeMark.annualizedRates}}<span class="new_percent">%</span></div>
					<div class="new_inverstor_syt">
						<div class="new_inverstor_money">起投金额 <span class="mew_money_box">{{homeMark.minAmount}}元</span></div>
						<div class="new_inverstor_money">理财期限 <span class="mew_money_box">{{homeMark.period}}天</span></div>
					</div>
				</div>
				<div class="new_inverstor_but">立即专享</div>
			</div>
			<!-- 限时特惠 -->
			<div class="financial_kind_box" v-show="hotProjectVOs.length>0">
				<div class="financial_kind_title">
					<div class="kind_title_border">限时特惠</div>
				</div>
				<div class="financial_kind_sty" v-for="item in hotProjectVOs" @click="changeDetail(item)">
					<div class="financial_name_box">
						<div class="financial_sty_name">{{item.name}}</div>
						<div class="financial_sty_label">热卖</div>
						<div class="financial_sty_minAmout">{{item.minAmount}}元起投</div>
					</div>
					<div class="financial_message_box">
						<div class="financial_message_left">
							<div class="financial_message_rates">{{item.annualizedRates |num}}<span class="rates_span">%</span><span class="rates_span" v-show="item.annualizedRatePlus>0">+{{item.annualizedRatePlus|num}}%</span></div>
							<div class="financial_msg_hint">预期年化</div>
						</div>
						<div class="financial_message_center">
							<div class="financial_message_center_per">{{item.period}}天</div>
							<div class="financial_msg_hint">理财期限</span></div>
						</div>
						<div class="financial_message_prpgress">
							<el-progress  type="circle" :percentage="item.percentum"></el-progress>
						</div>
					</div>
				</div>
				
			</div>
			<!-- 收益稳健 -->
			<div class="financial_kind_box" v-show="commomProjectVOs.length>0">
				<div class="financial_kind_title">
					<div class="kind_title_border">收益稳健</div>
				</div>
				<div class="financial_kind_sty" v-for="item in commomProjectVOs" @click="changeDetail(item)">
					<div class="financial_name_box">
						<div class="financial_sty_name">{{item.name}}</div>
						<div class="financial_sty_label">热卖</div>
						<div class="financial_sty_minAmout">{{item.minAmount}}元起投</div>
					</div>
					<div class="financial_message_box">
						<div class="financial_message_left">
							<div class="financial_message_rates">{{item.annualizedRates |num}}<span class="rates_span">%</span><span class="rates_span" v-show="item.annualizedRatePlus>0">+{{item.annualizedRatePlus|num}}%</span></div>
							<div class="financial_msg_hint">预期年化</div>
						</div>
						<div class="financial_message_center">
							<div class="financial_message_center_per">{{item.period}}天</div>
							<div class="financial_msg_hint">理财期限</span></div>
						</div>
						<div class="financial_message_prpgress">
							<el-progress  type="circle" :percentage="item.percentum"></el-progress>
						</div>
					</div>
				</div>
				
			</div>
			<!-- 银行存管 -->
			<div class="financial_kind_box" v-show="depositProjectVOs.length>0">
				<div class="financial_kind_title">
					<div class="kind_title_border">银行存管</div>
				</div>
				<div class="financial_kind_sty" v-for="item in depositProjectVOs"  @click="changeDetailDepository(item)">
					<div class="financial_name_box">
						<div class="financial_sty_name">{{item.name}}</div>
						<div class="financial_sty_label">热卖</div>
						<div class="financial_sty_minAmout">{{item.minAmount}}元起投</div>
					</div>
					<div class="financial_message_box">
						<div class="financial_message_left">
							<div class="financial_message_rates">{{item.annualizedRates |num}}<span class="rates_span">%</span><span class="rates_span" v-show="item.annualizedRatePlus>0">+{{item.annualizedRatePlus|num}}%</span></div>
							<div class="financial_msg_hint">预期年化</div>
						</div>
						<div class="financial_message_center">
							<div class="financial_message_center_per">{{item.period}}天</div>
							<div class="financial_msg_hint">理财期限</span></div>
						</div>
						<div class="financial_message_prpgress">
							<el-progress  type="circle" :percentage="item.percentum"></el-progress>
						</div>
					</div>
				</div>
				
			</div>
			<div class="financial_btn_wrapper">
				<div class="financial_btn" @click="toSoldout">查看更多 (已售罄<span>{{soldoutNum}}</span>个，已还款<span>{{repayNum}}</span>个)</div>
			</div>
		</div>
		<V_Footer></V_Footer>
	</div>
</template>

<script>
	import V_Footer from '../components/Footer.vue'
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		name: 'financial_box',
		data () {
			return {
				token:'',
				homeMark : {},
				commomProjectVOs:[],
				hotProjectVOs:[],
				depositProjectVOs:[],
				soldoutNum :0,
				repayNum :0,
				newUser:true

			}
		},
		methods:{
			/*到详情页面--事件*/
			changeDetailDepository(item){
				this.$router.push({ name: 'DepInvestDetail', params: { userId: item.uuid,userName: item.name, soldout:item.soldout, canInvest:item.canInvest}})
				//this.$router.push({ path: '/DepInvestDetail/'+item.uuid })
			},
			changeDetail(item){
				this.$router.push({ name: 'InvestDetail', params: { userId: item.uuid,userName: item.name, soldout:item.soldout}})
				//this.$router.push({ path: '/investdetail/'+item.uuid })
			},
			/*到已售罄(还款)页面--方法*/
			toSoldout(){
				this.$router.push({ path: '/soldout' })
			},
			/*新人惠到详情页面--方法*/
			toDetailsTwo(homeMark){
				this.$router.push({ path: '/investdetail/'+homeMark.uuid })
			},
			
			/*进页面就要执行的方法*/
			dataFn(){
				//理财惠活宝数据
				axios.post(this.rootBase+'/open_auth/financing_project/position/financing', {
					app_token:this.token
				})
				.then(res =>{
					if(res.data.code=="SUCCESS"){
						this.hotProjectVOs = res.data.result.hotProjectVOs;
						this.commomProjectVOs = res.data.result.commomProjectVOs;
						this.depositProjectVOs = res.data.result.depositProjectVOs;
						this.homeMark = res.data.result.newInvestorFinancingProject;
						if(this.commomProjectVOs.length>0){
							this.commomProjectVOs.forEach((item)=>{
								item.percentum = Number(HC.decimalFun(item.finishAmount/item.collectAmount*100,1));
							})
						}
						if(this.hotProjectVOs.length>0){
							this.hotProjectVOs.forEach((item)=>{
								item.percentum = Number(HC.decimalFun(item.finishAmount/item.collectAmount*100,1));
							})
						}
						if(this.depositProjectVOs.length>0){
							this.depositProjectVOs.forEach((item)=>{
								item.percentum = Number(HC.decimalFun(item.finishAmount/item.collectAmount*100,1));
							})
						}
					}else{
						this.$toast(res.data.msg)
					}
				})
				.catch(res=> {
					console.log(res);
				});
				 //已售罄数据
				axios.post(this.rootBase+'/open_auth/financing_project/out/count', {
				})
				.then(res =>{
					this.soldoutNum = res.data.result;

				})
				.catch(res=> {
					console.log(res);
				});
				//已还款个数数据
				axios.post(this.rootBase+'/open_auth/financing_project/repay/count', {
				})
				.then(res =>{
					this.repayNum = res.data.result;

				})
				.catch(res=> {
					console.log(res);
				});
				/*新人惠购买 是否是新人*/
				axios.post(this.rootBase+'/user/is_new_investor', {
					token: this.token
				})
				.then(res =>{
					if(res.data.code == "TOKEN_ERROR"){
					  this.newUser = true;
					} else if(res.data.code == "SUCCESS"){
						if(res.data.result== false){
							this.newUser = false;
						}else if(res.data.result == true){
							this.newUser = true;
						} 
					}
					
					
				})
				.catch(res=> {
					console.log(res);
				});

			 
			}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		components:{
			V_Footer
		},
		mounted(){
			this.token = HC.getStorage('sessionToken')||'';
			this.dataFn()
		},
		filters: {
			num(value) {
				if(value == parseInt(value)){
					return value + '.0';
				}else{
					return value
				}     
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.el-progress-circle{
		height: 58px !important;
		width: 60px !important;
	}
	.el-progress-circle .el-progress__text{
		color: #ff6c39 !important;
	}
	.el-progress-circle__track{
		stroke: #feeee3 !important;
	}
	.el-progress-circle__path{
		/*stroke: #ff6c39 !important;*/
		stroke: #000 !important;
		stroke-width:3 !important;
	}
</style>
<style scoped>
	li{
		list-style: none;
	}
	.financial_box{
		background: #f5f5f9;
		overflow: hidden;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.header_title{
		position: fixed;
		top: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #fff;
		text-align: center;
		color: #000;
		z-index: 2;
	    border-bottom: solid 1px #f5f5f9;
	}
	.main_box{
		margin-top: 48px;
		clear: both;
		margin-bottom: 40px;
	}
	.name{
		clear: both;
		margin-left: 10px;
		margin-top: 10px;
	}
	.name .name_name01{
		font-weight: 600;
		font-size: 14px;
		margin-right: 4px;
		color: #203542;
	}
	.name .name_name02{
		margin-right: 24px;
		font-size: 12px;
	}
	.name .name_name03{
		width: 32px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		background: #ffe7d7;
		color: #ff6c39;
		font-size: 12px;
		border-radius: 3px;
	}
	.newwapper{
		background: #FFF;
		overflow:hidden;
		margin-bottom: 8px;
		border-bottom: solid 8px #f5f5f9;
	}
	.new_wapper_sign{
		width:100%;
		border-bottom: solid 1px #e5e5e5;
		overflow: hidden;
	}
	.new_sign_box{
		background:url("../assets/img/sign001.png") no-repeat center;
		background-size: 100% 100%;
		height:20px;
		font-size: 12px;
		color:#fff;
		text-align: center;
		line-height: 20px;
		width: 60px;
		margin:8px 12px;
	}
	.new_inverstor_box{
		width:100%;
		display: flex;
		flex-wrap:wrap;
	}
	.new_inverstor_title{
		width:100%;
		line-height: 50px;
		padding-left: 20px;
		color: #23353c;
		font-size: 14px;
	}
	.new_inverstor_syt{
		width:50%; 
		max-width: 50%;
		box-sizing:border-box;
		flex-grow: 1;
		padding-left: 30px;
	}
	.new_inerstor_right{
		border-right: solid 1px #e5e5e5;
		font-size: 40px;
		color:#ff472a;
	}
	.new_percent{
		font-size: 16px;
	}
	.new_inverstor_money{
		font-size: 14px;
		color:#acb2b8;
		line-height: 26px;
	}
	.mew_money_box{
		font-size: 14px;
		color:#203542;
	}
	.new_inverstor_but{
		width:86%;
		height:46px;
		line-height: 40px;
		text-align: center;
		color:#fff;
		font-size: 15px;
		background:url("../assets/img/sign002.png") no-repeat center;
		background-size: 100% 100%;
		margin: 15px auto 10px;
	}
	/*限时特惠*/
	.financial_kind_box{
		width:100%;
		margin-top: 8px;

	}
	.financial_kind_title{
		width:100%;
		height: 44px;
		border-bottom: solid 1px #e5e5e5;
		background-color: #fff;
		overflow: hidden;
	}
	.kind_title_border{
		font-size: 16px;
		color:#1f9af3;
		line-height: 16px;
		border-left: solid 2px #1f9af3;
		padding-left: 6px;
		margin:14px 10px;
	}
	.financial_kind_sty{
		width:100%;
		background-color: #fff;
		overflow:hidden;
		border-bottom: solid 8px #f5f5f9;
	}
	.financial_name_box,.financial_message_box{
		width: 100%;
		overflow: hidden;
	}
	.financial_message_box{
		margin:10px 0;
	}
	.financial_sty_name{
		font-size: 12px;
		color:#000;
		margin-top: 20px;
		margin-left: 15px;
		float: left;
	}
	.financial_sty_minAmout{
		float: right;
		margin-right: 15px;
		color:#aab2b7;
	    margin-top: 20px;
	    font-size: 12px;
	}
	.financial_sty_label{
		padding: 0 6px;
		font-size: 12px;
		height: 16px;
		margin-top: 20px;
		border:solid 1px #ff6c39;
		border-radius: 3px;
		color: #ff6c39;
		float: left;
		margin-left: 6px;
	}
	.financial_message_left{
		float: left;
		width: 38%;
		margin-left: 16px;
	}
	.financial_message_center{
		float: left;
		width:20%;
		text-align: center;
		font-size: 20px;
		color:#3d4a4e;
	}
	.financial_message_prpgress{
		float: left;
		    float: left;
	    margin-top: 5px;
	    width: 36%;
	    text-align: right;
	    padding-right: 20px;
	    box-sizing:border-box;

	}
	.financial_message_center_per{
		font-size: 20px;
		width:100%;
		margin-top: 12px;
		margin-bottom: 3px;
	}
	.financial_message_rates{
		font-size: 24px;
		color: #ff472a;	
		margin-top: 10px;
	}
	.rates_span{
		font-size: 14px;
	}
	.financial_msg_hint{
		font-size: 12px;
		color:#acb2b8;
		margin-bottom: 8px;
	}
	.financial_message_right{
		float: left;
		padding-top: 15px;
		padding-left: 10px;
	}
	.financial_schedule_box{
		width: 100%;
		overflow: hidden;
	}
	.financial_sch_box{
		float: left;
		width:76%;
		margin-left: 16px;
		height: 3px;
		background-color: #e4e4e4;
		margin-bottom: 20px;
		margin-top: 9px;
		position: relative;
	}
	.financial_sch_num{
		float: left;
		line-height: 21px;
		margin-left: 10px;	
	}
	.financial_sch_part{
		width: 60px;
		height: 3px;
		background-color: #3ca8ee;
	}
	.financial_dot{
		position: absolute;
		top:-1px;
		left:60px;
		width:5px;
		height:5px;
		border-radius: 50%;
		background-color: #3ca8ee;
	}
	.financial_btn_wrapper{
		background: #f5f5f9;
		padding-bottom: 24px;
	}
	.financial_btn{
		width: 80%;
		height: 32px;
		text-align: center;
		line-height: 32px;
		border:1px solid #CCC;
		border-radius: 8px;
		margin: 0 auto;
		font-size: 14px;
		color: #CCC;
	}





</style>
