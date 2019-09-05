<template>
	<div class="lease-pay bc-f5f7f9">
		<div class="lease-pay-main wh-1300">
			<div class="time white-radius">
				<img class="pic" src="@/assets/pay_success_logo.png" alt="icon">
				<div class="cont">
					<p v-if="countDown > 0">订单提交成功！去付款咯~</p>
					<p v-if="countDown > 0">剩余支付时间 <em>{{ countDown }}秒</em>，超时订单会自动取消</p>
					<p v-if="countDown == 0"><em>支付已超时</em>，订单已自动取消</p>
					<p>订单单号：{{ leaseOrder.orderCode }}</p>
					<router-link v-if="countDown == 0" to="/">返回首页</router-link>
				</div>
			</div>
			<div class="pay white-radius">
				<ul class="way">
					<li>
						<label>支付方式：</label>
						<el-radio v-model="payWay" :label="2" @change="radioChange">
							<p><img src="@/assets/ali_pay.png" alt="icon">支付宝</p>
						</el-radio>
						<el-radio v-model="payWay" :label="3" @change="radioChange">
							<p><img src="@/assets/wx_pay.png" alt="icon">微信</p>
						</el-radio>
					</li>
					<li>
						<label>余额支付：</label>
						<div class="bl">
							<button @click="balance" :class="{active: payWay == 1}">余额支付</button>
							<el-input type="password" v-if="payWay == 1" v-model="payPwd" size="small" placeholder="请输入支付密码"></el-input>
							<a @click="toChangePwd">忘记支付密码？</a>
							<p>可用余额<em>{{ userInfo.hashCash }}</em>元</p>
						</div>
					</li>
					<li class="ac">
						<label>支付金额：</label>
						<p>{{ leaseOrder.payPrice }}￥</p>
					</li>
				</ul>
				<div v-if="countDown > 0" class="btn">
					<el-button type="primary" @click="toPaymentDetail">立即支付</el-button>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="qrCodeDialog" width="400px">
			<div class="qrCode">
				<img :src="qrCode" alt="qrCode">
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			leaseOrder: {},
			userInfo: {},
			countDown: 0,
			payWay: 0,
			payPwd: null,
			qrCode: '',
			qrCodeDialog: false,
			countTimers: null,
			orderTimers: null
		}
	},
	created () {
		document.documentElement.style.overflowY = 'hidden';
		if (!sessionStorage.getItem('leaseOrder')) {
			this.$router.push('/');
			return false;
		}
		this.leaseOrder = JSON.parse(sessionStorage.getItem('leaseOrder'));
		let timesDiff = parseInt((new Date().getTime() - new Date(this.leaseOrder.createTime).getTime()) / 1000);
		if (timesDiff <= 180) {
			this.countDown = 180 - timesDiff;
			this.countTimers = setInterval(() => {
				this.countDown --;
				if (this.countDown == 0) {
					clearInterval(this.countTimers);
					sessionStorage.removeItem('leaseOrder');
				}
			}, 1000);
		}
		this.$api.post('BaseInfo')
			.then(res => {
				this.userInfo = res.obj;
			});
	},
	methods: {
		toPaymentDetail () {
			if (this.payWay == 0) {
				this.$notify({
					title: '温馨提示',
					message: '请先选择支付方式'
				});
			} else {
				this.$api.post('PayOrder', {
					code: this.leaseOrder.orderCode,
					payType: this.payWay,
					payPwd: this.payPwd
				}).then(res => {
					if (this.payWay == 2 || this.payWay == 3) {
						this.$notify({
							title: '温馨提示',
							message: '订单支付确认中，请稍候。'
						});
						this.qrCode = res.obj;
						this.orderTimers = setInterval(() => {
							this.$api.post('OrderDetails', this.leaseOrder.orderCode)
								.then(ret => {
									let state = ret.obj.state;
									if (state == 1) {
										this.qrCodeDialog = true;
									} else if (state == 2) {
										this.$notify({
											title: '温馨提示',
											message: '该订单超时已自动取消'
										});
										sessionStorage.removeItem('leaseOrder');
										this.$router.push('/');
									} else if (state == 3) {
										sessionStorage.removeItem('leaseOrder');
										this.$router.push({path: '/payment', query: {orderCode: this.leaseOrder.orderCode}});
									}
								});
						}, 5000);
					} else {
						sessionStorage.removeItem('leaseOrder');
						this.$router.push({path: '/payment', query: {orderCode: this.leaseOrder.orderCode}});
					}
				});
			}
		},
		radioChange (e) {
			this.payWay = e;
		},
		balance () {
			this.payWay = 1;
		},
		toChangePwd () {
			this.$router.push({path: '/account/change-pay-pass', query: {accountPath : '/account/change-pay-pass'}});
		}
	},
	beforeDestroy () {
		console.log('/lease-pay销毁');
		clearInterval(this.countTimers);
		clearInterval(this.orderTimers);
		document.documentElement.style.overflowY = 'auto';
	}
}
</script>

<style lang="scss" scoped>
	.lease-pay {
		height: 100vh;
	}
	.lease-pay-main {
		.time {
			display: flex;
			align-items: center;
			padding: 15px;
			box-sizing: border-box;
			.pic {
				margin-right: 20px;
			}
			p {
				line-height: 1.7;
				em {
					color: red;
					font-size: 18px;
				}
			}
			a {
				margin-top: 10px;
				text-decoration: underline;
			}
		}
		.pay {
			padding: 15px 35px;
			margin-top: 10px;
			box-sizing: border-box;
		}
		.way {
			li {
				display: flex;
				align-items: center;
				padding: 20px 0;
			}
			label {
				min-width: 100px;
			}
			.el-radio {
				display: flex;
				align-items: center;
				p {
					display: flex;
					align-items: center;
				}
				img {
					width: 40px;
					margin-right: 5px;
				}
			}
			.bl {
				display: flex;
				align-items: center;
				button {
					width: 120px;
					margin-right: 30px;
					background: #fff;
					border: 1px solid #d6d6d6;
					line-height: 30px;
					border-radius: 3px;
					transition: all .3s;
					&.active {
						border: 1px solid #409EFF;
						color: #409EFF;
					}
				}
				.el-input {
					width: 150px;
					margin-right: 10px;
				}
				a {
					margin-right: 10px;
					color: #409EFF;
					cursor: pointer;
				}
				p {
					em {
						color: red;
						padding: 0 3px;
					}
				}
			}
			.ac {
				p {
					color: #409EFF;
					font-size: 22px;
				}
			}
		}
		.btn {
			padding: 30px 0 0 100px;
			box-sizing: border-box;
			.el-button {
				padding: 15px 30px;
				font-size: 16px;
			}
		}
	}
	.qrCode {
		text-align: center;
		img {
			width: 100%;
		}
	}
</style>
