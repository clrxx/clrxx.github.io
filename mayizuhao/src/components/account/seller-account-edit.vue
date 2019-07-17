<template>
	<div class="dispute">
		<div class="dispute-order white-radius">
			<div class="account-title-small">
				<el-page-header @back="$router.back()" content="出租账号管理" />
			</div>
			<ul class="dispute-order-info">
				<li><span>订单编号：</span>2019062514044160029351921200033</li>
				<li><span>订单状态：</span>取消/维权（提交后变成维权）</li>
				<li><span>下单时间：</span>2019年06月25号 14:04:41</li>
			</ul>
			<div class="edit-btn">
				<el-button type="warning" size="medium">下架商品</el-button>
			</div>
		</div>
		<div class="dispute-step white-radius">
			<div class="dispute-step-cont">
				<div class="step-2-3">
					<h3>商品信息</h3>
					<h4>蚂蚁特权刺客信条：奥德赛1蚂蚁特权刺客信条：奥德赛1</h4>
					<ul class="cont">
						<li>游戏信息</li>
						<li>业务类型：</li>
						<li>游戏名称：</li>
						<li>游戏区服：</li>
						<li>其他说明：</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
	.edit-btn {
		padding: 15px;
		text-align: right;
	}
	.dispute-order-info {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
		li {
			display: flex;
			width: 50%;
			padding: 5px 0;
			span {
				padding-right: 3px;
			}
		}
	}
	.dispute-step {
		margin-top: 10px;
	}
	.dispute-step-cont {
		padding: 15px;
		border-top: 1px solid #e8eaec;
		h3 {
			font-weight: bold;
		}
		h4 {
			margin-top: 10px;
			text-indent: 28px;
			line-height: 1.3;
		}
		.cont {
			padding: 15px 10px;
			margin-top: 15px;
			border: 1px solid #e8eaec;
			li {
				padding: 3px 0;
			}
		}
	}
</style>
