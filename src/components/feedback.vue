<template>
	<div class="feedback">
		<div class="huicai_left">
			<img class="huicai_img" src="../assets/img/pro01.png">
		</div>
		<div class="huicai_right">
			<div class="huicai_title">惠财</div>
			<div class="huicai_text">您好,请简要描述您的问题或建议？</div>
		</div>
		<div class="content_wrapper">
			<div class="content" v-for="item in lists">
				<div v-if="item.type == 2" class="content_left">
					<div class="huicai_left02 fl"><img src="../assets/img/pro01.png"></div>
					<div class="fl" style="width:60%; overflow:hidden;">
						<div class="item_name">惠财</div>
						<div v-if="item.contentType==1">{{item.content}}</div>
						<img  class="conten_img" v-else :src="item.content" @click="magnifyFun(item)">
					</div>
				</div>
				<div class="content_right" v-else>
					<div class="huicai_left03 fr">
						<img class="huicai_left03_img" src="../assets/img/pro02.png">
						<img class="member_img" :src="memberImg">
					</div>
					<div class="fr" style="width:44%; font-size:12px; overflow:hidden;">
						<div class="item_name01">{{item.user.mobile}}</div>
						<div class="item_content fl" v-if="item.contentType==1">{{item.content}}</div>
						<img  class="conten_img" v-else :src="item.content" @click="magnifyFun(item)">
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="footer_btn">
			<input type="text" name="name" v-model="content" class="feed_input">
			<button class="feed_btn" @click="dataFn">发送</button>
		</div> -->
		<div class="app_food">
			<div class="food_box">
				<div class="food_left">
					<img class="food_but" @click="foodButFun" src="../assets/img/pro03.png">
				</div>
				<textarea  class="food_input" v-model="content"></textarea>
				<div class="release_but" v-if="dataShow" @click="dataFn">发送</div>
				<div class="release_but" v-else>发送</div>
			</div>
			<div class="food_tu" v-if="food_name">
				<form id="formdata"  class="form_box">
			    	<a href="javascript:;" class="a-upload">
			        	<input type="file" name="filedata" accept="image/png,image/gif,image/jpeg" @change="getFile($event)">
			        </a>
			        <input type="hidden" id="fileName" name="fileName" value="">
	                <input type="hidden" name="description" value="">
	                <input type="hidden" name="isImage" value="true">
	                <input type="hidden" name="isTemp" value="false">
			        <div id="preview">
			        	
			        </div>
		        </form>
			</div>
		</div>
		<div class="black" v-if="posttion_show" @click="posttion_hide"></div>
		<img class="img_position" v-if="posttion_show" :src="posttion_src" @click="posttion_hide">
	</div>
</template>

<script>
	import store from '../vuex/store.js'
	import axios from 'axios'

	export default {
		data () {
			return {
				content:'',
				posttion_src:'',
				lists:[],
				token:'',
				food_name :false,
				posttion_show :false,
				dataShow :true,
				memberImg :''
			}
		},
		computed: {
			rootBase(){
				return store.getters.getRootBase
			},
			Https(){
				return store.getters.getHttps
			}
		},
		methods:{
			posttion_hide(){
				this.posttion_src = '';
				this.posttion_show = false;
			},
			magnifyFun(item){
				console.log(item)
				this.posttion_show = true;
				this.posttion_src = item.content;
			},
			getFile(event){
				var filetext = event.target.files[0];
				if(filetext!=''||filetext!=null){
					var isLt2M =filetext.size / 1024 / 1024 < 1;
		            if (!isLt2M) {
		            	this.$toast("上传图片大小不能超过 1MB!")
		                return;
		            }
					console.log(filetext)
					console.log(window.URL.createObjectURL(filetext));
					var str = '<img id="imghead" style="width:120px;" src="'+window.URL.createObjectURL(filetext)+'">';
					$("#fileName").val(filetext.name)
					$("#preview").empty();
					$("#preview").append(str);
				}
				
			},
			foodButFun(){
				this.food_name = !this.food_name;
				$("#preview").empty();
			},
			dataFn(){
				this.dataShow = false;
				//帮助反馈列表
				let p={
					t:new　Date(),
					app_token:this.token,
					content:this.content.trim(),
					pics : ''
				}
				let tableimg = 'empty';
				if($("#imghead").attr("src")==''||$("#imghead").attr("src")==null){
					tableimg = 'empty'
				}else{
					tableimg = 'amoghavajra'
				}
				/*p.pics = p.pics || '';
				p.pics =encodeURIComponent(p.pics);*/
				
				if(tableimg == 'empty'){
					if(p.content==''&& p.pics==''){
						this.$toast({
						  message: "问题不能为空！",
						  position: 'bottom',
						  duration: 1000
						});
						this.dataShow = true;
						return false;
					}
				}
				if(tableimg== 'amoghavajra'){
					var formData = new FormData($("#formdata")[0]);
					$.ajax({  
		                url:this.Https+"/api/v2/upload/upload_file",  
		                type: 'POST',  
		                data: formData,  
		                dataType: 'json',
		                async: false,  
		                cache: false,  
		                contentType: false,  
		                processData: false,  
		                success:  (data)=> {
		                    console.log(data)
		                    if(data.code=="SUCCESS"){
		                    	p.pics = data.filePath;
		                    }else{
		                    	this.dataShow = true;
		                        this.$toast(data.msg);
		                    }
		                },  
		                error: (XMLHttpRequest, textStatus, errorThrown) =>{ 
		                	this.dataShow = true;
		                	this.$toast("文件太多")
		                }  
		            });
				}
				axios.post(this.rootBase+'/feed_back/submit', p)
				.then(res =>{
					console.log("v2提交问题")
					console.log(res)
					this.dataShow = true;
					if(res.data.code=='SUCCESS'){
						this.content = '';
						this.food_name =false;
						this.dataFn02();
						
					}
				})
				.catch(res=> {
					console.log(res);
				});
			},
			dataFn02(){
				axios.post(this.rootBase+'/feed_back/list', {
					app_token:this.token
				})
				.then(res =>{
					if(res.data.code=='SUCCESS'){
						this.lists = res.data.result;
						this.lists.forEach((item)=>{
							item.user.mobile = (item.user.mobile).substring(0,3)+"****"+(item.user.mobile).substr(7)
						})
						$('html,body').animate({ scrollTop: $(document).height() }, 100);
					}else{
						this.$toast(res.data.msg)
					}
				})
				.catch(res=> {
					this.dataShow = true;
					//console.log(res);
				});
				axios.post(this.rootBase+'/member/user/grade', {
					app_token:this.token
				})
				.then(res =>{
					if(res.data.code=='SUCCESS'){
						if(res.data.result.name=="V2"){
				  			this.memberImg = require("../assets/img/member002.png")
				  		}else if(res.data.result.name=="V3"){
				  			this.memberImg = require("../assets/img/member003.png")
				  		}else if(res.data.result.name=="V4"){
				  			this.memberImg = require("../assets/img/member004.png")
				  		}else {
				  			this.memberImg = require("../assets/img/member001.png")
				  		}
						
						
					}else{
						this.$toast(res.data.msg)
					}
				})
				
			}
		},
		mounted(){
			  //this.token = this.getCookie('sessionToken');
			  this.token = HC.getStorage('sessionToken')
			  this.$nextTick(() => {
			  	this.dataFn02()
			  })     
			},
			created(){

			}
		}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.fr{
		float: right;
	}
	.fl{
		float: left;
	}
	.feedback{
		padding-bottom: 52px;
		background: rgb(245,245,249);
	}
	.content_wrapper{
		margin-bottom: 40px;
		background: rgb(245,245,249);
	}
	.huicai_left{
		margin-top: 56px;
		float:left;
		margin-left: 4%;
		width:12%;
		overflow:hidden;
	}
	.huicai_left img{
		width: 100%;
	}
	.huicai_left02{
		margin-top: 6px;
		margin-left: 4%;
		width:44px;
		overflow:hidden;
		margin-right: 4px;
	}
	.huicai_left02 img{
		width: 100%;
		height: 100%;
	}
	.huicai_left03_img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.huicai_left03{
		width: 44px;
		float: right;
		margin-right: 6%;
		margin-left: 8px;
		position: relative;
	}
	.member_img{
	    position: absolute;
	    width: 30px;
	    bottom: -2px;
	    left: 6px;
	}
	.item_content{
		width: 100%;
		overflow: hidden;
		text-align: right;
	}
	.item_name{
		width: 100%;
		margin-top: 4px;
	}
	.item_name01{
		width: 100%;
		margin-top: 4px;
		text-align: right;
	}
	.huicai_right{
		float: left;
		margin-left: 10px;
		margin-top: 62px;
		font-size: 14px;
	}
	.content{
		width: 100%;
		overflow: hidden;
		clear: both;
		margin-top: 10px;
	}
	.content_left{
		width: 45%;
		clear: both;
		float: left;
	}
	.content_right{
		width: 55%;
		clear: both;
		float: right;
		margin-top: 6px;
	}
	.feed_input{
		position: fixed;
		bottom: 0;
		height: 32px;
		width: 63%;
		left: 6%;
		border-radius: 4px;
		border:1px solid #CCC;
		text-indent: 5px;
	}
	.feed_btn{
		position: fixed;
		bottom: 0;
		right: 0;
		height: 42px;
		width: 80px;
		text-align: center;
		line-height: 40px;
		color: #FFF;
		background: #3ca8ee;
		border: none;
		border-radius: 4px;
	}
	.footer_btn{
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 42px;
		overflow: hidden;
		background: rgb(245,245,249);
	}
	.app_food{
		width:100%;
		overflow:hidden;
		position:fixed;
		left:0;
		bottom:0;
	    padding: 6px 0;
	    background-color: #edeef1;
	}
	.food_box{
		width:100%;
		overflow:hidden;
	}
	.food_left{
		width:12%;
		float:left;
		text-align:center;
	}
	.food_but{
		width:24px;
		margin-top:8px;
	}
	.food_input{
		width:64%;
		height:40px;
		line-height: 40px;
		border:none;
		border-radius:4px;
		float:left;
	    display: block;
	    padding-left:10px;
	    resize: none;
	}
	.release_but{
		width:14%;
		height:40px;
		line-height:40px;
		background-color:#007aff;
		float:left;
		margin:auto 2%;
		color:#fff;
		text-align:center;
		border-radius:4px;
		border:none;
		padding:0;
	}
	.food_tu{
		width:100%;
		overflow:hidden;
	}
	ul,li{
		padding:0;
		margin:0;
	}
	.a-upload {
	    width:30px;
	    height: 25px;
	    line-height: 20px;
	    position: relative;
	    cursor: pointer;
	    color: #888;
	    background:url("../assets/img/pro04.png") no-repeat center;
	    background-size:100% 100%;
	    border: 1px solid #ddd;
	    border-radius: 4px;
	    overflow: hidden;
	    display: inline-block;
	    *display: inline;
	    *zoom: 1;
		margin-left:12%;
		margin-top:10px;
		float:left;	    
	}
	
	.a-upload  input {
	    position: absolute;
	    font-size: 100px;
	    right: 0;
	    top: 0;
	    opacity: 0;
	    filter: alpha(opacity=0);
	    cursor: pointer
	}
	
	.a-upload:hover {
	  	 background:url("../assets/img/pro04.png") no-repeat center;
	    background-size:100% 100%;
	}	
	.file_img{
		width:50px;
		height:50px;
		border:none;
		margin-left:10px;
	}
	.tip_into{
        width:80%;
        height: 56px;
        position: fixed;
        bottom: 100px;
        left: 10%;
        border-radius: 6px;
        text-align: center;
        line-height: 56px;
        color: #ffffff;
        font-size: 14px;
        display:none;
    }
    .tip_posi{
        opacity: 0.5;
        background-color: #000000;
    }
    #preview{
    	float:left;
    	margin:10px;
    }
	#imghead{
		width:120px;
	}
	.conten_img{
		width:100%;
		margin-top:6px;
	}
	.black{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		background-color: #000;
		opacity: 0.4;
		z-index: 10000;
	}
	.img_position{
		width: 90%;
		max-height: 90%;
		display: block;
		position: fixed;
		top:10%;
		left:5%;
		z-index: 10000;
	}
	.huicai_text{
		color:#203542;
	    line-height: 24px;
        word-break: break-all;
	}
</style>
