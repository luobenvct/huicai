<template>
	<div class="home">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">获奖详情</div>
		</div>

		<div class="max_box">
			<div v-if="resultShow">
				<div class="max_title">
					<div class="title_left">
						邀请人数：<span id="proe_num">{{invitData.length}}</span> 人
					</div>
					<div class="title_right">
						获奖金额：<span id="inves_num">{{totalMoney}}</span> 元
					</div>
				</div>
				<div class="inves_four">获得奖励已及时存入你的惠活宝账户和券包中</div>
				<div class="line"></div>
				<div class="inves_box">
					<div class="inves_title">
						<div class="inves_left inves_one01">好友号码</div>
						<div class="inves_left inves_two">注册/首次投资日期</div>
						<div class="inves_left inves_three">奖励(元)</div>
					</div>
					<div class="page-loadmore">
						<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
							<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
								<ul class="page-loadmore-list">
									<div class="sty_box" v-for="item in invitData01">
										<div class="inves_left inves_one">{{item.inviteeMoblie}}</div>
										<div class="inves_left inves_two">
											<div class="sty_time">{{item.gmtCreate}}</div>
											<div class="sty_time">{{(item.firstInvestTime).split(" ")[0]}}</div>
										</div>
										<div class="inves_left inves_money">{{item.bonus}}</div>
									</div>
									<div style="height: 40px;"></div> 
								</ul>
								<div slot="bottom" class="mint-loadmore-bottom">
									<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
									<span v-show="bottomStatus === 'loading'">
										<mt-spinner type="fading-circle" style="margin:auto;" :size="30"></mt-spinner>
									</span>
								</div>
							</mt-loadmore>
						</div>
					</div>
				</div>
			</div>
			<div class="noinvset" v-else>
				
			</div>
		
		</div>
		
	</div>
</template>

<script>
import axios from 'axios'

	export default {
		data () {
			return {
				token:'',
				invitData:[],
				invitData01:[],
				totalMoney:0,
				resultShow:true,
				wrapperHeight: 0,
				bottomStatus: '',
				allLoaded: false,
				page:1
			}
		},
		components:{

		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
			loadBottom() {
		        setTimeout(()=> {
		            this.page = this.page+1;
		            this.dataFn();
		            this.$refs.loadmore.onBottomLoaded(); 
		        }, 1500);
		    },	
			dataFn(){
				//邀请数据
				axios.post('/api/v2/invite/invitee/page/'+this.page, {
					app_token:this.token,
					page:this.page,
					limit:10
				})
				.then(res =>{
					console.log("v2邀请数据ww");
					console.log(res); 
					this.invitData = res.data.result;
					if(res.data.result==""||res.data.result==null){
		                this.allLoaded = true;
		                if(this.invitData01.length!=0){
		                	this.invitData.length = this.invitData01.length;
		                    this.$toast({
							  	message: '没有更多了！',
							  	position: 'bottom',
							  	duration: 3000
							});
							return;
		                }
		            }else{
		            	res.data.result.forEach((item)=>{
							if(item.firstInvestTime == null){
								item.firstInvestTime = "未投资"	
							}
							item.inviteeMoblie = item.inviteeMoblie.substring(0,3)+'****'+item.inviteeMoblie.substring(7);
							item.gmtCreate = item.gmtCreate.split(" ")[0];
							let bonus = (item.bonus-0);
							this.totalMoney += bonus;
							this.invitData01.push({
								"inviteeMoblie":item.inviteeMoblie,
								"bonus":item.bonus,
								"gmtCreate":item.gmtCreate,
								"firstInvestTime":item.firstInvestTime
							})
							
						})
		            }  
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
		margin-left: 10%;
	}
	.top .returns{
		margin-left: 2%;
		margin-right: 30%;
	}
	[v-cloak] {
		display: none !important;
	}
	.max_box{
		margin-top: 50px;
	}
	.title_left{
		width: 45%;
		display: inline-block;
		margin-left: 4%;
		margin-bottom: 12px;
	}
	.max_title{
		background: #FFF;
	}
	.max_title span{
		color: #3ca8ee;
	}
	.sty_box{
		clear: both;
		padding: 10px 0;
		width: 100%;
		overflow: hidden;
		border-bottom: 1px solid #CCC;
	}
	.title_right{
		width: 45%;
		display: inline-block;
	}
	.inves_title{
		padding-top: 16px;
		overflow: hidden;
		padding-bottom: 10px;
		border-bottom: 1px solid #CCC;
	}
	.inves_left {
		float: left;
		margin: 0;
		font-size: 12px;
	}
	.inves_box{
		clear: both;
		padding-left: 4%;
	}
	.inves_one {
		width: 26%;
		margin-top: 6px;
	}
	.inves_one01{
		width: 26%;
	}

	.inves_two {
		width: 40%;
		text-align: center;
	}

	.inves_three {
		width: 30%;
		text-align: right;
	}
	.inves_four{
		background-color: #fff;
		font-size: 12px;
		height: 25px;
		padding-left: 15px;
		padding-bottom: 6px;
	}
	.line{
		width: 100%;
		height: 16px;
		background: #CCC;
	}
	.inves_mobile {
		font-size: 14px;
		color: #203542;
		width: 30%;
	}
	.inves_money{
		width: 30%;
		text-align: right;
		font-size: 16px;
		color:#ff6c39;
		margin-top: 6px;
	}
	.position_box{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		background-color:#fff;
		z-index: 9999;
	}
	.noinvset{
		width: 100%;
		height: 500px;
		overflow: hidden;
		background: url('../assets/img/noinvest.png') center no-repeat;
	}
</style>
