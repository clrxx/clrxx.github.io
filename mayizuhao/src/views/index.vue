<template>
	<div class="index bc-f5f7f9">
		<inde-bar></inde-bar>
		<div class="index-main">
			<div class="index-banner wh-1300">
				<div class="games-class">
					<div @mouseleave="hotGameLeave" class="hot">
						<a v-for="i in 6" :key="i" @mouseenter="hotGameEnter" class="al">英雄联盟{{ i }}</a>
						<transition name="el-fade-in-linear">
							<div v-show="isShowHotGame" class="index-popover-cont">
								<div v-for="i in 10" :key="i" class="cont">
									<h3>电信</h3>
									<ul class="list">
										<li v-for="is in 10" :key="is" @click="toFiltering(i)">英雄联盟 {{ i }}</li>
									</ul>
								</div>
							</div>
						</transition>
					</div>
					<div class="split">
						<img src="@/assets/split_c_work.png" alt="pic">
					</div>
					<div class="cls">
						<div @mouseleave="clsGameLeave">
							<a @mouseenter="clsGameEnter" class="ls">
								<img src="@/assets/pc_game.png" alt="icon">
								<span>端游专区</span>
							</a>
							<a @mouseenter="clsGameEnter" class="ls">
								<img src="@/assets/mobile_icon.png" alt="icon">
								<span>手游专区</span>
							</a>
							<transition name="el-fade-in-linear">
								<div v-show="isShowClsGame" class="index-popover-cont">
									<div v-for="i in 10" :key="i" class="cont">
										<h3>电信</h3>
										<ul class="list">
											<li v-for="is in 10" :key="is" @click="toFiltering(i)">英雄联盟 {{ i }}</li>
										</ul>
									</div>
								</div>
							</transition>
						</div>
						<a class="ls">
							<img src="@/assets/steam_icon.png" alt="icon">
							<span>Steam专区</span>
						</a>
						<a href="http://wpa.qq.com/msgrd?v=3&uin=2502851992&site=qq&menu=yes" target="_blank" class="ls">
							<img src="@/assets/fb_acc.png" alt="icon">
							<span class="sp">发布账号<img src="@/assets/hot.png" alt="icon"></span>
						</a>
					</div>
				</div>
				<div class="index-carousel">
					<div class="carousel">
						<el-carousel trigger="click" height="320px" :interval="5000">
							<el-carousel-item v-for="item in 4" :key="item">
								<img @click="toZone" src="https://img.myzuhao.top/5cdbab19b8bed69358.png" alt="pic">
							</el-carousel-item>
						</el-carousel>
					</div>
					<ul class="help">
						<li>
							<img src="@/assets/yd.jpg" alt="pic">
						</li>
						<li>
							<img src="@/assets/gzh.jpg" alt="pic">
						</li>
					</ul>
				</div>
				<div class="index-info-data">
					<div class="info">
						<img src="@/assets/default-avatar.png" alt="pic">
						<div class="ln">
							<button class="btn1">登录</button>
							<button class="btn2">注册</button>
						</div>
						<!-- <div class="lo">
							<h3>你好，欢迎来到蚂蚁租号</h3>
							<h4><span>昵称</span><span>【退出】</span></h4>
						</div> -->
					</div>
					<div class="data">
						<div class="tabs">
							<el-tabs v-model="tabsActive">
								<el-tab-pane label="最新公告" name="one">
									<a @click="toAnnouncement(1, 1)">2019春节假期提现调整公告</a>
									<a>限时推广功能上线公告</a>
									<a>关于未成年防沉迷系统公告</a>
									<a>《绝地求生》荣获Steam年度最佳大奖</a>
									<a>游戏专区代理大招募，首期收益全归你</a>
								</el-tab-pane>
								<el-tab-pane label="活动中心" name="two">
									<a @click="toAnnouncement(2, 2)">2019春节假期提现调整公告</a>
									<a>限时推广功能上线公告</a>
									<a>关于未成年防沉迷系统公告</a>
									<a>《绝地求生》荣获Steam年度最佳大奖</a>
									<a>游戏专区代理大招募，首期收益全归你</a>
								</el-tab-pane>
							</el-tabs>
						</div>
						<div class="dn">
							<a href="https://img.myzuhao.top/%E8%9A%82%E8%9A%81%E4%B8%8A%E5%8F%B7%E5%99%A8%E5%AE%89%E8%A3%85%E5%8C%85472.exe" download="蚂蚁上号器安装包.exe"><img src="@/assets/download.png" alt="icon"></a>
						</div>
					</div>
				</div>
			</div>
			<div class="index-recommend wh-1300">
				<div class="nwe-games">
					<div class="games-te">
						<img src="@/assets/header-new-game.png" alt="pic">
					</div>
					<ul class="new-games-list">
						<li>
							<a>
								<img src="@/assets/newgame1.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame2.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame3.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame4.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame5.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame6.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/newgame7.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a><img src="@/assets/more_games.jpg" alt="pic"></a>
						</li>
					</ul>
				</div>
				<div class="hot-games">
					<div class="games-te">
						<img src="@/assets/header-hot-game.png" alt="pic">
					</div>
					<ul class="hot-games-list clearfix">
						<li>
							<a class="item1">
								<img src="https://img.myzuhao.top/%E9%A6%96%E9%A1%B5%E6%96%B0%E6%B8%B8%E6%8E%A8%E8%8D%90%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame2.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame3.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame4.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame5.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame6.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/hotgame7.jpg" alt="pic">
								<em class="em-white-mark"></em>
							</a>
						</li>
					</ul>
				</div>
				<div class="hot-activity">
					<div class="games-te">
						<img src="@/assets/header-action-center.png" alt="pic">
					</div>
					<ul class="hot-activity-list">
						<li>
							<a>
								<img src="@/assets/activity1.jpg" alt="pic">
								<div class="tl">敬请期待.</div>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/activity2.jpg" alt="pic">
								<div class="tl">敬请期待.</div>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/activity3.jpg" alt="pic">
								<div class="tl">敬请期待.</div>
							</a>
						</li>
						<li>
							<a>
								<img src="@/assets/activity4.jpg" alt="pic">
								<div class="tl">敬请期待.</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-show="isShowZone" class="zone">
			<img src="@/assets/li_af_adv.png" alt="pic">
			<i @click="isZone" class="el-icon-close"></i>
		</div>
		<div v-show="isShoContact" class="contact">
			<i @click="isContact" class="el-icon-close"></i>
			<img src="@/assets/kf_logo.png" alt="pic">
			<a class="item1" href="https://img.myzuhao.top/%E8%9A%82%E8%9A%81%E4%B8%8A%E5%8F%B7%E5%99%A8%E5%AE%89%E8%A3%85%E5%8C%85472.exe" download="蚂蚁上号器安装包.exe"></a>
			<a class="item2" href="http://wpa.qq.com/msgrd?v=3&uin=2502851992&site=qq&menu=yes" target="_blank"></a>
			<a class="item3" href="http://shang.qq.com/wpa/qunwpa?idkey=8aeb62204752dd09d883379911cfb86d832255d241e2c9f1b332704310ab0a98" target="_blank"></a>
			<a class="item4" href="http://www.my.steam.xubei.com" target="_blank"></a>
			<a class="item5" href="http://wpa.qq.com/msgrd?v=3&uin=2502851992&site=qq&menu=yes" target="_blank"></a>
			<a class="item6"><el-backtop :visibility-height="0" /></a>
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
			isShowHotGame: false,
			isShowClsGame: false,
			tabsActive: 'one',
			isShowZone: true,
			isShoContact: true
		}
	},
	methods: {
		hotGameEnter () {
			this.isShowHotGame = true;
		},
		hotGameLeave () {
			this.isShowHotGame = false;
		},
		clsGameEnter () {
			this.isShowClsGame = true;
		},
		clsGameLeave () {
			this.isShowClsGame = false;
		},
		toZone () {
			this.$router.push('/zone');
		},
		toFiltering (id) {
			this.$router.push({path: '/filtering', query: { id }});
		},
		toAnnouncement (index, id) {
			if (index == 1) {
				sessionStorage.setItem('announcement-path', '/announcement');
			} else if (index == 2) {
				sessionStorage.setItem('announcement-path', '/announcement/activity');
			}
			this.$router.push({path: '/announcement/detail', query: { id }});
		},
		isZone () {
			this.isShowZone = false;
		},
		isContact () {
			this.isShoContact = false;
		}
	}
}
</script>

<style lang="scss" scoped>
	.index-main {
		background: url('https://img.myzuhao.top/%E9%A6%96%E9%A1%B5%E5%BA%95%E8%89%B2.png') no-repeat;
	}
	.index-banner {
		display: flex;
	}
	.games-class {
		position: relative;
		width: 240px;
		padding-top: 30px;
		background: #312b30;
		box-sizing: border-box;
		.hot {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 25px;
			.al {
				display: inline-block;
				width: 80px;
				margin: 12px 0;
				border: 1px solid rgba(204, 204, 204, 0.2);
				color: #fff;
				text-align: center;
				line-height: 30px;
				border-radius: 30px;
				cursor: pointer;
				&:hover {
					border-color: #f60;
					color: #f60;
				}
			}
		}
		.split {
			padding: 20px;
			width: 100%;
			opacity: .3;
			box-sizing: border-box;
			img {
				width: 100%;
			}
		}
		.cls {
			&>span {
				width: 100%;
			}
			.ls {
				display: flex;
				align-items: center;
				padding: 10px 35px;
				cursor: pointer;
				img {
					width: 35px;
					margin-right: 15px;
				}
				span {
					color: #fff;
					font-size: 17px;
				}
				.sp {
					position: relative;
					color: #9fe46e;
					font-size: 25px;
					img {
						position: absolute;
						top: 0;
						right: -30px;
						width: 26px;
						margin: 0;
					}
				}
				&:hover {
					background: #fff;
				}
				&:hover span {
					color: #333;
				}
			}
		}
	}
	.index-popover-cont {
		position: absolute;
		top: 0;
		left: 240px;
		z-index: 5;
		overflow-y: auto;
		width: 790px;
		height: 479px;
		padding: 15px;
		background: #fff;
		box-sizing: border-box;
		.cont {
			h3 {
				display: inline-block;
				padding: 8px 10px;
				margin: 10px 0 20px;
				color: #666;
				border: 1px solid #666;
				border-radius: 3px;
				cursor: default;
			}
		}
		.list {
			li {
				display: inline-block;
				padding:8px 10px;
				margin-right: 30px;
				margin-bottom: 10px;
				color: #409eff;
				border: 1px solid #409eff;
				border-radius: 3px;
				transition: all .3s;
				cursor: pointer;
				&:hover {
					background: #409eff;
					color: #fff;
				}
			}
		}
	}
	.index-carousel {
		width: 800px;
		.carousel {
			padding: 10px;
			.el-carousel {
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.help {
			display: flex;
			justify-content: space-between;
			padding: 0 10px;
			li {
				overflow: hidden;
				width: 380px;
				height: 139px;
				box-sizing: border-box;
				cursor: pointer;
				img {
					width: 100%;
					transition: all .3s;
					&:hover {
						transform: scale(1.05);
					}
				}
			}
		}
	}
	.index-info-data {
		width: 260px;
		padding: 10px;
		margin-top: 10px;
		background: #fff;
		box-sizing: border-box;
		.info {
			text-align: center;
			img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				object-fit: cover;
			}
			.ln {
				margin: 10px 0 55px;
				button {
					width: 80px;
					margin: 0 15px;
					line-height: 30px;
					border: 1px solid #f94845;
					font-size: 16px;
					border-radius: 3px;
					cursor: pointer;
				}
				.btn1 {
					background: #f94845;
					color: #fff;
				}
				.btn2 {
					background: #fff;
					color: #f94845;
				}
			}
			.lo {
				margin: 10px 0 50px;
				h3 {
					text-align: center;
				}
				h4 {
					margin-top: 10px;
					text-align: center;
					span {
						color: #57a3f3;
						cursor: pointer;
						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
		.data {
			.tabs a {
				display: block;
				overflow: hidden;
				width: 240px;
				padding: 10px 20px;
				white-space: nowrap;
				text-overflow: ellipsis;
				box-sizing: border-box;
				cursor: pointer;
			}
			.dn {
				margin-top: 20px;
				text-align: center;
			}
		}
	}
	.index-recommend {
		.games-te {
			padding: 50px 0 30px;
			text-align: center;
			img {
				width: 350px;
			}
		}
		.new-games-list {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 25%;
				padding: 5px;
				box-sizing: border-box;
				a {
					position: relative;
					overflow: hidden;
					width: 100%;
					height: 166px;
					cursor: pointer;
					&:hover img {
						transform: scale(1.05);
					}
					&:hover .em-white-mark {
						left: 0;
						top: 0;
						width: 200%;
						height: 200%;
						opacity: 0;
					}
				}
				img {
					width: 100%;
					transition: all .5s;
				}
			}
		}
		.hot-games-list {
			li {
				float: left;
				width: 25%;
				padding: 5px;
				box-sizing: border-box;
				a {
					position: relative;
					overflow: hidden;
					width: 100%;
					height: 137px;
					cursor: pointer;
					&:hover img {
						transform: scale(1.05);
					}
					&:hover .em-white-mark {
						left: 0;
						top: 0;
						width: 200%;
						height: 200%;
						opacity: 0;
					}
				}
				.item1 {
					height: 285px;
				}
				img {
					width: 100%;
					transition: all .5s;
				}
			}
		}
		.hot-activity-list {
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 50px;
			li {
				width: 25%;
				padding: 5px 15px;
				box-sizing: border-box;
				a {
					position: relative;
				}
				img {
					width: 100%;
				}
				.tl {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, .4);
					color: #fff;
					font-size: 18px;
				}
			}
		}
	}
	.em-white-mark {
		position: absolute;
		left: 50%;
		top: 50%;
		background: #fff;
		opacity: 0.5;
		transform: rotate(-30deg);
		transition: all .5s;
	}



	.zone {
		position: fixed;
		top: 170px;
		left: 0;
		z-index: 3;
		width: 180px;
		img {
			width: 100%;
		}
		i {
			position: absolute;
			top: -7px;
			right: -7px;
			padding: 3px;
			background: #191919;
			color: #fff;
			cursor: pointer;
			border-radius: 50%;
		}
	}
	.contact {
		position: fixed;
		top: 170px;
		right: 0;
		z-index: 3;
		width: 180px;
		i {
			position: absolute;
			top: -7px;
			left: -7px;
			padding: 3px;
			background: #fff;
			cursor: pointer;
			border-radius: 50%;
		}
		img {
			width: 100%;
		}
		a {
			position: absolute;
			left: 0;
			z-index: 4;
			width: 100%;
			height: 50px;;
			cursor: pointer;
		}
		.item1 {
			top: 70px;
		}
		.item2 {
			top: 133px;
		}
		.item3 {
			top: 185px;
		}
		.item4 {
			top: 280px;
		}
		.item5 {
			top: 374px;
		}
		.item6 {
			top: 443px;
			height: 40px;
			.el-backtop {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: transparent !important;
				color: transparent !important;
				border-radius: 0;
				box-shadow: none;
			}
		}
	}
</style>
