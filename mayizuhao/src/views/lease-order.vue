<template>
	<div class="lease-order bc-f5f7f9">
		<div class="lease-order-main wh-1300 white-radius">
			<el-table :data="tableData" border>
				<el-table-column prop="cont" label="商品详情" width="500" />
				<el-table-column prop="time" label="起租时间" />
				<el-table-column prop="price" label="单价" />
				<el-table-column prop="way" label="收费方式" />
			</el-table>
			<div class="cont">
				<ul class="clse">
					<li><span>租号方式：</span>现在租</li>
					<li><span>租赁时间：</span>24小时</li>
					<li><span>可租时间段：</span>0:00 ~ 23:00</li>
				</ul>
				<ul class="price">
					<li><em />
						<div class="cash">
							<span>订单金额：</span>
							<p>￥0</p>
						</div>
					</li>
					<li>
						<h5>提示：您的押金会在订单完成后24小时内退回您的蚂蚁租号账户。</h5>
						<div class="cash">
							<span>订单押金：</span>
							<p>￥0</p>
							<!-- <p><el-tooltip class="item" effect="dark" content="提示：您的押金会在订单完成后24小时内退回您的蚂蚁租号账户。" placement="left">
								<img src="@/assets/question.png" alt="pic">
							</el-tooltip>￥0</p> -->
						</div>
					</li>
				</ul>
				<div class="pay">
					<p>实付总额(含押金)：<span>￥0</span></p>
					<el-button type="danger" @click="dialogVisible = true">去付款</el-button>
				</div>
			</div>
		</div>
		<el-dialog custom-class="pay-dialog" title="订单支付确认" :visible.sync="dialogVisible" width="500px">
			<p><img src="@/assets/notice.png" alt="icon">段位等级可能随着其他租客的体验会有较小的差异，在不影响游戏体验的情况下请不要随意投诉哦~</p>
			<div slot="footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="danger" class="danger" @click="toLeasePay">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: false,
			tableData: [{
				cont: '英雄联盟',
				time: '2019.6-2019.6',
				price: 3,
				way: '小时'
			}]
		}
	},
	methods: {
		toLeasePay () {
			this.$router.push({path: '/lease-pay', query: {
				id: 0
			}});
		}
	}
}
</script>

<style lang="scss" scoped>
	.lease-order {
		height: calc(100vh - 172px);
	}
	.lease-order-main {
		padding: 15px;
		border: 1px solid #eee;
		box-sizing: border-box;
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
	.pay-dialog {
		img {
			margin-right: 5px;
		}
		p {
			color: red;
			line-height: 1.5;
		}
		.danger {
			width: 150px;
		}
	}
</style>


