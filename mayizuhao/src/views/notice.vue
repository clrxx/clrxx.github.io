<template>
	<div class="notice bc-f5f7f9">
		<div class="notice-bar wh-1300">
			<inde-bar></inde-bar>
		</div>
		<div class="notice-main wh-1300">
			<div class="notice-navs">
				<el-menu ref="closeFAQ" @select="menuChange" :default-active="noticePath" unique-opened>
					<el-submenu index="FAQ">
						<template slot="title">
							<img src="@/assets/all_news.png" alt="icon">
							<span>常见问题</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="item in FAQData" :index="'/FAQ'+ item.id" :key="item.id">{{ item.title }}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/notice"><img src="@/assets/notice_news.png" alt="icon">最新公告</el-menu-item>
					<el-menu-item index="/activity"><img src="@/assets/activity_news.png" alt="icon">活动中心</el-menu-item>
				</el-menu>
			</div>
			<div class="notice-cont">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import IndeBar from '@/components/index/index-bar'
export default {
	components: {
		IndeBar
	},
	data () {
		return {
			FAQData: [],
			noticePath: ''
		}
	},
	created () {
		this.noticePath = this.$route.query.noticePath;
		this.$api.post('GetInfoPage', {
			infoArea: 3,
			itemCount: 50,
			pageIndex: 0
		}).then(res => {
			this.FAQData = res.obj.obj;
		});
	},
	methods: {
		menuChange (index) {
			this.noticePath = index;
			if (index.indexOf('FAQ') == -1) {
				this.$router.push({path: index, query: {noticePath: index}});
				this.$refs.closeFAQ.close('FAQ');
			} else {
				let id = parseInt(index.slice(index.indexOf('FAQ')+3));
				this.$router.push({path: '/FAQ/detail', query: {noticePath: index, nId: id}});
			}
		}
	},
	watch: {
		$route (to, from) {
			this.noticePath = to.query.noticePath;
		}
	}
}
</script>

<style lang="scss" scoped>
	.notice-bar {
		margin-bottom: 15px;
		background: #fff;
	}
	.notice {
		padding-bottom: 30px;
	}
	.notice-main {
		display: flex;
		border-radius: 5px;
	}
	.notice-navs {
		flex-shrink: 0;
		width: 240px;
		.el-menu {
			border: 1px solid #e6e6e6;
			img {
				margin-right: 10px;
			}
		}
		.el-menu-item-group{
			.el-menu-item {
				height: auto;
				padding: 15px 20px 15px 40px;
				white-space: initial;
				line-height: 1.3;
			}
		}
		.el-menu-item.is-active {
			background: #ecf5ff;
			border-right: 2px solid #409eff;
		}
	}
	.notice-cont {
		flex: 1;
		padding-left: 20px;
		box-sizing: border-box;
	}
</style>
