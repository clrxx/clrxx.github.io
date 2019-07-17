<template>
	<div class="footer-main">
		<div class="wh-1300">
			<div class="footer-navs">
				<div class="lt">
					<div class="logo">
						<img src="@/assets/logo-white.png" alt="logo">
					</div>
					<div class="navs-main">
						<ul class="navs-list">
							<li>新手帮助</li>
							<li>免费注册</li>
							<li>如何租赁</li>
							<li>如何购买</li>
							<li>如何发布</li>
						</ul>
						<ul class="navs-list">
							<li>租号安全</li>
							<li>租赁押金</li>
							<li>帮助中心</li>
						</ul>
						<ul class="navs-list">
							<li>关于蚂蚁</li>
							<li>关于我们</li>
							<li>加入我们</li>
						</ul>
					</div>
				</div>
				<div class="footer-contact">
					<h4>官方在线客服</h4>
					<a href="http://wpa.qq.com/msgrd?v=3&uin=2502851992&site=qq&menu=yes" target="_blank">QQ:2502851992</a>
					<h4>周一至周日8：00-24：00</h4>
				</div>
			</div>
			<div class="footer-copyright">
				<div class="footer-link">
					<h3>友情链接：</h3>
					<ul class="link-list">
						<li>英雄联盟租号</li>
						<li>绝地求生租号</li>
						<li>穿越火线租号</li>
						<li>steam代购商城</li>
					</ul>
				</div>
				<h2>公司名称：常州市黑瞳网络科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备案号：苏ICP备18050683号-2</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
	.footer-main {
		background: #333;
	}
	.footer-navs {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
		.lt {
			display: flex;
		}
		.navs-main {
			display: flex;
			padding-left: 20px;
			border-left: 1px solid #fff;
		}
		.navs-list {
			margin-right: 100px;
			li {
				margin-bottom: 10px;
				color: #fff;
				&:first-of-type {
					margin-bottom: 30px;
				}
			}
		}
	}
	.footer-contact {
		h4 {
			&:first-of-type {
				margin-bottom: 30px;
			}
			color: #fff;
		}
		a {
			margin-bottom: 15px;
			color: #fff;
			font-size: 24px;
		}
	}
	.footer-copyright {
		padding: 20px 0;
		border-top: 1px solid #7d7d7d;
		h2 {
			margin-top: 20px;
			color: #586558;
			text-align: center;
		}
	}
	.footer-link {
		display: flex;
		align-items: center;
		h3 {
			margin-right: 10px;
			color: #fff;
		}
	}
	.link-list {
		display: flex;
		align-items: center;
		li {
			padding: 0 10px;
			color: #fff;
		}
	}
</style>
