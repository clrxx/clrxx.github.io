<template>
	<div class="account-index">
		<div class="account-info white-radius">
			<div class="info">
				<img :src="userInfo.headImage" alt="pic">
				<p>{{ userInfo.name }}</p>
			</div>
			<div class="mo">
				<p>余额：<span>{{ userInfo.hashCash }}元</span></p>
			</div>
			<div class="btns">
				<el-button @click="toAccountPay" type="primary" size="small">我要充值</el-button><br>
  				<el-button @click="toAccountRefund" type="success" size="small">我要提现</el-button>
			</div>
		</div>
		<div class="summing white-radius">
			<div class="account-title-small">
				<h3>结论</h3>
			</div>
			<ul class="summing-list">
				<li class="item1"><span>{{ cash.orderCount }}</span>租号次数</li>
				<li class="item2"><span>{{ cash.orderSuccessCount }}</span>成功租号次数</li>
				<li class="item3"><span>{{ cash.orderRight }}</span>维权次数</li>
				<li class="item4"><span>{{ rate }}</span>订单成功率</li>
			</ul>
		</div>
		<div class="sys white-radius">
			<div class="account-title-small">
				<h3>系统通知</h3>
			</div>
			<null-data v-if="msgInfo == 0" />
			<div class="sys-info">
				<ul class="sys-list">
					<li v-for="item in msgInfo" :key="item.id">
						<h3>{{ item.title }}</h3>
						<p>{{ item.createTime | formatDateTime }}</p>
					</li>
				</ul>
				<div v-if="msgInfo > 0" class="pagination">
					<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			userInfo: {},
			cash: {},
			rate: '100%',
			msgInfo: [],

			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		this.$api.post('BaseInfo')
			.then(res => {
				this.userInfo = res.obj;
			});
		this.$api.post('Cash')
			.then(res => {
				this.cash = res.obj;
				this.rate = (this.cash.orderSuccessCount/this.cash.orderCount).toFixed(2)*100 +'%';
			});
		this.mAjax();
	},
	methods: {
		mAjax () {
			this.$api.post('MsgPage', {
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			}).then(res => {
				let _data = res.obj;
				this.msgInfo = _data.obj;
				this.pageTotal = _data.pageCount;
			});
		},
		toAccountPay () {
			this.$router.push({path: '/account/pay', query: {accountPath: '/account'}});
		},
		toAccountRefund () {
			this.$router.push({path: '/account/refund', query: {accountPath: '/account'}});
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.mAjax();
		}
	}
}
</script>

<style lang="scss" scoped>
	.account-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px;
		box-sizing: border-box;
		.info {
			display: flex;
			align-items: center;
			img {
				width: 90px;
				height: 90px;
				margin-right: 20px;
				border-radius: 50%;
			}
		}
		.btns {
			.el-button {
				margin: 5px;
			}
		}
	}
	.summing {
		margin-top: 10px;
	}
	.summing-list {
		display: flex;
		li {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 150px;
			border: 15px solid #fff;
			span {
				margin-bottom: 10px;
				font-size: 26px;
			}
		}
		.item1 {
			background: lightpink;
		}
		.item2 {
			background: #beffcf;
		}
		.item3 {
			background: #c8b9fd;
		}
		.item4 {
			background: #fef6a2;
		}
	}
	.sys {
		margin-top: 10px;
	}
	.sys-info {
		padding: 0 15px;
		box-sizing: border-box;
	}
	.sys-list {
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
