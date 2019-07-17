<template>
	<div class="index-bar wh-1300">
		<a class="item1"><img src="@/assets/home_category.png"></a>
		<a>租号大厅</a>
		<a href="http://www.my.steam.xubei.com" target="_blank">Steam商城<img class="new" src="@/assets/new.png" alt="icon"></a>
		<a href="https://img.myzuhao.top/%E8%9A%82%E8%9A%81%E4%B8%8A%E5%8F%B7%E5%99%A8%E5%AE%89%E8%A3%85%E5%8C%85472.exe" download="蚂蚁上号器安装包.exe">上号器下载<img class="hot" src="@/assets/hot.png" alt="icon"></a>
		<a @click="toZone">网咖特权专区</a>
	</div>
</template>

<script>
export default {
	methods: {
		toZone () {
			this.$router.push('/zone');
		}
	}
}
</script>

<style lang="scss" scoped>
	.index-bar {
		display: flex;
		align-items: center;
		a {
			display: flex;
			align-items: center;
			color: #7a7a7a;
			font-size: 15px;
			font-weight: 700;
			margin-right: 35px;
			cursor: pointer;
			.new {
				position: relative;
				top: -7px;
				right: -2px;
				width: 30px;
			}
			.hot {
				position: relative;
				top: -5px;
				right: -5px;
				width: 22px;
			}
		}
		.item1 {
			cursor: default;
		}
	}
</style>
