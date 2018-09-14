<template>
  <div class="riskwarn">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">惠财投资协议</div>
	</div>
	<div class="max_box" id="max_box" v-cloak>
		<div class="rosbox">
			<div class="ros_title">您的风险评测结果为</div>
			<img class="ros_img" :src="typeimg">
			<div class="ros_type" v-text="powername">保守型</div>
			<div class="ros_feng" v-text="preferencename">风险中性型</div>
			<div class="ros_advice">投资建议:<span>0-{{limitMoney/10000}}万</span></div>
			<div class="ros_cont" v-text="typecont">可投资银行间市场、交易所市场债券，资金拆借、信托计划及其他金融资产等。</div>
			<div class="ros_but" @click="butclick">购买产品</div>
		</div>
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
		typecont : '',     // 测试结果内容
		limitMoney:0,      //投资限额
        typeimg : '',      //测试结果图片
        powername : '',     //风险能力类型
        preferencename : '', //风险偏好类型
		bidtype:'',        //判断是普通标的还是存管标的
        biduuid:''         //标的id
	}
  },
  methods:{
	returns(){
		this.$router.go(-1);
	},
	butclick(){
		/*if(this.biduuid == ""){
			this.$router.push({path:'/financial'})
		}else if(this.bidtype =="common"){
			this.$router.push({ name: 'Purchase', params: { userId: this.biduuid}})
		}else{
			this.$router.push({ name: 'BidBuy', params: { userId: this.biduuid}})
		}*/
		this.$router.go(-1);
	},
	assessmentFun (){
		axios.post('/api/risk_preference_assessment/get_result.htm',{
			app_token :this.token || '',
		})
		.then((res)=>{
			if(res.data.code=="TOKEN_ERROR"){
				this.$toast('请先登录')
			}else if(res.data.code=="SUCCESS"){
				this.usertype = true;
				if(res.data.count==2){
					var arr = res.data.result;
					this.preferencename = arr[0].grade;
					this.powername = arr[1].grade;
					this.jsonFun(arr[1].grade);
					/*购买限额list*/
				    axios.post('/api/v2/pub/register/open_auth/risk_remind_amount_limit', {
				        
				    })
				    .then(res =>{
				        console.log("购买限额list")
				        console.log(res)
				        res.data.result.forEach((item)=>{
				        	if(this.powername == item.grade){
				        		this.limitMoney = item.amountLimit;
				        	}
				        })
				        
				    })
				    .catch(res=> {
				        console.log(res);
				    });
				}else{
			
				}

			}
		})
	},
	jsonFun(name){
		var json = [
			{
				"name" : "保守型",
				"img" : 1,
				"cont" : "可投资银行间市场、交易所市场债券，资金拆借、信托计划及其他金融资产等。"
			},
			{
				"name" : "稳健型",
				"img" : 2,
				"cont" : "可投资银行间市场、交易所市场债券，资金拆借、信托计划及其他金融资产等。"
			},
			{
				"name" : "平衡型",
				"img" : 3,
				"cont" : "可投资于债券、同业存放等低波动性金融产品外，还可投资于股票、商品、外汇等高波动性金融产品。"
			},
			{
				"name" : "进取型",
				"img" : 4,
				"cont" : "可投资股票、黄金、外汇等高波动性金融产品的比例可超过30%，不保证本金偿付，本金风险较大，收益浮动且波动较大。"
			},
			{
				"name" : "激进型",
				"img" : 5,
				"cont" : "可投资于股票、外汇、黄金等各类高波动性的金融产品，并可采用衍生交易、分层等杠杆放大的方式进行投资运作。"
			}
		]
		json.forEach((item)=>{
			//console.log(item)
			if(name==item.name){
				this.typecont = item.cont;
				this.typeimg = require('../assets/img/risk00'+item.img+'.png');
				
			}
		})
	}
	
  },
  computed: {
   
  },
  mounted(){
  	this.token =HC.getStorage('sessionToken');
	this.biduuid = this.$route.params.userId || '';
	this.bidtype = this.$route.params.bidtype || '';
	this.assessmentFun();
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
	margin-top: 48px;
}
/*评估结果*/
.ros_title{
	width:100%;
	overflow: hidden;
	text-align: center;
	color:#203542;
	margin: 15px 0;
}
.ros_img{
	width:130px;
	display: block;
	margin: auto;
}
.ros_type{
	width:100%;
	overflow: hidden;
	text-align: center;
	font-size: 18px;
	color: #3ca8ee;
	margin: 10px auto 0;
}
.ros_feng{
	width:100%;
	overflow: hidden;
	text-align: center;
	color: #4d5f6b;
}
.ros_advice{
	width:100%;
	overflow: hidden;
	text-align: center;
	color: #4d5f6b;
	margin-top: 12px;
}
.ros_cont{
	width: 90%;
	margin:12px auto;
	overflow: hidden;
	line-height: 28px;
	color: #acb2b8;
}
.ros_but{
	width:90%;
	overflow: hidden;
	margin:40px auto 0;
	text-align: center;
	color: #fff;
	line-height: 44px;
	border-radius: 5px;
	background-color: #ff6c39;
}
.ros_butn{
	background-color: #fff;
	border:solid 1px #ff6c39;
	color:#ff6c39;
	margin-top: 20px;
}
.but_ti{
	width: 90%;
	line-height: 44px;

	margin: 25px auto;
	background-color: #ff6c39;
	color: #fff;
	text-align: center;
	border-radius: 5px;
}
</style>
