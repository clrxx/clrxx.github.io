<template>
	<div class="logo-main">
		<div class="logo-cont wh-1300">
			<div @click="toIndexPage" class="logo">
				<img src="@/assets/logo-gray.png" alt="logo">
			</div>
			<div class="sel-cont">
				<ul class="sel-list">
					<li>
						<el-popover width="800" placement="bottom-start" v-model="popVisible">
							<div class="pop-game-cont">
								<ul class="llist">
									<li><el-radio @change="selGameCls('游戏_端游')" v-model="radioFro" label="1" border size="small">端游</el-radio></li>
									<li><el-radio @change="selGameCls('游戏_手游')" v-model="radioFro" label="2" border size="small">手游</el-radio></li>
								</ul>
								<ul class="clist">
									<li v-for="item in gameGoods" :key="item.name" @click="selGames(item)">{{ item.name }}</li>
								</ul>
							</div>
							<el-button size="medium" slot="reference" class="border-right">{{ goodsName }} <i class="el-icon-edit"></i></el-button>
						</el-popover>
					</li>
					<li>
						<el-select v-model="gameYGoodsPath" @change="selGameY" size="medium" class="border-right" placeholder="请选择">
							<el-option v-for="item in gameYGoods" :key="item.name" :label="item.name" :value="item.path" />
						</el-select>
					</li>
					<li>
						<el-select v-model="gameEGoodsPath" size="medium" class="border-none" placeholder="请选择">
							<el-option v-for="item in gameEGoods" :key="item.name" :label="item.name" :value="item.path" />
						</el-select>
					</li>
					<li><el-button @click="gameSearch" type="danger" size="medium">搜索</el-button></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			popVisible: false,
			goodsName: '选择游戏',
			radioFro: '1',
			gameGoods: [],
			gameGoodsPath: '',
			gameYGoods: [],
			gameYGoodsPath: '',
			gameEGoods: [],
			gameEGoodsPath: ''
		}
	},
	created () {
		this.selGameCls('游戏_端游');
	},
	methods: {
		selGameCls (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameGoods = res.obj;
				})
		},
		selGames (item, index) {
			this.goodsName = item.name;
			this.gameGoodsPath = item.path;
			this.recode();
			this.$api.post('GetChildrenType', JSON.stringify(item.path))
				.then(res => {
					this.gameYGoods = res.obj;
				})
		},
		selGameY (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameEGoods = res.obj;
				})
		},
		gameSearch () {
			let goodsId;
			if (!this.gameEGoodsPath) {
				if (!this.gameYGoodsPath) {
					if (!this.gameGoodsPath) {
						goodsId = '游戏_端游';
					} else {
						goodsId = this.gameGoodsPath;
					}
				} else {
					goodsId = this.gameYGoodsPath;
				}
			} else {
				goodsId = this.gameEGoodsPath;
			}
			this.$router.push({path: '/filtering', query: {goodsId}});
		},
		toIndexPage () {
			this.$router.push('/');
		},
		// 重新赋值
		recode () {
			this.popVisible = false;
			this.gameYGoods = [];
			this.gameYGoodsPath = '';
			this.gameEGoods = [];
			this.gameEGoodsPath = '';
		}
	}
}
</script>

<style lang="scss" scoped>
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
		border-radius: 5px;
	}
	.sel-list {
		display: flex;
		flex-wrap: wrap;
		.el-select {
			width: 120px;
		}
		.el-button.border-right {
			overflow: hidden;
			max-width: 120px;
			height: 36px;
			text-overflow: ellipsis;
			border: none;
			border-right: 1px solid #DCDFE6;
			border-radius: 0;
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
			padding: 30px 0;
			li {
				width: calc(100% / 5);
				height: 40px;
				padding: 0 10px;
				box-sizing: border-box;
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
		}
	}
</style>
