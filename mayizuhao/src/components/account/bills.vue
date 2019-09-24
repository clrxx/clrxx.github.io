<template>
	<div class="bills">
		<div class="account-puc">
			<el-table :data="tableData" border>
				<el-table-column prop="changeChart" label="类型" />
				<el-table-column prop="money" label="金额（元）" />
				<el-table-column prop="createTime" label="时间" />
			</el-table>
			<div v-if="tableData.length > 0" class="pagination">
				<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			tableData: [],

			pageTotal: 10,
			pageSize: 20,
			pageCurrent: 1
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			this.$api.post('CashChangedPage', {
				createTimeOrder: {
					flag: true,
					desc: true,
					index: 0
				},
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			}).then(res => {
				let _list = res.obj.obj;
				_list.forEach(el => {
					el.createTime = this.$moment(el.createTime).format('YYYY-MM-DD HH:mm:ss')
				});
				this.tableData = _list;
				this.pageTotal = res.obj.allItemCount;
			})
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.cAjax();
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
