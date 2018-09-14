<template>
    <div class="coupons">
        <div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            活动中心
        </div>
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <div style="min-height:300px;">
                            <div class="max_sty" v-for="item in itmes" >
                                <div class="posi_box" v-if="item.past"></div>
                                <div class="max_box" @click="activityClick(item)">
                                    <div class="max_title" v-text="item.title"></div>
                                    <div class="max_time" v-text="item.times"></div>
                                    <div class="max_time" v-text="item.time"></div>
                                    <img class="max_img" :src="item.pic" alt="没有图片地址">
                                </div>
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
</template>

<script>
import axios from 'axios'

export default {
  name: 'coupons',
  data () {
    return {
        itmes :[],
        wrapperHeight: 0,
        bottomStatus: '',
        allLoaded: false,
        list_wu: false,
        acti :{
            app_token　: '',
            page : 1
        }

    }   
  },
  components:{
    
  },
  methods:{
    activityFun(){
        this.acti.app_token = this.getCookie('sessionToken')
        axios.post('/api/v2/activity/open_auth/page/'+this.acti.page,{
            limit : 8,
            page : this.acti.page
        })
        .then(res =>{
            console.log("v2活动中心")
            console.log(res.data)
           if(res.data.result==""||res.data.result==null){
                this.allLoaded = true;
                if(this.itmes.length!=0){
                    this.list_wu=true;
                }
            }
            var daytime = new Date();
            res.data.result.forEach((item)=>{
                item.times = (item.beginTime).split(" ")[0] +" -- "+ (item.endTime).split(" ")[0];
                var daynum = Date.daysBetween(daytime,new Date(item.endTime));
                if(item.past==true&&daynum<0&&daynum>-10){
                    item.past = false;
                    item.duecont = 'pastdue'
                }else{
                    item.duecont = 'no'
                }
                this.itmes.push({"times":item.times,"href":item.url,"past":item.past,"pic":item.picurl,"title":item.title,"duecont":item.duecont})
                
            })
            
        })
        .catch(res=> {
            console.log(res);
        });
    },
    returns(){
      this.$router.go(-1);
    },
    activityClick (item){
        var app_token = HC.getStorage('sessionToken')|| ''
        if (item.href.contains("?")){
            window.location.href = item.href+"&app_token="+app_token + "&duecont=" +item.duecont+"&weixin="+'weixin';
        }else {
            window.location.href = item.href+"?app_token="+app_token + "&duecont=" +item.duecont+"&weixin="+'weixin';
        }   
    },
    handleBottomChange(status) {
        this.bottomStatus = status;
    },
    loadBottom() {
        var bu = 0;
        setTimeout(()=>{
            console.log(bu)
            this.acti.page = this.acti.page+1;
            this.activityFun()
            this.$refs.loadmore.onBottomLoaded(); 
        }, 1500);
    },

  },
    created() { 
       this.activityFun();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mint-spinner-fading-circle{
        margin: 10px auto;
    }
</style>
<style scoped>
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
    .page-loadmore{
        margin-top: 40px;
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
    ul,li{
        padding:0;
        margin:0;
        list-style: none;
    }
    .max_sty{
        width:90%;
        border:solid 1px #ececec;
        margin:10px auto 0;
        background-color:#fff;
        border-radius:8px;
        position: relative;
        overflow:hidden;
    }
    .posi_box{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:#000;
        opacity : 0.3;
    }
    .max_box{
        width:100%;
        overflow:hidden;
    }
    .max_title{
        width:90%;
        margin:6px auto 0;
        color:#203542;
        font-size:16px;
    }
    .max_time{
        width:90%;
        margin:3px auto 0;
        color:#acb2b8;
        font-size:12px;
    }
    .max_img{
        width:90%;
        margin: 10px auto 15px;
        display:block;
        min-height:80px;
    }
    .max_time{
        font-size: 12px;
        color: #acb2b8;
        width: 90%;
        margin: 4px auto 0;
    }
    .list_wu{
        width:100%;
        text-align:center;
        font-size:12px;
        color: #acb2b8;
        margin-top:10px;    
    }
</style>
