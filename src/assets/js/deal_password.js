        var kb = new keyBoard({
            "chaosMode" : 0,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
            "pressStatus" :1,// 按键状态,0:按下、抬起按键无变化;1:按下、抬起按键的颜色变化,默认值0
            "kbType" : 0,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
            "odd" : 51,//按键异或值
            "svg":"https://static.88huicai.com/huicai/resource/credit2go/svg",//svg图片的地址
            "license" : "dE83TkJZMThnbk5TbjNQYU93Y0dDUm9yTjZLcWtJTHZlMnRFYi91a3UxZFRPcFdkTWxtU3RlUlo3SERwVkk4c2ExOFZmT3ZrSXdSNDBFa0RiN3NWZkFHRUJWTXhOU0h2bFpYVjV1aXMzWnlsVHkyVEpVOVZ6UnZKRlNINXZGcnA0VFEzK0h4V0hycU5yNHVrWTVVWXNhVU9GOVlnRHd0aXRSUDdmYXk2ZFlZPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjEwLCJub3RiZWZvcmUiOiIyMDE3MDUzMSIsIm5vdGFmdGVyIjoiMjAxNzA4MzEifQ=="
        
        });
        var passGuard1 = new passGuard({
            "mappurl" : "http://localm.88huicai.com/api/v2/accunt/depository/send_mapping?app_token="+this.token,//申请映射表的地址
            "maxLength" : 12,// 最大输入长度
            "regExp1" : "[\\S\\s]",// 输入过程限制的正则
            "regExp2" : "[\\S\\s]{6,12}",
            "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
            "callBack":cb1,//正则二匹配成功时回调此方法
            "errorCallBack":cb2,//正则二匹配失败时回调此方法
            "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001",// rsa公钥
            "license" : "dE83TkJZMThnbk5TbjNQYU93Y0dDUm9yTjZLcWtJTHZlMnRFYi91a3UxZFRPcFdkTWxtU3RlUlo3SERwVkk4c2ExOFZmT3ZrSXdSNDBFa0RiN3NWZkFHRUJWTXhOU0h2bFpYVjV1aXMzWnlsVHkyVEpVOVZ6UnZKRlNINXZGcnA0VFEzK0h4V0hycU5yNHVrWTVVWXNhVU9GOVlnRHd0aXRSUDdmYXk2ZFlZPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjEwLCJub3RiZWZvcmUiOiIyMDE3MDUzMSIsIm5vdGFmdGVyIjoiMjAxNzA4MzEifQ=="
        })
        var passGuard2 = new passGuard({
            "mappurl" : "http://localm.88huicai.com/api/v2/account/depository/send_mapping?app_token="+this.token,//申请映射表的地址
            "maxLength" : 12,// 最大输入长度
            "regExp1" : "[\\S\\s]",// 输入过程限制的正则
            "regExp2" : "[\\S\\s]{6,12}",
            "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
            "callBack":cb3,//正则二匹配成功时回调此方法
            "errorCallBack":cb4,//正则二匹配失败时回调此方法
            "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001",// rsa公钥
            "license" : "dE83TkJZMThnbk5TbjNQYU93Y0dDUm9yTjZLcWtJTHZlMnRFYi91a3UxZFRPcFdkTWxtU3RlUlo3SERwVkk4c2ExOFZmT3ZrSXdSNDBFa0RiN3NWZkFHRUJWTXhOU0h2bFpYVjV1aXMzWnlsVHkyVEpVOVZ6UnZKRlNINXZGcnA0VFEzK0h4V0hycU5yNHVrWTVVWXNhVU9GOVlnRHd0aXRSUDdmYXk2ZFlZPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjEwLCJub3RiZWZvcmUiOiIyMDE3MDUzMSIsIm5vdGFmdGVyIjoiMjAxNzA4MzEifQ=="
        })

        function cb1(){
            console.log("成功1")
        }
        function cb2(){
            console.log("失败1")
        }
        function cb3(){
            console.log("成功2")
        }
        function cb4(){
            console.log("失败3")
        }