<template>
	<div class="filtering bc-f5f7f9">
		<div class="filtering-main wh-1300">
			<div class="filtering-sel white-radius">
				<div class="sel-bar">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item>您的位置</el-breadcrumb-item>
						<el-breadcrumb-item>租号中心</el-breadcrumb-item>
						<el-breadcrumb-item>{{ gameSName }}</el-breadcrumb-item>
					</el-breadcrumb>
					<!-- <a @click="refresh" class="clear">清空筛选条件</a> -->
				</div>
				<div class="sel-cont">
					<h4>热门端游</h4>
					<ul class="sel-list game">
						<li v-for="item in pcGoodsLen" :key="item.name" @click="selGameSs(item)">
							<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
								<el-image fit="cover" :src="item.imageUrl">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</el-tooltip>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h4>热门手游</h4>
					<ul class="sel-list game">
						<li v-for="item in moGoodsLen" :key="item.name" @click="selGameSs(item)">
							<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
								<el-image fit="cover" :src="item.imageUrl">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</el-tooltip>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h4 class="sl">游戏区服</h4>
					<ul class="sel-list pop">
						<li>
							<el-popover width="800" placement="bottom-start" v-model="popGs">
								<div class="pop-game-cont">
									<ul class="llist">
										<li><el-radio @change="selGameCls('游戏_端游')" v-model="radioFro" label="1" border size="small">端游</el-radio></li>
										<li><el-radio @change="selGameCls('游戏_手游')" v-model="radioFro" label="2" border size="small">手游</el-radio></li>
									</ul>
									<ul class="clist">
										<li v-for="item in gameSGoods" :key="item.name" @click="selGameSs(item)">{{ item.name }}</li>
									</ul>
								</div>
								<el-button size="medium" slot="reference" :title="gameSName">{{ gameSName }} <i class="el-icon-edit"></i></el-button>
							</el-popover>
						</li>
						<li>
							<el-popover width="800" placement="bottom-start" v-model="popYs">
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
					</ul>
				</div>
				<div class="sel-cont">
					<h4 class="sl">高级选项</h4>
					<ul class="sel-list sort">
						<li>
							<el-popover placement="bottom">
								<el-button @click="descFn(2)" size="mini" class="lt-btn">由低到高</el-button>
								<el-button @click="descFn(1)" size="mini" class="lt-btn">由高到低</el-button>
								<el-button @click="showFixedTagsShow('价格排序')" slot="reference">价格排序</el-button>
							</el-popover>
						</li>
						<li v-for="item in advancedOptions" :key="item.name">
							<el-popover placement="bottom">
								<div v-if="item.decide == 1" class="input-number">
									<el-input-number v-model="minNum" :min="0" size="mini"></el-input-number> ~ <el-input-number v-model="maxNum" :min="0" size="mini"></el-input-number>
									<el-button @click="addScopeTags(item)" size="mini" class="lt-btn">确定</el-button>
								</div>
								<div v-if="item.decide == 2">
									<el-button v-for="ime in fixedTagsBtnSel" :key="ime" @click="addFixedTags(item.name, ime)" size="mini" class="lt-btn">{{ ime }}</el-button>
								</div>
								<el-button @click="showFixedTagsShow(item)" slot="reference">{{ item.name }}</el-button>
							</el-popover>
						</li>
					</ul>
				</div>
			</div>
			<div class="filtering-list white-radius">
				<null-data v-if="goods.length == 0" />
				<ul>
					<li v-for="item in goods" :key="item.code">
						<div class="ac">
							<div class="ae">
								<el-image fit="cover" :src="item.imageUrl" class="pic">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</div>
							<div class="recom">
								<h3 :title="item.name">{{ item.name }}</h3>
								<h4>{{ item.typeName }}</h4>
								<div class="tag">
									<span>{{ item.stateStr }}</span>
								</div>
							</div>
						</div>
						<div class="mn">
							<div class="price">
								<p>租金：<em>{{ item.timePrice }}</em>元/时</p>
								<p>押金：<em>{{ item.depositPrice }}</em>元</p>
								<p><em>{{ item.minTimes }}</em>小时起租</p>
							</div>
							<el-button type="primary" size="small" @click="toLease(item.code, item.res)">立即租赁</el-button>
						</div>
					</li>
				</ul>
				<div v-if="goods.length > 0" class="pagination">
					<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pcGoods: [],
			moGoods: [],

			popGs: false,
			popYs: false,
			popEs: false,
			radioFro: '1',
			gameSGoods: [],
			gameSName: '选择游戏',
			gameYGoods: [],
			gameYName: '请选择游戏区',
			gameEGoods: [],
			gameEName: '请选择游戏服',
			gameFullPath: '',

			advancedOptions: [],
			fixedTagsObj: {},
			fixedTagsBtnSel: [],
			fixedTags: [],
			scopeTags: [],
			isDesc: false,
			minNum: 0,
			maxNum: 0,
			
			goods: [],
			pageTotal: 10,
			pageSize: 20,
			pageCurrent: 1,
		}
	},
	created () {
		// 处理页面传值过来对应各选项 start
		let _query = this.$route.query.goodsId;
		let _list = [];
		let _num = _query.indexOf('_');
		let _vlist = _query.split('_');
		while (_num > -1) {
			_list.push(_num);
			_num = _query.indexOf('_', _num + 1);
		}
		let _listLen = _list.length;
		if (_listLen >= 2) {
			this.selGameSs({
				name: _vlist[2],
				path: _query.slice(0, _list[2]),
			});
		}
		if (_listLen >= 3) {
			this.selGameYs({
				name: _vlist[3],
				path: _query.slice(0, _list[3])
			});
		}
		if (_listLen >= 4) {
			this.selGameEs({
				name: _vlist[4],
				path: _query.slice(0, _list[4])
			});
		}
		// end
		this.$api.post('GetChildrenType', JSON.stringify('游戏_端游'))
			.then(res => {
				this.pcGoods = res.obj;
			})
		this.$api.post('GetChildrenType', JSON.stringify('游戏_手游'))
			.then(res => {
				this.moGoods = res.obj;
			})
		this.selGameCls('游戏_端游');
		this.getSupportScopeTags();
		this.getSupportFixedTags();
		this.goodsPage();
	},
	computed: {
		pcGoodsLen () {
			return this.pcGoods.slice(0, 7);
		},
		moGoodsLen () {
			return this.moGoods.slice(0, 7);
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
			this.gameSearch();
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
			this.gameSearch();
		},
		// 二级选择
		selGameEs (item) {
			this.popEs = false;
			this.gameEName = item.name;
			this.gameFullPath = item.path;
			this.gameSearch();
		},
		// 搜索商品
		gameSearch () {
			this.$router.replace({path: this.$route.path, query: {goodsId: this.gameFullPath}});
			this.pageCurrent = 1;
			this.advancedOptions = [];
			this.getSupportScopeTags();
			this.getSupportFixedTags();
			this.goodsPage();
		},
		// 获取游戏对应scopeTags列表
		getSupportScopeTags () {
			this.$api.post('GetSupportScopeTags', this.$route.query.goodsId)
				.then(res => {
					let _list = res.obj;
					for (let i=0; i<_list.length; i++) {
						this.advancedOptions.push({
							name: _list[i],
							decide: 1
						});
					}
				})
		},
		// 获取游戏对应fixedTags列表
		getSupportFixedTags () {
			this.$api.post('GetSupportFixedTags', this.$route.query.goodsId)
				.then(res => {
					this.fixedTagsObj = res.obj;
					for (let key in this.fixedTagsObj) {
						this.advancedOptions.push({
							name: key,
							decide: 2
						});
					}
				})
		},
		// 高级选择按钮功能
		showFixedTagsShow (item) {
			this.minNum = 0;
			this.maxNum = 0;
			this.fixedTagsBtnSel = [];
			if (item.decide == 2) {
				let _obj = this.fixedTagsObj;
				if (_obj.hasOwnProperty(item.name)) {
					for (let key in _obj) {
						for (let j=0; j<_obj[key].length; j++ ) {
							this.fixedTagsBtnSel.push(_obj[key][j]);
						}
					}
				}
			}
		},
		// 价格排序
		descFn (ids) {
			if (ids == 1) {
				this.isDesc = true;
			} else if (ids == 2) {
				this.isDesc = false;
			}
			this.goodsPage();
		},
		// 添加商品查询参数scopeTags
		addScopeTags (item) {
			if (this.maxNum == 0 && this.minNum == 0) {
				this.$notify({
					title: '温馨提示',
					message: '请选择筛选范围'
				});
			} else if (this.minNum > this.maxNum) {
				this.$notify({
					title: '温馨提示',
					message: '结束值不能小于起始值'
				});
			} else {
				let _len = this.scopeTags.length;
				this.scopeTags.push({
					name: item.name,
					startValue: this.minNum,
					endValue: this.maxNum
				});
				for (let i=0; i<_len; i++) {
					if (item.name == this.scopeTags[i].name) {
						this.scopeTags.splice(i, 1);
						break;
					}
				}
				this.goodsPage();
			}
		},
		// 添加商品查询参数fixedTages
		addFixedTags (name, value) {
			let _len = this.fixedTags.length;
			this.fixedTags.push({ name, value });
			for (let i=0; i<_len; i++) {
				if (name == this.fixedTags[i].name) {
					this.fixedTags.splice(i, 1);
					break;
				}
			}
			this.goodsPage();
		},
		// 查询商品
		goodsPage () {
			let goodsPar = {
				goodPath: this.$route.query.goodsId,
				priceOrder: {
					flag: true,
					desc: this.isDesc,
					index: 0
				},
				updateTimeOrder: {
					flag: true,
					desc: this.isDesc,
					index: 0
				},
				fixedTages: this.fixedTags,
				scopeTags: this.scopeTags,
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			};
			this.$api.post('GoodPage', goodsPar)
				.then(res => {
					this.goods = res.obj.obj;
					this.pageTotal = res.obj.allItemCount;
				})
		},
		// 商品分页
		pageChange (e) {
			this.pageCurrent = e;
			this.goodsPage();
		},
		toLease (code, res) {
			this.$router.push({path: '/lease', query: {leaseCode: code, resCode: res}});
		},
		// 重新赋值
		recode () {
			this.popGs = false;
			this.gameYGoods = [];
			this.gameYName = '请选择游戏区';
			this.gameEGoods = [];
			this.gameEName = '请选择游戏服';
			this.fixedTags = [];
			this.scopeTags = [];
			this.minNum = 0;
			this.maxNum = 0;
		}
	}
}
</script>

<style lang="scss" scoped>
	.null-data {
		padding-top: 10px;
		text-align: center;
	}
	.filtering {
		padding-bottom: 30px;
	}
	.filtering-sel {
		padding: 10px;
		box-sizing: border-box;
		.sel-bar {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			.el-breadcrumb {
				margin-right: 100px;
			}
			.clear {
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
		}
		.sel-cont {
			display: flex;
			align-items: center;
			padding: 0 10px;
			border-top: 1px solid #eee;
			box-sizing: border-box;
			h4 {
				flex-shrink: 0;
				width: 100px;
				line-height: 80px;
				border-right: 1px solid #eee;
			}
			.sl {
				line-height: 60px;
			}
		}
		.sel-list {
			display: flex;
			flex-wrap: wrap;
			li {
				position: relative;
				padding: 0 15px;
			}
			&.game {
				li {
					width: 130px;
					height: 60px;
				}
			}
			&.pop {
				.el-button {
					overflow: hidden;
					min-width: 120px;
					max-width: 150px;
					text-overflow: ellipsis;
					border-right: 1px solid #DCDFE6;
				}
			}
		}
		.sort {
			button {
				padding: 7px 12px;
				background: #fff;
				border: 1px solid #dcdada;
				cursor: pointer;
				border-radius: 4px;
				transition: all .3s;
				&:hover {
					color: #409eff;
					border-color: #c6e2ff;
					background-color: #ecf5ff;
				}
				&.active {
					color: #409eff;
					border-color: #c6e2ff;
					background-color: #ecf5ff;
				}
			}
			.el-popover {
				min-width: 50px;
			}
		}
	}
	.input-number {
		.lt-btn {
			margin-left: 10px;
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
	.filtering-list {
		padding: 10px 10px 0;
		margin-top: 30px;
		box-sizing: border-box;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 50px 20px 20px;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
			transition: all .3s;
			.ac, .mn {
				display: flex;
				align-items: center;
			}
			&:hover {
				background: #f5f7f9;
			}
		}
		.pic {
			width: 80px;
			height: 80px;
			margin-right: 20px;
			border-radius: 5px;
		}
		.recom {
			width: 600px;
			h3 {
				overflow: hidden;
				width: 100%;
				font-size: 15px;
				font-weight: 700;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			h4 {
				margin-top: 7px;
			}
			.tag {
				margin-top: 15px;
				span {
					padding: 0 5px;
					margin: 0 5px 5px 0;
					background: #F5F7FC;
					border: 1px solid #e9e9eb;
					color: #818ba1;
					font-size: 12px;
					line-height: 20px;
					border-radius: 3px;
				}
			}
		}
		.price {
			width: 200px;
			p {
				line-height: 1.5;
				em {
					padding: 0 5px;
					color: red;
					font-size: 15px;
					font-weight: 600;
				}
			}
		}
	}
</style>


