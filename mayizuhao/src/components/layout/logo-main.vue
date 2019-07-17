<template>
	<div class="logo-main">
		<div class="logo-cont wh-1300">
			<div @click="toIndexPage" class="logo">
				<img src="@/assets/logo-gray.png" alt="logo">
			</div>
			<div class="select-box">
				<el-select v-model="value" size="medium" placeholder="选择游戏" class="border-right">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" size="medium" disabled placeholder="选择大区" class="border-right">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" size="medium" disabled placeholder="选择服务器" class="border-right">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input v-model="input" size="medium" placeholder="请输入关键字" class="border-none"></el-input>
				<el-button type="danger" size="medium">搜索</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			options: [{
				value: '英雄联盟',
				label: '英雄联盟'
			}, {
				value: '地下城与勇士',
				label: '地下城与勇士'
			}, {
				value: 'QQ飞车',
				label: 'QQ飞车'
			}],
			value: '',
			input: ''
		}
	},
	methods: {
		toIndexPage () {
			this.$router.push('/');
		}
	}
}
</script>

<style lang="scss" scoped>
	.logo-main {
		padding-top: 20px;
		background: #f5f7f9;
		.logo-cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
		}
	}
	.logo {
		height: 95px;
		cursor: pointer;
		img{
			height: 100%;
		}
	}
	.select-box {
		overflow: hidden;
		border: 1px solid #F56C6C;
		border-radius: 5px;
		.el-select {
			width: 120px;
		}
		.el-input {
			width: 200px;
		}
	}
</style>
