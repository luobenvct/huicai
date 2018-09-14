<template>
	<div class="repay">
		<div class="top">
			<div @click="returns" class="returns fl">
			<img src="../../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">投资记录</div>
		</div>
		<div class="max_step">
			<div class="top02">
				<div class="fl">
					<span class="fontSize12">投资人数：</span>
					<span class="color">{{investCount.bidCount}}</span>
					<span class="fontSize12">人</span>
				</div>
				<div class="fr">
					<span class="fontSize12">总投资：</span>
					<span class="color" v-if="investCount.finishAmount">{{investCount.finishAmount | num}}</span>
					<span class="color" v-else>0.00</span>
					<span class="fontSize12">元</span>
				</div>
				<div class="line"></div>
			<div class="inves_title">
				<div class="inves_left">投资人/时间</div>
				<div class="inves_right">投资金额</div>
			</div>
			<div class="page-loadmore" v-if="investData.length!=0">
				<div class="page-loadmore-wrapper" ref="wrapper">
					<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="page-loadmore-list">
							<div class="inves_content">
							  <div class="inves_sty" v-for="item in investData">
								<div class="sty_box">
								  <div class="sty_left">
									<div class="sty_name">{{item.mobile }}</div>
									<div class="sty_time">{{item.to_char}}</div>
								  </div>
								  <div class="sty_num">{{item.buy_amount | num}}</div>
								</div>
							  </div>  
							</div> 
							<div class="list_wu" v-show="isNot">没有更多了</div> 
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
			<!-- end -->

			<div class="inves_content" v-else>
			  <img src="../../assets/deposits_img/norecord.png" style="width: 100%">
			</div>
			</div>

		</div>
	    
	</div>
</template>
<script>
    import axios from 'axios'
	import store from '../../vuex/store.js'

	export default {
		data () {
			return {
				token:'',
				userId:"",
				investData:[],
				investCount:{},
				bottomStatus: '',
				allLoaded: false,
				isNot:false,
				page:1
			}   
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
			investment(){
				//投资记录数据
				axios.post('/api/v2/financing_project_bid/open_auth/fixed/page/' + this.page, {
					financingProjectId : this.userId
				})
				.then(res=>{
                    if(res.data.result ==''|| res.data.result == null){
						this.allLoaded = true;
						if(this.investData.length!=0){
							this.isNot = true;
						}
						
						return;
					}
					res.data.result.forEach((item)=> {
						this.investData.push({"mobile":item.user.mobile,"to_char":item.gmtCreate,"buy_amount":item.buyAmount})
					})

				});
					
			},
			project(){
				axios.post('/api/v2/open_auth/financing_project/'+this.userId)
				.then(res=>{
					this.investCount = res.data.result;
				})
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom() {
				setTimeout(()=>{
					this.page = this.page+1;
	            	this.investment()
		            this.$refs.loadmore.onBottomLoaded();
				}, 1500);
			}
			
		},
		mounted(){
			this.userId = this.$route.params.userId;
			this.investment();
			this.project();
		},
		filters: {
			num(value) {
				if(value == parseInt(value)){
					return value + '.00';
				}else{
					return value
				}     
			},
			mobile(value){
				let firstnext =value.substring(0,3);
				let lastnext=value.substring(value.length-4);
				let name=firstnext+"****"+lastnext;
				return name;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mint-loadmore{
		background: #FFF;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.color{
		color: #3ca8ee;
	}
	.line{
		clear: both;
		width: 110%;
		height: 10px;
		background: #f5f5f9;
		margin-top: 40px;
		margin-left: -16px;
	}
	.fontSize12{
		font-size: 12px;
	}
	.top{
		width: 100%;
		padding: 8px 0;
		overflow: hidden;
		background: #3ca8ee;
		color: #FFF;
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
		width: 90%;
		text-align: center;
	}
	.top02{
		width: 96%;
		margin: 0 auto;
		padding:10px 2%;
		position: fixed;
		top: 50px;
		background: #FFF;
		z-index: 4;
	    height: 87%;
	    overflow: hidden;
	    overflow-y: scroll;
	}
	.inves_title{
		width: 90%;
		overflow: hidden;
		border-bottom: solid 1px #e5e5e5;
		font-size: 12px;
		color:#acb2b8;
		line-height: 40px;
		height: 40px;
		margin: auto;
	}
	.inves_left{
		float: left;
		margin-left: 4px;
	}
	.inves_right{
		float:right;
		margin-right: 4px;
	}
	.inves_sty{
		overflow: hidden;
	}
	.sty_box{
		width:90%;
		overflow: hidden;
		margin: auto;
		border-bottom: solid 1px #e5e5e5;
		height: 67px;
	}
	.sty_left{
		float: left;
		margin-left: 4px;
	}
	.sty_name{
		font-size: 16px;
		color: #203542;
		margin-top: 15px;
		margin-bottom: 4px;
	}
	.sty_time{
		font-size: 10px;
		color: #acb2b8;
	}
	.sty_num{
		float: right;
		margin-right: 4px;
		line-height: 66px;
		font-size: 16px;
		color:#ff6c39;
	}
	ul,li{
		padding: 0;
		margin: 0;
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
	[v-cloak]{
		display: none;
	}
	
</style>
