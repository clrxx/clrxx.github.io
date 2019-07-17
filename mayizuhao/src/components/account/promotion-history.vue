<template>
	<div class="bills">
		<div class="account-puc">
			<el-table :data="tableData" border>
				<el-table-column prop="cont" label="商品标题" />
				<el-table-column prop="price" label="订单状态" />
				<el-table-column prop="time" label="收益" />
				<el-table-column prop="way" label="订单时间" />
			</el-table>
			<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1,

			tableData: []
		}
	},
	methods: {
		pageChange (e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
