<template>
	<div class="index bc-f5f7f9">
		<inde-bar></inde-bar>
		<div class="index-main">
			<div class="index-banner wh-1300">
				<div class="games-class">
					<div class="hot">
						<ul class="sel-list">
							<li v-for="item in popularGoodLen" :key="item.name" @click="toFiltering(item.path)">{{ item.name }}</li>
						</ul>
					</div>
					<!-- <div @mouseleave="isShowHotGame = false" class="hot">
						<ul class="sel-list">
							<li v-for="item in popularGoodLen" :key="item.name" @click="toFiltering(item.path)" @mouseenter="hotGameEnter(item.path)">{{ item.name }}</li>
						</ul>
						<transition name="el-fade-in-linear">
							<div v-show="isShowHotGame" @mouseenter="fadeHotGameEnter" class="index-popover-cont">
								<div v-for="item in popularList" :key="item.name" class="cont">
									<h3 @click="toFiltering(item.path)">{{ item.name }}</h3>
									<ul class="list">
										<li v-for="i in item.data" :key="i.name" @click="toFiltering(i.path)">{{ i.name }}</li>
									</ul>
								</div>
							</div>
						</transition>
					</div> -->
					<div class="split">
						<img src="@/assets/split_c_work.png" alt="pic">
					</div>
					<div class="cls">
						<div @mouseleave="isShowClsGame = false">
							<a @mouseenter="clsGameEnter('游戏_端游')" class="ls">
								<img src="@/assets/pc_game.png" alt="icon">
								<span>端游专区</span>
							</a>
							<a @mouseenter="clsGameEnter('游戏_手游')" class="ls">
								<img src="@/assets/mobile_icon.png" alt="icon">
								<span>手游专区</span>
							</a>
							<transition name="el-fade-in-linear">
								<div v-show="isShowClsGame" class="index-popover-cont">
									<ul class="list">
										<li v-for="item in popularList" :key="item.name" @click="toFiltering(item.path)">{{ item.name }}</li>
									</ul>
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
					<div v-if="!isShowZone" class="carousel">
						<el-carousel trigger="click" height="320px" :interval="5000">
							<el-carousel-item>
								<el-image fit="cover" @click="toFiltering('游戏_端游_英雄联盟')" src="https://img.myzuhao.top/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F%E8%BD%AE%E6%92%AD%E5%9B%BE.jpeg">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</el-carousel-item>
							<el-carousel-item>
								<el-image fit="cover" @click="toFiltering('游戏_端游_穿越火线')" src="https://img.myzuhao.top/%E7%A9%BF%E8%B6%8A%E7%81%AB%E7%BA%BF%E8%BD%AE%E6%92%AD%E5%9B%BE.jpeg">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</el-carousel-item>
							<el-carousel-item>
								<el-image fit="cover" @click="toFiltering('游戏_手游_王者荣耀')" src="https://img.myzuhao.top/%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E8%BD%AE%E6%92%AD%E5%9B%BE.jpg">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div v-if="isShowZone" class="ze">
						<img @click="toZone" src="https://img.myzuhao.top/5cdbab19b8bed69358.png" alt="pic">
					</div>
					<ul class="help">
						<li>
							<img @click="toNotice(3, FAQFid)" src="@/assets/yd.jpg" alt="pic">
						</li>
						<li>
							<img src="@/assets/gzh.jpg" alt="pic">
						</li>
					</ul>
				</div>
				<div class="index-info-data">
					<div class="info">
						<div v-if="!MYuserInfo" class="ln">
							<img src="@/assets/default-avatar.png" alt="pic">
							<div class="btns">
								<button @click="toAuth" class="btn1">登录</button>
								<button @click="toAuth(1)" class="btn2">注册</button>
							</div>
						</div>
						<div v-if="MYuserInfo" class="lo">
							<el-image fit="cover" :src="MYuserInfo.userPic" class="pic">
								<div slot="placeholder" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<h3>你好，欢迎来到蚂蚁租号</h3>
							<h4>{{ MYuserInfo.userName }}<span @click="login">【退出】</span></h4>
						</div>
					</div>
					<div class="data">
						<div class="tabs">
							<el-tabs v-model="tabsActive">
								<el-tab-pane label="最新公告" name="1">
									<a v-for="item in noticeList" :key="item.id" :title="item.title" @click="toNotice(1, item.id)">{{ item.title }}</a>
								</el-tab-pane>
								<el-tab-pane label="活动中心" name="2">
									<a v-for="item in activityList" :key="item.id" @click="toNotice(2, item.id)">{{ item.title }}</a>
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
						<li v-for="item in newGoodLen" :key="item.name" @click="toFiltering(item.path)">
							<a :title="item.name">
								<el-image fit="cover" :src="item.imageUrl" class="pic">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
								<em class="em-white-mark"></em>
							</a>
						</li>
						<li @click="toFiltering('游戏_端游')">
							<a title="更多游戏"><img src="@/assets/more_games.jpg" alt="pic"></a>
						</li>
					</ul>
				</div>
				<div class="hot-games">
					<div class="games-te">
						<img src="@/assets/header-hot-game.png" alt="pic">
					</div>
					<ul class="hot-games-list clearfix">
						<li v-for="(item, index) in hotGoodLen" :key="item.name" @click="toFiltering(item.path)">
							<a :class="{'flt': index == 0}" :title="item.name">
								<el-image fit="cover" :src="item.imageUrl" class="pic">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
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
			<img @click="toZone" src="@/assets/li_af_adv.png" alt="pic">
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
			MYuserInfo: null,
			popularGood: [],
			hotGood: [],
			popularList: [],
			newGood: [],
			noticeList: [],
			activityList: [],
			FAQFid: 0,

			isShowHotGame: false,
			isShowClsGame: false,
			tabsActive: '1',
			isShowZone: false,
			isShoContact: true
		}
	},
	created () {
		let _href = window.location.href;
		if (_href.indexOf('SCode') > -1) {
			sessionStorage.setItem('SCode', _href.slice(_href.indexOf('SCode')+6));
			this.isShowZone = true;
		} else {
			sessionStorage.removeItem('SCode');
		}
		this.MYuserInfo = JSON.parse(localStorage.getItem('MYuserInfo'));
		this.$api.post('GetPopularGoodType')
			.then(res => {
				this.popularGood = res.obj;
				this.hotGood = res.obj;
			})
		this.$api.post('GetNewGoodType')
			.then(res => {
				this.newGood = res.obj;
			})
		this.$api.post('GetInfoPage', {
			infoArea: 1,
			itemCount: 5,
			pageIndex: 0
		}).then(res => {
			this.noticeList = res.obj.obj;
		});
		this.$api.post('GetInfoPage', {
			infoArea: 2,
			itemCount: 5,
			pageIndex: 0
		}).then(res => {
			this.activityList = res.obj.obj;
		});
		
		this.$api.post('GetInfoPage', {
			infoArea: 3,
			itemCount: 1,
			pageIndex: 0
		}).then(res => {
			this.FAQFid = res.obj.obj[0].id;
		});
	},
	computed: {
		popularGoodLen () {
			return this.popularGood.slice(0, 6);
		},
		hotGoodLen () {
			return this.hotGood.slice(0, 8);
		},
		newGoodLen () {
			return this.newGood.slice(0, 7);
		}
	},
	methods: {
		toAuth (i) {
			if (i == 1) {
				this.$router.push({path: '/auth', query: {sign: 1}});
			} else {
				this.$router.push('/auth');
			}
		},
		login () {
			this.$api.post('LogOut')
				.then(res => {
					this.$notify({
						title: '温馨提示',
						message: '已成功退出登录'
					});
					localStorage.clear();
					this.$router.push('/auth');
				});
		},
		// hotGameEnter (path) {
		// 	this._hotTimer = setTimeout(() => {
		// 		let hotList = [];
		// 		this.$api.post('GetChildrenType', JSON.stringify(path))
		// 			.then(res => {
		// 				let _list = res.obj;
		// 				let _listLen = _list.length;
		// 				for (let i=0; i<_listLen; i++) {
		// 					if (JSON.stringify(_list[i].path).indexOf('峡谷之巅') != -1) {
		// 						hotList[i] = {
		// 							name: _list[i].name,
		// 							path: _list[i].path,
		// 						};
		// 						continue;
		// 					}
		// 					hotList[i] = {
		// 						name: _list[i].name,
		// 						path: _list[i].path,
		// 						data: []
		// 					};
		// 					this.$api.post('GetChildrenType', JSON.stringify(_list[i].path))
		// 						.then(res => {
		// 							hotList[i].data = res.obj;
		// 						})
		// 				}
		// 				this.popularList = hotList;
		// 			})
		// 		this.isShowHotGame = true;
		// 	}, 300)
		// },
		// fadeHotGameEnter () {
		// 	clearTimeout(this._hotTimer);
		// },
		clsGameEnter (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.popularList = res.obj;
				})
			this.isShowClsGame = true;
		},
		toZone () {
			this.$router.push('/zone');
		},
		toFiltering (id) {
			this.$router.push({path: '/filtering', query: {goodsId: id}});
		},
		toNotice (index, id) {
			if (index == 1) {
				this.$router.push({path: '/notice/detail', query: {noticePath: '/notice', nId: id}});
			} else if (index == 2) {
				this.$router.push({path: '/activity/detail', query: {noticePath: '/activity', nId: id}});
			} else if (index == 3) {
				this.$router.push({path: '/FAQ/detail', query: {noticePath: `/FAQ${id}`, nId: id}});
			}
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
			position: relative;
			padding: 0 25px;
			.sel-list {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				li {
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
			.index-popover-cont {
				top: -30px;
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
				cursor: pointer;
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
		}
		.ze {
			overflow: hidden;
			height: 320px;
			padding: 10px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.help {
			display: flex;
			justify-content: space-between;
			padding: 0 13px;
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
			margin-bottom: 50px;
			text-align: center;
			.ln {
				margin-bottom: 50px;
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
				.pic {
					width: 60px;
					height: 60px;
					margin-bottom: 10px;
					border-radius: 50%;
				}
				h4 {
					margin-top: 10px;
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
				&:hover {
					color: #57a3f3;
				}
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
					img {
						width: 100%;
						height: 100%;
					}
					&:hover .pic {
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
				.pic {
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
					&:hover .pic {
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
				.flt {
					height: 285px;
				}
				.pic {
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
