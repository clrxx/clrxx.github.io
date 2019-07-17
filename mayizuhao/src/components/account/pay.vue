<template>
	<div class="account-puc">
		<el-page-header @back="$router.back()" content="充值" />
		<div class="account-puc-cont">
			<ul class="account-puc-list">
				<li>
					<label>充值金额：</label><el-input v-model="payMoney" size="small" placeholder="请输入"></el-input>
				</li>
			</ul>
		</div>
		<el-button @click="toAliay" type="primary" size="medium">去充值</el-button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			payMoney: null
		}
	},
	methods: {
		toAliay () {
			console.log('alipay');
		}
	}
}
</script>

<style lang="scss" scoped>
	.account-puc-list {
		.el-input {
			width: 200px;
		}
	}
</style>
