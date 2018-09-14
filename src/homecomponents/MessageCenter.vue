<template>
  <div class="message">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">消息中心</div>
	</div>
	<div class="app">
		<div class="whole_box">
			<mt-button class="whole_name" @click="readall" size="small">全部已读</mt-button>
		</div>
		<div class="page-loadmore">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="page-loadmore-list">
						<div class="app_sty" v-for="(item,index) in itmes"  @click="hovershow(item)" :id="item.id" :read="item.read"> 
							<div class="sty_left" v-html="item.link"></div>
							<div class="app_right">
								<div class="app_title"  :class="{falseclass:item.read,app_show:item.isFinshed}">
									<div class="title_bi" v-text="item.title" :class="{app_show:item.isFinshed}"></div>
									<div class="text_indent" v-html="item.cont"></div>
								</div>
								<div class="right_time" v-text="item.time"></div>
							</div>
						</div>
						<div class="list_wu" v-show="list_wu">没有更多了</div> 
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
</template>

<script>
import store from '../vuex/store.js'
import axios from 'axios'
export default {
  data () {
	return {
		token:'',
		itmes:[],
		wrapperHeight: 0,
		bottomStatus: '',
		allLoaded: false,
		list_wu: false,
		nuticeData :{
			token: '',
			limit:10,
			page:1
		}
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
  	/*返回--事件*/
	returns(){
	  this.$router.go(-1);
	},
	/*mint-ui组件--上拉刷新*/
	handleBottomChange(status) {
        this.bottomStatus = status;
    },
    /*mint-ui组件--上拉刷新--事件*/
	loadBottom() {
        setTimeout(()=> {
            this.nuticeData.page = this.nuticeData.page+1;
            this.newnotice();
            this.$refs.loadmore.onBottomLoaded(); 
        }, 1500);
    },	
    /*获取消息列表数据--事件*/
	newnotice(){
		this.nuticeData.token = this.token;
		axios.post(this.rootBase+'/notice/page/user/'+this.nuticeData.page, this.nuticeData)
		.then(res =>{
			console.log("v2消息中心")
			console.log(res)
			if(res.data.result==""||res.data.result==null){
                this.allLoaded = true;
                if(this.itmes.length!=0){
                    this.list_wu=true;
                }
            }
			res.data.result.forEach((item)=> {
				item.link=this.category(item.type);
				item.cont=item.context.replace("<p>","").replace("</p>","");
				item.isFinshed = false;

				this.itmes.push({"category":item.category,"context":item.context,"id":item.id,"read":item.read,"time":item.time,"link":item.link,"cont":item.cont,"isFinshed":item.isFinshed,"title":item.title})
			});

		})
		.catch(res=> {
			console.log(res);
		});

	},
	/*点击消息读取--事件*/
	hovershow :function(item){
		var read=item.read || false;
		var idcont=item.id;
		item.isFinshed = !item.isFinshed;
		if(read==false){
			axios.post(this.rootBase+'/notice/mark_read/'+idcont, {
				token: this.token,
				id: idcont
			})
			.then(res =>{
				console.log("v2标记已读信息+n")
				console.log(res);
				if(res.data.code=="SUCCESS"){
					item.read = true
				}
			})
			.catch(res=> {
				console.log(res);
			});
			
		}
	},
	/*判断消息类似--方法*/
	category(cate){
		if(cate=="system"){
			return '<div class="mess_into mess_system">系统</div>';
		}else if(cate=="personal"){
			return '<div class="mess_into mess_me">我的</div>';
		}else if(cate=="annoucement"){
			return '<div class="mess_into mess_tice">公告</div>';
		}else if(cate=="activity"){
			return '<div class="mess_into">活动</div>';
		}else{
			return '<div class="mess_into mess_system">系统</div>';
		}
	},
	/*点击全部已读--事件*/
	readall :function(){
			axios.post(this.rootBase+'/notice/mark_read_all', {
				token: this.token,
			})
			.then(res =>{
				console.log("v2标记全部已读信息+n")
				console.log(res);
				if(res.data.code=="SUCCESS"){
					this.itmes.forEach(function(item){
						item.read = true
					})
					this.$toast({
						message: '全部已读',
						position: 'bottom',
						duration: 3000
					});
				}
			})
			.catch(res=> {
				console.log(res);
			});
		
	},
	
  },
  mounted(){
	this.token = HC.getStorage('sessionToken')
	this.newnotice();
  }
}
</script>
<style>
.mess_into{
	font-size: 12px;
	width: 36px;
	border: solid 1px #ff6c39;
	color: #ff6c39;
	text-align: center;
	border-radius: 3px;
	margin: auto;
	line-height: 20px;
}
.mess_tice{
  color:#dab876;
  border: solid 1px #dab876;
}
.mess_me{
  color:#3ca8ee;
  border: solid 1px #3ca8ee;
}
.mess_system{
  color:#69de69;
  border: solid 1px #69de69;
}
.falseclass{
	opacity: 0.5;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.whole_box{
	width:100%;
	overflow:hidden;
	background-color:#fff;
	border-top:solid 6px #f5f5f9;
	border-bottom:solid 1px #dcdce0;
	position: fixed;
	top: 40px;
	left: 0;
	z-index: 10;
	
}
.whole_name{
  line-height:34px;
  font-size:12px;
  float:right;
  text-align:center;
  background-color: #fff;
  box-shadow: none;
}
.app{
	width:100%;
	padding-top:6px;
	margin-top: 74px;
	font-size: 14px;	
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
.whole_name{
	line-height:34px;
	font-size:12px;
	float:right;
	text-align:center;
	background-color: #fff;
	box-shadow: none;
}
.app_sty{
	background-color:#fff;
	width:100%;
	overflow:hidden;
	border-bottom:solid 1px #dcdce0;
}
.sty_left{
	width:18%;
	float:left;
	font-size:12px;
	margin-top:15px;
}
.sty_into{
	width: 36px;
	border: solid 1px #ff6c39;
	color: #ff6c39;
	text-align: center;
	border-radius: 3px;
	margin: auto;
	line-height: 20px;
}
.app_right{
	width:78%;
	float:left;
	margin-top:15px;
	padding-right:10px;
}
.app_title{
	color:#203542;
	line-height: 22px;
	width:100%;
	height:22px;
	overflow:hidden;
}
.title_bi{
	width:100%;
	height:22px;
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;

}
.app_show{
	height:auto;
	white-space: normal;
	text-overflow: initial;
	word-break: break-all;
}
.right_time{
	width:100%;
	text-align:right;
	font-size:12px;
	color:#acb2b8;
	margin-top:10px;
	margin-bottom:8px;
}
.sty_tice{
	color:#dab876;
	border: solid 1px #dab876;
}
.sty_me{
	color:#3ca8ee;
	border: solid 1px #3ca8ee;
}
.sty_system{
	color:#69de69;
	border: solid 1px #69de69;
}

label{
	font-weight: normal;
}
.mint-button:after{
	background-color: #737373;
}
.text_indent{
	margin-top:6px;
}

.fl{
  float: left;
}
.fr{
  float: right;
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
.message{
  background-color:#f5f5f9;
}
.list_wu{
	width:100%;
	text-align:center;
	font-size:12px;
	color: #acb2b8;
	margin-top:10px;    
}
</style>
