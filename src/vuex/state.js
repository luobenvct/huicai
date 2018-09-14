const state = {
    //请求头
    rootBase:"/api/v2",
    //https 测试https://testm.88huicai.com 正式https://m.88huicai.com 本地http://localm.88huicai.com
    ////内测http://cs01m.88huicai.com
    Https:process.env.API_ROOT,
  	//用户信息
  	userInfo: { //保存用户信息
        loginUser:false,
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null
    },
    riskJson : [
        {
            "num" : 1,  
            "title": "您现在的年龄: ",
            "choose" : [
                {"options":"A","cont":"60岁以上","score":1},
                {"options":"B","cont":"46-60","score":2},
                {"options":"C","cont":"36-45","score":3},
                {"options":"D","cont":"26-35","score":4},
                {"options":"E","cont":"25岁以下","score":5}
            ]
        },
        {
            "num" : 2,
            "title": "您的健康状况如何: ",
            "choose" : [
                {"options":"A","cont":"一直都不是很好,要经常吃药和去医院","score":1},
                {"options":"B","cont":"有点不好,不过目前还没什么大问题, 我担心当我老了的时候会变的恶劣","score":2},
                {"options":"C","cont":"至少现在还行,不过我家里人有病史","score":3},
                {"options":"D","cont":"还行, 没大毛病","score":4},
                {"options":"E","cont":"非常好","score":5}
            ]
        },
        {
            "num" : 3,
            "title": "是否有过投资股票、基金或债券的经历？",
            "choose" : [
                {"options":"A","cont":"没有","score":1},
                {"options":"B","cont":"少于3年","score":2},
                {"options":"C","cont":"3～5年","score":3},
                {"options":"D","cont":"超过5年","score":4}
            ]
        },
        {
            "num" : 4,
            "title": "您目前投资的主要目的是？",
            "choose" : [
                {"options":"A","cont":"确保资产的安全性，同时获得固定收益","score":1},
                {"options":"B","cont":"希望投资能获得一定的增值，同时获得波动适度的年回报","score":2},
                {"options":"C","cont":"倾向于长期的成长，较少关心短期的回报和波动","score":3},
                {"options":"D","cont":"只关心长期的高回报，能够接受短期的资产价值波动 ","score":4}
            ]
        },
        {
            "num" : 5,
            "title": "您投资的总额占您个人（或家庭）总资产（含房产等）的：",
            "choose" : [
                {"options":"A","cont":"低于10%","score":1},
                {"options":"B","cont":"10%-25%","score":2},
                {"options":"C","cont":"25%-40%","score":3},
                {"options":"D","cont":"40%-55%","score":4},
                {"options":"E","cont":"55%以上","score":5}
            ]
        },
        {
            "num" : 6,
            "title": "您预期的投资期限是：",
            "choose" : [
                {"options":"A","cont":"少于1年","score":1},
                {"options":"B","cont":"1 —3年","score":2},
                {"options":"C","cont":"3—5年","score":3},
                {"options":"D","cont":"5—10年","score":4},
                {"options":"E","cont":"10年以上","score":5}
            ]
        },
        {
            "num" : 7,
            "title": "在您投资60天后，价格下跌20%。假设所有基本面均未改变，您会怎么做? ",
            "choose" : [
                {"options":"A","cont":"为避免更大的担忧，全部卖掉再试试其他的","score":1},
                {"options":"B","cont":"卖掉一部分，其余等着看看","score":2},
                {"options":"C","cont":"什么也不做，静等收回投资","score":3},
                {"options":"D","cont":"再买入。它曾是好的投资，现在也是便宜的投资","score":4}
            ]
        },
        {
            "num" :8,
            "title": "您有没有想过如果有一天您的财务状况发生很大的变化,比如说突然有一笔很大的开支,这笔开支可能会动用您10%的个人资产或甚至更多: ",
            "choose" : [
                {"options":"A","cont":"没想过, 我感觉这种大变化不会在我身上发生","score":1},
                {"options":"B","cont":"经常想, 我很担心整个生活都将变得一团糟,可是我又有什么办法呢?","score":2},
                {"options":"C","cont":"想过一两次, 感觉挺可怕的","score":3},
                {"options":"D","cont":"曾经有想过一两次,但是我还年轻，无所谓的","score":4}
            ]
        },
        {
            "num" :9,
            "title": "您对您目前的财务状况满意吗？",
            "choose" : [
                {"options":"A","cont":"不太好, 常常要借钱 ","score":1},
                {"options":"B","cont":"刚刚好, 我要特别小心打理 ","score":2},
                {"options":"C","cont":"我做的还行,一直按照我人生的规划在顺利进行","score":3},
                {"options":"D","cont":"特别好, 现在想买什么就买什么 ","score":4}
            ]
        },
        {
            "num" :10,
            "title": "当您退休后,您计划做什么: ",
            "choose" : [
                {"options":"A","cont":"节俭的生活, 避免把钱花光 ","score":1},
                {"options":"B","cont":"继续工作挣钱, 因为我的养老金估计不够用","score":2},
                {"options":"C","cont":"享受人生,周游世界 ","score":3},
                {"options":"D","cont":"努力花钱,直到去见上帝之前还要给上帝带上一件最奢侈的礼物 ","score":4}
            ]
        },
        {
            "num" :11,
            "title": "风险投资于您而言",
            "choose" : [
                {"options":"A","cont":"我觉得很危险","score":1},
                {"options":"B","cont":"可以尝试低风险","score":2},
                {"options":"C","cont":"比较感兴趣","score":3},
                {"options":"D","cont":"非常感兴趣","score":4}
            ]
        },
        {
            "num" :12,
            "title": "您的亲友会以下列哪句话来形容您：",
            "choose" : [
                {"options":"A","cont":"您从来都不冒险","score":1},
                {"options":"B","cont":"您是一个小心、谨慎的人","score":2},
                {"options":"C","cont":"您经仔细考虑后，您会愿意承受风险","score":3},
                {"options":"D","cont":"您是一个喜欢冒险的人","score":4}
            ]
        },
        {
            "num" :13,
            "title": "假设您参加一项有奖竞赛节目，并已胜出，您希望获得的奖励方案：",
            "choose" : [
                {"options":"A","cont":"立刻拿到1万元现金","score":1},
                {"options":"B","cont":"有50％机会赢取5万元现金的抽奖 ","score":2},
                {"options":"C","cont":"有25％机会赢取10万元现金的抽奖","score":3},
                {"options":"D","cont":"有5％机会赢取100万元现金的抽奖","score":4}
            ]
        },
        {
            "num" :14,
            "title": "因为一些原因,您的驾照在未来的三天无法使用,您将: ",
            "choose" : [
                {"options":"A","cont":"搭朋友的便车、坐出租或公车 ","score":1},
                {"options":"B","cont":"白天不开，晚上交警少的时候可能开","score":2},
                {"options":"C","cont":"小心点开车就是了","score":3},
                {"options":"D","cont":"开玩笑,我一直都是无照驾驶的","score":4}
            ]
        },
        {
            "num" :15,
            "title": "有一个很好的投资机会刚出现。但您得借钱，您会选择融资吗?",
            "choose" : [
                {"options":"A","cont":"不会","score":1},
                {"options":"B","cont":"也许","score":2},
                {"options":"C","cont":"会","score":3}
            ]
        },
        {
            "num" :16,
            "title": "刚拥有足够的储蓄去长途旅行，但出发前三星期所在公司倒闭了，您会怎么做？",
            "choose" : [
                {"options":"A","cont":"取消旅行","score":1},
                {"options":"B","cont":"选择另外一个比较普通的旅行","score":2},
                {"options":"C","cont":"依照原定的计划，因为您需要充足的休息来准备寻找新的工作","score":3},
                {"options":"D","cont":"延长路程，因为这次旅行可能成为您最后一次豪华旅行","score":4}
            ]
        },
        {
            "num" :17,
            "title": "如果投资金额为50万元人民币，以下四个投资选择，您个人比较喜欢：",
            "choose" : [
                {"options":"A","cont":"最好的情况会赚2万元（4％）人民币，最差的情况下没有损失  ","score":1},
                {"options":"B","cont":"最好的情况会赚8万元（16％）人民币，最差的情况下损失2万元（4％）人民币","score":2},
                {"options":"C","cont":"最好的情况会赚26万元（52％）人民币，最差的情况下损失8万元（16％）人民币","score":3},
                {"options":"D","cont":"最好的情况会赚48万元（96％）人民币，最差的情况下损失24万元（48％）人民币","score":4}
            ]
        },
        {
            "num" :18,
            "title": "如果您收到了25万元的意外财产,您将: ",
            "choose" : [
                {"options":"A","cont":"存到银行里","score":1},
                {"options":"B","cont":"投资到债券或债券型基金","score":2},
                {"options":"C","cont":"投资到股票或股票型基金","score":3},
                {"options":"D","cont":"投入到生意中","score":4}
            ]
        }
    ]




}

export default state
