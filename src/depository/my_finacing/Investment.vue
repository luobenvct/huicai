<template>
	<div class="coupons">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			资产历史动态
		</div>
		<div class="invest_title" v-show="judgeShow">
			<div class="title_name title_border" :class="{title_color:nowId=='cunguan'}" @click="cunguanFun('depository')">存管账户</div>
			<div class="title_name" :class="{title_color:nowId=='putong'}" @click="cunguanFun('common')">普通账户</div>
		</div>

		<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div class="container"  :class="{max_eng:!judgeShow}">
				<div class="max_box" v-for="item in items" v-show="items.length>0">
					<div class="benyue" v-text="item.yearname">本月</div>
					<div class="item" v-for="itee in item.contlist"><!--  @click="detailClick(itee)" -->
						<div class="item01 fl">
							<div class="div01" v-text="itee.monthtime">02/22</div>
							<div class="div02" v-text="itee.yeartime">2016</div>
						</div>
						<div class="item03 fl">
							<div class="div01 fl" v-if="itee.moneyType=='INCOME'" :style="{color:'#ff6c39'}">+{{itee.amount}}</div>
							<div class="div01 fl"  v-else-if="itee.moneyType=='EXPENDITURE'" :style="{color:'#3ca8ee'}"> -{{itee.amount}}</div>
                            <div class="div02 fr" v-if="itee.statusRemark" v-text="itee.statusRemark">购买惠活宝</div>
							<div class="div02 fr" v-else v-text="itee.detailTypeRemark">购买惠活宝</div>
						</div>
						<!-- <div class="item04 fr" v-show="itee.detailShow"></div> -->
						<div class="clear"></div>
					</div>
				</div>
				<div class="list_wu" v-show="list_wu">没有更多了</div>   
				<!-- <div style="height:290px;"></div> -->
			</div>
			<div slot="bottom" class="mint-loadmore-bottom">
				<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
				<span v-show="bottomStatus === 'loading'">
					<mt-spinner type="fading-circle" style="margin:auto;" :size="30"></mt-spinner>
				</span>
			</div>
		</mt-loadmore>
        <div class="bj_box" v-show="items.length==0">
            <img class="bj_img" src="../../assets/deposits_img/insec001.png" height="200" width="225">
            <div class="bj_name">资金暂无记录</div>
        </div>
	</div>
</template>

<script>
	import axios from 'axios'
	import store from '../../vuex/store.js'

	export default {
		name: 'coupons',
		data () {
			return {
				isShow:true,
				items : [],
				nowId:"",
				color:false,
				bottomStatus: '',
				allLoaded: false,
				offset : 0,
				list_wu : false,
				yearlist: [],
				invest_type : '',
				invest_type02 : '',
				page :1,
				judgeShow : true,
				token:''
			}   
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			}
		},
		components:{

		},
		methods:{
			returns(){
				this.$router.go(-1);
			},
			handleBottomChange:function(status) {
            this.bottomStatus = status;
        },
        loadBottom :function() {
            var _self = this;
            setTimeout(function() {
                _self.offset = _self.offset+10;
                _self.page = _self.page+1;
                _self.currentFun()
                _self.$refs.loadmore.onBottomLoaded();
            }, 1500);
            
        },  
        detailClick : function(itee){
            if(itee.detailShow){
                if(this.nowId=='cunguan'){
                    if(itee.detailType=="INVESTOR_LEND_PAY"){
                        this.$router.push({ path:'/depdepositsdetails?hui=cai'+'&bidType='+ 'buy' +'&uuid='+itee.uuid +'&amount=' +itee.amount +'&bankCardNo='+itee.relativeBizCode+'&bankName=' +itee.remark +'&timename=' +itee.gmtCreate+'&toBankCardDate='+itee.toBankCardDate})
                    }else if(itee.detailType=="RECHARGE"){
                        this.$router.push({ path:'/depdepositsdetails?hui=cai'+'&bidType='+ 'recharge' +'&uuid='+itee.uuid +'&amount=' +itee.amount +'&bankCardNo='+itee.relativeBizCode+'&bankName=' +itee.remark +'&timename=' +itee.gmtCreate+'&statusRemark=' + itee.statusRemark+'&toBankCardDate='+itee.toBankCardDate})
                    }else if(itee.detailType=="WITHDRAW"){
                        var namezhong = '';
                        if(itee.statusRemark==''||itee.statusRemark==null||itee.statusRemark =="提现成功"){
                            namezhong = ""
                        }else{
                            namezhong = "zhong"
                        }
                        this.$router.push({ path:'/depdepositsdetails?hui=cai&bidType=withdrawal' +'&uuid='+itee.uuid +'&amount=' +itee.amount +'&bankCardNo='+itee.relativeBizCode+'&bankName=' +itee.remark +'&timename=' +itee.gmtCreate+'&timenameend=' +itee.toBankCardDate+"&namezhong=" + namezhong+'&toBankCardDate='+itee.toBankCardDate})
                      
                    }
                }else if(this.nowId=='putong'){
                    if(itee.subject=="buy_scb"){
                        this.$router.push({ path:'/depdepositsdetails?hui=cai&bidType=buy&uuid='+itee.uuid +"&amount=" +itee.amount +"&bankCardNo="+itee.bankCardNo+"&bankName=" +itee.bankName +"&timename=" +itee.gmtCreate+"&toAccountDate="+itee.nextDate})
                    }else if(itee.subject=="withdraw"){
                        if(itee.status=="transfered"){
                            itee.textname = '提现成功';
                            this.$router.push({ path:'/depdepositsdetails?hui=cai&bidType=withdrawal&uuid='+itee.uuid +"&amount=" +itee.amount +"&bankCardNo="+itee.bankCardNo+"&bankName=" +itee.bankName +"&timename=" +itee.gmtCreate+"&toAccountDate="+itee.toAccountDate})
                        }else if(itee.status=="apply"){
                            itee.textname = '提现中';
                            this.$router.push({ path:'/depdepositsdetails?hui=cai&bidType=withdrawal&uuid='+itee.uuid +"&amount=" +itee.amount +"&bankCardNo="+itee.bankCardNo+"&bankName=" +itee.bankName +"&timename=" +itee.gmtCreate+"&toAccountDate="+itee.toAccountDate+"&namezhong=zhong"})
                        }
                        
                    }
                }
            	
            }
            
        },
        /*存管版*/
        currentFun : function(){
            var _self = this;
            if(_self.invest_type=="depository"){
                _self.nowId='cunguan';
                //
			  	axios.post(this.rootBase+'/account/depository/history', {
					app_token:this.token,
					offset : _self.offset,
					limit : 10
			 	 })
			  	.then(res =>{
					console.log("存管+存管历史数据ss");
					console.log(res);    
					var date = new Date;
                        var month = date.getMonth()+1;
                        //console.log(month)
                        var arr =res.data.result.result;
                        if(arr ==''|| arr == null){
                            _self.allLoaded = true;
                            if(_self.items.length!==0){
                                _self.list_wu = true;
                            }
                            return;
                        }
                        arr.forEach(function(item) {
                            var year =  _self.splitFun(item.gmtCreate,1);
                            if(item.detailType=="RECHARGE"||item.detailType=="WITHDRAW"||item.detailType=="INVESTOR_LEND_PAY"){
                                item.detailShow = true;
                            }else{
                                item.detailShow = false;
                            }
                            if(item.remark==''||item.remark==null){
                                item.remark=''
                            }
                            if(year==month){
                                if (_self.yearlist.indexOf("本月") == -1){
                                    _self.yearlist.push("本月");
                                    _self.items.push({"yearname":"本月","contlist":[]})
                                } 
                                _self.items[0].contlist.push({"relativeBizCode":item.relativeBizCode,"uuid":item.uuid,"img":item.img,"amount":item.amount,"monthtime":_self.splitFun(item.gmtCreate,1)+"/"+_self.splitFun(item.gmtCreate,2),"yeartime":_self.splitFun(item.gmtCreate,0),"title":item.title,"showbox":_self.showFun(item.id),"moneyType":item.moneyType,"detailType":item.detailType,"detailShow":item.detailShow,"remark":item.remark,"gmtCreate":item.gmtCreate,"toBankCardDate":item.toBankCardDate,"detailTypeRemark":item.detailTypeRemark,"statusRemark":item.statusRemark,"toBankCardDate":item.toBankCardDate});
                            }else{
                                if (_self.yearlist.indexOf(year) == -1){
                                    _self.yearlist.push(year);
                                    _self.items.push({"yearname":year+"月","contlist":[]})
                                }
                                var listnum = _self.yearlist.indexOf(year);
                                _self.items[listnum].contlist.push({"relativeBizCode":item.relativeBizCode,"uuid":item.uuid,"img":item.img,"amount":item.amount,"monthtime":_self.splitFun(item.gmtCreate,1)+"/"+_self.splitFun(item.gmtCreate,2),"yeartime":_self.splitFun(item.gmtCreate,0),"title":item.title,"showbox":_self.showFun(item.id),"moneyType":item.moneyType,"detailType":item.detailType,"detailShow":item.detailShow,"remark":item.remark,"gmtCreate":item.gmtCreate,"toBankCardDate":item.toBankCardDate,"detailTypeRemark":item.detailTypeRemark,"statusRemark":item.statusRemark,"toBankCardDate":item.toBankCardDate});
                                

                            }
                            
                        });
			  	})
			  	.catch(res=> {
					console.log(res);
			  	});

            }else if(_self.invest_type=='common'){
                _self.nowId='putong';
                  //
				  axios.post(this.rootBase+'/assets/combine/ondemand/history', {
					app_token:this.token,
					genre : "BUY_SCB",
                    page:_self.page,
                    limit : 10
				  })
				  .then(res =>{
					console.log("存管+普通数据ddf");
					console.log(res);    
					var date = new Date;
                        var month = date.getMonth()+1;
                        //console.log(month)
                        var arr =res.data.result;
                        if(arr ==''|| arr == null){
                            _self.allLoaded = true;
                            if(_self.items.length!==0){
                                _self.list_wu = true;
                            }
                            console.log(_self.items);
                            return;
                        }
                        arr.forEach(function(item) {
                            var year =  _self.splitFun(item.date,1);
                            
                           if(item.subject=="buy_scb"){
                                item.textname = '购买成功';
                                item.moneyType = 'INCOME';
                                item.detailShow = true;
                                if(item.payMark=="洽谈购买,线下付款"){
                                    item.textname = '活动奖励';
                                }
                            }else if(item.subject=="withdraw"){
                                item.moneyType = 'EXPENDITURE';
                                if(item.payMark=="DEMAND_2_FIX"){
                                    item.textname = '活转定';
                                    item.detailShow = false;
                                }else if(item.status=="transfered"){
                                    item.textname = '提现成功';
                                    item.detailShow = true;
                                }else if(item.status=="apply"){
                                    item.textname = '提现中';
                                    item.detailShow = true;
                                }
                                
                                
                            }
                            if(item.remark==''||item.remark==null){
                                item.remark=''
                            }
                            if(year==month){
                                if (_self.yearlist.indexOf("本月") == -1){
                                    _self.yearlist.push("本月");
                                    _self.items.push({"yearname":"本月","contlist":[]})
                                } 
                                _self.items[0].contlist.push({"uuid":item.id,"amount":item.amount,"monthtime":_self.splitFun(item.date,1)+"/"+_self.splitFun(item.date,2),"yeartime":_self.splitFun(item.date,0),"moneyType":item.moneyType,"detailShow":item.detailShow,"gmtCreate":item.date,"detailTypeRemark":item.textname,"subject":item.subject,"payMark":item.payMark,"bankCardNo":item.bankCardNo,"bankName":item.bankName,"toAccountDate":item.toAccountDate,"status":item.status,"nextDate":item.nextDate});
                            }else{
                                if (_self.yearlist.indexOf(year) == -1){
                                    _self.yearlist.push(year);
                                    _self.items.push({"yearname":year+"月","contlist":[]})
                                }
                                var listnum = _self.yearlist.indexOf(year);
                                _self.items[listnum].contlist.push({"uuid":item.id,"amount":item.amount,"monthtime":_self.splitFun(item.date,1)+"/"+_self.splitFun(item.date,2),"yeartime":_self.splitFun(item.date,0),"moneyType":item.moneyType,"detailShow":item.detailShow,"gmtCreate":item.date,"detailTypeRemark":item.textname,"subject":item.subject,"payMark":item.payMark,"bankCardNo":item.bankCardNo,"bankName":item.bankName,"toAccountDate":item.toAccountDate,"status":item.status,"nextDate":item.nextDate});

                            }
                            
                        });
				  })
				  .catch(res=> {
					console.log(res);
				  });
            }
            
        },
        cunguanFun:function(objname){
            this.offset = 0;
            this.page =  1;
            this.allLoaded = false;
            this.list_wu = false;
            this.items = [];
            this.yearlist = [];
            this.invest_type = objname;
            this.currentFun();
        },
        splitFun : function(index,num){
            var time = index.split(" ")[0].split("-")
            return time[num];
        },
        showFun : function(index){
            if(index==''){
                return false;
            }else{
                return true;
            }
            
        },
        judgeFun:function(){
            var _self = this;
            //即将到期数据
			  axios.post(this.rootBase+'/account/depository/is_has', {
				app_token:this.token
			  })
			  .then(res =>{
				console.log("存管+是否开通存管账户");
				console.log(res);    
				if(res.data.code=="SUCCESS"){
                        console.log(res.data.result)
                        if(res.data.result==true){
                            _self.invest_type = this.$route.params.type || 'depository'
                        }else if(res.data.result==false){
                            _self.invest_type = 'common';
                            _self.judgeShow = false;
                        }
                        _self.currentFun();
                    }else{
                    	this.$toast({
							message: '无可提现金额',
							position: 'bottom',
							duration: 1000
						})
                        //_self.$toast(data.msg)
                    }
			  })
			  .catch(res=> {
				console.log(res);
			  });
        	}
		},
		filters :{
			money (val){
				var moneynum = val/10000;
				return moneynum;
			}
		},
		mounted(){
			this.token = HC.getStorage('sessionToken');
			//this.invest_type02 = this.$route.params.type;
			this.judgeFun();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mint-loadmore{
        margin-top: 46px;
    }
	.coupons{
		width: 100%;
		overflow: hidden;
		background-color: #f5f5f9;
	}
	.nav_box{
		width: 100%;
		position: fixed;
		top: 0;
		left:0;
		height:40px;
		line-height: 40px;
		background-color:#fff;
		text-align: center;
		color: #000; 
		z-index: 100;
	}

	.returns_box{
		position: absolute;
		top: 0;
		left: 0;
		width:40px;
		height:40px;
		background: url(../../assets/img/Back_icon.png) no-repeat center;
		background-size: 18px;
	}
	.into_box{
		width:100%;
		padding: 15px 30px;
		border-bottom: solid 1px #e5e5e5;
		color:#acb2b8;
		font-size: 12px !important;
		line-height: 20px;
		/*background: url(../../assets/img/buyin02.png) no-repeat 20px 22px;*/
		background-size: 6px;
		margin-top: 40px;
	}
	#app,.max_box{
		width:100%;
		overflow:hidden;
	}
	.max_box{
		background-color:#fff; 
		
	}
	/*.max_box:nth-child(1){
		padding-top: 46px;
	}*/
    .container{
        padding-top: 46px;
    }
	.max_eng{
		padding-top: 0;
	}
	/*公共样式*/
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
	.fl{
		float:left;
	} 
	.fr{
		float:right;
	} 
	.clear{
		clear:both;
		height:0;
	}
	[v-cloak] {
		display: none;
	} 
	/*top*/
	#top{
		width:40px;
		height:30px;
		text-align:center;
		line-height:30px;
		border:1px solid #ccc;
		border-radius:4px;
		position:fixed;
		top:2%;
		right:2%;
		z-index:3;
	}
	
	#selection{
		width:100%;
		height: 240px;
		background: #FFF;
		position: fixed;
		top: 44px;
		z-index:4;
	}

	.black{
		width:100%;
		height:100%;
		background: #000;
		opacity: 0.5;
		filter:alpha(opacity=50);
		position: fixed;
		top: 44px;
		z-index:3;
	}
	.selection{
		display: none;
	}
	#selection .btn{
		font-weight:normal;
		width:30%;
		border:1px solid #ccc;
	}
	#selection .btn_l{
		width: 27%;
		margin: 8px 3%;
		background: #FFF;
		color:#203542;
		font-size:14px;
	}
	#selection .btn_m{
		width: 26%;
		margin: 8px 3%;
	}
	#selection .btn_r{
		width: 26%;
		margin: 8px 3%;
	}
	#selection .btn_large{
		margin-top:8px;
		width: 56%;
		margin-left: 3%;
		font-size:14px;
		font-weight:normal;
		letter-spacing:2px;
		font-family:"宋体";
	}
	#selection .btn_rr{
		margin-top:8px;
		margin-right: 15%;
	}
	.benyue{
		height: 40px;
		line-height:40px;
		width: 100%;
		border-bottom: 1px solid #dcdce0;
		padding-left: 6%;
		background:#f5f5f9;
		font-size: 12px;
		color: #acb2b8;
	}
	.ciyue{
		height: 40px;
		line-height:40px;
		width: 100%;
		border-bottom: 1px solid #dcdce0;
		padding-left: 3%;
	}
	.item{
		width: 94%;
		height: 80px;
		border-bottom: 1px solid #dcdce0;
		margin-left: 6%;
	}
	.item01{
		margin-top: 25px;
		margin-right: 10%;
		padding-right: 5px;
		text-align: center;
		font-size: 12px;
		color: #acb2b8;
	}
	.item01 .div01{
		letter-spacing: 1px;
		padding-right: 3px;
		padding-left: 3px;
		border-bottom: 1px solid #dcdce0;
	}
	.item01 .div02{
		letter-spacing: 2px;
		margin-top: 2px;
	}
	.item03{
		margin-top: 30px;
		width:62%;
	}
	.item03 .div01{
		font-size: 18px;
	}
	.item03 .div02{
		font-size: 14px;
		color: #203542;

	}
	.item04{
		margin-top: 33px;
		margin-right: 5%;
		width: 8px;
		height:14px;
		background:url(../../assets/deposits_img/puch03.png) no-repeat center;
		background-size: 100% 100%;
	}
	.item05{
		margin-top:30px;
		margin-left:14%;
	}
	.btn{
		background:#FFF;
		font-family:"宋体";
	}
	#selection .color{
		background-color:#3ca8ee;
		color:#FFF;
		outline:none;
	}
	.list_wu{
		width:100%;
		text-align:center;
		font-size:12px;
		color: #acb2b8;
		margin-top:10px;    
		margin-bottom: 16px;
	}
	.mint-spinner-fading-circle{
		margin:auto;
	}
	.invest_title{
		width:100%;
		background-color: #fff;
		height:46px;
		overflow: hidden;
		position: fixed;
		top: 40px;
		left: 0;
		z-index: 10;
	}
	.title_name{
		font-size: 16px;
		width: 49%;
		line-height: 30px;
		text-align: center;
		float: left;
		margin-top: 8px;
		color: #acb2b9;
	}
	.title_border{
		border-right: solid 1px #e5e5e5; 
	}
	.title_color{
		color:#3ca8ee;
	}
	.bj_box{
        width: 100%;
        overflow: hidden;
        position: fixed;
        height: 100%;
        background-color: #f5f5f9;
	}
	.bj_img{
		 width: 54%;
        display: block;
        margin-left: 18%;
        margin-top: 144px;

	}
	.bj_name{
		width:100%;
		overflow: hidden;
		text-align: center;
		line-height: 60px;
		font-size: 16px;
		color: #b6b6b6;
		letter-spacing: 2px;
	}
</style>
