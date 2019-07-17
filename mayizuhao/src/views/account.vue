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
		<el-backtop></el-backtop>
	</div>
</template>

<script>
export default {
	data () {
		return {
			accountPath: '',
			userRoles: [],
			showPromotionStore: false
		}
	},
	created () {
		this.accountPath = sessionStorage.getItem('account-path');
		this.userRoles = JSON.parse(localStorage.getItem('userRoles'));
		for (let i = 0; i < this.userRoles.length; i++) {
			if (this.userRoles[i] == '专区' || this.userRoles[i] == '管理员') {
				this.showPromotionStore = true;
			}
		}
	},
	methods: {
		menuChange (index) {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
			this.$router.push(index);
		}
	},
	watch: {
		$route (to, from) {
			this.accountPath = to.path;
			sessionStorage.setItem('account-path', to.path);
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
		margin: 25px 0;
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
			.al {
				padding: 0 30px;
				background: #fff;
				border: 1px solid #409EFF;
				line-height: 32px;
				border-radius: 3px;
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
			height: 130px;
			.cont {
				display: flex;
				padding: 15px;
				box-sizing: border-box;
				.pic {
					flex-shrink: 0;
					width: 100px;
					height: 100px;
					margin-right: 10px;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					border-radius: 5px;
				}
				.te {
					h4 {
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						word-break: break-all;
						margin-bottom: 10px;
						line-height: 1.3;
						font-weight: bold;
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
</style>
