<template>
	<div class="lease-order bc-f5f7f9">
		<div class="lease-order-main wh-1300 white-radius">
			<el-table :data="tableData" border>
				<el-table-column label="商品详情" width="500">
					<template slot-scope="scope">
						<div class="tab">
							<el-image fit="cover" :src="scope.row.firstImage" class="pic">
								<div slot="placeholder" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="wz">
								<p :title="scope.row.goodTitle">{{ scope.row.goodTitle }}</p>
								<p :title="scope.row.goodPath">{{ scope.row.goodPath }}</p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column v-if="leaseWay.time == 0" prop="price" label="单价（元/天）" />
				<el-table-column v-else prop="price" label="单价（元/时）" />
				<el-table-column prop="leaseWay" label="收费方式" />
			</el-table>
			<div class="cont">
				<ul class="clse">
					<li><span>租号方式：</span>{{ goodLoginStr }}</li>
					<li v-if="leaseWay.time == 0"><span>租赁时间：</span>包天</li>
					<li v-else><span>租赁时间：</span>{{ leaseWay.time }}小时</li>
					<li><span>可租时间段：</span>00:00 ~ 23:00</li>
				</ul>
				<ul class="price">
					<li><em />
						<div class="cash">
							<span>订单金额：</span>
							<p>￥{{ orderPrice }}</p>
						</div>
					</li>
					<li>
						<h5>提示：您的押金会在订单完成后24小时内退回您的蚂蚁租号账户。</h5>
						<div class="cash">
							<span>订单押金：</span>
							<p>￥{{ depositPrice }}</p>
						</div>
					</li>
				</ul>
				<div class="pay">
					<p>实付总额(含押金)：<span>￥{{ actualPrice }}</span></p>
					<el-button type="danger" @click="toLeasePay">去结算</el-button>
				</div>
			</div>
		</div>
		<!-- 订单支付 dialog -->
		<el-dialog custom-class="lease-dialog" title="订单支付" :visible.sync="payDialog" :close-on-click-modal="false" :close-on-press-escape="false" width="800px">
			<div class="lease-pay">
				<div class="time">
					<img class="pic" src="@/assets/pay_success_logo.png" alt="icon">
					<div class="cont">
						<p>订单提交成功！去付款咯~</p>
						<p>剩余支付时间 <em>{{ countDown }}秒</em>，订单超时将会自动取消。</p>
						<p>注：二维码付款后请稍等3~5秒，系统查询成功后将自动跳转。</p>
						<p>订单单号：{{ createOrder.orderCode }}</p>
					</div>
				</div>
				<div class="pay">
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
							<p><img v-if="qrCode" :src="qrCode">{{ actualPrice }}￥</p>
						</li>
					</ul>
					<div class="btn">
						<el-button type="primary" @click="toPayment">立即支付</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			payDialog: false,
			leaseWay: {},
			tableData: [],
			goodLoginStr: '',
			orderPrice: 0,
			depositPrice: 0,
			actualPrice: 0,

			createOrder: {},
			userInfo: {},
			countDown: 0,
			payWay: 0,
			payPwd: null,
			qrCode: '',
			countTimers: null,
			orderTimers: null
		}
	},
	created () {
		document.documentElement.style.overflowY = 'hidden';
		this.leaseWay = JSON.parse(this.$route.query.leaseWay);
		let createQuery = JSON.parse(this.$route.query.createQuery);
		this.$api.post('GoodInfo', {
			code: createQuery.goodCode,
			res: createQuery.res
		}).then(res => {
			let _data = res.obj;
			this.tableData.push({
				firstImage: _data.imageUrl[0],
				goodTitle: _data.name,
				goodPath: _data.goodType.path,
				price:  _data.price.price,
				leaseWay: this.leaseWay.way
			});
			if (this.leaseWay.time == 0) {
				this.tableData[0].price = _data.price.baoTianPrice;
			}
			this.goodLoginStr = _data.goodLoginStr;
			this.depositPrice = _data.depositPrice;
			if (this.leaseWay.time == 0) {
				this.orderPrice = _data.price.baoTianPrice;
			} else {
				this.orderPrice = this.leaseWay.time * _data.price.price;
			}
			this.actualPrice = this.orderPrice + _data.depositPrice;
		})
	},
	methods: {
		toLeasePay () {
			if (this.countDown == 0) {
				this.$api.post('CreateOrder', this.$route.query.createQuery)
					.then(res => {
						this.payDialog = true;
						let _data = res.obj;
						this.createOrder = _data;
						let timesDiff = parseInt((new Date().getTime() - new Date(_data.createTime).getTime()) / 1000);
							if (timesDiff <= 120) {
								this.countDown = 120 - timesDiff;
								this.countTimers = setInterval(() => {
									this.countDown --;
									if (this.countDown == 0) {
										this.payDialog = false;
										clearInterval(this.countTimers);
										window.location.reload();
									}
								}, 1000);
							}
					});
				this.$api.post('BaseInfo')
					.then(res => {
						this.userInfo = res.obj;
					});
			} else {
				this.payDialog = true;
			}
		},
		toPayment () {
			if (this.payWay == 0) {
				this.$notify({
					title: '温馨提示',
					message: '请先选择支付方式'
				});
			} else {
				this.$api.post('PayOrder', {
					code: this.createOrder.orderCode,
					payType: this.payWay,
					payPwd: this.payPwd
				}).then(res => {
					if (this.payWay == 2 || this.payWay == 3) {
						this.qrCode = res.obj;
						this.orderTimers = setInterval(() => {
							this.$api.post('OrderDetails', this.createOrder.orderCode)
								.then(ret => {
									let state = ret.obj.state;
									if (state == 2) {
										this.$notify({
											title: '温馨提示',
											message: '该订单超时已自动取消'
										});
										this.payDialog = false;
										clearInterval(this.orderTimers);
										window.location.reload();
									} else if (state == 3) {
										this.$router.push({path: '/payment', query: {orderCode: this.createOrder.orderCode}});
									}
								});
						}, 5000);
					} else {
						this.$router.push({path: '/payment', query: {orderCode: this.createOrder.orderCode}});
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
		console.log('/lease-order销毁');
		clearInterval(this.countTimers);
		clearInterval(this.orderTimers);
		document.documentElement.style.overflowY = 'auto';
	}
}
</script>

<style lang="scss" scoped>
	.lease-order {
		height: 100vh;
	}
	.lease-order-main {
		padding: 15px;
		border: 1px solid #eee;
		box-sizing: border-box;
		.tab {
			display: flex;
			.pic {
				flex-shrink: 0;
				width: 80px;
				height: 80px;
				margin-right: 10px;
				border-radius: 3px;
			}
			.wz p {
				overflow: hidden;
				width: 350px;
				padding-top: 5px;
				line-height: 1.3;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.cont {
			padding: 0 45px;
		}
		.clse {
			padding: 40px 0 20px;
			li {
				padding: 10px 0;
				span {
					min-width: 100px;
				}
			}
		}
		.price {
			padding-bottom: 20px;
			border-bottom: 1px solid #eee;
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 0;
				h5 {
					color: red;
				}
				.cash {
					display: flex;
					align-items: center;
				}
				p {
					min-width: 100px;
					text-align: right;
					img {
						margin-right: 10px;
						vertical-align: text-top;
					}
				}
			}
		}
		.pay {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 20px 30px 10px;
			p {
				margin-right: 30px;
				span {
					color: red;
					font-weight: bold;
				}
			}
			.el-button {
				width: 150px;
				font-size: 16px;
			}
		}
	}

	.lease-pay {
		.time {
			display: flex;
			align-items: center;
			padding: 20px;
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
			padding: 0 35px;
			border-top: 10px solid #f5f7f9;
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
				padding-top: 0;
				p {
					color: #409EFF;
					font-size: 22px;
					text-align: center;
					img {
						display: block;
						height: 200px;
					}
				}
			}
		}
		.btn {
			padding-left: 100px;
			box-sizing: border-box;
			.el-button {
				padding: 15px 30px;
				font-size: 16px;
			}
		}
	}
</style>


