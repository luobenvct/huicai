<template>
  <div class="huoqi">
    <div class="top">
      <div @click="returns" class="returns fl">
        <img src="../assets/img/Back_icon.png" height="18" width="11">
      </div>
      <div class="name fl">定期理财</div>
    </div>
    <div class="app" v-cloak>
    <div class="regular_box">
      <div class="regular_name">定期总资产（元）</div>
      <div class="regular_money" v-text="(dingqiData.totalAsset) || '0.00'"></div>
      <div class="float_sty sty_left">
        <div>今日总收益</div>
        <div class="float_size" v-text="dingqiData.dayProfit || '0.00'"></div>
      </div>
      <div class="float_sty sty_right">
        <div>定期总收益</div>
        <div class="float_size" v-text="dingqiData.totalProfit || '0.00'"></div>
      </div>
    </div>
    <div class="else" v-if="dingqiList.length == 0">
      
    </div>
    <div v-else class="regu_sty" v-for='item in dingqiList' @click="recordHistory(item)">
      <div class="icon"></div>
      <div class="regu_title" v-text="item.targetName"><span v-if="false">(有一笔即将到期)</span></div>
      <div class="regu_float">
        <div>在投本金</div>
        <div class="regu_money">{{item.totalPrincipal}}</div>
      </div>
      <div class="regu_float float_center">
        <div>在投收益</div>
        <div class="regu_money">{{item.totalProfit}}</div>
      </div>
      <div class="regu_float float_right">
        <div v-if="incomeShow">预计明日收益</div>
        <div v-else>今日收益</div>
        <div class="regu_money zuori">{{item.dayProfit}}</div>
      </div>
    </div>
     <div class="note_box" @click="investRecord"></div> 
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      dingqiData:[],
      dingqiList:[],
      token:'',
      incomeShow:true
    }
  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    investRecord(){
      this.$router.push({ path: '/fixedinvestmentrecord' })
    },
    recordHistory(item){

       //this.$router.push({ path: '/fixdetail' , params: {targetName: item.targetName}})
       // this.$router.push({path: '/fixdetail'})

      this.$router.push({ path: '/fixdetail?userId='+ item.targetId+'&dayProfit='+item.dayProfit+'&totalProfit='+item.totalProfit+'&totalAsset='+item.totalAssets+'&targetName='+item.targetName+'&incomeShow='+this.incomeShow})
      /*this.$router.push({ name: 'FixDetail', params: { userId: item.id,dayProfit:item.dayProfit,totalProfit:item.totalProfit,totalAsset:item.totalAssets}})*/

    },   
    dataFn(){
        //定期投资记录
        axios.post('/api/financing_target_bid/get_user_fixed_target_assets.htm', {
            app_token:this.token
        })
          .then(res =>{
            console.log("定期投资记录数据");
            console.log(res);    
            this.dingqiData = res.data.result;    
            this.dingqiData.totalAsset = HC.decimalFun(this.dingqiData.totalAsset);
            this.dingqiData.dayProfit = HC.decimalFun(this.dingqiData.dayProfit);
            this.dingqiData.totalProfit = HC.decimalFun(this.dingqiData.totalProfit)
        })
          .catch(res=> {
            console.log(res);
        });
        //定期投资列表
        axios.post('/api/financing_target_bid/fixed_bid_list_group_by.htm', {
            app_token:this.token
        })
          .then(res =>{
            console.log("定期投资列表数据");
            console.log(res);    
            this.dingqiList = res.data.result; 
            let time = new Date();
            this.dingqiList.forEach((item)=>{
                item.totalPrincipal = HC.decimalFun(item.totalPrincipal);
                item.dayProfit = HC.decimalFun(item.dayProfit);
                item.totalProfit = HC.decimalFun(item.totalProfit);
                if(item.dayProfit === "0.00"){
                  this.incomeShow = true;
                }else{
                  this.incomeShow = false;
                }
            })
        })
          .catch(res=> {
            console.log(res);
        });
    }
  },
  components:{
    
  },
  computed: {
    
  },
  mounted(){
    /*this.token = this.getCookie('sessionToken');*/
    this.token = HC.getStorage('sessionToken')
    this.dataFn();
  },
  filters:{
    //截取数字后二位，不足的补位
    decimalTwo(obj){
      var money = obj.toString().split(".");
      var moneyto = "00"
      if(money[1]==''||money[1]==null){
        moneyto = "00"
      }else　if(money[1].length==1){
        moneyto = money[1].substring(0,2)+"0"
      }else{
        moneyto = money[1].substring(0,2)
      }
      return money[0]+"."+ moneyto;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding:0;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.login{
  width: 100%;
  background: #CCC;
  padding-bottom: 460px;
}
.top{
  position: fixed;
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: #3ca8ee;
  color: #FFF;
  z-index: 3;
}
.top .name{
  margin-left: 6%;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
}
input{
  outline:none;
  -webkit-user-select:auto;  
}
.app{
  width:100%;
  overflow:hidden;
  background:#f5f5f9;
  padding-top: 42px;
}
[v-cloak]{
  display:none;
}
.regular_box{
  width:100%;
  overflow:hidden;
  background:url("../assets/img/dingqi01.png") center no-repeat;
  background-size:100% 100%;
}
.regular_name{
  width:90%;
  text-align:center;
  margin:auto;
  margin-top:30px;
  font-size:12px;
  color:#FFF;
}
.regular_money{
  width:90%;
  text-align:center;
  margin:auto;
  font-size:36px;
  color:#FFF;
}
.float_sty{
  width:34%;
  margin-top:20px;
  margin-bottom:20px;
}
.sty_left{
  float:left;
  padding-left:10%;
}
.sty_right{
  float:right;
  padding-left:20%;
}
.float_sty div{
  font-size:12px;
  color:#FFF;
  opacity:0.6;
  letter-spacing:1px;
}
.float_sty .float_size{
  font-size:16px;
  color:#FFF;
  opacity:1;
  margin-top: 6px;
}
.regu_sty{
  width:100%;
  overflow:hidden;
  padding:15px;
  margin-bottom:12px;
  background:#FFF;
}
.icon{
  display:inline-block;
  width:3px;
  height:16px;
  background:#3ca8ee;
  float:left;
  margin-top:4px;
  margin-right:5px;
}
.regu_title{
  font-size:16px;
  line-height:24px;
  position: relative;
  color:#203542;
}
.regu_title span{
  color:#ff6c39;
  font-size:10px;
  margin-left: 5px;
}
.regu_float{
  width:30%;
  float:left;
  margin-top:15px;
  text-align: left;
}
.regu_float div{
  color:#acb2b8;
  margin-bottom:3px;
  font-size: 12px;  
}
.regu_float .regu_money{
  color:#203542;
  font-size: 16px;
}
.regu_float .zuori{
  color:#ff6c39;
}
.float_center{
  text-align:center;
}
.float_right{
  text-align:right;
}
.regu_money{
  font-size:16px;
  font-weight:bold;
}
.note_box{
  font-size:12px;
  border-radius:4px 0 0 4px;
  color:#fff;
  position:absolute;
  top:50px;
  right:10px;
  padding: 6px;
  background:url("../assets/img/jiru.png") no-repeat center;
  background-size: 70% 70%;
  width:30px;
  height:34px;
}
.else{
  width:100%;
  height:448px;
  background:url("../assets/img/dingqi02.png") center no-repeat;
  background-size: 46%;
  overflow:hidden;
}
</style>
