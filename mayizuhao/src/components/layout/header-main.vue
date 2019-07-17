<template>
	<div class="header-main">
		<div class="header-cont">
			<div class="header-about">
				<img @click="toIndexPage" src="@/assets/house.png" alt="house">
				<h2 @click="toIndexPage">您好，欢迎来到蚂蚁租号！</h2>
				<a href="http://wpa.qq.com/msgrd?v=3&uin=2502851992&site=qq&menu=yes" target="_blank">联系客服</a>
			</div>
			<div class="header-navs">
				<div class="login">
					<a>你好，请</a><a class="r" @click="toAuth">登录</a><em>/</em><a @click="toAuth(1)">注册</a>
				</div>
				<div class="user-info">
					<h3>你好，昵称</h3>
					<el-dropdown @command="commandChange">
						<span class="el-dropdown-link">个人中心<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="/account">首页</el-dropdown-item>
							<el-dropdown-item command="/account/buyer-order">我的订单</el-dropdown-item>
							<el-dropdown-item command="/account/seller-order">我出租的帐号</el-dropdown-item>
							<el-dropdown-item  @click.native="logout" divided>退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<ul class="navs-list">
					<li>帮助中心</li>
					<li>关于我们</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		toAuth (i) {
			if (i == 1) {
				this.$router.push({path: '/auth', query: {sign: 1}});
			} else {
				this.$router.push('/auth');
			}
		},
		commandChange (command) {
			sessionStorage.setItem('account-path', command);
			this.$router.push(command);
		},
		logout () {
			this.$router.push('/auth');
		},
		toIndexPage () {
			this.$router.push('/');
		}
	}
}
</script>

<style lang="scss" scoped>
	.header-main {
		position: fixed;
		z-index: 5;
		top: 0;
		left: 0;
		width: 100%;
		height: 45px;
		background: #292929;
		.header-cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			max-width: 1300px;
			margin: 0 auto;
			height: 100%;
		}
	}
	.header-about {
		display: flex;
		align-items: center;
		cursor: pointer;
		h2 {
			padding: 0 10px 0 5px;
			color: #ccc;
		}
		a {
			display: inline-block;
			padding: 0 12px;
			background: #78c443;
			color: #fff;
			line-height: 22px;
			text-align: center;
			border-radius: 20px;
		}
	}
	.header-navs {
		display: flex;
		align-items: center;
		cursor: pointer;
		.login {
			a {
				color: #ccc;
			}
			.r {
				margin-left: 10px;
				color: red;
			}
			em {
				color: #ccc;
			}
		}
		.user-info {
			display: flex;
			align-items: center;
			h3 {
				padding: 0 20px;
				color: #ccc;
			}
			.el-dropdown {
				color: #ccc;
			}
			.el-icon--right {
				margin-left: 0;
				font-size: 12px;
				font-weight: bold;
			}
		}
		.navs-list {
			display: flex;
			align-items: center;
			li {
				padding: 0 20px;
				border-right: 1px solid #e4e4e4;
				color: #ccc;
				&:last-of-type{
					border-right: none;
				}
			}
		}
	}
</style>
