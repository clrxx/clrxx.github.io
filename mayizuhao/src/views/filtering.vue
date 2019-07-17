<template>
	<div class="filtering bc-f5f7f9">
		<div class="filtering-main wh-1300">
			<div class="filtering-sel white-radius">
				<div class="sel-bar">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item>您的位置</el-breadcrumb-item>
						<el-breadcrumb-item>租号中心</el-breadcrumb-item>
						<el-breadcrumb-item>xxx游戏</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="sel-cont">
					<h4>热门手游</h4>
					<ul class="sel-list">
						<li v-for="i in 7" :key="i">
							<el-tooltip class="item" effect="dark" content="英雄联盟" placement="top">
								<img src="@/assets/hotgame3.jpg" alt="pic">
							</el-tooltip>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h4>热门端游</h4>
					<ul class="sel-list">
						<li v-for="i in 7" :key="i">
							<el-tooltip class="item" effect="dark" content="英雄联盟" placement="top">
								<img src="@/assets/hotgame3.jpg" alt="pic">
							</el-tooltip>
						</li>
					</ul>
				</div>
				<div class="sel-cont">
					<h4>游戏类型</h4>
					<ul class="sel-list">
						<li>
							<el-select v-model="value" placeholder="选择专区">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</li>
						<li>
							<el-select v-model="value" placeholder="选择游戏">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</li>
						<li>
							<el-select v-model="value" placeholder="选择大区">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</li>
						<li>
							<el-select v-model="value" placeholder="选择服务器">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</li>
						<li><el-button type="danger">搜索</el-button></li>
					</ul>
				</div>
				<div class="sel-cont">
					<h4>高级选项</h4>
					<ul class="sel-list sort">
						<li><button class="active">价格</button></li>
						<li><button>购买数量</button></li>
					</ul>
				</div>
			</div>
			<div class="filtering-list white-radius">
				<ul>
					<li v-for="i in 5" :key="i">
						<div class="ac">
							<img class="pic" src="@/assets/hotgame3.jpg" alt="pic">
							<div class="recom">
								<h3>PO7★5阶鲲套★赐福剪影-世代之影★龙皇泰坦★电光原子灭世者★天神狼王鹰王套★蝎王★星云战车动天使★初霜战斗神翼★初霜摸金符三阶★塔防猎场爆破僵尸齐全★全模式任意体验★</h3>
								<h4>游戏_端游_逆战_电信区</h4>
								<div class="tag">
									<span v-for="k in 3" :key="k">正常</span>
								</div>
							</div>
						</div>
						<div class="mn">
							<div class="price">
								<p>租金：<em>2.34</em>元/时</p>
								<p>押金：<em>0</em>元</p>
								<p><em>2</em>小时起租</p>
							</div>
							<el-button type="primary" size="small" @click="toLease(i)">立即租赁</el-button>
						</div>
					</li>
				</ul>
				<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
		<el-backtop></el-backtop>
	</div>
</template>

<script>
export default {
	data () {
		return {
			options: [{
				value: '英雄联盟',
				label: '英雄联盟'
			}, {
				value: '地下城与勇士',
				label: '地下城与勇士'
			}, {
				value: 'QQ飞车',
				label: 'QQ飞车'
			}],
			value: '',
			input: '',

			searchBar: ['sas', 'sd'],
			
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	methods: {
		pageChange (e) {
			console.log(e)
		},
		toLease (id) {
			this.$router.push({path: '/lease', query: { id }});
		}
	}
}
</script>

<style lang="scss" scoped>
	.filtering {
		padding-bottom: 30px;
	}
	.filtering-sel {
		padding: 10px;
		box-sizing: border-box;
		.sel-bar {
			padding: 10px;
		}
		.sel-cont {
			display: flex;
			align-items: center;
			padding: 0 10px;
			box-sizing: border-box;
			border-top: 1px solid #eee;
			h4 {
				flex-shrink: 0;
				width: 100px;
			}
		}
		.sel-list {
			display: flex;
			padding: 10px 0;
			border-left: 1px solid #eee;
			li {
				padding: 0 15px;
				box-sizing: border-box;
			}
			img {
				width: 130px;
				height: 60px;
				object-fit: cover;
			}
			.el-select {
				width: 150px;
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
			object-fit: cover;
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


