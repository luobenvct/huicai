// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Store from './vuex/store'
import axios from 'axios'
import qs from 'qs'
import * as _ from 'util'
import Mianjs from './assets/js/main.js'
import MD5js from './assets/js/md5.js'
/*import obj from './../config/prod.env.js'*/

/*import Microdoneh5 from './assets/js/microdone-h5.min.js'*/
/*import DealJS from './assets/js/deal_password.js'*/
axios.defaults.timeout = 10000;            //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';      //配置请求头


//定义全局过滤器
Vue.filter("num", (obj)=> {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面  
    if(obj == ''|| obj == null||obj == 0){
        return '0.00';
    }
    let money = obj.toString().split(".");
    let num = 2;
    money[1] = money[1] || '';
    var moneynum = num - money[1].length;
    var moneyto = '';
    if(moneynum>0){
        moneyto = money[1].filling("0",num)
    }else{
        moneyto = money[1].substring(0,num)
    }
    return money[0]+"."+ moneyto;  
});  

/*测试*/
/*const devUrl = 'https://testm.88huicai.com'*/
/*const prodUrl = 'https://m.88huicai.com'
const testUrl = 'https://testm.88huicai.com'
const baseUrl = process.env.NODE_ENV === 'production' ? obj.API_ROOT_DICT : devUrl*/
/*axios.defaults.baseURL = JSON.parse(obj.API_ROOT_DICT); */
/*测试*/
const devUrl =  process.env.API_ROOT
axios.defaults.baseURL = devUrl; 
/*JSON.parse(config.dev.env.NODE_ENV)*/
//配置接口地址 本地http://localm.88huicai.com  测试https://testm.88huicai.com https://testapi.88huicai.com
//正式https://m.88huicai.com  //本机测试微信http://88huicai.tunnel.qydev.com
//内测http://cs01m.88huicai.com

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
 //在发送请求之前做某件事
  if(config.method === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  // _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});
// //返回状态判断(添加响应拦截器) 
/*axios.interceptors.response.use((res) =>{
 //对响应数据做些事
  if(!res.data.success){
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  alert("kkkk");
  return;
  _.toast("网络异常", 'fail');
  return Promise.reject(error);
});*/
//返回一个Promise(发送post请求)
// export function fetch(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }
//Vue.prototype.$ajax = axios
//axios.defaults.baseURL = 'http://localm.88huicai.com';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//mint-ui组件start
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
import 'mint-ui/lib/swipe/style.css';
import 'mint-ui/lib/swipe/index.js';
import 'mint-ui/lib/swipe-item/style.css';
import 'mint-ui/lib/swipe-item/index.js';
import 'mint-ui/lib/message-box/style.css';
import 'mint-ui/lib/message-box/index.js';
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/toast/index.js';


import { Toast } from 'mint-ui';
import { Swipe, SwipeItem, MessageBox } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Toast.name, Toast);

Vue.use(MintUI);
//end

//element-ui组件start
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
//end
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false


/*下拉更新 ouyp*/
import 'mint-ui/lib/loadmore/style.css';
import 'mint-ui/lib/loadmore/index.js';
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);



//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
/*setCookie : function(sName, sValue, expireHours, path) {
      var path = path || '/';
      var cookieString = sName + '=' + escape(sValue); 
      if (expireHours>0) {  
        var date = new Date();  
        date.setTime(date.getTime + expireHours * 1000);
        cookieString = cookieString + '; path=' + path + '; expire=' + date.toGMTString();
      }  
      document.cookie = cookieString;  
    },*/


Vue.prototype.setCookie = (c_name, value, expiredays, path) => {
  var path = path || '/';
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + '; path=' + path + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Store,
  template: '<App/>',
  components: { App }
})
