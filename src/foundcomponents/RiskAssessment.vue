<template>
	<div class="risk">
		<div class="nav_box">
			<div @click="returns" class="returns_box"></div>
			风险偏好
		</div>
		<div id="max_box">
			<div class="rosbox" v-show="rosbox">
				<div class="max_into" v-show="title_into">投资有风险，不同承受能力和风险偏好的客户，应选择不同的投资产品或投资组合。以下测试，帮助您更好地了解自己的风险偏好和风险承受能力。</div>
				<div class="risk_title" v-text="title_name">客户风险承受能力测试 </div>
				<div class="topic_title">{{items.num}}、{{items.title}}</div>
				<div class="elect_box">
					<div class="elect_sty" v-for="item in items.choose" :class="{elect_sty02: choose_name== item.cont}" @click="liskClick(item)">{{item.options}}：{{item.cont}}</div>
				</div>
				<div class="number_box">
	                <div class="on_box" @click="onFun" v-if="topicnum>0">上一题</div>
	                {{items.num}} / 18
	                <div class="next_box" @click="nextFun" v-if="topicnum<17">下一题</div>
	            </div>
	            <div class="but_ti" v-if="topicnum==17"  @click="nextFun">提交</div>
			</div>
			<div v-show="rosbox01" class="rosbox">
				<div class="ros_title">您的风险评测结果为</div>
				<img class="ros_img" :src="typeimg">
				<div class="ros_type" v-text="powername">保守型</div>
				<div class="ros_feng" v-text="preferencename">风险中性型</div>
				<div class="ros_cont" v-text="typecont">可投资银行间市场、交易所市场债券，资金拆借、信托计划及其他金融资产等。</div>
				<div class="ros_but" @click="butclick">购买产品</div>
				<div class="ros_but ros_butn" @click="resetFun">重新评估</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store.js'


export default {
  name: 'risk',
  data () {
	return {
		items :[],
        powernum : [],  //测试分数
        topicnum : 0,       // 题目
        choose_name : '' ,   
        choose_type : '' , //选择分数
        title_into : true,  
        title_name : '客户风险承受能力测试',
        usertype : false,
        powername : '',     //风险能力类型
        preferencename : '', //风险偏好类型
        rosbox : false ,    // 用户测试状态
        rosbox01:false,
        typecont : '',     // 测试结果内容
        typeimg : '',      //测试结果图片
        contlist : [],
		token : '',
		options_name :'',
        options_list:[],
        bidtype:'',        //判断是普通标的还是存管标的
        biduuid:''         //标的id
	}   
  },
  components:{
	
  },
  computed:{
  	riskjson(){
		return store.getters.getriskJson
  	} 
  },
  methods:{
	returns(){
	  this.$router.go(-1);
	},
	butclick(){
		if(this.biduuid == ""){
			this.$router.push({path:'/financial'})
		}else{
			this.$router.go(-1);
		}
		/*if(this.biduuid == ""){
			this.$router.push({path:'/financial'})
		}else if(this.bidtype =="common"){
			this.$router.push({ name: 'Purchase', params: { userId: this.biduuid}})
		}else{
			this.$router.push({ name: 'BidBuy', params: { userId: this.biduuid}})
		}*/
	},
	onFun(){
        var num = 0 ;
        var cont = '';
        num = this.powernum.pop();
        cont = this.contlist.pop();
        //console.log(this.contlist)
        this.choose_name = cont;
        this.choose_type = num;
        //console.log(this.powernum)
        this.topicnum--;
        this.liskFun();
    },
	resetFun(){
		this.topicnum = 0;
        this.powernum = [];
        this.choose_type = '';
        this.preferencenum = [];
        this.title_name =  '客户风险承受能力测试';
        this.rosbox = true;
        this.rosbox01 =false;
        this.liskFun();
	},
	liskClick(item){
		this.choose_name = item.cont;
		this.choose_type = item.score;
		this.options_name = item.options;
	},
	liskFun (){
		this.items = this.riskjson[this.topicnum]
	},
	nextFun(){
		if(this.choose_type==''){
			this.$toast('请选择答案')
		}else{
			this.title_into = false;
			this.contlist.push(this.choose_name);
			this.options_list.push(this.options_name);
            if(this.topicnum>8){
                this.title_name = '客户风险偏好测试'
            }else{
                this.title_name = '客户风险承受能力测试'
            }
            
            this.powernum.push(this.choose_type)
            this.choose_type = '';
			if(this.topicnum==17){
				var powers=0;
				var powernuu = '';
				for(var i = 0;i<10 ; i++){
                    powers += this.powernum[i];
                    powernuu += this.options_list[i]+',';
                }
				console.log(powers);
				if(powers>=10&&powers<=15){
					this.powername = '保守型';
				}else if(powers>=16&&powers<=20){
					this.powername = '稳健型';
				}else if(powers>=21&&powers<=30){
					this.powername = '平衡型';
				}else if(powers>=31&&powers<=38){
					this.powername = '进取型';
				}else if(39<=powers){
					this.powername = '激进型';
				}
				var preferencenum=0;
				var prefernuu = '';
				for(var i = 10;i<18 ; i++){
                    preferencenum += this.powernum[i];
                    prefernuu += this.options_list[i]+',';
                }
				if(preferencenum>=8&&preferencenum<=15){
				   this.preferencename = '风险厌恶型';
				}else if(preferencenum>=16&&preferencenum<=25){
					this.preferencename = '风险中性型';
				}else if(26<=preferencenum){
					this.preferencename = '风险偏好型';
				}
				console.log(preferencenum);

			   axios.post('/api/risk_preference_assessment/save_result.htm',{
					app_token : this.token || '',
					version : 1,
					questionnaire :'风险承受能力测试',
					score : powers,
					grade : this.powername,
                    answerInfo : powernuu
				})
				.then((res)=>{
					if(res.data.code=="SUCCESS"){
						axios.post('/api/risk_preference_assessment/save_result.htm',{
							app_token : this.token || '',
							version : 2,
							questionnaire :'风险偏好测试',
							score : preferencenum,
							grade : this.preferencename,
                    		answerInfo : prefernuu
						})
						.then((res)=>{
							if(res.data.code=="SUCCESS"){
								this.assessmentFun()
							}
						})
					}
				})
				return;
			}
			this.topicnum++;
			this.liskFun();
		}
	},
	assessmentFun (){
		axios.post('/api/risk_preference_assessment/get_result.htm',{
			app_token :this.token || '',
		})
		.then((res)=>{
			if(res.data.code=="TOKEN_ERROR"){
				this.$toast('请先登录')
				this.usertype = false;
				this.rosbox = true;
				this.rosbox01 = false;
			}else if(res.data.code=="SUCCESS"){
				this.usertype = true;
				if(res.data.count==2){
					this.rosbox = false;
					this.rosbox01 = true;
					var arr = res.data.result;
					this.preferencename = arr[0].grade;
					this.powername = arr[1].grade;
					this.jsonFun(arr[1].grade);
				}else{
					this.rosbox = true;
					this.rosbox01 = false;
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
  mounted(){
	this.token =HC.getStorage('sessionToken');
	this.biduuid = this.$route.params.userId || '';
	this.bidtype = this.$route.params.bidtype || '';
 	console.log(this.token)
	this.assessmentFun();
	this.liskFun();
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.risk{
	background-color: #f5f5f9; 
	position: absolute;
	height: 100%;
	width: 100%;
	overflow: hidden;
	overflow-y: scroll;
	font-size: 14px;
}
.coupons{
  width: 100%;
  overflow: hidden;
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
	background: url(../assets/img/Back_icon.png) no-repeat center;
	background-size: 18px;
}
	
#max_box{
	width:100%;
	overflow: hidden;
	margin-top: 40px;
}
.rosbox{
	width:100%;
	overflow: hidden;
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
.max_into{
	color:#acb2b8;
	text-indent: 2em;
	width:92%;
	margin:25px auto;
	line-height: 24px;
	overflow: hidden;
}
.risk_title{
	width:90%;
	color:#4d5f6b;
	font-size: 18px;
	line-height: 22px;
	border-left: solid 8px #3ca8ee; 
	padding-left: 10px;
	margin:10px auto;
	overflow: hidden;
}
.topic_title{
	width:90%;
	color:#4d5f6b;
	margin:20px auto;
	font-size: 16px;
	line-height: 24px;
}
.elect_box{
	width: 100%;
	background-color: #fff;
	overflow: hidden;
}
.elect_sty{
	width: 82%;
	color: #4d5f6b;
	overflow: hidden;
	border-bottom: solid 1px #dcdce0;
	margin-left: 6%;
	background:url(../assets/img/risk02.png) no-repeat 92% center;
	background-size:  20px;
	line-height: 24px;
	padding: 15px 15% 15px 0;
}
.elect_sty02{
	background-image: url(../assets/img/risk01.png);
}
.number_box{
	width: 100%;
	overflow: hidden;
	line-height: 50px;
	color:#acb2b8;
	text-align: center;
	font-size: 12px;
	position: relative;
}
.next_box{
	position: absolute;
	top:0;
	right: 0;
	color: #ff6c39;
	padding: 0 20px;
	overflow: hidden;
}
.on_box{
	position: absolute;
	top:0;
	left: 0;
	color: #ff6c39;
	padding: 0 20px;
	overflow: hidden;
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
