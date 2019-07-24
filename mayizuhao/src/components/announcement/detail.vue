<template>
	<div class="detail white-radius">
		<div class="title">
			<h3>标题</h3>
			<h4>发布时间：2019-02-02 02:02:02</h4>
		</div>
		<div class="cont">
			<p>绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。</p>
			<p>111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
			<p><img src="@/assets/hotgame3.jpg" alt="pic"></p>
			<span>dsdsd1545</span>
			<h2>dsdsd1545</h2>
			<h6>dsdsd1545</h6>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			query: {}
		}
	},
	created () {
		console.log(this.$route.query);
		this.query = this.$route.query;
	},
	watch: {
		$route () {
			console.log(this.$route.query);
			this.query = this.$route.query;
		}
	}
}
</script>


<style lang="scss" scoped>
	.detail {
		padding: 0 15px;
	}
	.title {
		padding: 20px 15px;
		border-bottom: 1px solid #e8eaec;
		h3 {
			font-size: 24px;
			font-weight: bold;
			line-height: 1.3;
			text-align: center;
		}
		h4 {
			margin-top: 20px;
			text-align: right;
		}
	}
	.cont {
		padding: 30px 0;
		* {
			padding: 10px 0 !important;
			background: transparent !important;
			color: #515a6e !important;
			font-size: 14px !important;
			line-height: 1.5 !important;
			word-wrap: break-word !important;
			word-break: break-all !important;
		}
		h1, h2 ,h3, h4, h5, h6 {
			font-size: 16px !important;
		}
	}
</style>
