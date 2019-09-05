<template>
	<div class="seller-account-manage">
		<div class="account-puc">
			<el-page-header class="back-none" content="出租账号管理" />
			<div class="account-puc-cont">
				<ul class="account-puc-list">
					<li>
						<el-date-picker
							v-model="datePicker"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="datePickerChange"
							size="small">
						</el-date-picker>
					</li>
				</ul>
			</div>
			<el-tabs v-model="tabsActive" @tab-click="tabsClick">
				<el-tab-pane v-for="item in tabsArr" :key="item" :label="item" :name="item">
					<div class="order-info">
						<div v-if="tabsActive == '可租赁'" class="btns">
							<el-button size="small">下架</el-button>
							<el-button size="small">置顶推广</el-button>
						</div>
						<div v-if="tabsActive == '仓库中'" class="btns">
							<el-button size="small">商家</el-button>
							<el-button size="small">删除</el-button>
						</div>
						<div v-if="tabsActive == '已置顶'" class="btns">
							<el-button size="small">下架</el-button>
							<el-button size="small">删除</el-button>
						</div>
						<div v-if="tabsActive == '展示到渠道'" class="btns">
							<div class="idu">
								<p>为拓展商户销量，保障商户收益，商品拓展至部分渠道，应渠道要求，渠道商品无押金！</p>
								<p>1、您可以选择是否推送您的商品至渠道，推送至渠道的商品押金失效，同时为您带来更多订单和收益。</p>
								<p>2、已发布商品默认推送至渠道，您可以在下方手动调整</p>
							</div>
							<el-button size="small">取消推送</el-button>
						</div>
						<div v-if="tabsActive == '不展示到渠道'" class="btns">
							<div class="idu">
								<p>为拓展商户销量，保障商户收益，商品拓展至部分渠道，应渠道要求，渠道商品无押金！</p>
								<p>1、您可以选择是否推送您的商品至渠道，推送至渠道的商品押金失效，同时为您带来更多订单和收益。</p>
								<p>2、已发布商品默认推送至渠道，您可以在下方手动调整</p>
							</div>
							<el-button size="small">推送</el-button>
						</div>
						<div class="tables">
							<el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange">
								<el-table-column v-if="isShowtableCheckbox" type="selection" width="50"></el-table-column>
								<el-table-column label="帐号信息">
									<template slot-scope="scope">
										<div class="dot">
											<img src="@/assets/activity2.jpg" alt="pic">
											<div>
												<h3><el-tooltip effect="dark" content="该商品已加入免费专区，用户租号费用由蚂蚁补贴" placement="top"><em>免</em>
												</el-tooltip>{{ scope.row.name }}</h3>
												<p>Steam游戏-刀塔自走棋</p>
												<p>商品编号：3059319485421</p>
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="价格" width="150">
									<template slot-scope="scope">
										<p class="price">{{ scope.row.price }}</p>
									</template>
								</el-table-column>
								<el-table-column label="押金" width="150">
									<template slot-scope="scope">
										<p class="cash">{{ scope.row.cash }}</p>
									</template>
								</el-table-column>
								<el-table-column label="商品状态" width="150">
									<template>
										<p class="status">展示中</p>
										<p class="status">出租中</p>
										<p class="status">仓库中</p>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="160">
									<template slot-scope="scope">
										<div class="opts">
											<el-link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
											<el-link type="danger" @click="handlePass(scope.$index, scope.row)">修改密码</el-link>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div class="pagination">
				<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
		<el-dialog custom-class="pay-dialog" title="修改密码" :visible.sync="dialogVisible" @close="dialogClose" width="500px">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
				<el-form-item label="商品密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" size="small"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="submitForm('ruleForm')">确认修改</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次密码输入不一致!'));
			} else {
				callback();
			}
		};
		return {
			datePicker: null,
			dialogVisible: false,
			isShowtableCheckbox: false,

			ruleForm: {
				pass: '',
				checkPass: '',
			},
			rules: {
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				]
			},

			tabsActive: '全部',
			tabsArr: ['全部', '待审核', '可租赁', '仓库中', '出租中', '已置顶', '展示到渠道', '不展示到渠道'],
			tableData: [
				// {
				// 	name: '游戏昵称',
				// 	price: '￥1.00/小时',
				// 	cash: '￥0.00',
				// 	status: '展示中',
				// }, {
				// 	name: '游戏昵称',
				// 	price: '￥1.00/小时',
				// 	cash: '￥0.00',
				// 	status: '展示中',
				// }
			],
			
			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			let _params = {
				orderState: this.orderStateNum,
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1),
				createTimeOrder: {
					flag: true,
					desc: true,
					index: 0
				}
			};
			if (this.datePicker) {
				_params = Object.assign({
					createTime: {
						startTime: this.datePicker[0],
						startTimeStr: this.datePicker[0],
						endTime: this.datePicker[1],
						endTimeStr: this.datePicker[1],
					}
				}, _params);
			}
			this.$api.post('SellGoodPage', _params)
				.then(res => {
					console.log(res)
					// this.tableData = res.obj.obj;
					// this.pageTotal = res.obj.allItemCount;
				})
		},
		datePickerChange (e) {
			if (e) {
				let _arr = [];
				e.forEach(el => {
					_arr.push(this.$moment(el).format('YYYY-MM-DD HH:mm:ss'));
				});
				this.datePicker = _arr;
			}
			this.pageCurrent = 1;
		},
		tabsClick (e) {
			let _index = parseInt(e.index);
			switch (_index) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					this.isShowtableCheckbox = true;
					break;
				case 3:
					this.isShowtableCheckbox = true;
					break;
				case 4:
					break;
				case 5:
					this.isShowtableCheckbox = true;
					break;
				case 6:
					this.isShowtableCheckbox = true;
					break;
				case 7:
					this.isShowtableCheckbox = true;
					break;
				default:
					this.isShowtableCheckbox = false;
					break;
			}
			this.pageCurrent = 1;
			this.cAjax();
		},
		handleSelectionChange(e) {
			console.log(e);
		},
		handleEdit(index, row) {
			console.log(index, row);
			this.$router.push('/account/seller-account-edit');
		},
		handlePass(index, row) {
			this.dialogVisible = true;
			console.log(index, row);
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.ruleForm);
					this.dialogVisible = false;
				}
			});
		},
		dialogClose () {
			this.$refs['ruleForm'].resetFields();
		},
		pageChange (e) {
			this.pageCurrent = e;
		}
	}
}
</script>

<style lang="scss" scoped>
	.order-info {
		.btns {
			margin-bottom: 15px;
		}
		.idu {
			padding: 15px;
			margin-bottom: 15px;
			background: #f5f5f5;
			box-sizing: border-box;
			p {
				line-height: 1.5;
			}
		}
		.tables {
			border: 1px solid #e8eaec;
			border-bottom: none;
		}
		.dot {
			display: flex;
			img {
				width: 80px;
				height: 80px;
				margin-right: 10px;
				border-radius: 5px;
				object-fit: cover;
			}
			h3 {
				margin-bottom: 10px;
				color: #333;
				line-height: 1.3;
				em {
					padding: 2px;
					margin-right: 5px;
					background: #f54e35;
					color: #fff;
					font-size: 12px;
					line-height: 1;
					border-radius: 3px;
					cursor: default;
				}
			}
			p {
				color: #999;
				font-size: 12px;
			}
		}
		.status {
			color: #ff9900;
		}
		.opts {
			a {
				padding: 0 5px;
			}
		}
	}
</style>
