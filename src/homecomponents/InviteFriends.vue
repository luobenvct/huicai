<template>
	<div class="home">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">邀请好友</div>
		</div>
		<div class="max_box">
			<div class="title_box">
				<div class="title_name">
					<div>获奖总人数</div>
					<div class="name_box">
						<div class="title_line">{{inviteData.tatolcount}}</div>
					</div>
				</div>
				<div class="title_name">
					<div>分得奖金</div>
					<div class="name_box">
						<div class="title_line">{{inviteData.tatolbonus}}</div>
					</div>
				</div>
			</div>
			<img class="max_img" src="../assets/img/invit01.png">
			<div class="num_box">
				<div class="num_name">邀请人数：</div>
				<div class="people_num" v-cloak>{{inviteData.personalcount}}</div>
				<div class="money_num" v-cloak>{{inviteData.personalbonus}}</div>
				<div class="money_name">获奖金额：</div>
			</div>
			<div class="deta_but" @click="details">获奖详情</div>
			<div class="code_box">
				<img id="qrcode" :src="QRinviteUrl">
			</div>
			<div class="code_num">我的邀请码：<span style="font-size:16px;font-weight:bold;" v-cloak>{{inviteData.inviteCode}}</span></div>
			<div class="inte_title">——邀请好友，好友注册成功——</div>
			<div class="friend_title">
				<div class="frien_serial">1</div>
				<div class="friend_seri">邀请者可获得10元奖励</div>
			</div>
			<div class="friend_sty">
				<!-- <div class="friend_left">5元</div>
				<div class="friend_right">奖<br>励</div> -->
				<img src="../assets/img/10yuan.png" height="201" width="571">
			</div>
			<div class="friend_title">
				<div class="frien_serial">2</div>
				<div class="friend_seri">10日内完成首次任意定期交易（含新人惠），邀请者即可获得20元奖励</div>
			</div>
			<div class="friend_sty">
				<img src="../assets/img/20yuan.png" height="201" width="571">
			</div>
			<div class="friend_title">
				<div class="friend_seri" style="margin-left:30px;">若首次交易金额≥2000元，邀请者还可额外获得50元奖励</div>
			</div>
			<div class="friend_sty">
				<img src="../assets/img/50yuan.png" height="201" width="571">
			</div>
			<div class="friend_title">
				<div class="frien_serial">3</div>
				<div class="friend_seri">30日内，除上述首投外，投资30天及以上定期产品，单笔交易金额≥10000元，则邀请者可获得120元奖励</div>
			</div>
			<div class="friend_sty">
				<img src="../assets/img/120yuan.png" height="201" width="571">
			</div>
			<div class="tip_box">*所发奖励，于好友投资成功后即时发放，若超时完成则好友关系不成立，不发放奖励。</div>
			<div class="tip_box">*所有奖励均以现金券的形式发放，用于投资定期产品≥500元时抵扣使用</div>
			<img class="tip_img" src="../assets/img/invit05.png">
			<!-- <div class="posi_cont">
				<a class="posi_name" style="display:block" @click="change">邀请好友</a>
			</div> -->
		</div>
		<!-- 活动规则 -->
		<div class="rule_but" @click="changeShow">活<br>动<br>规<br>则</div>
		<div class="black" v-show="show"></div>
		<div class="position_cont" v-show="show"></div>
		<div class="rule_box" v-show="show">
			<img class="rule_img" @click="changeClose" src="../assets/img/invit07.png">
			<div class="float_box">
				<div class="rule_sty">1、活动期间，好友通过您的邀请链接/二维码/邀请码，完成注册即表示好友关系成立，您可即时获得10元奖励；</div>
				<div class="rule_sty">2、该好友注册后10日内完成首次任意定期产品交易（含新人惠），您可获得20元奖励，若首次交易金额≥2000元，您可额外获得50元奖励；</div>
				<div class="rule_sty">3、30日内完成除首投之外的30天及以上定期交易，单笔投资额≥10000元，您可获得120元奖励</div>
				<div class="rule_sty">4、上述奖励将于您的好友投资成功后即时发放至您的券包中，若超时则邀友关系不成立，不予发放相关奖励；</div>
				<div class="rule_sty">5、若邀请关系成立期间，活动奖励调整，则未完成阶段奖励按调整后奖励发放；</div>
				<div class="rule_sty">6、本活动所发邀友奖励均为现金抵用券，投资任意定期产品≥500元即可抵扣使用，券有效期7天；</div>
				<div class="rule_sty">7、活动期间，好友通过您的邀请注册惠财即可获得年化15%的新手专享产品购买特权和新人理财大礼包（888元组合现金券+3%加息券）；</div>
				<div class="rule_sty">8、本活动最终解释权归浙江硕惠网络科技股份有限公司，与苹果公司无关。</div>
			</div>      
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'

	export default {
		name: 'home',
		data () {
			return {
				show:false,
				inviteData:[],
				QRinviteUrl:'',
				token:''
			}
		},
		components:{

		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			change(){
				alert("分享")
			},
			changeShow(){
				this.show = true;
			},
			changeClose(){
				this.show = false;
			},
			details(){
				this.$router.push({ path: '/winningdetails' })
			},
			dataFn(){
				//邀请数据
				axios.post(this.rootBase+'/invite/invitor/achievement',{
					app_token:this.token
				})
				.then(res =>{
					console.log("v2"+"邀请数据");
					console.log(res);    
					this.inviteData = res.data.result; 
					this.QRinviteUrl = 'https://m.88huicai.com/api/qrcode/filename.htm?f=gif&s=200&content='+this.inviteData.inviteUrl+'&channel=invite';
				})
				.catch(res=> {
					console.log(res);
				});
			}
		},
		mounted(){
			/*this.token = this.getCookie('sessionToken');*/
			this.token = HC.getStorage('sessionToken')
			this.dataFn();
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
	.home{
		background-color: #24a4ed;
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
		z-index: 2;
	}
	.top .name{
		margin-left: 8%;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	[v-cloak] {
		display: none !important;
	}

	.max_box{
		width:100%;
		overflow:hidden;
		padding-bottom:100px;
		margin-top: 40px;
		background: url('../assets/img/beijin.png') center no-repeat;
	}
	.title_box{
		width:100%;
		overflow:hidden;
		background-color:#3ca8ee;
		padding:6px 0;
		position:fixed;
		top:40px;
		left:0;
	}
	.title_name{
		width:45%;
		float:left;
		padding-left:15px;
		color:#c1dff8;
		font-size:12px;
	}
	.name_box{
		width:100%;
		overflow:hidden;
	}
	.title_line{
		letter-spacing: 4px;
		height:16px;
		border-radius:3px;
		background-color:#d8eefc;
		text-align:center;
		line-height:16px;
		color:#1287d2;
		font-weight:blod;
		margin-top:4px;
		font-size:14px;
		float:left;
	}
	.max_img{
		margin-top: 48px;
		width:100%;
	}
	.num_box{
		width:100%;
		overflow:hidden;
		line-height:40px;
		color:#fff;
	}
	.num_name{
		float:left;
		margin-left:15px;
	}
	.people_num,.money_num{
		height:24px;
		background-color:#0e83c6;
		float: left;
		line-height: 24px;
		padding: 0 5px;
		margin-top: 8px;
	}
	.money_num{
		float:right;
		margin-right:15px;
	}
	.money_name{
		float:right;
	}
	.deta_but{
		width:70%;
		line-height:40px;
		margin:10px auto;
		text-align:center;
		background:url('../assets/img/invit02.png') no-repeat center;
		background-size:100% 100%;
		font-size:18px;
		color:#fff;
	}
	.code_box{
		width:120px;
		height:120px;
		background-color:#fff;
		border-radius:5px;
		margin:20px auto;
		overflow:hidden;
	}
	#qrcode{
		width:100%;
	}
	.code_num{
		width:100%;
		text-align:center;
	}
	.inte_title{
		width:100%;
		text-align:center;
		font-size:20px;
		color:#fff;
		margin:20px 0;
	}
	.friend_title{
		width:100%;
		overflow:hidden;
		font-size:12px;
		color:#fff;
		padding-left:15px;
		line-height:26px;
		margin: 15px 0;
	}
	.frien_serial{
		width:22px;
		height:22px;
		border-radius:50%;
		line-height:22px;
		margin-right:8px;
		background-color:#fff;
		color:#24a4ed;
		font-size:20px;
		margin-top:2px;
		text-align:center;
		float:left

	}
	.friend_seri{
		float:left;
		width: 80%;
	}
	.friend_sty{
		width:70%;
		height:90px;
		margin-left:15%;
		overflow:hidden;
		margin-bottom:30px;
	}
	.friend_sty img{
		width: 100%;
		height: 100%;
	}
	.friend_left{
		width:70%;
		line-height:90px;
		text-align:center;
		font-size:40px;
		color:#ff6666;
		float:left;
		background:url("../assets/img/invit03.png") no-repeat center;
		background-size:100% 100%;
	}
	.friend_right{
		float:left;
		width:30%;
		line-height:36px;
		text-align:center;
		font-size:30px;
		color:#fff;
		height:90px;
		background:url("../assets/img/invit04.png") no-repeat center;
		background-size:100% 100%;
		padding-top: 8px;
	}
	.tip_box{
		width:90%;
		margin:auto;
		font-size:12px;
		color:#a0d0f5;
		line-height:20px;

	}
	.tip_img{
		width:90%;
		display:block;
		margin:15px auto;
	}
	.posi_cont{
		width:100%;
		height:60px;
		position:fixed;
		bottom:0;
		left:0;
		overflow:hidden;
		background-color:#7fccf7;
	}
	.posi_name{
		width:80%;
		line-height:40px;
		font-size:18px;
		color:#fff;
		text-align:center;
		border-radius:6px;
		background-color:#ff6c39;
		margin:10px auto;
	}
	.posi_name:hover,.deta_but:hover{
		text-decoration: none;
		color:#fff;
	}
	.rule_but{
		position:fixed;
		top:20%;
		right:0;
		width:26px;
		background:url("../assets/img/invit06.png") no-repeat center;
		background-size:100% 100%;
		text-align:center;
		color:#fff;
		line-height: 22px;
		padding: 10px 0px;
		height: 110px;
	}
	.black{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		right:0;
		background-color:#000;
		opacity: 0.4;
	}
	.position_cont{
		width:98%;
		position:fixed;
		left:1%;
		background:url("../assets/img/invit08.png") no-repeat center;
		background-size:100% 100%;
		height:400px;
		top:50%;
		margin-top:-200px;
	}
	.rule_box{
		width:98%;
		position:fixed;
		left:1%;
		height:400px;
		top:50%;
		margin-top:-200px;
		padding:80px 0 10px;
	}
	.float_box{
		width:100%;
		height:310px;
		overflow:hidden;
		overflow-y:scroll;
	}
	.rule_img{
		position: absolute;
		top:-10px;
		right:20px;
		width:30px;
	}
	.rule_sty{
		font-size:12px;
		line-height:22px;
		width:78%;
		margin-left: 12%;
		color:#4f5e6e;
	}
</style>
