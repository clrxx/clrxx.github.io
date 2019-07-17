<template>
	<div class="account-index">
		<div class="account-info white-radius">
			<div class="info">
				<img src="@/assets/default-avatar.png" alt="pic">
				<p>昵称</p>
			</div>
			<div class="mo">
				<p>我的余额<span>￥0</span></p>
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
				<li class="item1"><span>0</span>租号次数</li>
				<li class="item2"><span>0</span>成功租号次数</li>
				<li class="item3"><span>0</span>维权次数</li>
				<li class="item4"><span>100%</span>订单成功率</li>
			</ul>
		</div>
		<div class="sys white-radius">
			<div class="account-title-small">
				<h3>系统通知</h3>
			</div>
			<div class="null-data">暂无相关信息</div>
			<div class="sys-info">
				<ul class="sys-list">
					<li></li>
				</ul>
				<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	methods: {
		toAccountPay () {
			this.$router.push('/account/pay');
		},
		toAccountRefund () {
			this.$router.push('/account/refund');
		},
		pageChange (e) {
			console.log(e)
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
			padding: 10px;
		}
	}
</style>
