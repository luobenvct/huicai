<template>
	<div class="home">
		<div class="top">
			<div @click="returns" class="returns fl">
				<img src="../assets/img/Back_icon.png" height="18" width="11">
			</div>
			<div class="name fl">公司简介</div>
		</div>
		<div class="sty_box">
			<img class="company_img" src="https://static.88huicai.com/huicai/image/aboutus/intr01.jpg">
			<div class="company_title">| 公司简介 |</div>
			<div class="company_text">惠财是专业互联网金融投资理财机构，是太子龙集团战略合作互联网金融品牌。惠财不断探索实践互联网＋金融与企业需求之间的对接模式，独创的融资服务领跑业界。凭借企业融资领域的良好积累，惠财拥有独特的企业优质资产发掘渠道，并构建了百万级规模的企业表达体系和完整的企业地图库。</div>
			<div class="company_text">风控是互联网金融平台的核心。惠财的风险管理体系具有国际金融机构专业水准，预期年化较同业更突出，是国内领先的综合理财交易平台，并受到知名经济学家力荐。惠财自主研发构建了包含9大维度、111项指标第3代信用表达体系在内的风控数据模型体系，最大程度规避平台运营风险和保障用户权益。目前已经成为行业内的参考标杆。</div>
			<div class="company_text">惠财团队成员在金融和互联网领域均有着丰富经验，主要来自大型商业银行、知名证券公司等金融机构，以及阿里巴巴、腾讯等国内一流互联网企业，通过32道工序甄选投资项目，将项目安全做到极致。</div>
			<img class="comp_img"  src="https://static.88huicai.com/huicai/image/aboutus/intr03.jpg">
			<img class="comp_img"  src="https://static.88huicai.com/huicai/image/aboutus/gongsi001.png">
			<img class="comp_img"  src="https://static.88huicai.com/huicai/image/aboutus/gongsi002.png">
			<img class="comp_img"  src="https://static.88huicai.com/huicai/image/aboutus/gongsi003.png">
		</div>
	</div>
</template>

<script>

	export default {
		name: 'home',
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
	.top{
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
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
	.sty_box{
		margin-top: 40px;
	}
	.company_img{
		width:100%;
	}
	.company_title{
		width:88%;
		text-align:center;
		margin:15px auto;
		color:#203542;
		font-weight:bold;
		font-size: 12px;
	}
	.company_text{
		width:88%;
		padding:0 30px;
		padding-right:10px;
		color:#acb2b8;
		line-height:26px;
		background: url('https://static.88huicai.com/huicai/image/aboutus/intr04.png') no-repeat 15px 9px;
		background-size: 6px;
		margin-bottom: 15px;
		font-size: 12px;
	}
	.comp_img{
		width:88%;
		margin:auto;
		display:block;
		margin-bottom:15px;
	}
</style>
