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
			<!-- ["创建", "取消", "支付完成", "结束", "维权中", "维权结束"] -->
			<el-tabs v-model="tabsActive">
				<el-tab-pane v-for="item in tabsArr" :key="item.name" :label="item.label" :name="item.name">
					<div class="lease-order-info">
						<ul class="lease-order-thead">
							<li class="item1">商品详情</li>
							<li class="item2">商品价格</li>
							<li class="item3">租赁时长(小时)</li>
							<li class="item4">实付金额</li>
							<li class="item5">订单状态</li>
							<li class="item6">订单操作</li>
						</ul>
						<ul class="lease-order-list">
							<li v-for="i in 2" :key="i">
								<div class="order-title">
									<div class="title"><span>订单号：</span>54645451545<span class="s1">创建时间：</span>2019-01-01</div>
									<div class="time"><span>租赁时间：</span>2019-01-01 00:00:00<span>至</span>2019-01-01 00:00:00</div>
								</div>
								<div class="order-cont">
									<div class="cont item1">
										<div class="pic" style="background-image: url('http://files.xubei.com/demon/bcc1ff6b89ff4d8c86a7606d23bd87ea.jpg')"></div>
										<div class="te">
											<h4>PO7★5阶鲲套★赐福剪影-世代之影★龙皇泰坦★电光原子灭世者★天神狼王鹰王套★蝎王★星云战车动天使★初霜战斗神翼★初霜摸金符三阶★塔防猎场爆破僵尸齐全★全模式任意体验★</h4>
											<span>绝地求生</span>
										</div>
									</div>
									<div class="price item2">1.00元/小时</div>
									<div class="dur item3">2小时</div>
									<div class="amount item4">
										<p>￥3.00</p>
										<span>(押金：￥0.00)</span>
									</div>
									<div class="status item5">{{ item.label }}</div>
									<div class="opts item6">
										<el-button size="small" @click="toOrderDetail">订单详情</el-button>
										<el-link type="primary" @click="toDispute">申请维权（申请后就变成查看维权）</el-link>
									</div>
								</div>
							</li>
						</ul>
						<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
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
			tabsActive: '全部订单',
			tabsArr: [{
				name: '全部订单',
				label: '全部订单'
			}, {
				name: '租赁中',
				label: '租赁中'
			}, {
				name: '维权订单',
				label: '维权订单'
			}, {
				name: '已完成订单',
				label: '已完成订单'
			}],

			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1,

			datePicker: ''
		}
	},
	methods: {
		datePickerChange (e) {
			console.log(this.$formatDateTime(e[0]))
			console.log(this.$formatDateTime(e[1]))
		},
		toOrderDetail () {
			this.$router.push('/account/order-detail');
		},
		toDispute () {
			this.$router.push('/account/dispute');
		},
		pageChange (e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
