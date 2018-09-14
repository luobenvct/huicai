<template>
    <div class="coupons">
        <div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            资产名词解说
        </div>
        <div class="max_box">
        <img class="max_img" src="../assets/img/bigBackimage.png">
        <div class="title_box">资产名词定义及计算方式</div>
        <div class="formula_box">
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_cont">资金</div>
                </div>
                <div class="assets_right assets_cont">总资产=存管账户+普通账户+奖励账户</div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">存管账户资产：存管标的在投本金+在投收益<br><span class="grayColorClass">(包含标的收益+红包+加息券)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">普通账户资产：普通标的在投本金+在投收益<br><span class="grayColorClass">（包含标的收益+红包+加息券）</span></div>
                </div>
            </div>
            <div class="assets_formula" style="margin:0;">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">奖励账户资产: 惠财奖励资金</div>
                </div>
            </div>
        </div>
        <div class="noformula_box">
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_cont">本金</div>
                </div>
                <div class="assets_right assets_cont">在投本金：购买标的本金<br><span class="grayColorClass">(包含抵扣红包)</span></div>
            </div>
        </div>
        <div class="formula_box">
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_cont">收益</div>
                </div>
                <div class="assets_right assets_cont">累计收益：历史收益总和+在投收益总和<br><span class="grayColorClass">(包含标的收益+红包+加息券)</span></div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">累计投资：累计在平台的投资本金总和<br><span class="grayColorClass">(如10万投30天标，连续投资12个月，则累计投资120万)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">今日总收益：投资中的标的当日收益的总和<br><span class="grayColorClass">(包含标的收益+加息券)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">今日收益：投资中的标的当日的收益<br><span class="grayColorClass">(包含标的收益+加息券)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">待收收益：投资中的标的预计收益<br>
                    <span class="grayColorClass">(包含标的收益+加息券)，实际收益已资金明细为准</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">已收收益：回款成功后的标的收益<br><span class="grayColorClass">(包含标的收益+加息券)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">在投收益：标的在投天数收益的总和</div>
                </div>
            </div>
            
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">待回本息：投资中的标的本金+预计收益<br><span class="grayColorClass">(包含标的收益+红包+加息券)</span></div>
                </div>
            </div>
            <div class="assets_formula">
                <div class="assets_left">
                    <div class="left_lint"></div>
                </div>
                <div class="assets_right">
                    <div class="assets_cont">已回本息：回款成功后的标的本金+收益<br><span class="grayColorClass">(包含标的收益+红包+加息券)</span></div>
                </div>
            </div>
            </div>
            <div class="assets_sty">
                    <div class="assets_left">
                        <div class="other_cont">余额</div>
                    </div>
                    <div class="assets_right">可用余额：账户可提现或可投资资金<br><span class="grayColorClass">(包含抵扣红包)</span></div>
            </div>

            <div class="assets_sty">
                    <div class="assets_left"> 
                        <div class="peek_cont" style="padding-top: 5px;">冻 结 金 额</div>
                    </div>
                    <div class="assets_right">冻结金额：<div class="blockClass">定期投资中冻结资金+标的回款中冻结资金+存管账户提现中冻结资金+奖励账户提现中冻结资金</div></div>
            </div>


        </div>
        <div class="title_box title_width">举个例子</div>
        <div class="example_box">
            <div class="exam_title">1.当前持有到期一次本息项目</div>
            <div class="exam_cont">投资10000元，利率12%，使用1%加息券，12个月，投资时间2016年1月1日，当前日期2016年7月1日，截止当前已持有6个月</div>
            <div class="exam_cont">该项目截止昨日，应计息收益600元，应计加息收益50元，则该项目当前应计利息收益+应计加息收益，即600+50=650元</div>
        </div>
        <div class="exam_name">* 以上数值均为举例使用，具体收益请以个人持有项目为准</div>
        <div class="exam_name" style="padding-left: 6px;">若有疑问，请联系客服<a class="exam_a" href="tel:4009998381">400-999-8381</a></div>

    </div>
</template>

<script>

export default {
  name: 'coupons',
  data () {
    return {

    }   
  },
  components:{
    
  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    
  },
  
  created: function () { 

  }
}
</script>
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

.returns_box{
    position: absolute;
    top: 0;
    left: 0;
    width:40px;
    height:40px;
    background: url(../assets/img/Back_icon.png) no-repeat center;
    background-size: 18px;
}
.max_box{
    width:100%;
    overflow:hidden;
    padding-bottom:20px;
    margin-top: 40px;
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
.max_img{
        width:100%;
    }
.title_box{
    font-size:18px;
    background:url('../assets/img/height001.png') no-repeat left bottom;
    background-size:100% 5px; 
    width: 200px;
    text-align: center;
    line-height: 40px;
    margin: 20px auto;
    padding-bottom: 5px;
}
.grayColorClass{
    font-size: 12px;
    color: #686868;
}
.assets_sty{
    width:90%;
    overflow:hidden;
    margin:0 auto 20px;
}
.assets_left{
    width:18%;
    float:left;
}
.left_cont{
    width:40px;
    height:40px;
    background-color:#1e2a65;
    color:#fff;
    text-align:center;
    line-height: 40px;
    border-radius: 50%;
}
.other_cont{
    width:40px;
    height:40px;
    background: url(../assets/img/corner.png) no-repeat;
    background-size:100% 100%; 
    color:#fff;
    text-align:center;
    line-height: 40px;
}
.peek_cont{
    width:40px;
    height:40px;
    background: url(../assets/img/corner.png) no-repeat;
    background-size:100% 100%; 
    color:#fff;
    text-align:center;
 /*   font-size: 14px;*/
}  
.left_lint{
    width:7px;
    height:7px;
    background-color:#405F9F;
    margin-left: 17px;
    margin-top: 13px;
    border-radius: 50%;
}
.assets_right{
    width:82%;
    margin:auto;
    float:left;
    overflow: hidden;
}
.assets_right_two{
    width:82%;
    margin-left:18%; 
    color:#acb2b8;
    float:left;
}
.color_black{
    color: #203542;
}
.title_width{
    width: 72px;
}
.formula_box{
    width:90%;
    overflow:hidden;
    margin:0 auto 25px;
    background:url('../assets/img/core04.png') no-repeat 20px;
    background-size:1px 100%;
}
.noformula_box{
    width:90%;
    overflow:hidden;
    margin:0 auto 25px;
    background:url(' ') no-repeat 20px;
    background-size:1px 100%;
}
.assets_formula{
    width:100%;
    overflow:hidden;
    margin:0 auto 20px;
}
.assets_cont{
    margin-top:6px;
}
.example_box{
    width:90%;
    margin:0 auto 10px;
    overflow:hidden;
    border:dashed 1px #41496f;
    padding:15px 6px;
    border-radius:5px;
    background-color:#D7E9E6;
    font-size:12px;
}
.exam_title{
    color:#203542;
    font-weight: bolder;
}
.exam_cont{
    line-height: 22px;
    padding-left: 10px;
    margin-top: 8px;
    background:url('../assets/img/core05.png') no-repeat left 8px;
    background-size:3px 3px;
}
.exam_name{
    width:90%;
    font-size:12px;
    color:#656565;
    margin:auto;
    line-height:24px;
}
.exam_a{
    color:#656565;
}
.exam_a:hover{
    color:#acb2b8;
    text-decoration: none;
}
.blockClass{
    width: 55%;
    float: right;
    margin-right: 40px;
}

</style>
