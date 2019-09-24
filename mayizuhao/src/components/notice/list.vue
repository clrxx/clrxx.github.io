<template>
	<div class="notice white-radius">
		<div class="notice-title">
			<h3 v-if="naId == 1" class="an">最新公告<span>Notice</span></h3>
			<h3 v-if="naId == 2" class="ac">活动中心<span>Activity</span></h3>
		</div>
		<null-data v-if="tableData.length == 0" />
		<ul class="notice-list">
			<li v-for="item in tableData" :key="item.id" @click="toNoticeDetail(item.id)">
				<h3 :title="item.title">{{ item.title }}</h3>
				<p>{{ item.createTime | formatDateTime }}</p>
			</li>
		</ul>
		<div v-if="tableData.length > 0" class="pagination">
			<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
		</div>
	</div>
</template>

<script>
export default {
	props: ['naId'],
	data () {
		return {
			tableData: [],

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
			this.$api.post('GetInfoPage', {
				infoArea: this.naId,
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			}).then(res => {
				this.tableData = res.obj.obj;
				this.pageTotal = res.obj.allItemCount;
			});
		},
		toNoticeDetail (id) {
			if (this.naId == 1) {
				this.$router.push({path: '/notice/detail', query: {noticePath: '/notice', nId: id}});
			} else if (this.naId == 2) {
				this.$router.push({path: '/activity/detail', query: {noticePath: '/activity', nId: id}});
			}
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.cAjax();
		}
	}
}
</script>

<style lang="scss" scoped>
	.notice-title {
		padding: 15px;
		margin-bottom: 20px;
		border-bottom: 1px solid #e8eaec;
		h3 {
			display: flex;
			align-items: flex-end;
			font-size: 22px;
			span {
				margin-left: 5px;
				color: #666;
				font-size: 14px;
			}
		}
		.an {
			color: #ff864d;
		}
		.ac {
			color: #0cbefa;
		}
	}
	.notice-list {
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 15px;
			border-bottom: 1px dashed #e8eaec;
			transition: all .3s;
			cursor: default;
			&:last-of-type {
				border-bottom: 1px solid #e8eaec;
			}
			&:hover {
				background: #f5f7f9;
			}
			h3 {
				overflow: hidden;
				width: 500px;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 1.3;
			}
			p {
				flex-shrink: 0;
				padding-left: 20px;
				font-size: 12px;
			}
		}
	}
</style>

