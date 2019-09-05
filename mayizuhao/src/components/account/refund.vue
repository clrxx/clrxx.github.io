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
					<label>提现方式：</label>
					<el-radio v-model="payWay" :label="1" @change="radioChange">
						<p><img src="@/assets/ali_pay.png" alt="icon">支付宝</p>
					</el-radio>
					<el-radio v-model="payWay" :label="2" @change="radioChange">
						<p><img src="@/assets/wx_pay.png" alt="icon">微信</p>
					</el-radio>
				</li>
				<li>
					<label>提现金额：</label><el-input v-model="payMoney" size="small" placeholder="请输入" />
				</li>
				<li>
					<label>支付密码：</label><el-input v-model="payMoney" type="password" size="small" placeholder="请输入" /><router-link to="/account/change-pay-pass">忘记支付密码？</router-link>
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
			payWay: 0,
			payMoney: null
		}
	},
	methods: {
		radioChange (e) {

		}
	}
}
</script>

<style lang="scss" scoped>
	.account-puc-list {
		.el-radio {
			display: flex;
			align-items: center;
			margin-right: 20px;
			p {
				display: flex;
				align-items: center;
			}
			img {
				width: 40px;
				margin-right: 5px;
			}
		}
		.el-input {
			width: 200px;
		}
	}
</style>
