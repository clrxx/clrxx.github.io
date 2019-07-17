<template>
	<div class="lease-pay bc-f5f7f9">
		<div class="lease-pay-main wh-1300">
			<div class="time white-radius">
				<img class="pic" src="@/assets/pay_success_logo.png" alt="icon">
				<div class="cont">
					<p v-if="countDown > 0">订单提交成功！去付款咯~</p>
					<p v-if="countDown > 0">剩余支付时间 <em>10秒</em>，超时订单会自动取消</p>
					<p v-if="countDown == 0"><em>支付已超时</em>，订单已自动取消</p>
					<p>订单单号：<span>4841454545</span>丨</p>
					<router-link v-if="countDown == 0" to="/">返回首页</router-link>
				</div>
			</div>
			<div v-if="countDown > 0" class="pay white-radius">
				<ul class="way">
					<li>
						<span>支付方式：</span>
						<el-radio v-model="radioVal" :label="1" @change="radioChange">
							<p><img src="@/assets/ali_pay.png" alt="icon">支付宝</p>
						</el-radio>
					</li>
					<li>
						<span>余额支付：</span>
						<div class="bl">
							<button @click="balance" :class="{active: radioVal == 2}">余额支付</button>
							<el-input type="password" v-if="radioVal == 2" v-model="payPwd" size="small" placeholder="请输入支付密码"></el-input>
							<a>忘记支付密码？</a>
							<p>可用余额<em>0</em>元</p>
						</div>
					</li>
					<li class="ac">
						<span>支付金额：</span>
						<p>0￥</p>
					</li>
				</ul>
				<div class="btn">
					<el-button type="primary" @click="toPaymentDetail">立即支付</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			countDown: 10,
			radioVal: 0,
			payPwd: null
		}
	},
	methods: {
		radioChange (e) {
			this.radioVal = e;
		},
		balance () {
			this.radioVal = 2;
		},
		toPaymentDetail () {
			if (this.radioVal == 0) {
				this.$notify.info({
					title: '支付提示',
					message: '请先选择支付方式'
				});
			} else {
				this.$router.push('/payment-detail');
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.lease-pay {
		height: calc(100vh - 172px);
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
			span {
				min-width: 100px;
			}
			.el-radio {
				display: flex;
				align-items: center;
				p {
					display: flex;
					align-items: center;
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
</style>
