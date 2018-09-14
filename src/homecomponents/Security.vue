<template>
  <div class="security">
	<div class="top">
	  <div @click="returns" class="returns fl">
		<img src="../assets/img/Back_icon.png" height="18" width="11">
	  </div>
	  <div class="name fl">安全保障页面</div>
	</div>
	<div class="max_box">
	 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_01.png">
	 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_02.png">
	 <img class="max_img" src="https://static.88huicai.com/huicai/image/aboutus/safe_03.png">
	</div>
  </div>
</template>

<script>
export default {
  name: 'security',
  data () {
	return {
	  
	}
  },
  components:{
	
  },
  methods:{
  	/*返回--事件*/
	returns(){
	  this.$router.go(-1);
	}
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
.security{
  background:#f7f7f7;
  position: relative;
}
.top{
  width: 100%;
  padding: 10px 0;
  background: #3ca8ee;
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.top .returns{
  margin-left: 2%;
  margin-right: 30%;
}
.max_box{
  width:100%;
  overflow:hidden;
  margin-top: 40px;
}
.max_img,.max_img1,.max_img2{
  width:100%;
  position:relative;
}
</style>
