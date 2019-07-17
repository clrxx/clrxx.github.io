<template>
	<div class="notice white-radius">
		<div class="notice-title">
			<h3 v-if="neid == 1" class="an">最新公告<span>Announcement</span></h3>
			<h3 v-if="neid == 2" class="ac">活动中心<span>Activity</span></h3>
		</div>
		<ul class="notice-list">
			<li v-for="i in 10" :key="i" @click="toAnnouncementDetail(0)">
				<h3>2019春节假期提现调整公告{{ neid }}</h3>
				<p>2019-02-02 02:02:02</p>
			</li>
			</ul>
		<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
	</div>
</template>

<script>
export default {
	props: ['neid'],
	data () {
		return {
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		// console.log(this.neid)
	},
	methods: {
		toAnnouncementDetail (id) {
			this.$router.push({path: '/announcement/detail', query: { id }});
		},
		pageChange (e) {
			console.log(e)
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

