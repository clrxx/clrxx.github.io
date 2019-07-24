<template>
	<div class="announcement bc-f5f7f9">
		<div class="announcement-bar wh-1300">
			<inde-bar></inde-bar>
		</div>
		<div class="announcement-main wh-1300">
			<div class="announcement-navs">
				<el-menu ref="closeFAQ" @select="menuChange" :default-active="announcementPath" unique-opened>
					<el-submenu index="FAQ">
						<template slot="title">
							<img src="@/assets/all_news.png" alt="icon">
							<span>常见问题</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="item in FAQ" :index="'/FAQ'+ item" :key="item">常见问题{{ item }}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/announcement"><img src="@/assets/notice_news.png" alt="icon">最新公告</el-menu-item>
					<el-menu-item index="/activity"><img src="@/assets/activity_news.png" alt="icon">活动中心</el-menu-item>
				</el-menu>
			</div>
			<div class="announcement-cont">
				<router-view />
			</div>
		</div>
		<el-backtop></el-backtop>
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
			announcementPath: '',
			FAQ: [1, 2]
		}
	},
	created () {
		this.announcementPath = sessionStorage.getItem('announcement-path');
	},
	methods: {
		menuChange (index) {
			this.announcementPath = index;
			if (index.indexOf('FAQ') == -1) {
				this.$router.push(index);
				this.$refs.closeFAQ.close('FAQ');
			} else {
				let id = parseInt(index.slice(index.indexOf('FAQ')+3));
				this.$router.push({path: '/FAQ/detail', query: { sort: 0, id }});
			}
			sessionStorage.setItem('announcement-path', index);
		}
	}
}
</script>

<style lang="scss" scoped>
	.announcement-bar {
		margin-bottom: 15px;
		background: #fff;
	}
	.announcement {
		padding-bottom: 30px;
	}
	.announcement-main {
		display: flex;
		border-radius: 5px;
	}
	.announcement-navs {
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
				line-height: 1.5;
			}
		}
		.el-menu-item.is-active {
			background: #ecf5ff;
			border-right: 2px solid #409eff;
		}
	}
	.announcement-cont {
		flex: 1;
		padding-left: 20px;
		box-sizing: border-box;
	}
</style>
