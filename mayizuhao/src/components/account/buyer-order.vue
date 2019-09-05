<template>
	<div class="buyer-order">
		<div class="account-puc">
			<el-page-header class="back-none" content="我租赁的帐号" />
			<div class="account-puc-cont">
				<ul class="account-puc-list">
					<li>
						<el-date-picker
							v-model="datePicker"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							size="small"
							@change="datePickerChange">
						</el-date-picker>
					</li>
				</ul>
			</div>
			<el-tabs v-model="tabsActive" @tab-click="tabsClick">
				<el-tab-pane v-for="item in tabsArr" :key="item" :label="item" :name="item">
					<div class="lease-order-info">
						<ul class="lease-order-thead">
							<li class="item1">商品详情</li>
							<li class="item2">商品价格</li>
							<li class="item3">租赁时长(小时)</li>
							<li class="item4">实付金额</li>
							<li class="item5">订单状态</li>
							<li class="item6">订单操作</li>
						</ul>
						<null-data v-if="tableData.length == 0" />
						<ul class="lease-order-list">
							<li v-for="item in tableData" :key="item.code">
								<div class="order-title">
									<div class="title"><span>订单号：</span>{{ item.code }}<span class="s1">创建时间：</span>{{ item.createTime | formatDateTime }}</div>
									<div v-if="item.orderState != 2" class="time"><span>租赁时间：</span>{{ item.startTime | formatDateTime }}<span>至</span>{{ item.endTime | formatDateTime }}</div>
								</div>
								<div class="order-cont">
									<div class="cont item1">
										<div class="pic" :style="{'background-image': 'url('+ item.imageUrl +')'}"></div>
										<div class="te">
											<h4>{{ item.goodTitle? item.goodTitle.slice(0, 30):'' }}</h4>
											<p>{{ item.goodPath? item.goodPath.slice(0, 30):'' }}</p>
										</div>
									</div>
									<div class="price item2">{{ item.price }}元/小时</div>
									<div class="dur item3">{{ item.count }}小时</div>
									<div class="amount item4">
										<p>￥{{ item.payPrice }}</p>
										<span>(押金：￥{{ item.deposit }})</span>
									</div>
									<div class="status item5">{{ orderStateStr[item.orderState] }}</div>
									<div class="opts item6">
										<el-button size="small" @click="toOrderDetail(item.code)">订单详情</el-button>
										<el-link v-if="item.orderState == 3" type="primary" @click="toDispute(item.code)">申请维权</el-link>
										<el-link v-if="item.orderState == 5 || item.orderState == 6" type="primary" @click="toDispute(item.code)">查看维权</el-link>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="tableData.length > 0" class="pagination">
							<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			tableData: [],
			datePicker: null,
			orderStateNum: 0,
			orderStateStr: ['无', '订单创建', '订单取消', '支付完成', '交易完成', '维权中', '维权结束'],
			tabsActive: '全部订单',
			tabsArr: ['全部订单', '租赁中', '维权中', '维权结束', '已完成订单'],

			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			let _params = {
				orderState: this.orderStateNum,
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1),
				createTimeOrder: {
					flag: true,
					desc: true,
					index: 0
				}
			};
			if (this.datePicker) {
				_params = Object.assign({
					createTime: {
						startTime: this.datePicker[0],
						startTimeStr: this.datePicker[0],
						endTime: this.datePicker[1],
						endTimeStr: this.datePicker[1]
					}
				}, _params);
			}
			this.$api.post('OrderPage', _params)
				.then(res => {
					this.tableData = res.obj.obj;
					this.pageTotal = res.obj.allItemCount;
				})
		},
		datePickerChange (e) {
			if (e) {
				let _arr = [];
				e.forEach(el => {
					_arr.push(this.$moment(el).format('YYYY-MM-DD HH:mm:ss'));
				});
				this.datePicker = _arr;
			}
			this.pageCurrent = 1;
			this.cAjax();
		},
		tabsClick (e) {
			let _index = parseInt(e.index);
			switch (_index) {
				case 0:
					this.orderStateNum = 0;
					break;
				case 1:
					this.orderStateNum = 3;
					break;
				case 2:
					this.orderStateNum = 5;
					break;
				case 3:
					this.orderStateNum = 6;
					break;
				case 4:
					this.orderStateNum = 4;
					break;
				default:
					break;
			}
			this.pageCurrent = 1;
			this.cAjax();
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.cAjax();
		},
		toOrderDetail (code) {
			this.$router.push({path: '/account/order-detail', query: {orderCode: code}});
		},
		toDispute (code) {
			this.$router.push({path: '/account/dispute', query: {orderCode: code}});
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
