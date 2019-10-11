<template>
	<div class="logo-main">
		<div class="logo-cont wh-1300">
			<div @click="toIndexPage" class="logo">
				<img src="@/assets/logo-gray.png" alt="logo">
			</div>
			<div v-if="isShowSearch" class="sel-cont">
				<ul class="sel-list">
					<li>
						<el-popover width="800" placement="bottom" v-model="popGs">
							<div class="pop-game-cont">
								<ul class="llist">
									<li><el-radio @change="selGameCls('游戏_端游')" v-model="radioFro" label="1" border size="small">端游</el-radio></li>
									<li><el-radio @change="selGameCls('游戏_手游')" v-model="radioFro" label="2" border size="small">手游</el-radio></li>
								</ul>
								<ul class="clist">
									<li v-for="item in gameSGoods" :key="item.name" @click="selGameSs(item)">{{ item.name }}</li>
								</ul>
							</div>
							<el-button size="medium" slot="reference" :title="gameSName">{{ gameSName }}</el-button>
						</el-popover>
					</li>
					<li>
						<el-popover width="800" placement="bottom" v-model="popYs">
							<div class="pop-game-cont">
								<div v-if="gameYGoods.length == 0" class="null-data">暂无相关数据</div>
								<ul class="clist">
									<li v-for="item in gameYGoods" :key="item.name" @click="selGameYs(item)">{{ item.name }}</li>
								</ul>
							</div>
							<el-button size="medium" slot="reference" :title="gameYName">{{ gameYName }}</el-button>
						</el-popover>
					</li>
					<li>
						<el-popover width="800" placement="bottom" v-model="popEs">
							<div class="pop-game-cont">
								<div v-if="gameEGoods.length == 0" class="null-data">暂无相关数据</div>
								<ul class="clist">
									<li v-for="item in gameEGoods" :key="item.name" @click="selGameEs(item)">{{ item.name }}</li>
								</ul>
							</div>
							<el-button size="medium" slot="reference" :title="gameEName">{{ gameEName }}</el-button>
						</el-popover>
					</li>
					<li><el-button @click="gameSearch" type="danger" size="medium" class="search">搜索</el-button></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShowSearch: true,
			popGs: false,
			popYs: false,
			popEs: false,
			radioFro: '1',
			gameSGoods: [],
			gameSName: '选择游戏',
			gameYGoods: [],
			gameYName: '选择游戏区',
			gameEGoods: [],
			gameEName: '选择游戏服',
			gameFullPath: '',
		}
	},
	created () {
		this.selGameCls('游戏_端游');
		if (this.$route.path == '/filtering') {
			this.isShowSearch = false;
		}
	},
	methods: {
		// 端游/手游
		selGameCls (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameSGoods = res.obj;
				})
		},
		// 选择游戏
		selGameSs (item) {
			this.recode();
			this.gameSName = item.name;
			this.gameFullPath = item.path;
			this.$api.post('GetChildrenType', JSON.stringify(item.path))
				.then(res => {
					this.gameYGoods = res.obj;
				})
		},
		// 一级选择
		selGameYs (item) {
			this.popYs = false;
			this.gameYName = item.name;
			this.gameFullPath = item.path;
			this.$api.post('GetChildrenType', JSON.stringify(item.path))
				.then(res => {
					this.gameEGoods = res.obj;
				})
		},
		// 二级选择
		selGameEs (item) {
			this.popEs = false;
			this.gameEName = item.name;
			this.gameFullPath = item.path;
		},
		// 搜索商品
		gameSearch () {
			let goodsId;
			if (!this.gameFullPath) {
				goodsId = '游戏_端游';
			} else {
				goodsId = this.gameFullPath;
			}
			this.$router.push({path: '/filtering', query: {goodsId}});
		},
		toIndexPage () {
			this.$router.push('/');
		},
		// 重新赋值
		recode () {
			this.popGs = false;
			this.gameYGoods = [];
			this.gameYName = '选择游戏区';
			this.gameEGoods = [];
			this.gameEName = '选择游戏服';
		}
	},
	watch: {
		$route (to) {
			this.recode();
			this.radioFro = '1';
			this.gameSName = '选择游戏';
			if (to.path == '/filtering') {
				this.isShowSearch = false;
			} else {
				this.isShowSearch = true;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.null-data {
		padding-top: 10px;
		text-align: center;
	}
	.logo-main {
		padding-top: 20px;
		background: #f5f7f9;
		.logo-cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
		}
	}
	.logo {
		height: 95px;
		cursor: pointer;
		img{
			height: 100%;
		}
	}
	.sel-cont {
		overflow: hidden;
		border: 1px solid #F56C6C;
		border-right: none;
		border-radius: 5px;
	}
	.sel-list {
		display: flex;
		flex-wrap: wrap;
		.el-button {
			overflow: hidden;
			min-width: 100px;
			max-width: 120px;
			height: 36px;
			text-overflow: ellipsis;
			border: none;
			border-right: 1px solid #DCDFE6;
			border-radius: 0;
		}
		.search {
			min-width: 70px;
		}
	}
	.pop-game-cont {
		.llist {
			display: flex;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
			li {
				padding: 0 10px;
				cursor: pointer;
			}
		}
		.clist {
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			max-height: 300px;
			padding-top: 10px;
			li {
				width: calc(100% / 5);
				padding: 10px;
				box-sizing: border-box;
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
		}
	}
</style>
