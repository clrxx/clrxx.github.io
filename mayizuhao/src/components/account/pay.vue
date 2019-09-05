<template>
	<div class="account-puc">
		<el-page-header @back="$router.back()" content="充值" />
		<div class="account-puc-cont">
			<ul class="account-puc-list">
				<li>
					<label>支付方式：</label>
					<el-radio v-model="payWay" :label="1" @change="radioChange">
						<p><img src="@/assets/ali_pay.png" alt="icon">支付宝</p>
					</el-radio>
					<el-radio v-model="payWay" :label="2" @change="radioChange">
						<p><img src="@/assets/wx_pay.png" alt="icon">微信</p>
					</el-radio>
				</li>
				<li>
					<label>充值金额：</label><el-input v-model="payMoney" size="small" placeholder="请输入"></el-input>
				</li>
			</ul>
		</div>
		<el-button @click="toPay" type="primary" size="medium">去充值</el-button>
		<el-dialog :visible.sync="qrCodeDialog" width="400px">
			<div class="qrCode">
				<img :src="payInfo.imageBase64" alt="qrCode">
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			payWay: 1,
			payMoney: '',
			payInfo: {},
			qrCodeDialog: false,
			orderTimers: null
		}
	},
	methods: {
		toPay () {
			let moReg = /^\d+\.?\d{0,2}$/;
			if (moReg.test(this.payMoney)) {
				if (this.payMoney == 0) {
					this.$notify({
						title: '温馨提示',
						message: '输入金额不能为0'
					});
					return false;
				}
				this.$api.post('Recharge', {
					partyType: this.payWay,
					money: this.payMoney
				}).then(res => {
					this.payInfo = res.obj;
					this.$notify({
						title: '温馨提示',
						message: '订单支付确认中，请稍候。'
					});
					this.orderTimers = setInterval(() => {
						this.$api.post('RechargeDetails', this.payInfo.rechargeCode)
							.then(ret => {
								let state = ret.obj.state;
								if (state == 1) {
									this.qrCodeDialog = true;
								} else if (state == 4) {
									this.$notify({
										title: '温馨提示',
										message: '余额充值成功'
									});
									this.$router.back();
								}
							});
					}, 5000);
				});
			} else {
				this.$notify({
					title: '温馨提示',
					message: '请正确输入金额（精确至小数后两位）'
				});
			}
		},
		radioChange (e) {
			this.payWay = e;
		}
	},
	beforeDestroy () {
		console.log('/account/pay销毁');
		clearInterval(this.orderTimers);
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
	.qrCode {
		text-align: center;
		img {
			width: 100%;
		}
	}
</style>
