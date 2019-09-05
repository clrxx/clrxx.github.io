<template>
	<div class="account bc-f5f7f9">
		<div class="account-main wh-1300">
			<div class="account-navs">
				<el-menu @select="menuChange" :default-active="accountPath">
					<el-menu-item index="/account"><i class="el-icon-s-home"></i>首页</el-menu-item>
					<el-menu-item-group>
						<h3 slot="title">我是买家</h3>
						<el-menu-item index="/account/buyer-order"><i class="el-icon-document"></i>我租赁的帐号</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="我是卖家">
						<el-menu-item index="/account/seller-order"><i class="el-icon-document"></i>我出租的订单</el-menu-item>
						<el-menu-item index="/account/seller-account-manage"><i class="el-icon-collection"></i>出租账号管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="资金管理">
						<el-menu-item index="/account/bills"><i class="el-icon-document-copy"></i>资金明细</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="账户安全">
						<el-menu-item index="/account/change-account"><i class="el-icon-edit-outline"></i>修改账户资料</el-menu-item>
						<el-menu-item index="/account/change-pass"><i class="el-icon-edit-outline"></i>修改密码</el-menu-item>
						<el-menu-item index="/account/change-pay-pass"><i class="el-icon-edit-outline"></i>修改支付密码</el-menu-item>
						<el-menu-item index="/account/change-pay-account"><i class="el-icon-edit-outline"></i>修改支付宝账号</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="推广">
						<el-menu-item index="/account/promotion"><i class="el-icon-connection"></i>我的推广</el-menu-item>
						<el-menu-item index="/account/promotion-history"><i class="el-icon-connection"></i>推广历史</el-menu-item>
						<el-menu-item v-if="showPromotionStore" index="/account/promotion-store"><i class="el-icon-connection"></i>推广门店</el-menu-item>
					</el-menu-item-group>
				</el-menu>
			</div>
			<div class="account-cont">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			accountPath: '',
			showPromotionStore: false
		}
	},
	created () {
		this.accountPath = this.$route.query.accountPath;
		this.$api.post('GetRoles')
			.then(res => {
				let roles = res.obj;
				for (let i = 0; i < roles.length; i++) {
					if (roles[i] == '专区' || roles[i] == '管理员') {
						this.showPromotionStore = true;
					}
				}
			})
	},
	methods: {
		menuChange (index) {
			this.accountPath = index;
			this.$router.push({path: index, query: {accountPath: index}});
		}
	},
	watch: {
		$route (to, from) {
			this.accountPath = to.query.accountPath;
		}
	}
}
</script>

<style lang="scss" scoped>
	.account {
		padding-bottom: 30px;
	}
	.account-main {
		display: flex;
		border-radius: 5px;
	}
	.account-navs {
		flex-shrink: 0;
		width: 240px;
		.el-menu {
			border: 1px solid #e6e6e6;
		}
		.el-menu-item {
			display: flex;
			align-items: center;
		}
		.el-menu-item.is-active {
			background: #ecf5ff;
			border-right: 2px solid #409eff;
		}
	}
	.account-cont {
		flex: 1;
		padding-left: 20px;
		box-sizing: border-box;
	}
</style>

<style lang="scss">
	.account-title-small {
		padding: 15px;
		border-bottom: 1px solid #e8eaec;
		h3 {
			font-weight: bold;
		}
	}

	.account-puc {
		padding: 15px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 5px;
	}
	.account-puc-cont {
		display: flex;
		align-items: center;
		padding: 20px 0;
		margin: 20px 0;
		border-top: 1px solid #e8eaec;
		border-bottom: 1px solid #e8eaec;
	}
	.account-puc-list {
		li {
			display: flex;
			align-items: center;
			padding: 12px 0;
			label {
				flex-shrink: 0;
				min-width: 100px;
				margin-right: 10px;
				text-align: right;
			}
			a {
				color: #409EFF;
				margin-left: 10px;
				cursor: pointer;
			}
		}
	}
	
	.lease-order-thead {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		background: #f8f8f8;
		border: 1px solid #e8eaec;
		li {
			padding: 15px 0;
			color: #666;
			font-size: 12px;
			text-align: center;
		}
	}
	.lease-order-list {
		li {
			margin-bottom: 10px;
			border: 1px solid #e8eaec;
		}
		.order-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px;
			background: #f8f8f8;
			border-bottom: 1px solid #e8eaec;
			font-size: 12px;
				.title {
					display: flex;
					align-items: center;
					.s1 {
						margin-left: 50px;
					}
				}
				span {
					padding: 0 5px;
					color: #999;
				}
		}
		.order-cont {
			display: flex;
			align-items: center;
			height: 110px;
			min-height: 110px;
			.cont {
				display: flex;
				padding: 15px;
				box-sizing: border-box;
				.pic {
					flex-shrink: 0;
					width: 80px;
					height: 80px;
					margin-right: 10px;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					border-radius: 5px;
				}
				.te {
					h4 {
						margin-bottom: 10px;
						line-height: 1.3;
						font-weight: bold;
						word-break: break-all;
					}
					p {
						line-height: 1.3;
					}
				}
			}
			.amount {
				p {
					color: #151515;
					font-size: 18px;
				}
				span {
					color: #999;
					font-size: 12px;
				}
			}
			.opts {
				a {
					margin-top: 10px;
					font-size: 12px;
				}
			}
		}
	}
	.lease-order-info {
		.item1, .item2, .item3, .item4, .item5, .item6{
			height: 100%;
		}
		.item1 {
			flex: 1;
		}
		.item2, .item3, .item4 {
			width: 130px;
		}
		.item5, .item6 {
			width: 120px;
		}
	}
	.lease-order-list {
		.item4, .item5, .item6 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #e8eaec;
		}
		.item2, .item3 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.change-pass-main {
		width: 520px;
		.radio {
			padding: 0 0 20px 100px;
		}
		.row-item {
			display: inline-block;
		}
		.phone {
			.el-input {
				width: 165px;
			}
		}
		.sms {
			.el-input {
				width: 100px;
			}
		}
		.send-sms {
			margin: 1px 0 0 20px;
		}
	}
</style>
