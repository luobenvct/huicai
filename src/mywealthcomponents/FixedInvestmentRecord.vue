<template>
  <div id="investmentrecord">
    <div class="nav_box">
        <div @click="returns" class="returns_box"></div>
            全部定期投资记录
        </div>
    <div>
        <div class="black" v-show="selectShows" @click="closeSelect"></div> 
        <div class="select" v-show="selectShows">
            <div class="select01">
                <div class="item" :class="{beijing:index01}" @click="choose('DAYS_7_TO_25')">7天至25天标</div>
                <div class="item" :class="{beijing:index02}" @click="choose('DAYS_25_TO_40')">25天至40天标</div>
                <div class="item" :class="{beijing:index03}" @click="choose('DAYS_40_TO_70')">40天至70天标</div>
            </div>
            <div class="select02">
                <div class="item" :class="{beijing:index04}" @click="choose('DAYS_70_TO_100')">70天至100天标</div>
                <div class="item" :class="{beijing:index05}" @click="choose('DAYS_100_TO_200')">100天至200天标</div>
                <div class="item" :class="{beijing:index06}" @click="choose('DAYS_200_MORE')">200天以上标</div>
            </div>
        </div>
        <ul class="ul_title ul01">
            <li v-for="(item,index) in lists" :class="{ bj_color : item.show,bj_border : item.classShow}" @click="change(item,index)">{{item.name}}</li>
            <li class="bj_border01" :class="{ bj_color : bjSelect}" style="width:25.5%;" @click="selectShow">其他筛选 <span><img alt="筛选" src="../assets/deposits_img/depositchoose02.png" style='height:12px;'></span></li>
        </ul>
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper" ref="wrapper">
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" >
                    <ul class="page-loadmore-list" >
                        <div style="min-height: 300px;">
                            <div v-if="loadingShow" style="margin-top: 200px; text-align: center;">
                                <span>
                                    <mt-spinner type="fading-circle" style="margin:60px auto;" :size="30"></mt-spinner>
                                </span>
                                <div style="margin-top: 20px; font-size: 14px;">加载中...</div>
                            </div>
                            <div v-else>
                                <div class="else" v-if="items.length == 0"></div>
                                <div v-else class="max_box" v-for="item in items">
                                    <div class="month_box" v-text="item.yearname"></div>
                                    <div class="regu_sty" v-for="itee in item.contlist">
                                        <div class="time_box">
                                            <div class="time_left mark_font" v-text="itee.targetName"></div>
                                            <div class="time_left interest">{{itee.targetAnnualizedRates}}%</div>
                                            <div class="time_left deposit" v-if="itee.payMark === '存管账户'">存管</div>
                                        </div>
                                        <div class="time_box border_box" v-if="!repayShow">
                                            <div v-show="itee.state == '购买成功'">
                                                 <div class="time_left commonColor">购买本金</div>
                                                 <div class="time_right commonColor">本金 <span class="money_font" v-text="itee.buyAmount"></span> 元</div>
                                            </div>
                                            <div v-show="itee.state == '回款中'">
                                                <div class="time_left commonColor">本息合计</div>
                                                <div class="time_right commonColor">+利息 <span class="money_font" v-text="itee.expectedProfit"></span> 元</div>
                                                <div class="time_right commonColor">本金 <span class="money_font" v-text="itee.buyAmount"></span> 元</div>
                                            </div>
                                            <div v-show="itee.state == '回款成功'">
                                                <div class="time_left commonColor">本息合计</div>
                                                <div class="time_right commonColor">+利息 <span class="money_font" v-text="itee.expectedProfit"></span> 元</div>
                                                <div class="time_right commonColor">本金 <span class="money_font" v-text="itee.buyAmount"></span> 元</div>
                                            </div>
                                        </div>
                                        <div class="time_box border_box" v-else>
                                            <div class="time_left commonColor">本息合计</div>
                                            <div class="time_right commonColor">+利息 <span class="money_font" v-text="itee.expectedProfit"></span> 元</div>
                                            <div class="time_right commonColor">本金 <span class="money_font" v-text="itee.buyAmount"></span> 元</div>
                                        </div>
                                        <div class="time_box">
                                            <div class="time_left commonColor">使用券包</div>
                                            <div class="time_right commonColor" v-if="itee.cashCouponAmount >0 "> <span  v-if="itee.annualizedRatePlus >0 ">+</span> 红包<span style="color:#ff6c39;"> {{itee.cashCouponAmount}}元</span></div>
                                            <div class="time_right commonColor" v-if="itee.addInterest >0 "> <span  v-if="itee.annualizedRatePlus >0 ">+</span> 加息券<span style="color:#ff6c39;"> {{itee.addInterest}}%</span></div>
                                            <div class="time_right commonColor"  v-if="itee.annualizedRatePlus > 0">加息<span style="color:#ff6c39;"> {{itee.annualizedRatePlus}}%</span></div>
                                            <div class="time_right commonColor" v-show="itee.couponHide">无</div>
                                        </div>
                                        <div class="time_box" style="padding-top:4px;">
                                            <div class="time_left commonColor">购买日期:{{itee.gmtCreate}} ({{itee.period}}天)</div>
                                            <div class="time_right commonColor"  v-if="itee.bankName == '存管账户'">存管账户</div>
                                            <div class="time_right commonColor"  v-else>普通账户</div>
                                            <img class="imgSrc" v-if="itee.bankName == '存管账户'" src="../assets/deposits_img/depositbank01.png">
                                            <img v-else class="imgSrc02" src="../assets/deposits_img/depositbank02.png">
                                            
                                        </div>
                                        <div class="time_box">
                                            <div class="time_left commonColor" v-if="itee.toAccountDate">预计到账日期:{{(itee.toAccountDate).split(" ")[0]}}</div>
                                            <div class="time_left commonColor" v-else>满标计息</div>
                                            <div class="time_right zhuangtai">{{itee.state}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="list_wu" v-show="list_wu">没有更多了</div>   
                            <div class="more" v-show ="!list_wu && items.length != 0">上拉可查看更多数据哦!</div>
                            <div class="moreIcon" v-show ="!list_wu && items.length != 0">
                                <img class="down_img" alt="下拉加载跟多" src="../assets/deposits_img/depositmore.png">
                            </div>
                            <div class="into_box">如有疑问可致电<a class="into_a" href="tel:4009998381">400-999-8381</a></div> 
                        </div>            
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
        items : [],
        index01:false,
        index02:false,
        index03:false,
        index04:false,
        index05:false,
        index06:false,
        lists:[
            {
                name:"全部",
                condition:'',
                show : true,
                classShow: true
            },
            {
                name:"在投记录",
                condition:'BUY',
                show : false,
                classShow:true
            },
            {
                name:"回款记录",
                condition:'REPAY',
                show : false,
                classShow: false
            }
        ],
        ulstyle:false,
        record :{
            app_token　: '',
            condition : '',
            page : 1,
            limit: 6
        },
        wrapperHeight: 0,
        bottomStatus: '',
        allLoaded: false,
        list_wu: false,
        yearlist : [],
        selectShows: false,   //控制刷选显示
        //loadingShow: true,    //显示加载中
        bjSelect:false,        //刷选的颜色控制
        repayShow:false,
        loadingShow:true         //加载中
    }
  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    handleBottomChange(status) {
        this.bottomStatus = status;
    },
    loadBottom () {
        setTimeout(()=>{
            this.record.page = this.record.page+1;
            this.currentFun()
            this.$refs.loadmore.onBottomLoaded();
        }, 1500);
    },  
    selectShow(){
        this.selectShows = true;
    },
    closeSelect (){
        this.selectShows = false;
    },
    choose (item){
        var _self = this;
        if(item == "DAYS_7_TO_25"){
            
            this.index01 = true;
            this.index02 = false;
            this.index03 = false;
            this.index04 = false;
            this.index05 = false;
            this.index06 = false;
        }
        if(item == "DAYS_25_TO_40"){
            this.index01 = false;
            this.index02 = true;
            this.index03 = false;
            this.index04 = false;
            this.index05 = false;
            this.index06 = false;
        }
        if(item == "DAYS_40_TO_70"){
            this.index01 = false;
            this.index02 = false;
            this.index03 = true;
            this.index04 = false;
            this.index05 = false;
            this.index06 = false;
        }
        if(item == "DAYS_70_TO_100"){
            this.index01 = false;
            this.index02 = false;
            this.index03 = false;
            this.index04 = true;
            this.index05 = false;
            this.index06 = false;
        }
        if(item == "DAYS_100_TO_200"){
            this.index01 = false;
            this.index02 = false;
            this.index03 = false;
            this.index04 = false;
            this.index05 = true;
            this.index06 = false;
        }
        if(item == "DAYS_200_MORE"){
            this.index01 = false;
            this.index02 = false;
            this.index03 = false;
            this.index04 = false;
            this.index05 = false;
            this.index06 = true;
        }
        this.list_wu = false;
        this.items = [];
        this.yearlist =[];
        this.record.condition = item;
        this.record.page = 1;
        this.loadingShow = true;

        /**/
        if(item.condition == 'REPAY'){
            this.repayShow = true;
        }else{
            this.repayShow = false;
        }

        this.currentFun()
        this.ulstyle = false;
        this.allLoaded = false;
        setTimeout(()=>{
            this.selectShows = false;
        },500)
        
        this.lists.forEach((item)=>{
            item.show = false;
        })
        this.bjSelect = true;
    },
    currentFun(){
        var _self = this;
        axios.post('/api/v2/financing_project_bid/combine/bid/page/' + _self.record.page,_self.record)
        .then(res=>{
            var date = new Date;
            var month = date.getMonth()+1;
            console.log(month);
            setTimeout(()=>{
                this.loadingShow = false;
            },1000)
            if(res.data.result ==''|| res.data.result == null){
                _self.allLoaded = true;
                if(_self.items.length!==0){
                    _self.list_wu = true;
                }
                
                return;
            }
            res.data.result.forEach(function(item) {
                var year =  _self.splitFun(item.payTime,1); 
                if(item.addInterestAmount== 0 &&item.cashCouponAmount== 0 &&item.targetAnnualizedRatesPlus== 0){
                    item.couponHide = true;
                }else{
                    item.couponHide = false;
                }
                //console.log(timenum)
                if(item.endProfit==''||item.endProfit==null){
                    item.endProfit = ''
                }else{
                    item.endProfit = _self.timeFun(item.endProfit);
                }
               
                item.principalAndInterest = HC.decimalFun(item.buyAmount+item.profit);
                item.targetAnnualizedRateson = HC.decimalFun(item.targetAnnualizedRates);
                item.expectedProfit = HC.decimalFun(item.expectedProfit);
                item.imgSrc = "https://static.88huicai.com/huicai/image/bank/card/" + HC.imgFun(item.bankName);
                if(year==month){
                    if (_self.yearlist.indexOf("本月") == -1){
                        _self.yearlist.push("本月");
                        _self.items.push({"yearname":"本月","contlist":[]})
                    } 
                    
                    _self.items[0].contlist.push({"imgSrc":item.imgSrc,"couponHide":item.couponHide,"state":item.state,"targetName":item.targetName,"buyAmount":HC.decimalFun(item.buyAmount),"bankName":item.bankName,"gmtCreate":_self.timeFun(item.payTime),"period":item.period,"endProfit":item.endProfit,"cashCouponAmount":item.cashCouponAmount,"addInterest":item.addInterestAmount,"annualizedRatePlus":item.targetAnnualizedRatesPlus,"targetAnnualizedRates":item.targetAnnualizedRateson,"payMark":item.payMark,"toAccountDate":item.toAccountDate,"expectedProfit":item.expectedProfit})
                }else{
                    if (_self.yearlist.indexOf(year) == -1){
                        _self.yearlist.push(year);
                        _self.items.push({"yearname":year+"月","contlist":[]})
                    }
                    var listnum = _self.yearlist.indexOf(year);
                    
                    _self.items[listnum].contlist.push({"imgSrc":item.imgSrc,"couponHide":item.couponHide,"state":item.state,"targetName":item.targetName,"buyAmount":HC.decimalFun(item.buyAmount),"bankName":item.bankName,"gmtCreate":_self.timeFun(item.payTime),"period":item.period,"endProfit":item.endProfit,"cashCouponAmount":item.cashCouponAmount,"addInterest":item.addInterestAmount,"annualizedRatePlus":item.targetAnnualizedRatesPlus,"targetAnnualizedRates":item.targetAnnualizedRateson,"payMark":item.payMark,"toAccountDate":item.toAccountDate,"expectedProfit":item.expectedProfit})

                }
            });
                
                
            //_self.loadingShow = false;

        })
        
    },
    splitFun (index,num){
        var time = index.split(" ")[0].split("-")
        return time[num];
    },
    showFun (index){
        if(index==''){
            return false;
        }else{
            return true;
        }
        
    },
    change (item,index){
        var _self = this;
        _self.lists.forEach(function(item){
            item.show = false;
        })
        _self.lists[index].show=true;
        _self.list_wu = false;
        _self.items = [];
        _self.yearlist =[];
        _self.record.condition = item.condition;
        if(item.condition == 'REPAY'){
            this.repayShow = true;
        }else{
            this.repayShow = false;
        }
        _self.record.page = 1;
        _self.loadingShow = true;
        _self.currentFun()
        _self.ulstyle = false;
        _self.allLoaded = false;
        _self.bjSelect = false;
    },
    show : function(){
        this.ulstyle = !this.ulstyle;
    },
    timeFun : function(time){
        var year = time.split(" ");
        return year[0];
    },
    blackFun : function(){
        this.ulstyle = false;
    }
  },
  components:{
    
  },
  computed: {
    
  },
  mounted(){
    this.token = HC.getStorage('sessionToken')
    this.record.app_token = HC.getStorage('sessionToken')
    this.currentFun();
  },
  filters: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mint-loadmore{
        background:#f5f5f9; 
    }
</style>
<style scoped>

    #investmentrecord{
       /* position: absolute;
        height: 100%;*/
        width: 100%;
        overflow: hidden;
        /*top: 0;
        left: 0;
        background-color: #f5f5f9;
        overflow: hidden;
        overflow-y: scroll;*/
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
    .nav_box{
        width: 100%;
        position: fixed;
        top: 0;
        left:0;
        height:40px;
        line-height: 40px;
        background-color:#42a2f1;
        text-align: center;
        color: #fff; 
        z-index: 1000000;
    }

    .returns_box{
        position: absolute;
        top: 0;
        left: 0;
        width:40px;
        height:40px;
        background: url(../assets/img/back00.png) no-repeat center;
        background-size: 12px;
    }
    
    ul,li{
        padding:0;
        margin:0;
        list-style: none;
    }
    #app{
        width:100%;
       
    }
    .max_box{
        width:100%;
        overflow:hidden;
    }
    .month_box{
        width:100%;
        padding-left:15px;
        margin-top: 10px;
    }
    .regu_sty{
        width:92%;
        overflow:hidden;
        padding:10px 15px;
        margin-top: 10px;
        background-color:#fff;
    }
    .time_box{
        width:100%;
        overflow:hidden;
        line-height:30px;
        font-size:12px;
    }
    .time_left{
        float:left;
    }
    .time_right{
        float:right;
        margin-left: 4px;
    }
    .commonColor{
        color:#acb2b8;
        margin-top: 2px;
    }
    .zhuangtai{
        color:#3ca8ee;
        font-size:12px;
    }
    .mark_font{
        font-size:16px;
    }
    .money_font{
        font-size:16px;
        font-weight:bold;
        color:#ff6c39;
    }
    .into_box{
        line-height:40px;
        text-align:center;
        width:100%;
        color:#acb2b8;
        margin-top:20px;
    }
    .into_a{
        color:#ff6c39;
        margin-left:6px;
    }
    .into_a:hover{
        color: #ff6c39;
        text-decoration: none;
    }
    .top{
        width: 50px;
        height: 24px;
        line-height: 22px;
        color: #3ca8ee;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        position: fixed;
        top: 7px;
        right: 10px;
        border: solid 1px #3ca8ee;
    }
    
    .img{
        display:inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
    }
    .border_box{
        border-bottom:solid 1px #e5e5e5;
        padding-bottom: 6px;
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
    .else{
        width:80%;
        height: 396px;
        background:url("../assets/deposits_img/dingqi02.png") center no-repeat;
        background-size: 46%;
        overflow:hidden;
        margin-left: 10%;
    }
    .page-loadmore-list{
        padding-top: 90px;
    }
    .ul_title{
        position: fixed;
        top: 40px;
        left:0 ;
        width: 100%;
        text-align: center;
        color: #203542;
        background: #FFF;
        z-index: 100;
        display:none;
    }
    .ul_title li{
        width: 24.5%;
        float: left;
        line-height: 30px;
        color: #b1b6ba;
        margin: 8px 0;
    }
    
    .ul01{
        display:block;
    }
    .ul_title .bj_color{
        color: #3ca8ee;
    }
    .bj_border{
        border-right: solid 1px #e1e2e4;
    }
    .bj_border01{
        border-left: solid 1px #e1e2e4;
    }
    /* yinyimin */
    .interest{
        width:52px;
        height:18px;
        line-height:19px;
        text-align:center;
        margin-top:4px;
        background:url("../assets/deposits_img/deposits01.png") center no-repeat;
        background-size: 100% 100%;
        margin-left:4px;
        color:#ff6c39;
        padding-left: 6px;
    }
    .deposit{
        width:40px;
        height:18px;
        line-height:18px;
        text-align:center;
        border:1px solid rgb(60,168,238);
        margin-left:4px;
        margin-top:4px;
        color:rgb(60,168,238);
        border-radius: 2px;
    }
    .black{
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;
        background-color:#000;
        opacity: 0.4;
        z-index:99;
    }
    .select{
        width:100%;
        height:100px;
        position:fixed;
        top:40px;
        left:0;
        background:#FFF;
        z-index:101;
    }
    .select02{
        clear:both;
    }
    .item{
        width:30%;
        margin-left:2.5%;
        margin-top:10px;
        height:30px;
        text-align:center;
        line-height:30px;
        border:1px solid #acb2b8;
        float:left;
        font-size:12px;
        border-radius:3px;
    }
    .loading{
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;
        background-color:#000;
        z-index:98;
        color:#FFF;
        text-align:center;
        line-height:500px;
    }
    .more{
        width:100%;
        text-align:center;
        margin-top:20px;
        color:#acb2b8;
    }
    .moreIcon{
        width:100%;
        text-align:center;
        margin-top:2px;
    }
    .imgSrc{
        width:14px;
        height: 12px;
        float: right;
        display: block;
        margin-top: 11px;
        margin-right: 2px;
    }
    .imgSrc02{
        width:12px;
        height: 12px;
        float: right;
        display: block;
        margin-top: 11px;
        margin-right: 2px;
    }
    .beijing{
        background:url("../assets/deposits_img/depositchoose01.png") center no-repeat;
        background-size:100% 100%;
        border:none;
    }
    .down_img{
        -webkit-transform: rotateZ(180deg);
        -moz-transform: rotateZ(180deg);
        -o-transform: rotateZ(180deg);
        -ms-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
    }
</style>
