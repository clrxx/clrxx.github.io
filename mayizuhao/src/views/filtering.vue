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
					<!-- <a class="clear">清空筛选条件</a> -->
				</div>
				<div class="sel-cont">
					<h3>热门端游</h3>
					<ul class="sel-list game">
						<li v-for="item in pcGoodsLen" :key="item.name" @click="selGameSs(item)">
							<div class="hot">
								<el-tooltip effect="dark" :content="item.name" placement="top">
									<el-image fit="cover" :src="item.imageUrl">
										<div slot="placeholder" class="image-slot">
											<i class="el-icon-picture-outline"></i>
										</div>
									</el-image>
								</el-tooltip>
								<h5>{{ item.name }}</h5>
							</div>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h3>热门手游</h3>
					<ul class="sel-list game">
						<li v-for="item in moGoodsLen" :key="item.name" @click="selGameSs(item)">
							<div class="hot">
								<el-tooltip effect="dark" :content="item.name" placement="bottom">
									<el-image fit="cover" :src="item.imageUrl">
										<div slot="placeholder" class="image-slot">
											<i class="el-icon-picture-outline"></i>
										</div>
									</el-image>
								</el-tooltip>
								<h5>{{ item.name }}</h5>
							</div>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h3>游戏区服</h3>
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
				<div v-if="advancedTags.length > 0" class="sel-cont">
					<h3>高级选项</h3>
					<div class="tabs">
						<el-tabs v-model="tabsActive" @tab-click="tabsClick">
							<el-tab-pane v-for="(item, index) in advancedTags" :key="index" :label="item.name" :name="`${item.name}&${item.decide}`">
								<div v-if="item.decide == 1" class="decide">
									<div v-if="item.name == '价格范围'" class="ifcl">
										<el-button @click="addScopeTagsCus({name: '价格范围', s: 0, e: 1})" size="mini">一元租号</el-button>
										<el-button @click="addScopeTagsCus({name: '价格范围', s: 0, e: 2})" size="mini">二元租号</el-button>
										<el-button @click="addScopeTagsCus({name: '价格范围', s: 0, e: 3})" size="mini">0-3元</el-button>
										<el-button @click="addScopeTagsCus({name: '价格范围', s: 3, e: 5})" size="mini">3-5元</el-button>
										<el-button @click="addScopeTagsCus({name: '价格范围', s: 5, e: 999999999})" size="mini">5元以上</el-button>
									</div>
									<div v-if="item.name == '英雄数量'" class="ifcl">
										<el-button @click="addScopeTagsCus({name: '英雄数量', s: 0, e: 29})" size="mini">0-29</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄数量', s: 30, e: 59})" size="mini">30-59</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄数量', s: 60, e: 99})" size="mini">60-99</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄数量', s: 100, e: 129})" size="mini">100-129</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄数量', s: 130, e: 999999999})" size="mini">130及以上</el-button>
									</div>
									<div v-if="item.name == '皮肤数量'" class="ifcl">
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 0, e: 29})" size="mini">0-29</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 30, e: 100})" size="mini">30-100</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 101, e: 199})" size="mini">101-199</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 200, e: 299})" size="mini">200-299</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 300, e: 399})" size="mini">300-399</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 400, e: 499})" size="mini">400-499</el-button>
										<el-button @click="addScopeTagsCus({name: '皮肤数量', s: 500, e: 999999999})" size="mini">500及以上</el-button>
									</div>
									<div v-if="item.name == '英雄武器数量'" class="ifcl">
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 1, e: 10})" size="mini">1-10v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 11, e: 20})" size="mini">11-20v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 21, e: 30})" size="mini">21-30v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 31, e: 40})" size="mini">31-40v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 41, e: 50})" size="mini">41-50v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 51, e: 70})" size="mini">51-70v</el-button>
										<el-button @click="addScopeTagsCus({name: '英雄武器数量', s: 70, e: 999999999})" size="mini">70v及以上</el-button>
									</div>
									<el-input-number v-model="minNum" :min="0" size="mini"></el-input-number><span class="til">~</span><el-input-number v-model="maxNum" :min="0" size="mini"></el-input-number>
									<el-button @click="addScopeTags(item)" size="mini" class="lt-btn-10">确定</el-button>
								</div>
								<div v-if="item.decide == 2" class="decide">
									<el-button v-for="ime in fixedTagsSel" :key="ime" @click="addFixedTags(item.name, ime)" size="mini" class="bt-btn-10">{{ ime }}</el-button>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</div>
			<div class="filtering-cont white-radius">
				<div class="filtering-ranking">
					<a class="oto">综合排序</a>
					<a @click="isDescFn" :class="{active: isDesc == true}" class="ote">价格<i class="el-icon-caret-top"></i>
						<i class="el-icon-caret-bottom"></i>
					</a>
				</div>
				<null-data v-if="goods.length == 0" />
				<ul class="filtering-list">
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
			gameYName: '选择游戏区',
			gameEGoods: [],
			gameEName: '选择游戏服',
			gameFullPath: '',

			tabsActive: '',
			advancedTags: [],
			fixedTagsObj: {},
			fixedTagsSel: [],
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
		let _nlist = [];
		let _num = _query.indexOf('_');
		let _vlist = _query.split('_');
		while (_num > -1) {
			_nlist.push(_num);
			_num = _query.indexOf('_', _num + 1);
		}
		let _listLen = _nlist.length;
		if (_listLen == 2) {
			this.selGameSs({
				name: _vlist[2],
				path: _query.slice(0, _nlist[2]),
			});
		}
		if (_listLen == 3) {
			this.selGameYs({
				name: _vlist[3],
				path: _query.slice(0, _nlist[3])
			});
		}
		if (_listLen == 4) {
			this.selGameEs({
				name: _vlist[4],
				path: _query.slice(0, _nlist[4])
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
			this.advancedTags = [];
			this.supportScopeTags();
			this.supportFixedTags();
			this.goodsPage();
		},
		// 获取游戏对应scopeTags列表
		supportScopeTags () {
			this.$api.post('GetSupportScopeTags', JSON.stringify(this.$route.query.goodsId))
				.then(res => {
					let _list = res.obj;
					for (let i=0; i<_list.length; i++) {
						this.advancedTags.push({
							name: _list[i],
							decide: 1
						});
					}
				})
		},
		// 获取游戏对应fixedTags列表
		supportFixedTags () {
			this.$api.post('GetSupportFixedTags', JSON.stringify(this.$route.query.goodsId))
				.then(res => {
					this.fixedTagsObj = res.obj;
					for (let key in this.fixedTagsObj) {
						this.advancedTags.push({
							name: key,
							decide: 2
						});
					}
				})
		},
		// 高级选项切换
		tabsClick(tab) {
			this.tabsActive = tab.name;
			let _name = this.tabsActive.slice(0, this.tabsActive.indexOf('&'));
			let _decide = this.tabsActive.slice(this.tabsActive.indexOf('&')+1);
			this.minNum = 0;
			this.maxNum = 0;
			this.fixedTagsSel = [];
			if (_decide == 2) {
				let _obj = this.fixedTagsObj;
				if (_obj.hasOwnProperty(_name)) {
					for (let i=0; i<_obj[_name].length; i++) {
						this.fixedTagsSel.push(_obj[_name][i])
					}
				}
			}
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
				for (let i=0; i<_len; i++) {
					if (item.name == this.scopeTags[i].name) {
						this.scopeTags.splice(i, 1);
						break;
					}
				}
				this.scopeTags.push({
					name: item.name,
					startValue: this.minNum,
					endValue: this.maxNum
				});
				this.goodsPage();
			}
		},
		// 自定义的scopeTags
		addScopeTagsCus (item) {
			this.minNum = 0;
			this.maxNum = 0;
			let _len = this.scopeTags.length;
			for (let i=0; i<_len; i++) {
				if (item.name == this.scopeTags[i].name) {
					this.scopeTags.splice(i, 1);
					break;
				}
			}
			this.scopeTags.push({
				name: item.name,
				startValue: item.s,
				endValue: item.e
			});
			this.goodsPage();
		},
		// 添加商品查询参数fixedTages
		addFixedTags (name, value) {
			let _len = this.fixedTags.length;
			for (let i=0; i<_len; i++) {
				if (name == this.fixedTags[i].name) {
					this.fixedTags.splice(i, 1);
					break;
				}
			}
			this.fixedTags.push({ name, value });
			this.goodsPage();
		},
		// 价格排序
		isDescFn () {
			this.isDesc = !this.isDesc;
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
			this.gameYName = '选择游戏区';
			this.gameEGoods = [];
			this.gameEName = '选择游戏服';
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
			// .clear {
			// 	cursor: pointer;
			// 	&:hover {
			// 		color: #409eff;
			// 	}
			// }
		}
		.sel-cont {
			display: flex;
			align-items: center;
			padding: 0 10px;
			border-top: 1px solid #eee;
			box-sizing: border-box;
			h3 {
				flex-shrink: 0;
				width: 100px;
				text-align: center;
			}
		}
		.sel-list {
			display: flex;
			flex-wrap: wrap;
			padding: 15px 0;
			border-left: 1px solid #eee;
			li {
				position: relative;
				padding: 0 15px;
			}
			&.game {
				.hot {
					width: 130px;
					height: 60px;
					position: relative;
				}
				h5 {
					overflow: hidden;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					padding: 2px 0;
					background: rgba(0, 0, 0, .5);
					color: #fff;
					text-align: center;
					white-space: nowrap;
					text-overflow: ellipsis;
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
		.tabs {
			width: 100%;
			padding-left: 15px;
			border-left: 1px solid #eee;
			.decide {
				display: flex;
				align-items: center;
				margin: 15px 0 5px;
				.til {
					padding: 0 3px;
				}
				.ifcl {
					margin-right: 10px;
				}
				.lt-btn-10 {
					margin-left: 10px;
				}
				.bt-btn-10 {
					margin-bottom: 10px;
				}
			}
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
	.filtering-cont {
		padding: 10px 10px 0;
		margin-top: 30px;
		box-sizing: border-box;
	}
	.filtering-ranking {
		display: flex;
		align-items: center;
		padding: 10px 0 20px;
		border-bottom: 1px solid #eee;
		.oto {
			padding: 0 20px;
		}
		.ote {
			position: relative;
			padding: 0 20px;
			cursor: pointer;
			&.active {
				.el-icon-caret-top {
					color: #515a6e;
				}
				.el-icon-caret-bottom {
					color: #409eff;
				}
			}
			i {
				position: absolute;
				right: 0;
			}
			.el-icon-caret-top {
				top: -3px;
				color: #409eff;
			}
			.el-icon-caret-bottom {
				bottom: -3px;
			}
		}
	}
	.filtering-list {
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


