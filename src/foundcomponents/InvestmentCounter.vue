<template>
    <div class="coupons">
        <div class="nav_box">
            <div @click="returns" class="returns_box"></div>
            买房、养老等投资
        </div>
        <div class="app_box">
            <div class="max_title">
                <div class="title_sty" v-for="item in titleList" @click="title_show(item)">
                    <div class="title_name" :class="{select_title: titleshow== item.id}">{{item.name}}</div>
                </div>
            </div>
            <div class="education_box">
                <div class="age_box" v-show="titleType =='pension'">
                    <div class="education_text">您的年龄</div>
                    <input class="education_input" v-model="pension_age" id="pension_age" type="text" value="5" maxLength="2" onkeyup="this.value=this.value.replace(/\D/g,'')">
                    <div class="education_cont">岁</div>
                </div>
                <div class="education_sty">
                    <div class="education_text" v-if="titleType=='educa'">每年准备在教育上投资</div>
                    <div class="education_text" v-else-if="titleType=='room'">房屋总价大约</div>
                    <div class="education_text" v-else-if="titleType=='pension'">60岁起打算每年领多少养老金</div>
                    <input class="education_input" :class="{year_box:titleType =='pension'}" ref="educat_money" type="text" id="educat_money" value="5000" v-model="educat_money" :readonly="teduc_one" onkeyup="this.value=this.value.replace(/\D/g,'')">
                    <div class="education_cont" v-if="titleType=='educa'" >元</div>
                    <div class="education_cont" v-else>万元</div>
                </div>
                <div class="choice_box" v-if="titleType=='educa'">
                    <div class="choice_sty " v-for="itemo in yearmoney" :class="{color_code: yearxuan == itemo.id,choiceshow : itemo.money != '其它'}" @click="choiceSty(itemo,titleType)">
                        <span v-if="itemo.money == '其它'">其它</span>
                        <span v-else>{{itemo.money}}元</span>
                    </div>

                </div>
                <div class="choice_box" v-else>
                    <div class="choice_sty " v-for="itemo in yearmoney" :class="{color_code: yearxuan == itemo.id,choiceshow : itemo.money != '其它'}" @click="choiceSty(itemo,titleType)">
                        <span v-if="itemo.money == '其它'">其它</span>
                        <span v-else>{{itemo.money}}万元</span>
                    </div>

                </div>
                <div class="education_sty">
                    <div class="education_text" v-if="titleType=='educa'">准备连续投资</div>
                    <div class="education_text" v-else-if="titleType=='room'">预计几年后使用该笔资金买房</div>
                    <div class="education_text" v-else-if="titleType=='pension'">60岁后打算领取多少年养老金</div>
                    <input class="education_input year_box" ref="educat_year"  id="educat_year" v-model="educat_year" type="text" value="3"  maxlength="2" :readonly="teduc_two" onkeyup="this.value=this.value.replace(/\D/g,'')"> 
                    <div class="education_cont">年</div>
                </div>
                <div class="choice_box">
                    <div class="choice_sty " v-for="itemt in educatdata" :class="{color_code: educatxuan == itemt.id,choiceshow : itemt.year != '其它'}" @click="pensionMoney(itemt,titleType)">
                        <span v-if="itemt.year == '其它'">其它</span>
                        <span v-else>{{itemt.year}}年</span>
                    </div>
                </div>
                <div class="education_sty">
                    <div class="education_text" style="height: 20px;line-height: 20px;">以惠财在售产品<span class="text_span"  v-text="year_rate">10.8</span>平均年化利率计算</div>
                </div>
                <div class="money_box">
                    <div class="money_num"><span v-text="money_value">0</span>元</div>
                    <div class="money_into">
                        <span v-if="titleType=='educa'" v-text="educat_year">3</span>
                        <span v-else>每</span>年后可获得本息总计
                    </div>
                </div>
            </div>
            <div class="reference">产品利率不同，收益也不同。计算结果仅供参考,以实际投资收益为准</div>
            <div class="pur_but" @click="purchase_but">购买产品</div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'coupons',
  data () {
    return {
        titleType : 'educa',
        titleList : [
            {
                name:'教育投资',
                id : "educa"
            },
            {
                name:'买房投资',
                id : "room"
            },
            {
                name:'养老投资',
                id : "pension"
            },
        ],
        titleshow : 'educa',
        pension_age :'1', //年龄
        educat_money : '5000', //教育
        yearmoney : [   //每年金额
            {
                money:'5000',
                id : "001"
            },
            {
                money:'10000',
                id : "002"
            },
            {
                money:'15000',
                id : "003"
            },
            {
                money:'其它',
                id : "004"
            }
        ],
        yearxuan : '001' ,
        educat_year : '3' , //投资年份s
        educatdata : [
             {
                year:'3',
                id : "0001"
            },
            {
                year:'5',
                id : "0002"
            },
            {
                year:'10',
                id : "0003"
            },
            {
                year:'其它',
                id : "00034"
            }
        ],
        educatxuan : '0001',
        year_rate : '10.68%',
        money_value : '0',
        educat_year : '3',
        teduc_one : true,
        teduc_two : true,
        yanglao : false,
    }   
  },
  components:{
    
  },
  watch:{
    educat_money (val){
        var textnum = val.replace(/\D/g,'');
        this.educat_money = textnum;
        this.educatCount(this.titleType)
        //this.educatCount();
    },
    educat_year(val){
        var textnum = val.replace(/\D/g,'');
        this.educat_year = textnum;
        this.educatCount(this.titleType)
        //this.educatCount();
    },
    pension_age(val){
        var textnum = val.replace(/\D/g,'');
        if(textnum>=60){
            textnum = '59';
        }
        this.pension_age = textnum;
        this.educatCount(this.titleType)
    }
  },
  methods:{
    returns(){
      this.$router.go(-1);
    },
    title_show(item){
        this.titleshow = item.id;
        this.titleType = item.id;
        this.yearxuan = '001';
        this.educatxuan = '0001';
        if (item.id=='educa') {
            this.yearmoney = [ 
                {money:'5000',id : "001"},
                {money:'10000',id : "002"},
                {money:'15000',id : "003"},
                {money:'其它',id : "004"}
            ];
            this.educatdata = [
                {year:'3',id : "0001"},
                {year:'5',id : "0002"},
                {year:'10',id : "0003"},
                {year:'其它',id : "0004"}
            ];
            this.educat_money = '5000';
            this.educat_year = '3';

        }else if(item.id=='room'){
            this.yearmoney = [ 
                {money:'100',id : "001"},
                {money:'200',id : "002"},
                {money:'500',id : "003"},
                {money:'其它',id : "004"}
            ];
            this.educatdata = [
                {year:'3',id : "0001"},
                {year:'5',id : "0002"},
                {year:'10',id : "0003"},
                {year:'其它',id : "0004"}
            ];
            this.educat_money = '100';
            this.educat_year = '3';
        }else if(item.id=='pension'){
            this.yearmoney = [ 
                {money:'5',id : "001"},
                {money:'8',id : "002"},
                {money:'10',id : "003"},
                {money:'其它',id : "004"}
            ];
            this.educatdata = [
                {year:'15',id : "0001"},
                {year:'20',id : "0002"},
                {year:'25',id : "0003"},
                {year:'其它',id : "0004"}
            ];
            this.educat_money = '5';
            this.educat_year = '15';
        }
        this.educatCount(this.titleType)


    },
    choiceSty(item,type){
        this.yearxuan = item.id;
        if(item.money=='其它'){
            this.educat_money = '';
            this.teduc_one = false;
            this.$refs.educat_money.focus();

        }else{
             this.teduc_one = true;
             this.educat_money = item.money;
             this.educatCount(type)
        }
    },
    pensionMoney(item,type){
         this.educatxuan = item.id;
        if(item.year=='其它'){
            this.educat_year = '';
            this.teduc_two = false;
            this.$refs.educat_year.focus();
            
        }else{
            this.teduc_two = true;
             this.educat_year = item.year;
             this.educatCount(type)
        }
    },
    educatCount(index){
        var moneyEmpty = this.educat_money;
        var yearEmpty = this.educat_year;
        if(moneyEmpty==''|| yearEmpty==''){
            this.money_value=0;
            return;
        }
        var money = parseInt(this.educat_money);
        var year = parseInt(this.educat_year);
        var rate = (parseFloat(this.year_rate)*0.01)+1;
        var rates = parseFloat(this.year_rate)*0.01
        if(index=='educa'){
            var str = 0;
            for(var i = 1;i<year+1;i++){
                str = str + (money*Math.pow(rate,i))
            }
            console.log(str)
            this.money_value=str.toFixed(2);
        }else if(index=='room'){

            var result = (money*10000)/((1+rates)*year);
            //console.log(result.toFixed(2));
            this.money_value = result.toFixed(2);
        }else if(index=='pension'){
            var age = 60-this.pension_age;
            //console.log(money,year,rate,age);
            var result = (money*10000*year)/((1+rates)*age);
            //console.log(result.toFixed(2));
            this.money_value=result.toFixed(2);
        }
    },
    purchase_but(){
        this.$router.push({path:'/financial'})
    },



    
  },
  created () { 
    this.educatCount('educa')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    border-bottom: solid 1px #eee;
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
input{
    outline:none;
    padding: 0;
}
.app_box{
    width:100%;
    overflow:hidden;
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
.max_title{
    width:100%;
    overflow:hidden;
    border-bottom:solid 7px #f5f5f9;
}
.title_sty{
    width:33.3%;
    overflow:hidden;
    float:left;
    font-size:16px;
    color:#acb2b8;
    line-height:44px;
}
.title_name{
    width: 76px;
    text-align: center;
    margin: auto;
}
.select_title{
    border-bottom: solid 2px #53bafd;
    color:#203542;
}
/* 教育投资 */
.education_box{
    width:100%;
    overflow:hidden;
    font-size: 14px;
}
.education_sty{
    width:92%;
    margin:20px auto 0;
    overflow:hidden;
}
.education_text{
    float:left;
    height:14px;
    border-left:solid 3px #449ed8;
    line-height:14px;
    padding-left:10px;
    margin-top:16px;
}
.education_input{
    width:90px;
    display:block;
    float:left;
    height:32px;
    margin:0 4px;
    border:none;
    border-bottom:solid 1px #203542;
    border-radius:0;
    text-align:center;
    font-size:20px;
}
.education_cont{
    float:left;
    height:14px;
    line-height:14px;
    margin-top:16px;
}
.choice_box{
    width:92%;
    margin:20px auto 0;
    overflow:hidden;
}
.choice_sty,.choten_sty,.room_sty,.room_year,.pension_money,.pension_year{
    width:22%;
    float:left;
    line-height:36px;
    border-radius:5px;
    border:solid 1px #3ca8ee;
    text-align:center;
    color:#3ca8ee;
}
.choiceshow{
    margin-right:3%;
}
.input_but{
    margin:0;
}
.color_code{
    background-color:#3ca8ee;
    color:#fff;
}
.text_span{
    font-size:20px;
}
.money_box{
    width:100%;
    margin-top:20px;
    overflow:hidden;
    border-top:solid 1px #e5e5e5;
    border-bottom:solid 1px #e5e5e5;
    padding:15px 0 20px;
    text-align:center;
}
.money_num{
    width:100%;
    font-size:12px;
    color:#203542;
}
.money_num span{
    font-size:26px;
    color:#3ca8ee;
    margin-right: 4px;
}
.money_into{
    font-size:12px;
    color:#acb2b8;
}
.reference{
    width:90%;
    margin:10px auto;
    font-size:12px;
    color:#acb2b8;
    line-height:22px;
}
.pur_but{
    width:90%;
    line-height:44px;
    color:#fff;
    font-size:16px;
    text-align:center;
    border-radius:6px;
    background-color:#ff6c39;
    margin:0 auto 15px;
}
.year_box{
    width:50px;
}
.age_box{
    width:90%;
    margin:15px auto 0;
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    


</style>
