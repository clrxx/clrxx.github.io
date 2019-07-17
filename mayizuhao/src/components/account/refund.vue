<template>
	<div class="account-puc">
		<el-page-header @back="$router.back()" content="余额提现" />
		<div class="account-puc-cont">
			<ul class="account-puc-list">
				<li>
					<label>提现人：</label>
				</li>
				<li>
					<label>可提余额：</label>
				</li>
				<li>
					<label>提现方式：</label><button class="al">支付宝</button>
				</li>
				<li>
					<label>提现金额：</label><el-input v-model="payMoney" size="small" placeholder="请输入" />
				</li>
				<li>
					<label>支付密码：</label><el-input v-model="payMoney" type="password" size="small" placeholder="请输入" /><router-link to="/account/change-account">忘记支付密码？</router-link>
				</li>
			</ul>
		</div>
		<el-button type="primary" size="medium">立即提现</el-button>
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
